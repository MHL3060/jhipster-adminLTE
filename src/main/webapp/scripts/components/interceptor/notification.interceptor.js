 'use strict';

angular.module('tuxAdminApp')
    .factory('notificationInterceptor', function ($q, AlertService) {
        return {
            response: function(response) {
                var alertKey = response.headers('X-tuxAdminApp-alert');
                if (angular.isString(alertKey)) {
                    AlertService.success(alertKey, { param : response.headers('X-tuxAdminApp-params')});
                }
                return response;
            }
        };
    });
