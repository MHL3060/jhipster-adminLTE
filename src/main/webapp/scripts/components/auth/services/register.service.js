'use strict';

angular.module('tuxAdminApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


