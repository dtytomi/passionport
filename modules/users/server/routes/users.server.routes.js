'use strict';

module.exports = function (app) {
  // User Routes
  var users = require('../controllers/users.server.controller');

  // Setting up the users profile api
  app.route('/api/users/me').get(users.me);
  app.route('/api/users').put(users.update);
  app.route('/api/users/accounts').delete(users.removeOAuthProvider);
  app.route('/api/users/password').post(users.changePassword);
  app.route('/api/users/picture').post(users.changeProfilePicture);

  //followers and following
  app.route('/api/users/followers/:userId')
     .get(users.listFollowers)  
     .post( users.signin, users.followers );

  app.route('/api/users/following/:userId')
     .get(users.listFollowing)  
     .post( users.signin, users.following );

  // Finish by binding the user middleware
  app.param('userId', users.userByID);
};
