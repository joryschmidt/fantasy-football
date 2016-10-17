var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// STILL NEED KICKER AND DEFENSE
// should still add fields for injury, flex, and price


var Player = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  position: {
    type: String,
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
    receiving_touchdowns: {
      type: Number,
      default: 0
    },
    receiving_yards: {
      type: Number,
      default: 0
    },
    receptions: {
      type: Number,
      default: 0
    },
    targets: {
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
    completions: {
      type: Number,
      default: 0
    },
    pass_attempts: {
      type: Number,
      default: 0
    },
    sacks: {
      type: Number,
      default: 0
    }
  }
});