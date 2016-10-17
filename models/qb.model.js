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
  stats: {
    rushing_touchdowns: {
      type: Number,
      default: 0
    },
    rushing_attempts: {
      type: Number,
      default: 0
    },
    rushing_yards: {
      type: Number,
      default: 0
    },
    passing_touchdowns: {
      type: Number,
      default: 0
    },
    passing_yards: {
      type: Number,
      default: 0
    },
    fumbles: {
      type: Number,
      default: 0
    },
    fumbles_lost: {
      type: Number,
      default: 0
    },
    pass_attempts: {
      type: Number,
      default: 0
    },
    completions: {
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