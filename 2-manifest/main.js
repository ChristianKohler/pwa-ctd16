function LandingPageCtrl($http) {
	var vm = this;
	
	$http.get('./menu.json').then(function(response) {
		vm.promotionMenus = response.data;
	});
}

angular
	.module('bistroApp', [])
	.controller('LandingPageCtrl', LandingPageCtrl);