angular.module('hwApp')
    .factory('UserService', function() {
        var defaults = {
            tripTitle: 'ERL Hike 2014',
            location: 'AR/Mena',
            tripDate: '2014-06-08',
            daysToShow: 3,//
            usgsStation: '07360200', //USGS 07360200 Little Missouri River near Langley, AR
            locationInfo: {
                title: 'AR/Mena',
                lon: -93.8765528,
                lat: 34.3749583
            }
        };

        var service = {
            user: {},
            save: function() {
                sessionStorage.presently =
                    angular.toJson(service.user);
            },
            restore: function() {
                service.user =
                    angular.fromJson(sessionStorage.presently) || defaults;

                return service.user;
            }
        };
        service.restore();
        return service;
    });