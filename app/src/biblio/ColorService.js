(function(){
	'use strict';

	angular.module('biblio')
		.service('colorService', ['$q', colorService]);

	/**
	* Users DataService
	* Uses embedded, hard-coded data model; acts asynchronously to simulate
	* remote data service call(s).
	*
	* @returns {{loadAll: Function}}
	* @constructor
	*/
	function colorService($q){
		var colors = [
			{
				name: 'gray',
				css: 'gray',
			},
			{
				name: 'red',
				css: 'red'
			},
			{
				name: 'pink',
				css: 'pink'
			},
			{
				name: 'purple',
				css: 'purple'
			},
			{
				name: 'deep-purple',
				css: 'deep-purple'
			},
			{
				name: 'indigo',
				css: 'indigo'
			},
			{
				name: 'blue',
				css: 'blue'
			},
			{
				name: 'light-blue',
				css: 'light-blue'
			},
			{
				name: 'cyan',
				css: 'cyan'
			},
			{
				name: 'teal',
				css: 'teal'
			},
			{
				name: 'green',
				css: 'green'
			},
			{
				name: 'light-green',
				css: 'light-green'
			},
			{
				name: 'lime',
				css: 'lime'
			},
			{
				name: 'yellow',
				css: 'yellow'
			},
			{
				name: 'amber',
				css: 'amber'
			},
			{
				name: 'orange',
				css: 'orange'
			},
			{
				name: 'deep-orange',
				css: 'deep-orange'
			},
			{
				name: 'brown',
				css: 'brown'
			},
			{
				name: 'blue-grey',
				css: 'blue-grey'
			}
		];

		return colors;
	}
})();
