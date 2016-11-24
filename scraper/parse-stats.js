var parseStats = function() {
  
  // this function determines the unique stat types based on the Yahoo data structure
  var determineStatType = function(classData) {
    var stat_types = {
      opponent: 'Opponent',
      date: 'Date',
      score: 'Score',
      105: 'Passing Yards',
      108: 'Passing Touchdowns',
      203: 'Rushing Yards',
      205: 'Rushing Average',
      206: 'Rushing Long',
      207: 'Rushing Touchdowns',
      303: 'Receiving Yards',
      305: 'Receiving Average',
      306: 'Receiving Long',
      309: 'Receiving Touchdowns'
    };
    for (var type in stat_types) {
      var regex = new RegExp(type);
      if (classData.search(regex) !== -1) return stat_types[type];
    }
    return false;
  };
  
  // this loops through each week and then the stats each week to produce an object for that weeks stats
  var total_stats = {};
  var table = document.querySelector('#mediasportsplayergamelog tbody');
  var games = table.children;
  for (var i=0; i<games.length; i++) {
    var game = games[i].children;
    var statsObj = {};
    for (var j=0; j<game.length; j++) {
      var stat = game[j];
      var stat_type = determineStatType(stat.className);
      if (stat_type) {
        if (stat_type === 'Score') statsObj[stat_type] = stat.children[0].innerHTML;
        else statsObj[stat_type] = stat.innerHTML;
      } else {
        var stat_title = stat.getAttribute('title');
        statsObj[stat_title] = stat.innerHTML;
      }
    }
    total_stats[statsObj['Date']] = statsObj;
  }
  return total_stats;
  
};

module.exports = parseStats;