function LandingPageCtrl($http) {
	var vm = this;
	
	initialize();
	vm.refresh = initialize;
	vm.notifyMe = notifyMe;
	
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
	
	function notifyMe() {
		if (!('Notification' in window)) {
			alert('This browser does not support desktop notification');
		} else if (Notification.permission === 'granted') {
			showNotification();
		} else if (Notification.permission !== 'denied') {
			Notification.requestPermission(function (permission) {
				if (permission === 'granted') {
					showNotification();
				}
			});
		}
	}
	
	function showNotification() {
		navigator.serviceWorker.ready.then(function(registration) {
		  registration.showNotification('It is Zühlke day!', {
				body: 'The daily menus are online for the next Zühlke day. Order now your lunch!',
				icon: 'img/logo.png'
			});
		});
	}
}

angular
	.module('bistroApp', [])
	.controller('LandingPageCtrl', LandingPageCtrl);