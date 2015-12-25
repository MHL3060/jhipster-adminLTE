/* globals $ */
'use strict';

angular.module('myFirstApp')
    .directive('myFirstAppPager', function() {
        return {
            templateUrl: 'scripts/components/form/pager.html'
        };
    });
