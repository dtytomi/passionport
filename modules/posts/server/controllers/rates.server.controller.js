'use strict';

var    _ = require('lodash'),
      path = require('path'),
      mongoose = require('mongoose'),
      Post = mongoose.model('Post'),
      Idea = mongoose.model('Idea'),
      Photo = mongoose.model('Photo'),
      Video = mongoose.model('Video'),
      errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/*****************************************
*  Add Rate 
*******************************************/
/**** Idea Rate ***/
exports.addIdeaRate = function ( req, res ) {
  // body...
  var post = req.post,
      rate = req.body,
      hasRated = false;

  rate.ratedBy = req.user;

  if (req.user.id === post.user._id.toString()) {
      return res.send(400, {
        message: 'You cannot Rate your own  post'
      });
  } else{  console.log(post.ratings);
          for (var i = 0; i < post.ratings.length; i++) {
            if(req.user.id === post.ratings[i].ratedBy.toString())
              hasRated = true;
            break;
          }
          if (!hasRated) {
              post.ratings.unshift(rate);  

              post.save(function(err, post) {
                if (err) {
                  return res.send(400, {
                    message: errorHandler.getErrorMessage(err)
                  });
                } else{
                  res.jsonp(post.ratings);
                }
              });        
          } else if (hasRated) {
                  if (req.user.id === post.ratings[i].ratedBy.toString()) 
                        post.ratings[i].rate = req.body;

                  post.save(function(err, post) {
                    if (err) {
                      return res.send(400, {
                        message: errorHandler.getErrorMessage(err)
                      });
                    } else{
                      res.jsonp(post.ratings);
                    }
                  }); 
          }
  }

};

/**** Photo Rate ***/
exports.addPhotoRate = function ( req, res ) {
  // body...
  var post = req.post,
      rate = req.body,
      hasRated = false;

  rate.ratedBy = req.user;

  if (req.user.id === post.user._id.toString()) {
    return res.send(400, {
      message: 'You cannot Rate your own  post'
    });
  } else{ 
          for (var i = 0; i < post.ratings.length; i++) {
            if(req.user.id === post.ratings[i].ratedBy.toString())
              hasRated = true;
            break;
          }
          if (!hasRated) {
              post.ratings.unshift(rate);  

              post.save(function(err, post) {
                if (err) {
                  return res.send(400, {
                    message: errorHandler.getErrorMessage(err)
                  });
                } else{
                  res.jsonp(post.ratings);
                }
              });        
          } else if (hasRated) {
                  if (req.user.id === post.ratings[i].ratedBy.toString()) 
                        post.ratings[i].rate = req.body;

                  post.save(function(err, post) {
                    if (err) {
                      return res.send(400, {
                        message: errorHandler.getErrorMessage(err)
                      });
                    } else{
                      res.jsonp(post.ratings);
                    }
                  }); 
          }
  }
};

/**** Video Rate ***/
exports.addVideoRate = function ( req, res ) {
  // body...
  var post = req.post,
      rate = req.body,
      hasRated = false;

  rate.ratedBy = req.user;
  if (req.user.id === post.user._id.toString()) {
    return res.send(400, {
      message: 'You cannot Rate your own  post'
    });
  } else{ 
          for (var i = 0; i < post.ratings.length; i++) {
            if(req.user.id === post.ratings[i].ratedBy.toString())
              hasRated = true;
            break;
          }
          if (!hasRated) {
              post.ratings.unshift(rate);  

              post.save(function(err, post) {
                if (err) {
                  return res.send(400, {
                    message: errorHandler.getErrorMessage(err)
                  });
                } else{
                  res.jsonp(post.ratings);
                }
              });        
          } else if (hasRated) {
                  if (req.user.id === post.ratings[i].ratedBy.toString()) 
                        post.ratings[i].rate = req.body;

                  post.save(function(err, post) {
                    if (err) {
                      return res.send(400, {
                        message: errorHandler.getErrorMessage(err)
                      });
                    } else{
                      res.jsonp(post.ratings);
                    }
                  }); 
          }
  }
};

/******************************************
*   Average Rating
*******************************************/
exports.avgRating = function(req, res) {
  var post = req.post,
      totalRate = 0,
      totalRatedBy = 0;

  for (var i = 0; i < post.ratings.length; i++) {
      totalRate = totalRate + post.ratings[i].rate;
  }
  console.log(totalRate);
  console.log(post.ratings);

  totalRatedBy = post.ratings.length;

  post.avgRatings = totalRate / totalRatedBy;

  post.save(function(err, post) {
    if (err) {
      return res.send(400, {
        message: errorHandler.getErrorMessage(err)
      });
    } else{
      res.jsonp(post.avgRatings);
    }
  });

};
/*******************************************
*   RAte Middleware
********************************************/
exports.rateIdeaById = function(req, res, next, id) {
  req.rate = req.post.ratings.id(id);
  next();
};

exports.ratePhotoById = function(req, res, next, id) {
  req.rate = req.post.ratings.id(id);
  next();
};

exports.rateVideoById = function(req, res, next, id) {
  req.rate = req.post.ratings.id(id);
  next();
};