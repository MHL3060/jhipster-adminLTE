'use strict';

angular.module('myFirstApp')
    .controller('MainController', ['$scope', 'Principal', 'localStorageService', function ($scope, Principal, localStorageService) {
        Principal.identity().then(function (account) {

            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;

            var name = $scope.account.firstName;
            var model = localStorageService.get(name);
            if (!model) {
                // set default model for demo purposes
                model = {
                    title: name,
                    structure: "4-8",
                    rows: [{
                        columns: [{
                                styleClass: "col-md-8",
                                widgets: [ {
                                        type: "markdown",
                                        config: {
                                            content: "![scm-manager logo](https://bitbucket.org/sdorra/scm-manager/wiki/resources/scm-manager_logo.jpg)\n\nThe easiest way to share and manage your Git, Mercurial and Subversion repositories over http.\n\n* Very easy installation\n* No need to hack configuration files, SCM-Manager is completely configureable from its Web-Interface\n* No Apache and no database installation is required\n* Central user, group and permission management\n* Out of the box support for Git, Mercurial and Subversion\n* Full RESTFul Web Service API (JSON and XML)\n* Rich User Interface\n* Simple Plugin API\n* Useful plugins available ( f.e. Ldap-, ActiveDirectory-, PAM-Authentication)\n* Licensed under the BSD-License"
                                        },
                                        title: "Markdown"
                                    }]
                            }]
                    }]
                };
            }
            $scope.name = name;
            $scope.model = model;
            $scope.collapsible = false;
            $scope.maximizable = false;

            $scope.$on('adfDashboardChanged', function (event, name, model) {
                localStorageService.set(name, model);
            });


        });
    }]);
