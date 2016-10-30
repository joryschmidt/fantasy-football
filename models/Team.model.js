var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  players: [{type: Schema.ObjectId}],
  defense: {type: Schema.ObjectId, ref: 'DEF' }
});

module.exports = mongoose.model('Team', TeamSchema);