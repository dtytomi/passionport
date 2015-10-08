'use strict';

angular.module('posts')
  .controller('PostsController', ['$scope', '$stateParams', '$state', '$location', 'Authentication', 'Posts',
    function( $scope, $stateParams, $state, $location, Authentication, Posts ){
        $scope.authentication = Authentication;

        $scope.tabs = [
          { title:'Ideas', url: 'one.tpl.html'},
          { title:'Upload Image', url: 'two.tpl.html'},
          { title:'video', url: 'three.tpl.html' }
        ];

        $scope.currentTab = 'one.tpl.html';

        $scope.onClick = function (tab) {
            $scope.currentTab = tab.url;
        };
    }
  ]);