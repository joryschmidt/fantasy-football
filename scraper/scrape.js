var parseStats = require('./parse-stats');
var prepareData = require('./prepare-data');
var players = require('./player_links.js');

        players = players.slice(75, 90);

var fs = require('fs');

var casper = require('casper').create({
  verbose: true,
  logLevel: 'info',
  pageSettings: {
    userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:55.0) Gecko/20100101 Firefox/55.0'
    // Bot identifying user agent is Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4
  }
});

var unretrieved_players = [];
var active_players = {};

casper.start();

  // We have to check player type, and then the year of stats shown. 
casper.then(function goToPlayerPages() {
  casper.each(players, function openPlayerStatsPage(self, link) {
    self.thenOpen(link, function getPlayerStats() {
      this.waitForSelector('#Main', function() {
        var title = this.getTitle().match(/([\w\s\-.]+)\|/g);
        var name = title[0].replace(/\|/, '').trim();
        var team = title[1].replace(/\|/, '').trim();
        var stats = this.evaluate(parseStats);
        if (stats) {
          // Write data to file under position folder and firstName_lastName.json
          prepareData(name, team, stats);
          active_players[name] = link;
          this.echo(name + ' saved', 'GREEN_BAR');
        } else {
          this.echo(name + ' has no stats', 'RED_BAR');
        }
      }, function timeOut(){
        unretrieved_players.push(link);
      });
    });
  });
});

casper.run(function() {
  this.echo('Casper Done', 'INFO');
  this.exit();
  require('utils').dump(unretrieved_players);
  fs.write('active_players.js', 'module.exports = ' + JSON.stringify(active_players));
  fs.write('unretrieved_players.js', unretrieved_players);
});
