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

'use strict';

angular.module('adf.widget.github', ['adf.provider', 'highcharts-ng'])
  .value('githubApiUrl', 'https://api.github.com/repos/')
  .config(function(dashboardProvider){
    // template object for github widgets
    var widget = {
      templateUrl: '{widgetsPath}/github/src/view.html',
      reload: true,
      resolve: {
        /* @ngInject */
        commits: function(githubService, config){
          if (config.path){
            return githubService.getCommits(config.path);
          }
        }
      },
      edit: {
        templateUrl: '{widgetsPath}/github/src/edit.html'
      }
    };

    // register github template by extending the template object
    dashboardProvider
      .widget('githubHistory', angular.extend({
        title: 'Github History',
        description: 'Display the commit history of a GitHub project as chart',
        controller: 'githubHistoryCtrl'
        }, widget))
      .widget('githubAuthor', angular.extend({
        title: 'Github Author',
        description: 'Displays the commits per author as pie chart',
        controller: 'githubAuthorCtrl'
        }, widget));

  });
