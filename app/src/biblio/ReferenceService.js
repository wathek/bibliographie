(function(){
	'use strict';

	angular.module('biblio')
		.service('referenceService', ['$q', '$http', 'API_ENDPOINT', ReferenceService]);

	function ReferenceService($q, $http, API_ENDPOINT){
		return {
			loadAllReferences : function() {
				var promise = $http.get(API_ENDPOINT + 'references').then(function(results) {
                        return results;
                    });

                return promise;
			}
		};
	}
})();
