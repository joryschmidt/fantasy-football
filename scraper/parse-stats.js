var parseStats = function() {
  
  // First check if they have stats at all and if they have stats for this year
  var table = document.querySelector('.ys-graph-stats table');
  if (!table) return null; 

  var year = document.querySelector('.ys-graph-stats select').textContent.slice(0,4);
  if (year != "2017") return null;

  // Add position to statsObj
  var total_stats_obj = {};
  var pos = document.querySelector('.ys-player-header .Row').textContent.match(/\b[^\d\W]{2}\b/)[0];
  total_stats_obj['Position'] = pos;
  
  
  var stat_cats = table.children[0]; // table head
  
  // Make an array that provides the names of each stat
  var stat_specs = stat_cats.children[1];
  var stat_specs_arr = [];
  for (var i=0; i<stat_specs.children.length; i++) {
    stat_specs_arr.push(stat_specs.children[i].title);
  }
  
  var games = table.children[1]; // table body
  
  // Loop through every game week and create stats for that week attributed to the date
  for (var i = 0; i < games.children.length; i++) {
    var game = games.children[i].children;
    var statsObj = {};
    for (var j = 0; j < game.length; j++) {
      var stat_value = game[j].textContent;
      statsObj[stat_specs_arr[j]] = stat_value;
    }
    total_stats_obj[statsObj['Date']] = statsObj;
  }
  
  return total_stats_obj;
};

module.exports = parseStats;
