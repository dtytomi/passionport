'use strict';

angular.module('posts')
//Post Services
.factory('Posts', ['$resource',
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

//Passion Service 
.factory('Passion', ['$resource',
  function($resource) {
    return $resource('api/posts/users/:passion', { 
    },  {
       update : {
        method: 'PUT'
       }
    });
  }
])

// Idea Services
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
])

// Picture Services
.factory('Pictures', ['$resource',
    function($resource) {
        return $resource('/api/posts/:postId/photo/:photoId', {
            photoId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);