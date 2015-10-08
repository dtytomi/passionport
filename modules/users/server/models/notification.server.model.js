'use strict';


var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NotificationSchema = new Schema({

    title: {
      type: String,
      default: ''
    },

    content: {
      type: String,
      default: ''
    },

    created: {
      type: Date,
      default: Date.now
    }
}); 

mongoose.model('Notification', NotificationSchema);