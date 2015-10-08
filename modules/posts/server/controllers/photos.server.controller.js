'use strict';


var  _ = require('lodash'),
    path = require('path'),
    mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    Photo = mongoose.model('Photo'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Create Photo
**/
exports.create = function(req, res) {

  var post = new Post();
  var photo = new Photo(req.body);

  post.user = req.user;
  
  post.photos.unshift(photo);

  post.save(function(err) {
      if (err) {
        return res.send(400, {
          message: errorHandler.getErrorMessage(err)
        });
      } else{
        res.jsonp(photo);
      }
  });
};

/**
* Show the current Photo
**/
// exports.read = function(req, res) {
//   res.jsonp(req.photo);
// };

/**
* Update Photo
**/
exports.update = function(req, res) {
  var post = req.post,
      photo = req.photo;

  photo = _.extend(photo, req.body);

  post.save(function(err) {
    if (err) {
      return res.send(400, {
        message: errorHandler.getErrorMessage(err)
      });
    } else{
        res.jsonp(photo);
    }
  });
};

/**
* Delete photo
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
*   Photo   Middleware
********************************************/

exports.photoById = function(req, res, next, id) {
  req.photo = req.post.photos.id(id);
  next();
};