var shuffleArray = require('./shuffle-array');
var fs = require('fs');

var casper = require('casper').create({
  verbose: true,
  logLevel: 'debug',
  pageSettings: {
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
  }
});

var links = [];
var team_links = [];

var url = 'https://sports.yahoo.com/nfl/players/';

function getLinks(selector) {
  var links = document.querySelectorAll(selector);
  return Array.prototype.map.call(links, function(e) {
    return e.getAttribute('href');
  });
}


casper.start();

// Get links for all NFL team rosters
casper.open(url).then(function() {
  this.echo(this.getTitle(), 'GREEN_BAR');
  casper.then(function createTeamLinksArray() {
    this.waitForSelector('.ys-players-index', function() {
      team_links = this.evaluate(getLinks, '.ys-players-index div a');
    });
  });
});

// Process team links
casper.then(function processTeamLinks() {
  team_links.forEach(function(e, index, arr) {
    arr[index] = 'https://sports.yahoo.com' + e;
  });
  team_links = shuffleArray(team_links);
});

// Go to team pages and get links for first twenty players on page, should include QB, WR, RB, and TE
casper.then(function goToTeamPages() {
  casper.each(team_links, function openTeamPage(self, link) {
    self.thenOpen(link, function getPlayerLinks() {
      this.waitForSelector('.ys-roster-table', function() {
        var team = this.evaluate(getLinks, '.ys-roster-table table td a');
        team = team.slice(0, 20);
        links = links.concat(team);
      });
    });
  });
});

// Process player links and write them to player_links.js
casper.then(function() { 
  links.forEach(function(e, index, arr) {
    arr[index] = 'https://sports.yahoo.com' + e + 'gamelog';
  });
  
  fs.write('player_links.js', "module.exports = '" + links.toString() + "'.split(',');");
});

casper.run(function() {
  this.echo(team_links.length + ' teams found', 'GREEN_BAR');
  this.echo(links.length + ' players found', 'RED_BAR');
  this.exit();
});
