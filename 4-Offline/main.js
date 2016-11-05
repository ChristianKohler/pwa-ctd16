function LandingPageCtrl($http) {
	var vm = this;
	
	initialize();
	vm.refresh = initialize;
	
	function initialize() {
		if (!navigator.onLine) {
			vm.offline = true;
		} else {
			vm.offline = false;
			$http.get('./menu.json').then(function(response) {
				vm.promotionMenus = response.data;
			}, function (error) {
				vm.errorMessage = 'Lieber Kunde, zurzeit sind keine Menus im Angebot :(';
			});
		}
	}
}

angular
	.module('bistroApp', [])
	.controller('LandingPageCtrl', LandingPageCtrl);