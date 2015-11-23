'use strict';

angular.module('posts').config(['$stateProvider',
  function($stateProvider ){

   //Posts State Routing
   $stateProvider
   .state('userhome', {
      url: '/home',
      templateUrl: 'modules/posts/client/views/posts.client.view.html'
    });
  }
]);