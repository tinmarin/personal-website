(function() {

angular
	.module('app.routes', ['ngRoute', 'ui.router'])
	.config(config);

function config($stateProvider, $urlRouterProvider, $locationProvider){
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise("/");
}

})();