(function(){
	'use strict';

	angular.module('biblio')
		.service('referenceService', ['$q', ReferenceService]);

	function ReferenceService($q){
		var references = [
			{
				name: 'ref1',
				color: 'red',
				description: 'description ref1'
			},
			{
				name: 'ref2',
				color: 'green',
				description: 'description ref2'
			},
		];

		// Promise-based API
		return {
			loadAllReferences : function() {
				// Simulate async nature of real remote calls
				return $q.when(references);
			}
		};
	}
})();
