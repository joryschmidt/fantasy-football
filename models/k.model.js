var mongoose = require('mongoose');

var k = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  position: {
    type: String,
    default: 'K',
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
    fg: {
      attempts: {
        type: Number,
        default: 0
      },
      made: {
        type: Number,
        default: 0
      }
    },
    pat: {
      attempts: {
        type: Number, 
        default: 0
      },
      made: {
        type: Number,
        default: 0
      }
    }
  }
});

module.exports = mongoose.model('K', k);