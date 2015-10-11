'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var CommentSchema = new Schema({

    commentBy: {
      type: Schema.ObjectId,
       ref: 'User' 
    },

    comment: {
      type: String,
      default: ''
    },

    commentDate: {
      type: Date,
      default: Date.now
    }
});

var RatingSchema = new Schema({

    ratedBy: {
      type: Schema.ObjectId,
      ref: 'User'
    }, 

    rate: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    }
});

var IdeaSchema = new Schema({

    created: {
      type: Date,
      default: Date.now 
    },

    idea: {
      type: String,
      default: '',
    },
});

var PhotoSchema = new Schema({

    created: {
      type: Date,
      default: Date.now
    },

    ImageUrl: {
      type: String,
      default: ''
    },
});

var VideoSchema = new Schema({

    created: {
      type: Date,
      default: Date.now
    },

    videoUrl: {
      type: String,
      default: ''
    },

});

var PostSchema = new Schema({

  ideas: [IdeaSchema],

  photos: [PhotoSchema],

  videos: [VideoSchema],

  comments: [CommentSchema],

  ratings: [RatingSchema],

  avgRatings: {
    type: Number,
    default: 0
  },

  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  
  created: {
    type: Date,
    default: Date.now
  }

});

PostSchema.pre('save', function(next) {
  // body...
  if (this.ideas.length === 0) {
      this.ideas = undefined;
  }
  if (this.photos.length === 0) {
      this.photos = undefined;
  }
  if (this.videos.length === 0) {
      this.videos = undefined;
  }
  next();
});

mongoose.model( 'Idea' ,IdeaSchema);
mongoose.model( 'Photo', PhotoSchema );
mongoose.model( 'Video', VideoSchema );
mongoose.model( 'Post', PostSchema );