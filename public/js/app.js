(function() {
  
  angular.module('app', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
      controller: 'homeController',
      controllerAs: 'home',
      templateUrl: 'partials/home.html'
    })
    .otherwise('/');
  }]);
  
})();