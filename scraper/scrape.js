var parseStats = require('./parse-stats');
var fs = require('fs');

var casper = require('casper').create({
  verbose: true,
  logLevel: 'info',
  pageSettings: {
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
  }
});

var url = 'http://sports.yahoo.com/nfl/players';
var links = [];
var ex_links = ['http://sports.yahoo.com/nfl/players/25767', 'http://sports.yahoo.com/nfl/players/25812'];

// var position_link_number = ['31', '32', '33', '34', '44'];
// var position_link = {
//   '31': 'QB',
//   '32': 'RB', 
//   '33': 'WR',
//   '34': 'TE',
//   '44': 'K'
// };

// make an array of the url for each position to loop through

function getLinks(selector) {
  var links = document.querySelectorAll(selector);
  return Array.prototype.map.call(links, function(e) {
    return e.getAttribute('href');
  });
}

casper.start(url);

casper.eachThen(position_link, function(response) {
  var wait_time = Math.random() * 4000 + 4;
  this.waitForSelector('#yom-league-players', function() {
    // this.click('a[data-rapid_p=' + response + ']');
    // this.wait(wait_time);
    // this.thenOpen(response.data, function() {
    //   var title = this.getTitle().match(/\w+\s\w+/g);
    //   var name = title[0];
    //   var team = title[1];
    //   var stats = this.evaluate(parseStats);
    //   stats['Player'] = name;
    //   stats['Team'] = team;
    //   stats['Position'] = 'QB';
    //   fs.write(stats['Position']+'/'+name.replace(/\s/, '_').toLowerCase()+'.json', JSON.stringify(stats));
    // });
  });
});

casper.waitForSelector('#yom-league-players', function() {
  this.click('a[data-rapid_p="31"]');
});

casper.waitForSelector('.ysprow1', function() {
  links = this.evaluate(getLinks, '.ysprow1 a, .ysprow2 a');
});

casper.then(function() {
  links.forEach(function(e, index, arr) {
    arr[index] = 'http://sports.yahoo.com' + e;
  });
  links.forEach(function(e, index, arr) {
    if(e.search(/teams/) != -1) links.splice(index, 1);
  });
});


// casper.start().eachThen(ex_links, function(response) {
//   this.thenOpen(response.data, function() {
//     var title = this.getTitle().match(/\w+\s\w+/g);
//     var name = title[0];
//     var team = title[1];
//     var stats = this.evaluate(parseStats);
//     stats['Player'] = name;
//     stats['Team'] = team;
//     stats['Position'] = 'QB';
//     fs.write('qb/'+name.replace(/\s/, '_').toLowerCase()+'.json', JSON.stringify(stats));
//   });
// });

casper.run(function() {
  this.echo(links.length + ' links found', 'GREEN_BAR');
  this.echo(' - ' + links.join('\n - ')).exit();
  // this.exit();
});
