'use strict';

angular.module('posts')
  .controller('PostsController', ['$scope', '$stateParams', '$state', '$location', 'Authentication', 'Posts', 'Ideas',
    function( $scope, $stateParams, $state, $location, Authentication, Posts, Ideas ){
        $scope.authentication = Authentication;

        $scope.tabs = [
          { title:'Idea', url: 'one.tpl.html'},
          { title:'Upload Image', url: 'two.tpl.html'},
        ];

        $scope.currentTab = 'one.tpl.html';

        $scope.onClick = function (tab) {
            $scope.currentTab = tab.url;
        };

        $scope.createIdea = function(isValid){
          $scope.error = null;

          if (!isValid) {
            $scope.$broadcast('show-errors-check-validity', 'articleForm');

            return false;
          }

          // Create new Article object
          var idea = new Ideas({
            idea: this.content
          });

          // Redirect after save
          idea.$save(function (response) {
            // $location.path('articles/' + response._id);
            // Clear form fields
            $scope.content = '';
          }, function (errorResponse) {
            $scope.error = errorResponse.data.message;
          });
        };

         // Find a list of Articles
        $scope.find = function () {
          $scope.posts = Posts.query();
        };

        // Find existing Article
        $scope.findOne = function () {
          $scope.post = Posts.get({
            postId: $stateParams.postId
          });
        };
    }
  ]);