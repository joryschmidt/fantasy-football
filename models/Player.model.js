var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
  injured: Boolean,
  flex: Boolean,
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
    receiving: {
      touchdowns: {
        type: Number,
        default: 0
      },
      yards: {
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