angular.module('hwApp')
    .controller('homeCtrl',
        function ($scope, $timeout, $log, $location, Weather, UserService, localStorageService, usgsService) {
            $scope.date = {};
            $scope.weather = {};
            $scope.currentConditions = {};
            $scope.astronomy = {};
            $scope.compass = '';
            $scope.search = '';
            $scope.isoKeys = [];
            $scope.tripDate = '';
            $scope.tripTitle = '';
            $scope.user = UserService.user;

            var kmlUrl = 'http://gmaps-samples.googlecode.com/svn/trunk/ggeoxml/cta.kml';

            $scope.kmlLayerOptions = {
                url: kmlUrl,
            };
           
            $scope.map = {
                center: {
                    latitude:41.875696,//$scope.user.locationInfo.lat,
                    longitude:-87.624207//$scope.user.locationInfo.lon
                },
                //mapTypeId: google.maps.MapTypeId.SATELLITE,
                zoom: 10,
                showWeather: false,
                showTraffic: false,
                showCloud: false,
                showKml: false,
                //markers: [
                //{
                //    icon: '/images/hiking.png',
                //    latitude: $scope.user.locationInfo.lat,
                //    longitude:$scope.user.locationInfo.lon,
                //    showWindow: true,
                //    title: $scope.user.tripTitle
                //}
                //]
            };
          

            $scope.pulledFromCache = false;

            

            var initlizeModel = function () {
                $scope.riverMapUrl = 'http://waterdata.usgs.gov/nwisweb/graph?agency_cd=USGS&site_no=' + $scope.user.usgsStation + '&parm_cd=00065&period=7';

                //setup trip countdown get milliseconds
                var tdate = new Date($scope.user.tripDate);

                $scope.tripDate = tdate.getTime();

                $scope.now = new Date();
                var searchLocation = '';
                var cacheLastUpdate = '';
                cacheLastUpdate = localStorageService.get(config.CacheTypes.CacheLastUpdate);
                searchLocation = $scope.user.location;

                if (searchLocation) {
                    $scope.search = searchLocation;
                   //if (cacheLastUpdate) {
                   //     //debugger;
                   //     //if ($scope.now.getTime() - new Date(cacheLastUpdate).getTime() >= 20 * 60 * 1000) {
                   //     $scope.pulledFromCache = true;
                   //     $scope.currentConditions = localStorageService.get(config.CacheTypes.CurrentConditions);
                   //     $scope.weather.forecast = localStorageService.get(config.CacheTypes.TenDayForecast);
                   //     $scope.astronomy = localStorageService.get(config.CacheTypes.Astronomy);
                   // } else {
                        getData();
                   // }

                } else {
                    $location.path('/settings');
                }

                $scope.isoKeys = localStorageService.keys();
            };
            //var getAllKeys = function() {
            //    $scope.isoKeys = localStorageService.getKeysForLocalStorage;
            //};

            var getData = function () {
               
                Weather.getWeatherCurrentConditions($scope.search)
                .then(function (data) {
                    $scope.currentConditions = data;
                    $scope.compass = data.wind_dir.toLowerCase();
                    //debugger;
                    localStorageService.add(config.CacheTypes.CurrentConditions, data);
                });

                //get forcast
                Weather.getWeather10DayForecast($scope.search)
                    .then(function (data) {
                        $scope.weather.forecast = data;
                        localStorageService.add(config.CacheTypes.TenDayForecast, data);
                    });

                //get astronomy
                Weather.getAstronomy($scope.search)
                    .then(function (data) {
                        $scope.astronomy = data;
                        localStorageService.add(config.CacheTypes.Astronomy, data);

                    });

                //usgsService.getRiverData('test').then(function (data) {
                //    $scope.usgsData = data;
                //    $scope.siteName = data[0].sourceInfo.siteName;
                //    localStorageService.add(config.CacheTypes.RiverData, data);
                //    //var log = [];
                //    //angular.forEach(data, function (value, key) {
                //    //    alert(key + " :: " + value); // this.push(key + ': ' + value);
                //    //}, log);
                //});
                localStorageService.add(config.CacheTypes.CacheLastUpdate, new Date());
            };

            var updateTime = function () {
                $scope.date.tz = new Date(new Date()
                    .toLocaleString("en-US", { timeZone: $scope.user.timezone }));
                $timeout(updateTime, 1000);
            };




           
            initlizeModel();
            updateTime();
        });