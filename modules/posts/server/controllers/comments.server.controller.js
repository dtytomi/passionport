'use strict';

var _ = require('lodash'),
    path = require('path'),
    mongoose = require('mongoose'),
    Idea = mongoose.model('Idea'),
    Photo = mongoose.model('Photo'),
    Video = mongoose.model('Video'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/*****************************************
*           Add a Comment
******************************************/
/** Idea comment **/
exports.addIdeaComment = function(req, res) {
  var post = req.post,
      comment = req.body;

  comment.commentBy = req.user;
  post.comments.unshift(comment);

  post.save(function(err){
    if (err) {
      return res.send(400, {
        message: errorHandler.getErrorMessage(err)
      });
    } else{
      res.jsonp(post.comments);
    }
  });
};

/** Photo comment **/
exports.addPhotoComment = function(req, res) {

  var post = req.post,
      comment = req.body;

  comment.commentBy = req.user;
  post.comments.unshift(comment);

  post.save(function(err){
    if (err) {
      return res.send(400, {
        message: errorHandler.getErrorMessage(err)
      });
    } else{
      res.jsonp(post.comments);
    }
  });
};

/** Video comment **/
exports.addVideoComment = function(req, res) {

  var post = req.post,
      comment = req.body;

  comment.commentBy = req.user;
  post.comments.unshift(comment);

  post.save(function(err){
    if (err) {
      return res.send(400, {
        message: errorHandler.getErrorMessage(err)
      });
    } else{
      res.jsonp(post.comments);
    }
  });
};

/************************************************
*     Delete a Comment
*************************************************/
/** Delete Idea Comment **/
exports.deleteIdeaComment = function(req, res) {
  console.log('I was called');
  var post = req.post;

  post.comments.id(req.params.commentIdeaId).remove();
  post.save(function(err){
    if (err) {
      return res.send(400, {
        message: 'Couldn\'t delete comment'
      });
    } else{
      res.jsonp(post);
    }
  });
};

/** Delete Photo Comment **/
exports.deletePhotoComment = function(req, res) {

  var post = req.post;

  post.comments.id(req.params.commentPhotoId).remove();
  post.save(function(err){
    if (err) {
      return res.send(400, {
        message: 'Couldn\'t delete comment'
      });
    } else{
      res.jsonp(post);
    }
  });
};

/** Delete Video Comment **/
exports.deleteVideoComment = function(req, res) {

  var post = req.post;

  post.comments.id(req.params.commentVideoId).remove();
  post.save(function(err){
    if (err) {
      return res.send(400, {
        message: 'Couldn\'t delete comment'
      });
    } else{
      res.jsonp(post);
    }
  });
};

/************************************************
* Comment middleware
*************************************************/
exports.commentIdeaById = function(req, res, next, id) {
  req.comment = req.post.comments.id(id);
  next();
};

exports.commentPhotoById = function(req, res, next, id) {
  req.comment = req.post.comments.id(id);
  next();
};

exports.commentVideoById = function(req, res, next, id) {
  req.comment = req.post.comments.id(id);
  next();
};

/********************************************
* comment authourization middleware
*********************************************/
exports.hasAuthourization = function(req, res, next) {
  if (req.comment.commentBy._id.toString() !== req.user.id) {
    return res.send(400, {
      message: 'You are not authourized'
    });
  }
  next();
};