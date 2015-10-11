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
  ])

//Test service for communicating with the test api endpoint
.factory('Ideas', ['$resource',
    function($resource) {
        return $resource('api/posts/:postId/idea/:ideaId', {
            ideaId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

