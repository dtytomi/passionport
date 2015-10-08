'use strict';


var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var  MessageSchema = new Schema({

    message: {
      type: String,
      default: ''
    },

    emailAddress: {
      type: String,
      default: ''
    },

    created: {
      type: Date,
      default: Date.now
    }
});

var SentMessageSchema = new Schema({

    to: {
      type: String,
      default: ''
    },
    message: [MessageSchema]
});

var InboxMessageSchema = new Schema({

    from: {
      type: String,
      default: ''
    },
    message: [MessageSchema]
});

mongoose.model('Message', MessageSchema);
mongoose.model('SentMessage', SentMessageSchema);
mongoose.model('InboxMessage', InboxMessageSchema);