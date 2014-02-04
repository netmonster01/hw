angular.module('hwApp')
    .provider('usgsService', function () {
        this.getUrl = function(siteNumber) {
            return "http://waterservices.usgs.gov/nwis/iv/?format=json,1.1&site=" + siteNumber;
        };

        this.$get = function($q, $http, $log) {
            var self = this;
            return {
                getRiverData: function(site) {
                    var d = $q.defer();
                    $http.get(self.getUrl('07055660')).
                        success(function (data, status, headers, config) {
                            d.resolve(data.value.timeSeries);
                        }).
                        error(function(err, status, headers, config) {
                            d.reject(err);
                        });
                    return d.promise;
                },
            };
        };
    });