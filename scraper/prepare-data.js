var fs = require('fs');

var prepareData = function(name, team, stats) {
  var pos = stats['Position'];
  stats['Player'] = name;
  stats['Team'] = team;
  
  fs.write('data/'+pos+'/'+name.replace(/\s/, '_').toLowerCase()+'.json', JSON.stringify(stats));
};

module.exports = prepareData;