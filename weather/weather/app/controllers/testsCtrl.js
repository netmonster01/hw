angular.module('hwApp').controller('testsCtrl',
 function ($scope, $log, $location, Weather, UserService, localStorageService) {
     $scope.isSupported = false;
     var initlizeModel = function () {
         $scope.isSupported = localStorageService.isSupported;
         $log.info($scope.isSupported);
     };
     initlizeModel();
     //$scope.user = UserService.user;

     //$scope.save = function () {
     //    UserService.save();
     //    $location.path('/');
     //};
     //$log.info('calling service');
     //$scope.fetchCities = Weather.getCityDetails('dall');
 })