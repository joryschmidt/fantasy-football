var mongoose = require('mongoose');

var qb = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  position: {
    type: String,
    default: 'QB',
    required: true
  },
  team: {
    type: String,
    required: true
  },
  injured: Boolean,
  flex: {
    type: Boolean, 
    default: false
  },
  price: Number,
  stats: {
    rushing: {
      touchdowns: {
        type: Number,
        default: 0
      },
      attempts: {
        type: Number,
        default: 0
      },
      yards: {
        type: Number,
        default: 0
      }
    },
    passing: {
      touchdowns: {
        type: Number,
        default: 0
      },
      attempts: {
        type: Number,
        default: 0
      },
      completions: {
        type: Number,
        default: 0
      },
      yards: {
        type: Number,
        default: 0
      }
    },
    fumbles: {
      type: Number,
      default: 0
    },
    sacks: {
      type: Number,
      default: 0
    }
  }
});

module.exports = mongoose.model('QB', qb);