'use strict';

var myApp = angular.module('myApp',[
  'ngRoute'
]);


/* Services to do shit, abstracted from the controllers */
myApp.factory('checkService', function($http) {
  return {
    getFoos: function() {
      //return the promise directly.
      return $http.get('http://api-wpm.apicasystem.com/v3/Checks?auth_ticket=79E90091-BCBE-4DCA-A30D-6D5D846E41D2')
       .then(function(result) {
            //resolve the promise as the data
            return result.data;
        });
    }
  }
});
myApp.factory('checkDetailService', function($http) {
  return {
    getCheckDetail: function(id) {
      //return the promise directly.
      return $http.get('http://api-wpm.apicasystem.com/v3/Checks/'+id+'?auth_ticket=79E90091-BCBE-4DCA-A30D-6D5D846E41D2')
       .then(function(result) {
            //resolve the promise as the data
            return result.data;
        });
    }
  }
});

/* Routes */
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
      .when('/checks/:param', {
          templateUrl : 'partials/check_details.html',
          controller  : 'checksDetailController'
      })

  });
myApp.controller('mainController',function($scope){
  $scope.controller_name = 'main controller';
  $scope.username = 'Test user';
})
myApp.controller('aboutController',function($scope){
  $scope.controller_name = 'about controller';
})
myApp.controller('checksController',function($scope, checkService){
  $scope.controller_name = 'checks controller';
  checkService.getFoos().then(function(data) {
        $scope.checks = data;
  });
})
myApp.controller('checksDetailController',function($scope, $routeParams, checkDetailService){
  $scope.controller_name = 'checks detail controller';
  checkDetailService.getCheckDetail($routeParams.param).then(function(data) {
        console.log('Solo Check Details');
        console.log(data);
        $scope.check = data;
  });
})
