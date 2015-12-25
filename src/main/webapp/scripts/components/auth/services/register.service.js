'use strict';

angular.module('myFirstApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


