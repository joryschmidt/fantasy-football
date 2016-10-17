var mongoose = require('mongoose');

var def = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    default: 'DEF',
    required: true
  },
  price: Number,
  stats: {
    pa: Number,
    fr: {
      type: Number,
      default: 0
    },
    td: {
      type: Number,
      default: 0
    },
    int: {
      type: Number,
      default: 0
    },
    saf: {
      type: Number,
      default: 0
    }
  }
});

module.exports = mongoose.model('DEF', def);