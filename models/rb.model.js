var mongoose = require('mongoose');

var rb = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  position: {
    type: String,
    default: 'RB',
    required: true
  },
  team: {
    type: String,
    required: true
  }, 
  injured: Boolean,
  flex: {
    type: Boolean,
    default: true
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
    fumbles: {
      type: Number,
      default: 0
    }
  }
});

module.exports = mongoose.model('RB', rb);