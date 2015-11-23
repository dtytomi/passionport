'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

var multiparty = require('multiparty'),
    AWS = require('aws-sdk');

var formidable = require('formidable');

var bucket = 'ebute-ero-profilepics',
    s3Client = new AWS.S3({params: {Bucket: bucket }});

/**
 * Update user details
 */
exports.update = function (req, res) {
  // Init Variables
  var user = req.user;

  // For security measurement we remove the roles from the req.body object
  delete req.body.roles;

  if (user) {
    // Merge existing user
    user = _.extend(user, req.body);
    user.updated = Date.now();
    user.displayName = user.firstName + ' ' + user.lastName;

    user.save(function (err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        req.login(user, function (err) {
          if (err) {
            res.status(400).send(err);
          } else {
            res.json(user);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }
};

/**
 * Update profile picture
 */
exports.changeProfilePicture = function (req, res) {
  var user = req.user;
  var message = null;

  if (user) {
    
    // Uploading to AWS S3
    var path = req.files.file.path;

    fs.readFile(path, function (uploadError, file_buffer) {
      var params = {
        Key: req.files.file.originalFilename, // here you add you file name
        Body: file_buffer
      };

      s3Client.putObject(params, function (uploadError) {
        if (uploadError) {
          return res.status(400).send({
              message: 'Error occurred while uploading profile picture'
            });
        } else {
          user.profileImageURL = 'https://ebute-ero-profilepic-us-west-2.amazonaws.com/'+req.files.file.originalFilename;

          user.save(function (saveError) {
            if (saveError) {
              return res.status(400).send({
                message: errorHandler.getErrorMessage(saveError)
              });
            } else {
              req.login(user, function (err) {
                if (err) {
                  res.status(400).send(err);
                } else {
                  res.json(user);
                }
              });
            }
          });
        }
      });
    });
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }
};

/**
 * Send User
 */
exports.me = function (req, res) {
  res.json(req.user || null);
};

/**
* Followers
*/
exports.followers = function(req, res) {
      
  var user = req.user;
  var follower = req.body;

  user.followers.unshift(follower);

  user.save(function(err){
      if (err) {
        return res.send(400, {
          message: user.getErrorMessage(err)
        });
      } 
      else{
        res.jsonp(user);
      }
  });
};

exports.listFollowers = function( req, res ) {
      res.jsonp(req.user.followers);
};

/**
* Following
*/
exports.following = function(req, res) {

  var user = req.user;
  var follows = req.body;

  user.following.unshift(follows);

  user.save(function(err){
      if (err) {
          return res.send(400, {
                message: user.getErrorMessage(err)
          });
      } 
      else{
        res.jsonp(user);
      }
  });

};

exports.listFollowing = function( req, res ) {
      res.jsonp(req.user.following);
};