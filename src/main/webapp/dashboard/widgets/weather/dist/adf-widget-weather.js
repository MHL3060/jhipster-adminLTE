(function(window, undefined) {'use strict';
/*
 * The MIT License
 *
 * Copyright (c) 2015, Sebastian Sdorra
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */



angular.module('adf.widget.weather', ['adf.provider'])
  .value('weatherApiKey', '2decdac859755da9d25281b20f0dc7a1')
  .value('weatherServiceUrl', 'http://api.openweathermap.org/data/2.5/weather?units=metric&callback=JSON_CALLBACK&q=')
  .config(["dashboardProvider", function(dashboardProvider){
    dashboardProvider
      .widget('weather', {
        title: 'Weather',
        description: 'Display the current temperature of a city',
        templateUrl: '{widgetsPath}/weather/src/view.html',
        controller: 'weatherCtrl',
        reload: true,
        resolve: {
          data: ["weatcherService", "config", function(weatcherService, config){
            if (config.location){
              return weatcherService.get(config.location);
            }
          }]
        },
        edit: {
          templateUrl: '{widgetsPath}/weather/src/edit.html'
        }
      });
  }])
  .service('weatcherService', ["$q", "$http", "weatherServiceUrl", "weatherApiKey", function($q, $http, weatherServiceUrl, weatherApiKey){
    return {
      get: function(location){
        var deferred = $q.defer();
        var url = weatherServiceUrl + location + '&appid=' + weatherApiKey;
        $http.jsonp(url)
          .success(function(data){
            if (data && data.cod === 200){
              deferred.resolve(data);
            } else {
              deferred.reject();
            }
          })
          .error(function(){
            deferred.reject();
          });
        return deferred.promise;
      }
    };
  }])
  .controller('weatherCtrl', ["$scope", "data", function($scope, data){
    $scope.data = data;
  }]);

angular.module("adf.widget.weather").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/weather/src/edit.html","<form role=form><div class=form-group><label for=location>Location</label> <input type=location class=form-control id=location ng-model=config.location placeholder=\"Enter location\"></div></form>");
$templateCache.put("{widgetsPath}/weather/src/view.html","<div class=text-center><div class=\"alert alert-info\" ng-if=!data>Please insert a location in the widget configuration</div><div class=weather ng-if=data><h4>{{data.name}} ({{data.sys.country}})</h4><dl><dt>Temperature:</dt><dd>{{data.main.temp | number:2}}</dd></dl></div></div>");}]);})(window);