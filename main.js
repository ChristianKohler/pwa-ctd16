var bistroApp = angular.module('bistroApp', []);


bistroApp.controller('LandingPageCtrl', function ($http) {
		var vm = this;
	  
		$http({
		  method: 'GET',
		  url: './menu.json'
		}).then(function successCallback(response) {
			vm.promotionMenus = response.data;
		}, function errorCallback(response) {
			vm.promotionMenus = {};
		});
	});