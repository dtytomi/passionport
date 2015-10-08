'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator',
  function ($scope, $state, $http, $location, $window, Authentication, PasswordValidator) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

    // If user is signed in then redirect back home
    if ($scope.authentication.user) {
      $location.path('/');
    }

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
   };

    $scope.signup = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      console.log("I was called at the front");

      $http.post('/api/auth/signup', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;
        console.log($scope.credentials);
        $scope.$close('closed');
        // And redirect to the previous or home page
        $state.go($state.previous.state.name || 'settings', $state.previous.params);
        // $location.path('/settings');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    $scope.signin = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      $http.post('/api/auth/signin', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;
        $scope.$close('closed');

        // And redirect to the previous or home page
        // $state.go($state.previous.state.name || 'home', $state.previous.params);
        $location.path('/home');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    // OAuth provider request
    $scope.callOauthProvider = function (url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    };
  }
]);
