var mongoose = require('mongoose');

var te = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  position: {
    type: String,
    default: 'TE',
    required: true
  },
  team: {
    type: String,
    required: true
  }, 
  injured: Boolean,
  flex: Boolean,
  price: Number,
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
    }
  }
});

module.exports = mongoose.model('TE', te);