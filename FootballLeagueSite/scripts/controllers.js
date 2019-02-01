'use strict';

var app = angular.module('umbracoApp');

app.controller('matchCtrl', function($scope, $rootScope, $http, $q) {
    $scope.showTable = false;
    $scope.selectedLeague = 63;
    var selectedMode = undefined;
    
    var getDate = function(tomorrow = false) {

      var today = new Date();
      var dd = today.getDate();
      if (tomorrow) dd = dd + 1;

      var mm = today.getMonth()+1;
      var yyyy = today.getFullYear();
      if(dd<10) {
        dd='0'+dd;
      }

      if(mm<10) {
        mm='0'+mm;
      }

      today = yyyy + '-' + mm + '-' + dd;
      return today;
    }

    function getWeekDay(firstDay = true) {
        var d = new Date();
        var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
        var monday = new Date(d.setDate(diff));
        var dd = monday.getDate();
        if (!firstDay) dd = dd + 6;

        var mm = monday.getMonth()+1;
        var yyyy = monday.getFullYear();
        if(dd<10) {
        dd='0'+dd;
        }

        if(mm<10) {
        mm='0'+mm;
        }
        return yyyy + '-' + mm + '-' + dd;
    }

    function _getStatistics() {
        return $q(function(resolve, reject) {

            var request = new XMLHttpRequest();
    
            var url = 'https://apifootball.com/api/?action=get_standings' + '&league_id=' + $scope.selectedLeague + '&APIkey=3ce69bda6adcb6ada903df6dbac642171c71c1accf5cb7551c7c75865165534a';
    
            request.open('GET', url, true);
    
            request.send();
    
            request.onload = function () {
                    // Begin accessing JSON data here
                    resolve(JSON.parse(this.response));
            }

      });
    };
    
    $scope.statisticList = [];
    $scope.getStatistics = function(){
        _getStatistics().then(function(response) {
            $scope.statisticList = response;
        });
    }
    
    $scope.getStatistics();

    function getMatchList(startDate, endDate) {
      return $q(function(resolve, reject) {

        var request = new XMLHttpRequest();

        var today = getDate();
        if (startDate === undefined) startDate = today;
        if (endDate === undefined) endDate = today;

        var url = 'https://apifootball.com/api/?action=get_events&from=' + startDate + '&to=' + endDate + '&league_id=' + $scope.selectedLeague + '&APIkey=3ce69bda6adcb6ada903df6dbac642171c71c1accf5cb7551c7c75865165534a';

        request.open('GET', url, true);

        request.send();

        request.onload = function () {
                // Begin accessing JSON data here
                resolve(JSON.parse(this.response));
        }

      });
    }

    function getMonday() {
      var d = new Date();
      var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
      var monday = new Date(d.setDate(diff));
      var dd = monday.getDate();

      var mm = monday.getMonth()+1;
      var yyyy = monday.getFullYear();
      if(dd<10) {
        dd='0'+dd;
      }

      if(mm<10) {
        mm='0'+mm;
      }
      return yyyy + '-' + mm + '-' + dd;
    }
    getMonday();

    var monday = getWeekDay();
    var sunday = '2019-02-03';

    $scope.weekMatches = []
    $scope.getWeekMatchList = function (){
        selectedMode = 'week';
        getMatchList(monday, sunday).then(function(response) {
            if (response.error) $scope.weekMatches = 'empty';
            else $scope.weekMatches = response;
        });
    }
    $scope.getWeekMatchList();

    $scope.todayMatches = undefined;
    $scope.getTodayMatches = function(){
        selectedMode = 'today';
        getMatchList().then(function(response) {
            if (response.error) {
                $scope.todayMatches = 'empty';
            } else {
                $scope.todayMatches = response;
            }
        });
    }
    $scope.tomorrowMatches = undefined;
    $scope.getTomorrowMatches = function(){
        var tommorow = getDate(true);
        selectedMode = 'tomorrow';
        getMatchList(tommorow, tommorow).then(function(response) {
            if (response.error) {
                $scope.tomorrowMatches = 'empty';
            } else {
                $scope.tomorrowMatches = response;
            }
        });
    }
    $scope.refreshMatches = function () {
        if (selectedMode == 'week') $scope.getWeekMatchList();
        else if (selectedMode == 'today') $scope.getTodayMatches();
        else $scope.getTomorrowMatches();
    }

    // Timeout
    function matchTimeout() {
        setTimeout(function () {
            $scope.refreshMatches();
            matchTimeout();
        }, 45000); // 45s
    }
//    matchTimeout();

    // Ligi
    function getLeagueList() {
      return $q(function(resolve, reject) {

        var request = new XMLHttpRequest();

        var url = 'https://apifootball.com/api/?action=get_leagues&country_id=169&APIkey=3ce69bda6adcb6ada903df6dbac642171c71c1accf5cb7551c7c75865165534a';

        request.open('GET', url, true);

        request.send();

        request.onload = function () {
            // Begin accessing JSON data here
            resolve(JSON.parse(this.response));
        }

      });
    }

    $scope.leagueList = []
    $scope.getLeagues = function(){
        getLeagueList().then(function(response){
            $scope.leagueList = response;
        })
    }
    $scope.getLeagues();

});
                