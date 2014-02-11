angular.module('hwApp').controller('menuCtrl',
 function ($scope, $log, $location, Weather, UserService, localStorageService) {
     $scope.currentLocation = function ()
     {
         UserService.user.location = 'autoip';
         toastr.success('updated Location: Using your Current Location:');
         UserService.save();
     };
 })