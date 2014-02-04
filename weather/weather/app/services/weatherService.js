angular.module('hwApp').provider('Weather', function() {
    var apiKey = "";
    var citySearchUrl = 'http://autocomplete.wunderground.com/aq?query=';

    this.getUrl = function(type, ext) {
        return "http://api.wunderground.com/api/" +
            this.apiKey + "/" + type + "/q/" +
            ext + '.json?callback=JSON_CALLBACK';
    };

    this.getAnimatedRadarImageUrl = function (type, ext) {
        return "http://api.wunderground.com/api/" +
           this.apiKey + "/" + type + "/q/" +
           ext + '.gif?newmaps=1&timelabel=1&timelabel.y=10&num=5&delay=50&callback=JSON_CALLBACK';
    };

    this.getRadarImageUrl = function (type, ext) {
        return "http://api.wunderground.com/api/" +
           this.apiKey + "/" + type + "/q/" +
           ext + '.gif?newmaps=1&width=600&height=480&callback=JSON_CALLBACK';
    };
    this.getSatelliteImageUrl = function (type, ext) {
        return "http://api.wunderground.com/api/" +
           this.apiKey + "/" + type + "/q/" +
           ext + '.gif?newmaps=1&width=600&height=480&callback=JSON_CALLBACK';
    };
    this.setApiKey = function(key) {
        if (key) this.apiKey = key;
    };

    this.$get = function($q, $http, $log) {
        var self = this;
        return {
            getWeatherForecast: function(city) {
                var d = $q.defer();
                $http.jsonp(self.getUrl("forecast", city)).
                    success(function(data, status, headers, config) {
                        d.resolve(data.forecast.simpleforecast);
                    }).
                    error(function(err, status, headers, config) {
                        d.reject(err);
                    });
                return d.promise;
            },
            getWeather10DayForecast: function (city) {
                var d = $q.defer();
                $http.jsonp(self.getUrl("forecast10day", city)).
                    success(function (data, status, headers, config) {
                        d.resolve(data.forecast.simpleforecast);
                    }).
                    error(function (err, status, headers, config) {
                        d.reject(err);
                    });
                return d.promise;
            },
            getWeatherCurrentConditions: function(city) {
                var d = $q.defer();
                $http.jsonp(self.getUrl("conditions", city)).
                    success(function(data, status, headers, config) {
                        d.resolve(data.current_observation);
                    }).
                    error(function(err, status, headers, config) {
                        d.reject(err);
                    });
                return d.promise;
            },
            checkAlerts: function(city) {
                var d = $q.defer();
                $http.jsonp(self.getUrl("alerts", city)).
                    success(function(data, status, headers, config) {
                        d.resolve(data);
                    }).
                    error(function(err, status, headers, config) {
                        $log.error(err);
                        d.reject(err);
                    });
                return d.promise;
            },
            getAstronomy: function (city) {
                var d = $q.defer();
                $http.jsonp(self.getUrl("astronomy", city)).
                    success(function (data, status, headers, config) {
                        d.resolve(data);
                    }).
                    error(function (err, status, headers, config) {
                        $log.error(err);
                        d.reject(err);
                    });
                return d.promise;
            },
            getAnimatedRadarImage: function (city) {
                var d = $q.defer();
                $http.jsonp(self.getAnimatedRadarImage("animatedradar", city)).
                    success(function (data, status, headers, config) {
                        d.resolve(data);
                    }).
                    error(function (err, status, headers, config) {
                        $log.error(err);
                        d.reject(err);
                    });
                return d.promise;
            },
            getRadarImage: function (city) {
                var d = $q.defer();
                $http.jsonp(self.getRadarImage("radar", city)).
                    success(function (data, status, headers, config) {
                        d.resolve(data);
                    }).
                    error(function (err, status, headers, config) {
                        $log.error(err);
                        d.reject(err);
                    });
                return d.promise;
            },
            getSatelliteImage: function (city) {
                var d = $q.defer();
                $http.jsonp(self.getSatelliteImage("satellite", city)).
                    success(function (data, status, headers, config) {
                        d.resolve(data);
                    }).
                    error(function (err, status, headers, config) {
                        $log.error(err);
                        d.reject(err);
                    });
                return d.promise;
            },
            getCityDetails: function(query) {
                var d = $q.defer();
                $http.jsonp(citySearchUrl + query + '&cb=JSON_CALLBACK').
                    success(function(data, status, headers, config) {
                        d.resolve(data.RESULTS);
                    }).
                    error(function(err, status, headers, config) {
                        d.reject(err);
                    });
                return d.promise;
            }
        };
    };
}).config(function (WeatherProvider) {
    WeatherProvider.setApiKey('c4d2f8c644ac9dd7');
});