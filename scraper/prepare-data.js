var fs = require('fs');

var prepareData = function(title, stats) {
  var name = title[0];
  var team = title[1];
  var pos = stats['Position'];
  stats['Player'] = name;
  stats['Team'] = team;
  
  fs.write(pos+'/'+name.replace(/\s/, '_').toLowerCase()+'.json', JSON.stringify(stats));
};

module.exports = prepareData;