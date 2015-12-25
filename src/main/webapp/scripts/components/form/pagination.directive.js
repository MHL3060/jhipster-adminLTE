/* globals $ */
'use strict';

angular.module('myFirstApp')
    .directive('myFirstAppPagination', function() {
        return {
            templateUrl: 'scripts/components/form/pagination.html'
        };
    });
