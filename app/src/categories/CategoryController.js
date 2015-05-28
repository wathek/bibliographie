(function(){

	angular.module('categories')
		   .controller('CategoryController', [
				'categoryService', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
				CategoryController
			]);

	/**
	* Main Controller for the Angular Material Starter App
	* @param $scope
	* @param $mdSidenav
	* @param avatarsService
	* @constructor
	*/
	function CategoryController( categoryService, $mdSidenav, $mdBottomSheet, $log, $q) {
		var self = this;

		self.selected			= null;
		self.categories			= [ ];
		self.selectCategory		= selectCategory;
		self.toggleList			= toggleCategoriesList;
		self.showContactOptions	= showContactOptions;

		// Load all registered categories

		categoryService.loadAllCategories()
					   .then( function( categories ) {
								self.categories    = [].concat(categories);
								self.selected = categories[0];
						});

		// *********************************
		// Internal methods
		// *********************************

		/**
		* First hide the bottomsheet IF visible, then
		* hide or Show the 'left' sideNav area
		*/
		function toggleCategoriesList() {
			var pending = $mdBottomSheet.hide() || $q.when(true);

			pending.then(function(){
				$mdSidenav('left').toggle();
			});
		}

		/**
		* Select the current avatars
		* @param menuId
		*/
		function selectCategory ( category ) {
			self.selected = angular.isNumber(category) ? $scope.categories[category] : category;
			self.toggleList();
		}

		/**
		* Show the bottom sheet
		*/
		function showContactOptions($event) {
			var user = self.selected;

			return $mdBottomSheet.show({
				parent: angular.element(document.getElementById('content')),
				templateUrl: './src/users/view/contactSheet.html',
				controller: [ '$mdBottomSheet', ContactPanelController],
				controllerAs: "cp",
				bindToController : true,
				targetEvent: $event
			}).then(function(clickedItem) {
				clickedItem && $log.debug( clickedItem.name + ' clicked!');
			});

			/**
			* Bottom Sheet controller for the Avatar Actions
			*/
			function ContactPanelController( $mdBottomSheet ) {
				this.user = user;
				this.actions = [
					{ name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
					{ name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
					{ name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
					{ name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
				];

				this.submitContact = function(action) {
					$mdBottomSheet.hide(action);
				};
			}
		}
	}

})();
