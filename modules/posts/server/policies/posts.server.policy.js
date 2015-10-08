'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Posts Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/posts',
      permissions: '*'
    }, {
      resources: '/api/posts/:postId',
      permissions: '*'
    }, {
      resources: '/api/posts/idea',
      permissions: '*'
    }, {
      resources: '/api/posts/photo',
      permissions: '*'
    }, {
      resources: '/api/posts/video',
      permissions: '*'
    }, {
      resources: '/api/posts/:postId/idea/:ideaId',
      permissions: '*'
    }, {
      resources: '/api/posts/:postId/photo/:photoId',
      permissions: '*'
    }, {
      resources: '/api/posts/:postId/video/:videoId',
      permissions: '*'
    }, {
      resources: '/api/posts/:postId/comment',
      permissions: '*'
    }, {
      resources: '/posts/:postId/comment/:commentPhotoId',
      permissions: '*'
    }, {
      resources: '/posts/:postId/rate',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/posts',
      permissions: ['get', 'post']
    }, {
      resources: '/api/posts/:postId',
      permissions: ['get']
    }, {
      resources: '/api/posts/idea',
      permissions: ['get', 'post']
    }, {
      resources: '/api/posts/photo',
      permissions: ['get', 'post']
    }, {
      resources: '/api/posts/video',
      permissions: ['get', 'post']
    }, {
      resources: '/api/posts/:postId/idea/:ideaId',
      permissions: ['get']
    }, {
      resources: '/api/posts/:postId/photo/:photoId',
      permissions: ['get']
    }, {
      resources: '/api/posts/:postId/video/:videoId',
      permissions: ['get']
    }, {
      resources: '/api/posts/:postId/comment',
      permissions: ['get', 'post']
    }, {
      resources: '/posts/:postId/comment/:commentPhotoId',
      permissions: ['get']
    }, {
      resources: '/posts/:postId/rate',
      permissions: ['get', 'post']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/posts',
      permissions: ['get']
    }, {
      resources: '/api/posts/:postId',
      permissions: ['get']
    }, {
      resources: '/api/posts/idea',
      permissions: ['get']
    }, {
      resources: '/api/posts/photo',
      permissions: ['get']
    }, {
      resources: '/api/posts/video',
      permissions: ['get']
    }, {
      resources: '/api/posts/:postId/idea/:ideaId',
      permissions: ['get']
    }, {
      resources: '/api/posts/:postId/photo/:photoId',
      permissions: ['get']
    }, {
      resources: '/api/posts/:postId/video/:videoId',
      permissions: ['get']
    }, {
      resources: '/api/posts/:postId/comment',
      permissions: ['get']
    }, {
      resources: '/posts/:postId/comment/:commentPhotoId',
      permissions: ['get']
    }, {
      resources: '/posts/:postId/rate',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Posts Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an post is being processed and the current user created it then allow any manipulation
  if (req.post && req.user && req.post.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred.
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
