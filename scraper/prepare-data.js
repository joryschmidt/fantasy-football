var fs = require('fs');

var prepareData = function(title, stats, pos) {
  var name = title[0];
  var team = title[1];
  stats['Player'] = name;
  stats['Team'] = team;
  stats['Position'] = pos;
  
  fs.write(pos+'/'+name.replace(/\s/, '_').toLowerCase()+'.json', JSON.stringify(stats));
};

module.exports = prepareData;