'use strict';

angular.module('posts').factory('Posts', ['$resource',
    function($resource) {
      return $resource('api/posts/:postId', { 
        postId : '@id' 
      },  {
         update : {
          method: 'PUT'
         }
      });
    }
  ]);