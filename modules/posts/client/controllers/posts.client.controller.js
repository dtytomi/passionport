  'use strict';
  /*jshint loopfunc: true */

angular.module('posts')
  .controller('PostsController', ['$scope', '$stateParams', 'Upload', '$state', '$location', '$timeout', 'Authentication', 'Posts', 'Passion', 'Ideas', 'Pictures',
    function( $scope, $stateParams, Upload, $state, $location, $timeout, Authentication, Posts, Passion, Ideas, Pictures ){
        $scope.authentication = Authentication;
        
        //Tab Control
        $scope.disabled = true;
        
        $scope.tabs = [
          { title:'Idea', url: 'one.tpl.html'},
          { title:'Upload Image', url: 'two.tpl.html'},
        ];

        $scope.currentTab = 'one.tpl.html';

        $scope.onClick = function (tab) {
            $scope.currentTab = tab.url;
        };

        //Create Idea
        $scope.createIdea = function(isValid){
          $scope.error = null;

          if (!isValid) {
            $scope.$broadcast('show-errors-check-validity', 'ideaForm');

            return false;
          }

          // Create new Idea object
          var idea = new Ideas({
            idea: this.content
          });

          // Redirect after save
          idea.$save(function (response) {
            //Redirecting After save
            if ($state.$current.name === 'usersByPassion') {
              $location.path('/home');
            }
          }, function (errorResponse) {
            $scope.error = errorResponse.data.message;
          });
          // Clear form fields
          this.content = ' ';
        };

        // Upload Image
        
        $scope.uploadPicture = function(files){
                    
          var policy = 'ewogICJleHBpcmF0aW9uIjogIjIwMjAtMDEtMDFUMDA6MDA6MDBaIiwKICAiY29uZGl0aW9ucyI6IFsKICAgIHsiYnVja2V0IjogImVidXRlLWVyby1wb3N0cyJ9LAogICAgWyJzdGFydHMtd2l0aCIsICIka2V5IiwgIiJdLAogICAgeyJhY2wiOiAicHJpdmF0ZSJ9LAogICAgWyJzdGFydHMtd2l0aCIsICIkQ29udGVudC1UeXBlIiwgIiJdLAogICAgWyJzdGFydHMtd2l0aCIsICIkZmlsZW5hbWUiLCAiIl0sCiAgICBbImNvbnRlbnQtbGVuZ3RoLXJhbmdlIiwgMCwgNTI0Mjg4MDAwXQogIF0KfQ==';
          var signature = 'qJqksH5i0FS56jiMb7MUtsBE8sc=';
          
          $scope.pictureUploaded = [];

          var uploadFile = function (fileIndex) {
            return Upload.upload({
              method: 'POST',
              url: 'https://ebute-ero-posts.s3-us-west-2.amazonaws.com/',
              data: {
                key: files[fileIndex].name,
                AWSAccessKeyId: 'AKIAIFVTWMAR4LCGYFSQ',
                acl: 'private', // sets the access to the uploaded file in the bucket: private, public-read, ...
                policy: policy, // base64-encoded json policy (see article below)
                signature: signature, // base64-encoded signature based on policy string (see article below)
                'Content-Type': files[fileIndex].type !== '' ? files[fileIndex].type : 'application/octet-stream', // content type of the file (NotEmpty)
                filename: files[fileIndex].name
              },
              file: files[fileIndex]
            })
            .then(function (newFileStructure) {
              if (files.length > fileIndex + 1) {
                  var imageUrl = 'https://ebute-ero-profilepics.s3-us-west-2.amazonaws.com/' + files[fileIndex].name;
                  console.log(imageUrl);
                  $scope.pictureUploaded.push(imageUrl);
                return uploadFile(fileIndex + 1);
              } else {
                return true;
              }
            })
            .catch(function (error) {
              console.log('Error Uploading File: ', error);
            });
        };

        uploadFile(0)
         .then(function () {
            $scope.disabled = false;
            console.log('All Files Uploaded');
         });
      
       }; 

        //Post Picture images to the backend
        $scope.postPicture = function(){
          var pictures = new Pictures({
                caption: this.caption,
                imageUrl: $scope.pictureUploaded
              });

          pictures.$save(function (response) {
            //Redirecting After save
            if ($state.$current.name === 'usersByPassion') {
              $location.path('/home');
            }
          }, function (errorResponse) {
            $scope.error = errorResponse.data.message;
          });
          // Clear form fields
          this.caption = ' ';
        };

        // Find Posts
        $scope.find = function() {
           $scope.posts = Posts.query();
        };

        // Find Post based on passion
        $scope.findPassion = function(){
          $scope.posts = Passion.query({passion: $stateParams.passion});
        };

        // Find existing Post
        $scope.findOne = function () {
          $scope.post = Posts.get({
            postId: $stateParams.postId
          });
        };

    }
  ]);