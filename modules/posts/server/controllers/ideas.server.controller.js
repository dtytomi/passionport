'use strict';


var _ = require('lodash'),
    path = require('path'),
    mongoose = require('mongoose'),
    Idea = mongoose.model('Idea'),
    Post = mongoose.model('Post'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Create Idea
**/
exports.create = function(req, res) {

  var post = new Post();
  var idea = new Idea(req.body);

  post.user = req.user;
  
  post.ideas.unshift(idea);

  post.save(function(err) {
      if (err) {
        return res.send(400, {
          message: errorHandler.getErrorMessage(err)
        });
      } else{
        res.jsonp(post);
      }
  });
};

/**
* Show the current Idea
**/
// exports.read = function(req, res) {
//   res.jsonp(req.idea);
// };

/**
* Update Idea
**/
exports.update = function(req, res) {
  var post = req.post,
      idea = req.idea;

  idea = _.extend(idea, req.body);

  post.save(function(err) {
    if (err) {
      return res.send(400, {
        message: errorHandler.getErrorMessage(err)
      });
    } else{
        res.jsonp(idea);
    }
  });
};

/**
* Delete Idea
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

exports.ideaById = function(req, res, next, id) {
  req.idea = req.post.ideas.id(id);
  next();
};