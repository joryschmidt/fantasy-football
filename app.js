var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

// Connect to the MongoDB database
// var mongoose = require('mongoose');
// var db = "mongodb://" + process.env.IP + "/fantasy";
// mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

var port = process.env.PORT;
app.listen(port, function() {
  console.log('App listening on port ' + port);
});