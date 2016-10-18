var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
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
  weekly_stats: {
    type: Object
  }
});

module.exports = mongoose.model('Player', PlayerSchema);