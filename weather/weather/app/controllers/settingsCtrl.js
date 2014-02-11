angular.module('hwApp').controller('settingsCtrl',
    function ($scope, $log, $location, Weather, UserService, localStorageService) {

        $scope.user = UserService.user;
        $scope.usertemp = angular.copy(UserService.user);


        $scope.result = '';
        $scope.details = {};
        $scope.options = {};

        //$scope.$watch('details', function () {
        //    //$scope.user.locationInfo.lon = $scope.details.geom
        //    alert('hey, details has changed!');
        //});
        $scope.$watch('details', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.user.locationInfo.lon = newVal.geometry.location.e;
                $scope.user.locationInfo.lat = newVal.geometry.location.d;
            }
        });

        $scope.resetCache = function () {
         
            localStorageService.clearAll();
        };


        $scope.save = function () {
            if (!angular.equals($scope.user, $scope.usertemp))
            {
                if (!angular.equals($scope.user.tripTitle, $scope.usertemp.tripTitle)) {
                    toastr.success('updated Trip Tile:' + $scope.user.tripTitle);
                }
                if (!angular.equals($scope.user.location, $scope.usertemp.location)) {
                    localStorageService.remove(config.CacheTypes.CacheLastUpdate);
                    toastr.success('updated Location:' + $scope.user.location);
                }
                if (!angular.equals($scope.user.tripDate, $scope.usertemp.tripDate)) {
                    toastr.success('updated Trip Date:' + $scope.user.tripDate);
                }
                if (!angular.equals($scope.user.daysToShow, $scope.usertemp.daysToShow)) {
                    toastr.success('updated Number of Days to Show:' + $scope.user.daysToShow);
                }
                if (!angular.equals($scope.user.usgsStation, $scope.usertemp.usgsStation)) {
                    toastr.success('updated USGS Station:' + $scope.user.usgsStation);
                }
            }
            UserService.save();
            //update local storage with settings
            //localStorageService.clearAll();
            //var saved = localStorageService.add(config.CacheTypes.Location, $scope.user.location);
            $scope.usertemp = angular.copy($scope.user);
            //if (saved) {
            //    toastr.success('saved location:' + $scope.user.location);
            //} else {
            //    toastr.warning('Error: saving location data to local storage:');
            //}
            
            $location.path('/');
        };
        //initlizeModel();
    });