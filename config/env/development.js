'use strict';

var defaultEnvConfig = require('./default'),
    sendgrid  = require('sendgrid');

module.exports = {
  db: {
    uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/passionport-dev',
    options: {
      user: '',
      pass: ''
    },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  },
  log: {
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: 'dev',
    // Stream defaults to process.stdout
    // Uncomment to enable logging to a log on the file system
    options: {
      //stream: 'access.log'
    }
  },
  app: {
    title: defaultEnvConfig.app.title + ' - Development Environment'
  },
  facebook: {
    clientID: process.env.FACEBOOK_ID || '1032155876806360',
    clientSecret: process.env.FACEBOOK_SECRET || 'cb6f1729c063303adf079065cfccae6a',
    callbackURL: '/api/auth/facebook/callback'
  },
  twitter: {
    clientID: process.env.TWITTER_KEY || 'g1dtfruJ9oAZo93RBGFlhByDk',
    clientSecret: process.env.TWITTER_SECRET || 'tAWOt8qHCrwJXVQvMM0wYUlo6MId61ukkoZKQEA4GsIiJfNC49',
    callbackURL: '/api/auth/twitter/callback'
  },
  google: {
    clientID: process.env.GOOGLE_ID || '702886656050-nnbtua9d154japhde5b2kq2qrdj7b5p8.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'Aia5Q_zkyIdFcIZVQmCICmPU',
    callbackURL: '/api/auth/google/callback'
  },
  linkedin: {
    clientID: process.env.LINKEDIN_ID || 'APP_ID',
    clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/linkedin/callback'
  },
  github: {
    clientID: process.env.GITHUB_ID || 'APP_ID',
    clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/github/callback'
  },
  paypal: {
    clientID: process.env.PAYPAL_ID || 'CLIENT_ID',
    clientSecret: process.env.PAYPAL_SECRET || 'CLIENT_SECRET',
    callbackURL: '/api/auth/paypal/callback',
    sandbox: true
  },
  mailer: {
    from: process.env.MAILER_FROM || 'MAILER_FROM',
    options: {
      service: process.env.MAILER_SERVICE_PROVIDER || 'sendgrid',
      auth: {
        user: process.env.MAILER_EMAIL_ID || 'dtytomi',
        pass: process.env.MAILER_PASSWORD || 't0m1lola'
      }
    }
  },
  livereload: true,
  seedDB: process.env.MONGO_SEED || false
};
