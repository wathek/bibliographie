(function(){
	'use strict';

	angular.module('biblio')
		.service('categoryService', ['$q', '$http', 'API_ENDPOINT', CategoryService]);

	function CategoryService($q, $http, API_ENDPOINT){
		return {
			loadAllCategories : function() {
				var promise = $http.get(API_ENDPOINT + 'categories').then(function(results) {
					var data = $q.when(results.data.map(function (cat) {
						cat._lowername = cat.name.toLowerCase();
						return cat;
					}));
					
					return data;
				});

				return promise;
			}
		};
	}
})();
