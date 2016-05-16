'use strict';

/* App Module */

var exploreMyWorld = angular.module('exploreMyWorld', [
  'ngRoute'
  
]);

exploreMyWorld.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home/:parentId', {
        templateUrl: 'item-list.html',
        controller: 'ItemsController'
      }).
	  when('/home/detail/:itemId', {
        templateUrl: 'item-detail.html',
        controller: 'ItemDetailController'
      }).
      otherwise({
        redirectTo: '/home/0'
      });
  }]);
