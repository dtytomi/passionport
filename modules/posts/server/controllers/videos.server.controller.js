'use strict';


var _ = require('lodash'),
    path = require('path'),
    mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    Video = mongoose.model('Video'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
   
/**
* Create Video
**/
exports.create = function(req, res) {

  var post = new Post();
  var video = new Video(req.body);

  post.user = req.user;
  
  post.videos.unshift(video);

  post.save(function(err) {
      if (err) {
        return res.send(400, {
          message: errorHandler.getErrorMessage(err)
        });
      } else{
        res.jsonp(video);
      }
  });
};

/**
* Show the current Thought
**/
// exports.read = function(req, res) {
//   res.jsonp(req.video);
// };

/**
* Update Video
**/
exports.update = function(req, res) {
  var post = post,
      video = req.video;

  video = _.extend(video, req.body);

  post.save(function(err) {
    if (err) {
      return res.send(400, {
        message: errorHandler.getErrorMessage(err)
      });
    } else{
      res.jsonp(video);
    }
  });
};

/**
* Delete Video
**/
exports.delete = function(req, res) {
  var post = req.post;

  post.remove(function(err) {
    if (err) {
      return res.send(400, {
        message: errorHandler.getErrorMessage(err)
      });
    } else{
      res.jsonp(post);
    }
  });
};

/*******************************************
*   Idea   Middleware
********************************************/
exports.videoById = function(req, res, next, id) {
  req.video = req.post.videos.id(id);
  next();
};