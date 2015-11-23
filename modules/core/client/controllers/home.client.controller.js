'use strict';

angular.module('core').controller('HomeController', ['$scope', '$state', 'Authentication',
  function ($scope, $state, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

   // Passion
    $scope.onSearch = function(name){
      $state.go('usersByPassion', {passion: name});
    };
  }
]);
