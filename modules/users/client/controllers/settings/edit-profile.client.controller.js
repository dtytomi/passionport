'use strict';

angular.module('users').controller('EditProfileController', ['$scope', '$http', '$location', 'Users', 'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;

    $scope.data = {
      passion: null,
      passions: [
        {id: '1', name: 'Art & Craft'},
        {id: '2', name: 'Beauty Artist'},
        {id: '3', name: 'Confectioners'},
        {id: '4', name: 'Entertainers'},
        {id: '5', name: 'Events'},
        {id: '6', name: 'Fashion'},
        {id: '7', name: 'Fabrics'},
        {id: '8', name: 'Graphics Designer'},
        {id: '9', name: 'Gadges & Technology Enthusiasts'},
        {id: '10', name: 'Graphics Designer'},
        {id: '11', name: 'Home Services'},
        {id: '12', name: 'Music'},
        {id: '13', name: 'Photograhpers & Cinematograpers'},
        {id: '14', name: 'Programming & Networking'},
        {id: '15', name: 'Sports'},
        {id: '16', name: 'Writers & Theatre Artists'}
      ],
      
      status: {id: '1', name: 'available'},
      statuslist: [
        {id: '1', name: 'available'},
        {id: '2', name: 'busy'},
        {id: '3', name: 'book'},
        {id: '4', name: 'rent'},
        {id: '5', name: 'hire'},
        {id: '6', name: 'send invitation'},
      ]
   };

    // Update a user profile
    $scope.updateUserProfile = function (isValid) {
      $scope.success = $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      var user = new Users($scope.user);

      user.$update(function (response) {
        $scope.$broadcast('show-errors-reset', 'userForm');

        $scope.success = true;
        Authentication.user = response;
        console.log(response);
        console.log($scope.user);
      }, function (response) {
        $scope.error = response.data.message;
      });
    };
  }
]);
