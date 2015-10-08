'use strict';

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var MemberSchema = new Schema({

    memberAdded: {
      type: Date,
      default: Date.now
    },
   
    username: {
      type: String,
      default: '' 
    },

    userUrl: {
      type: String,
      default: ''
    }
});

var AssociationSchema = new Schema({

    associationName: {
      type: String,
      default: ''
    },

    members: [MemberSchema],

    created: {
      type: Date,
      default: Date.now
    }

});

mongoose.model('Association', AssociationSchema);