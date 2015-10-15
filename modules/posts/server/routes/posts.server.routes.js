'use strict';

var postsPolicy = require('../policies/posts.server.policy'),
    comments = require('../controllers/comments.server.controller'),
    ideas = require('../controllers/ideas.server.controller'),
    photos = require('../controllers/photos.server.controller'),
    posts = require('../controllers/posts.server.controller'),
    rates = require('../controllers/rates.server.controller'),
    videos = require('../controllers/videos.server.controller');

module.exports = function(app) {

/************************************************
      Ideas Route
*************************************************/

  app.route('/api/posts/idea').all(postsPolicy.isAllowed)
      // .get(ideas.list)
      .post(ideas.create);

  app.route('/api/posts/:postId/idea/:ideaId').all(postsPolicy.isAllowed)
      // .get(ideas.read)
      .put(ideas.update)
      .delete(ideas.delete);

  app.route('/api/posts/:postId/comment').all(postsPolicy.isAllowed)
      .post(comments.addIdeaComment);

  app.route('/api/posts/:postId/comment/:commentIdeaId').all(postsPolicy.isAllowed)
      .delete(comments.deleteIdeaComment);

  app.route('/api/posts/:postId/rate').all(postsPolicy.isAllowed)
      .get(rates.avgRating)
      .post(rates.addIdeaRate);

  // app.route('/posts/:postId/rate/:rateIdeaId')

/*************************************************
      Photo's Route
**************************************************/

   app.route('/api/posts/photo').all(postsPolicy.isAllowed)
      // .get(photos.list)
      .post(photos.create);

  app.route('/api/posts/:postId/photo/:photoId').all(postsPolicy.isAllowed)
      // .get(photos.read)
      .put(photos.update)
      .delete(photos.delete);

  app.route('/api/posts/:postId/comment').all(postsPolicy.isAllowed)
      .post(comments.addPhotoComment);

  app.route('/api/posts/:postId/comment/:commentPhotoId').all(postsPolicy.isAllowed)
      .delete(comments.deletePhotoComment);

  app.route('/api/posts/:postId/rate').all(postsPolicy.isAllowed)
      .get(rates.avgRating)
      .post(rates.addPhotoRate);

  // app.route('/posts/:postId/rate/:ratePhotoId')
      

/***********************************************
    Video Route
***********************************************/

 app.route('/api/posts/video').all(postsPolicy.isAllowed)
      // .get(videos.list)
      .post(videos.create);

  app.route('/api/posts/:postId/video/:videoId').all(postsPolicy.isAllowed)
      // .get(videos.read)
      .put(videos.update)
      .delete(videos.delete);

  app.route('/api/posts/:postId/comment').all(postsPolicy.isAllowed)
      .post(comments.addVideoComment);

  app.route('/api/posts/:postId/comment/:commentVideoId').all(postsPolicy.isAllowed)
      .delete(comments.deleteVideoComment);

  app.route('/api/posts/:postId/rate').all(postsPolicy.isAllowed)
      .get(rates.avgRating)
      .post(rates.addVideoRate);

  // app.route('/posts/:postId/rate/:rateVideoId');
      

  /*********************************************
    List Posts Based on Passion and Intrests
  **********************************************/
  app.route('/api/posts').all(postsPolicy.isAllowed)
     .get(posts.list);

  app.route('/api/users/posts/:passion')
     .get(posts.listPost);

  // app.route('/:skill/:areaOfSpecialization')
  //    .get(posts.listSpecialities);

  /*********************************************
    List Posts Based on User
  **********************************************/
  // app.route('/user')
  //    .get(posts.userList);   

  /********************************************
    Finish By Binding Middleware
  *********************************************/
  app.param('ideaId', ideas.ideaById);
  app.param('photoId', photos.photoById);
  app.param('videoId', videos.videoById);

  app.param('postId', posts.postById);

  app.param('rateIdeaId', rates.rateIdeaById);
  app.param('ratePhotoId', rates.ratePhotoById);
  app.param('rateVideoId', rates.rateVideoById);

  app.param('commentVideoId', comments.commentVideoById);
  app.param('commentPhotoId', comments.commentPhotoById);
  app.param('commentIdeaId', comments.commentIdeaById);

};