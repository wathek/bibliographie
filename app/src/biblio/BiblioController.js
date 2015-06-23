(function(){

	angular.module('biblio')
		   .controller('BiblioController', [
				'$scope', 'categoryService', 'colorService', 'referenceService', '$mdSidenav', '$mdBottomSheet', '$mdDialog', '$log', '$q',
				BiblioController])
		   .directive('reference', function() {
				return {
					restrict: 'E',
					transclude: true,
					scope: {
						data: '@?'
					},
					template: '<ng-include src="template" />',
					link: function(scope, element, attrs) {
						var data = angular.fromJson(scope.data);
						scope.ref = data;
						scope.template = './src/biblio/view/reference-' + data.type + '.tmpl.html';
					}
				};
			});

	function BiblioController($scope, categoryService, colorService, referenceService, $mdSidenav, $mdBottomSheet, $mdDialog, $log, $q) {
		var self = this;

		$scope.newCategoryName = null;
		$scope.selectedColor = colorService[0].css;
		$scope.colorsList = colorService;

		self.searchReference = null

		self.selectedCategories	= [ ];
		self.searchTextCategory = null;
		self.selectedCategory = null;
		self.querySearchCategory = querySearchCategory;
		self.categories			= [ ];

		self.references			= [ ];

		self.showAddCategoryDialog = showAddCategoryDialog;
		self.selectCategory		= selectCategory;
		self.toggleList			= toggleCategoriesList;

		self.addNewReference = showAddNewReference;

		// Load all registered categories

		categoryService.loadAllCategories()
					   .then( function( categories ) {
								self.categories    = [].concat(categories);
						});

		referenceService.loadAllReferences()
						.then(function(references) {
							self.references = [].concat(references.data);
						});


		// *********************************
		// Internal methods
		// *********************************

		$scope.searchByCat = function(element) {
			if (self.selectedCategories.length == 0)
				return true;
			
			for (i=0; i < self.selectedCategories.length; i++) {
				for (j=0; j < element.categories.length; j++) {
					if (self.selectedCategories[i].name == element.categories[j].name)
						return true;
				}
			}
			
			return false;
		}

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
					answer._lowername = answer.name.toLowerCase();
					self.categories.push(answer);
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
		function showAddNewReference($event) {
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
