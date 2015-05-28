(function(){
	'use strict';

	angular.module('biblio')
		.service('categoryService', ['$q', CategoryService]);

	/**
	* Users DataService
	* Uses embedded, hard-coded data model; acts asynchronously to simulate
	* remote data service call(s).
	*
	* @returns {{loadAll: Function}}
	* @constructor
	*/
	function CategoryService($q){
		var categories = [
			{
				name: 'Psychologie',
				color: 'red',
				description: ''
			},
			{
				name: 'Informatique',
				color: 'green',
				description: ''
			},
			{
				name: 'Sociologie',
				color: 'blue',
				description: ''
			}
		];

		// Promise-based API
		return {
			loadAllCategories : function() {
				// Simulate async nature of real remote calls
				//return $q.when(categories);
				return $q.when(categories.map(function (cat) {
					cat._lowername = cat.name.toLowerCase();
					return cat;
				}));
			}
		};
	}
})();
