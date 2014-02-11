angular.module('hwApp').factory('LoadingService', function($rootScope) {
    return {
        loading: function(message) {
            $rootScope.loadingMessage = message;
        },
        loaded: function() {
            $rootScope.loadingMessage = null;
        }
    };
});