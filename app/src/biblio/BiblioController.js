(function(){

	angular.module('biblio')
		   .controller('BiblioController', [
				'$scope', 'categoryService', 'colorService', 'referenceService', '$mdSidenav', '$mdBottomSheet', '$mdDialog', '$log', '$q',
				BiblioController
			]);

	/**
	* Main Controller for the Angular Material Starter App
	* @param $scope
	* @param $mdSidenav
	* @param avatarsService
	* @constructor
	*/
	function BiblioController($scope, categoryService, colorService, referenceService, $mdSidenav, $mdBottomSheet, $mdDialog, $log, $q) {
		var self = this;

		$scope.newCategoryName = null;
		$scope.selectedColor = colorService[0].css;
		$scope.colorsList = colorService;

		self.selectedCategories	= [ ];
		self.searchTextCategory = null;
		self.selectedCategory = null;
		self.querySearchCategory = querySearchCategory;
		self.categories			= [ ];

		self.showAddCategoryDialog = showAddCategoryDialog;
		self.selectCategory		= selectCategory;
		self.toggleList			= toggleCategoriesList;
		self.showContactOptions	= showContactOptions;

		// Load all registered categories

		categoryService.loadAllCategories()
					   .then( function( categories ) {
								self.categories    = [].concat(categories);
						});

		referenceService.loadAllReferences()
						.then(function(references) {
		//					console.log(references);
						});

		// *********************************
		// Internal methods
		// *********************************

		function querySearchCategory(query) {
			var results = query ? self.categories.filter(createFilterFor(query)) : [];
			return results;
		}

		/**
		* Create filter function for a query string
		*/
		function createFilterFor(query) {
			var lowercaseQuery = angular.lowercase(query);
			return function filterFn(category) {
				return (category._lowername.indexOf(lowercaseQuery) === 0);
			};
		}

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
			if (self.selectedCategories.filter(function(e) { return e.name == category.name; }).length == 0) {
				self.selectedCategories.push(category);
			}
		}

		function showAddCategoryDialog(ev) {
			$mdDialog.show({
				controller: BiblioController,
				templateUrl: './src/biblio/view/addCategoryDialog.tmpl.html',
				targetEvent: ev,
			}).then(function(answer) {
				console.log(answer);
				if (answer.name != null) {
					self.categories.push(answer);
					console.log(self.categories);
				}
			}, function() {
			});
		}

		$scope.answer = function(answer) {
			$mdDialog.hide({name: $scope.newCategoryName, color: $scope.selectedColor, description: ''});
		};

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
