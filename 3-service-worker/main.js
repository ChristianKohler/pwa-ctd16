function LandingPageCtrl($http) {
	var vm = this;
	
	$http.get('./menu.json?cachebuster' + Math.random()).then(function(response) {
		vm.promotionMenus = response.data;
	});
}

angular
	.module('bistroApp', [])
	.controller('LandingPageCtrl', LandingPageCtrl);