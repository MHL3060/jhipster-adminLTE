'use strict';

angular.module('myFirstApp')
    .controller('NavbarController', function ($scope, $location, $state, Auth, Principal, ENV) {
        $scope.isAuthenticated = Principal.isAuthenticated;
        $scope.$state = $state;
        $scope.inProduction = ENV === 'prod';
        $scope.showMenu = Principal.isAuthenticated();
        $scope.logout = function () {
            Auth.logout();
            $state.go('home');
        };
    });
