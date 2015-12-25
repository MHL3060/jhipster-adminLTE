 'use strict';

angular.module('myFirstApp')
    .factory('notificationInterceptor', function ($q, AlertService) {
        return {
            response: function(response) {
                var alertKey = response.headers('X-myFirstApp-alert');
                if (angular.isString(alertKey)) {
                    AlertService.success(alertKey, { param : response.headers('X-myFirstApp-params')});
                }
                return response;
            }
        };
    });
