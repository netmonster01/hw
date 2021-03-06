﻿angular.module('hwApp')
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

            $scope.loading = true;

            var kmlUrl = $scope.user.locationInfo.kmlFilePath +'?rand=' + (new Date()).valueOf();
            var kmlRadar =  $scope.user.locationInfo.kmlRadarFilePath +'?rand=' + (new Date()).valueOf();
            // Options
            $scope.kmlLayerOptions = {
                url: kmlUrl,
            };
            $scope.kmlRadarLayerOptions = {
                url: kmlRadar,
            };
            $scope.weatherOptions = {
                temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT
            };
            $scope.mapOptions = {
                mapTypeId: google.maps.MapTypeId.SATELLITE,
            };

            //Map
            $scope.map = {
                center: {
                    latitude:$scope.user.locationInfo.lat,
                    longitude:$scope.user.locationInfo.lon
                },
                
                zoom: 10,
                showWeather: false,
                showTraffic: false,
                showCloud: false,
                showKml: true,
                showRadarKml: false,
                //clickedMarker: {
                //    title: 'You clicked here',
                //    latitude: null,
                //    longitude: null
                //},
                //events: {
                //    tilesloaded: function (map, eventName, originalEventArgs) {
                //    },
                //    click: function (mapModel, eventName, originalEventArgs) {
                //        // 'this' is the directive's scope
                //        $log.log("user defined event: " + eventName, mapModel, originalEventArgs);

                //        var e = originalEventArgs[0];

                //        if (!$scope.map.clickedMarker) {
                //            $scope.map.clickedMarker = {
                //                title: 'You clicked here',
                //                latitude: e.latLng.lat(),
                //                longitude: e.latLng.lng()
                //            };
                //        }
                //        else {
                //            $scope.map.clickedMarker.latitude = e.latLng.lat();
                //            $scope.map.clickedMarker.longitude = e.latLng.lng();
                //        }

                //        $scope.$apply();
                //    },
                //    dragend: function () {
                //        self = this;
                //        $timeout(function () {
                //            modified = _.map($scope.map.mexiMarkers, function(marker) {
                //                return {
                //                    latitude: marker.latitude + rndAddToLatLon(),
                //                    longitude: marker.longitude + rndAddToLatLon()
                //                };
                //            });
                //            $scope.map.mexiMarkers = modified;
                //        });
                //    }
                //},
                markers: [
                {
                    icon: '../images/hiking.png',
                    latitude: $scope.user.locationInfo.lat,
                    longitude:$scope.user.locationInfo.lon,
                    showWindow: false,
                    title: $scope.user.tripTitle
                }
                ]
            };
          

            $scope.pulledFromCache = false;

            //onMarkerClicked = function (marker) {
            //    marker.showWindow = true;
            //    //window.alert("Marker: lat: " + marker.latitude + ", lon: " + marker.longitude + " clicked!!")
            //};

            //_.each($scope.map.markers, function (marker) {
            //    marker.closeClick = function () {
            //        marker.showWindow = false;
            //        $scope.$apply();
            //    };
            //    marker.onClicked = function () {
            //        onMarkerClicked(marker);
            //    };
            //});

            //_.each($scope.map.markers2, function (marker) {
            //    marker.closeClick = function () {
            //        marker.showWindow = false;
            //        $scope.$apply();
            //    };
            //    marker.onClicked = function () {
            //        onMarkerClicked(marker);
            //    };
            //});


            //$scope.onMarkerClicked = onMarkerClicked;

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
                        $scope.loading = false;
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