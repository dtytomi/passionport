'use strict';

var _ = require('lodash'),
    path = require('path'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Post = mongoose.model('Post'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.list = function(req, res) {
  Post.find().sort('-created').populate('user', 'displayName').exec(function(err, posts){
    if (err) {
      return res.status(400).send({
        message: 'Post were not saved'
      });
    } else{
        res.jsonp(posts);
    }
  });
};

/**
* List Users by Passion.
**/
exports.listPassion = function(req, res) {
  User.find({passion: req.params.passion}, {_id: 1}, function(err, docs){
    console.log('Docs:', docs);
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else{
          var ids = docs.map(function(doc){
              return doc._id;
          });
          Post.find({user: {$in: ids}}).sort('-created').populate('user', 'displayName status profileImageURL ').exec(function(err, posts) {
            if (err) {
              return res.status(400, {
                message: errorHandler.getErrorMessage(err)
              });
            } else{
              res.jsonp(posts);
            }
          });
    }
  });
}; 

exports.search = function(req, res){

};

exports.postById = function(req, res, next, id) {
  Post.findById(id).populate('user', 'displayName').populate('comments.commentBy', 'displayName').exec(function(err, post){
    if (err) return next(err);
    if (!post) return next(new Error('Failed to load Idea' + id));
    req.post = post;
    next();
  });
};