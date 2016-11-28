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
var try_later_array = [];

var position_links = [
  'http://sports.yahoo.com/nfl/players?type=position&c=NFL&pos=QB',
  'http://sports.yahoo.com/nfl/players?type=position&c=NFL&pos=RB',
  'http://sports.yahoo.com/nfl/players?type=position&c=NFL&pos=WR',
  'http://sports.yahoo.com/nfl/players?type=position&c=NFL&pos=TE',
  'http://sports.yahoo.com/nfl/players?type=position&c=NFL&pos=K'
];
var pos = '';

function getLinks(selector) {
  var links = document.querySelectorAll(selector);
  return Array.prototype.map.call(links, function(e) {
    return e.getAttribute('href');
  });
}

casper.start();

position_links.forEach(function(e, index, arr) {
  casper.thenOpen(e, function() { 
    pos = e.slice(-2);
    this.echo(pos, 'RED_BAR');
  });
  
  casper.then(function getLinkVals() {
    this.waitForSelector('#yom-league-players', function() {
      links = this.evaluate(getLinks, '.ysprow1 a, .ysprow2 a');
    });
  });
  
  casper.then(function processTheLinks() {
    links.forEach(function(e, index, arr) {
      arr[index] = 'http://sports.yahoo.com' + e;
    });
    links.forEach(function(e, index, arr) {
      if (e.search(/teams/) != -1) links.splice(index, 1);
    });
    links = shuffleArray(links);
  });
  
  casper.then(function goThroughLinks() {
    this.eachThen(links, function grabLinkData(response) {
      this.echo(response.data, 'INFO');
      this.thenOpen(response.data, function getAllTheStats() {
        this.waitForSelector('#mediasportsplayergamelog', function afterWaiting() {
          this.wait(Math.random() * 3000 + 2000);
          var title = this.getTitle().match(/\w+\s\w+/g);
          var stats = this.evaluate(parseStats);
          prepareData(title, stats, pos);
        }, function tryLater() {
          try_later_array.push(response.data);
        });
      });
    });
  });
  
  casper.then(function tryOnceMore() {
    while(try_later_array.length > 0) {
      this.echo(try_later_array, 'WARNING');
      this.thenOpen(try_later_array[0], function() {
        this.waitForSelector('#mediasportsplayergamelog', function() {
          this.wait(Math.random() * 3000 + 2000);
          var title = this.getTitle().match(/\w+\s\w+/g);
          var stats = this.evaluate(parseStats);
          prepareData(title, stats, pos);
        }, function() {
          try_later_array.push(try_later_array[0]);
        });
      });
      try_later_array.shift();
    }
  });
});

casper.run();
