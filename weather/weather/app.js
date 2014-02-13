angular.module('hwApp', ['ngRoute', 'LocalStorageModule', 'timer', 'google-maps', 'ngAutocomplete', 'ui.bootstrap'])
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/partials/home.html', 
      controller: 'homeCtrl'
    })
    .when('/settings', {
      templateUrl: 'app/partials/settings.html',
      controller: 'settingsCtrl'
    })
    .when('/alerts', {
          templateUrl: 'app/partials/alerts.html',
          controller: 'alertsCtrl'
    })
      .when('/tests', {
          templateUrl: 'app/partials/tests.html',
          controller: 'testsCtrl'
      })
    .otherwise({redirectTo: '/'});
}]);