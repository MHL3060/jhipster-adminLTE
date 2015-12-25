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

angular.module('adf.widget.github')
  .controller('githubHistoryCtrl', function($scope, config, commits){

    function parseDate(input) {
      var parts = input.split('-');
      return Date.UTC(parts[0], parts[1]-1, parts[2]);
    }

    var data = {};
    angular.forEach(commits, function(commit){
      var day = commit.commit.author.date;
      day = day.substring(0, day.indexOf('T'));

      if (data[day]){
        data[day]++;
      } else {
        data[day] = 1;
      }
    });

    var seriesData = [];
    angular.forEach(data, function(count, day){
      seriesData.push([parseDate(day), count]);
    });
    seriesData.sort(function(a, b){
      return a[0] - b[0];
    });

    if ( commits ){
      $scope.chartConfig = {
        chart: {
          type: 'spline'
        },
        title: {
          text: 'Github commit history'
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          title: {
            text: 'Commits'
          },
          min: 0
        },
        series: [{
          name: config.path,
          data: seriesData
        }]
      };
    }

  });
