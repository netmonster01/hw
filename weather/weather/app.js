angular.module('hwApp', ['ngRoute', 'LocalStorageModule', 'timer'])
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/partials/home.html', 
      controller: 'mainCtrl'
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