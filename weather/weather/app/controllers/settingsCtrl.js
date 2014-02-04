angular.module('hwApp').controller('settingsCtrl',
    function ($scope, $log, $location, Weather, UserService, localStorageService) {

        $scope.user = UserService.user;

        var initlizeModel = function () {
            var searchTerm = localStorageService.get(config.CacheTypes.Location);

            if (searchTerm) {
                $scope.user.location = searchTerm;
            }
            else {

            }
        };
        $scope.save = function () {
           
            UserService.save();
            //update local storage with settings
            localStorageService.clearAll();
            var saved = localStorageService.add(config.CacheTypes.Location, $scope.user.location);
            if (saved) {
                toastr.success('saved location:' + $scope.user.location);
            } else {
                toastr.warning('Error: saving location data to local storage:');
            }
            
            $location.path('/');
        };
        initlizeModel();
    });