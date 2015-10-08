'use strict';

angular.module('posts').config(['$stateProvider',
  function($stateProvider ){

   //Posts State Routing
   $stateProvider.
    state('listPost', {
      url: '/posts/findByPassion/:passion',
      templateUrl: 'modules/posts/views/posts.client.view.html'
    }).
    state('userHome', {
      url: '/home',
      templateUrl: 'modules/posts/client/views/posts.client.view.html'
    });
  }
]);