'use strict';

var myApp = angular.module('myApp',[
  'ngRoute'
]);

myApp.config(function($routeProvider) {
  $routeProvider
      // route for the home page
      .when('/', {
          templateUrl : 'partials/home.html',
          controller  : 'mainController'
      })
      .when('/home', {
          templateUrl : 'partials/home.html',
          controller  : 'mainController'
      })
      .when('/about', {
          templateUrl : 'partials/about.html',
          controller  : 'aboutController'
      })
      .when('/checks', {
          templateUrl : 'partials/checks.html',
          controller  : 'checksController'
      })
      .otherwise({
        redirectTo: '/',
        templateUrl: 'partials/home.html',
          controller  : 'mainController'
      });
  });

myApp.controller('mainController',function($scope){
  $scope.controller_name = 'main controller';
})
myApp.controller('aboutController',function($scope){
  $scope.controller_name = 'about controller';
})
myApp.controller('checksController',function($scope){
  $scope.controller_name = 'checks controller';
})
