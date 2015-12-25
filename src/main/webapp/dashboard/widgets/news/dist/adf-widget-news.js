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



angular.module('adf.widget.news', ['adf.provider'])
  .value('newsServiceUrl', 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=JSON_CALLBACK&q=')
  .config(["dashboardProvider", function(dashboardProvider){
    dashboardProvider
      .widget('news', {
        title: 'News',
        description: 'Displays a RSS/Atom feed',
        templateUrl: '{widgetsPath}/news/src/view.html',
        controller: 'newsCtrl',
        resolve: {
          feed: ["newsService", "config", function(newsService, config){
            if (config.url){
              return newsService.get(config.url);
            }
          }]
        },
        edit: {
          templateUrl: '{widgetsPath}/news/src/edit.html'
        }
      });
  }])
  .service('newsService', ["$q", "$http", "newsServiceUrl", function($q, $http, newsServiceUrl){
    return {
      get: function(url){
        var deferred = $q.defer();
        $http.jsonp(newsServiceUrl + encodeURIComponent(url))
          .success(function(data){
            if (data && data.responseData && data.responseData.feed){
              deferred.resolve(data.responseData.feed);
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
  .controller('newsCtrl', ["$scope", "feed", function($scope, feed){
    $scope.feed = feed;
  }]);

angular.module("adf.widget.news").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/news/src/edit.html","<form role=form><div class=form-group><label for=url>Feed url</label> <input type=url class=form-control id=url ng-model=config.url placeholder=\"Enter feed url\"></div></form>");
$templateCache.put("{widgetsPath}/news/src/view.html","<div class=news><div class=\"alert alert-info\" ng-if=!feed>Please insert a feed url in the widget configuration</div><h4><a ng-href={{feed.link}} target=_blank>{{feed.title}}</a></h4><ul><li ng-repeat=\"entry in feed.entries\"><a ng-href={{entry.link}} target=_blank>{{entry.title}}</a></li></ul></div>");}]);})(window);