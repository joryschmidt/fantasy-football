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

function getLinks(selector, element) {
  var links;
  if (element) {
    links = element.querySelectorAll(selector);
  } else {
    links = document.querySelectorAll(selector);
  }
  return Array.prototype.map.call(links, function(e) {
    console.log(e);
    return e.getAttribute('href');
  });
}

function processLinks(links) {
  links.forEach(function(e, index, arr) {
    arr[index] = 'https://sports.yahoo.com' + e;
  });
  links = shuffleArray(links);
  links = links.slice(0, 2);
  return links;
}

casper.start();

casper.open(url).then(function() {
  this.echo(this.getTitle(), 'INFO');
  casper.then(function createTeamLinksArray() {
    this.waitForSelector('.ys-players-index', function() {
      team_links = this.evaluate(getLinks, '.ys-players-index div a');
      team_links = processLinks(team_links);
    });
  });
});

casper.then(function goToTeamPages() {
  casper.each(team_links, function openTeamPage(self, link) {
    self.thenOpen(link, function getPlayerLinks() {
      this.waitForSelector('.ys-roster-table', function() {
        var team = this.evaluate(getLinks, '.ys-roster-table td a');
        links = links.concat(team);
      });
    });
  });
});

casper.then(function() { links = processLinks(links) });

casper.run(function() {
  this.echo(team_links.length + ' found', 'WARNING');
  this.echo(' - '+ team_links.join('\n - '));
  this.exit();
  this.echo(links.length + ' found', 'WARNING');
  this.echo(' - '+ links.join('\n - '));
  this.exit();
});
// position_links.forEach(function(e, index, arr) {
//   casper.thenOpen(e, function() { 
//     pos = e.match(/\w+$/)[0];
//     this.echo(pos, 'RED_BAR');
//   });
  
//   casper.then(function getLinkVals() {
//     this.waitForSelector('#yom-league-players', function() {
//       links = this.evaluate(getLinks, '.ysprow1 a, .ysprow2 a');
//     });
//   });
  
  
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
// });

