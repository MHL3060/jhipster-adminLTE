'use strict';

angular.module('myFirstApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('home', {
                parent: 'site',
                url: '/',
                data: {
                    authorities: ['ROLE_USER']
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/main/main.html',
                        controller: 'MainController'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('main');
                        return $translate.refresh();
                    }]
                }
            });
    });


/*


.when('/boards/:id', {
        controller: 'dashboardCtrl',
        controllerAs: 'dashboard',
        templateUrl: 'partials/dashboard.html',
        resolve: {
          data: function($route, storeService){
            return storeService.get($route.current.params.id);
          }
        }
      })
*/