var parseStats = require('./parse-stats');
var prepareData = require('./prepare-data');
var shuffleArray = require('./shuffle-array');

var casper = require('casper').create({
  verbose: true,
  logLevel: 'debug',
  pageSettings: {
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
  }
});

var links = [];
var team_links = [];
var try_later_array = [];

var url = 'https://sports.yahoo.com/nfl/players/';

function getLinks(selector) {
  var links = document.querySelectorAll(selector);
  return Array.prototype.map.call(links, function(e) {
    return e.getAttribute('href');
  });
}


casper.start();

casper.open(url).then(function() {
  this.echo(this.getTitle(), 'INFO');
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
  
        team_links = team_links.slice(0, 4);
});

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

casper.then(function() { 
  links.forEach(function(e, index, arr) {
    arr[index] = 'https://sports.yahoo.com' + e + 'gamelog';
  });
});

casper.run(function() {
  this.echo(team_links.length + ' found', 'WARNING');
  this.echo(' - '+ team_links.join('\n - '));
  this.exit();
  this.echo(links.length + ' found', 'WARNING');
  this.echo(' - '+ links.join('\n - '));
  this.exit();
});


  
//   casper.then(function goThroughLinks() {
//     this.eachThen(links, function grabLinkData(response) {
//       this.echo(response.data, 'INFO');
//       this.thenOpen(response.data, function getAllTheStats() {
//         this.waitForSelector('#mediasportsplayergamelog', function afterWaiting() {
//           this.wait(Math.random() * 3000 + 2000);
//           var title = this.getTitle().match(/\w+\s\w+/g);
//           var stats = this.evaluate(parseStats);
//           prepareData(title, stats, pos);
//         }, function tryLater() {
//           try_later_array.push(response.data);
//         });
//       });
//     });
//   });
  
//   casper.then(function tryOnceMore() {
//     while(try_later_array.length > 0) {
//       this.echo(try_later_array, 'WARNING');
//       this.thenOpen(try_later_array[0], function() {
//         this.waitForSelector('#mediasportsplayergamelog', function() {
//           this.wait(Math.random() * 3000 + 2000);
//           var title = this.getTitle().match(/\w+\s\w+/g);
//           var stats = this.evaluate(parseStats);
//           prepareData(title, stats, pos);
//         }, function() {
//           try_later_array.push(try_later_array[0]);
//         });
//       });
//       try_later_array.shift();
//     }
//   });
