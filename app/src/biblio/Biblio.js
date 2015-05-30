(function(){
	'use strict';

	// Prepare the 'categories' module for subsequent registration of controllers and delegates
	angular.module('biblio', [ 'ngMaterial' ])
		   .constant('API_ENDPOINT', 'api/v1/index.php/');

})();
