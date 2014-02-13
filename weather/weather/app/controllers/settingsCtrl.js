angular.module('hwApp').controller('settingsCtrl',
    function ($scope, $log, $location, Weather, UserService, localStorageService) {

        $scope.user = UserService.user;
        $scope.usertemp = angular.copy(UserService.user);


        $scope.result = '';
        $scope.details = {};
        $scope.options = {};

        $scope.$watch('details', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.user.locationInfo.lon = newVal.geometry.location.e;
                $scope.user.locationInfo.lat = newVal.geometry.location.d;
            }
        });

        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };
        $scope.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 1
        };
        $scope.showWeeks = true;
        $scope.toggleWeeks = function () {
            $scope.showWeeks = !$scope.showWeeks;
        };
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy-MM-dd','yyyy/MM/dd', 'shortDate'];
        $scope.format = $scope.formats[1];
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
                if (!angular.equals($scope.user.locationInfo.lon, $scope.usertemp.locationInfo.lon)) {
                    toastr.success('Updated longitude:' + $scope.user.locationInfo.lon);
                }
                if (!angular.equals($scope.user.locationInfo.lat, $scope.usertemp.locationInfo.lat)) {
                    toastr.success('Updated latitude:' + $scope.user.locationInfo.lat);
                }
                if (!angular.equals($scope.user.locationInfo.kmlFilePath, $scope.usertemp.locationInfo.kmlFilePath)) {
                    toastr.success('Updated kml file path:' + $scope.user.locationInfo.kmlFilePath);
                }
            }
            UserService.save();
            $scope.usertemp = angular.copy($scope.user);
            $location.path('/');
        };
    });