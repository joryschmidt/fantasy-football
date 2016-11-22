var parseStats = require('./parse-stats');
var webpage = require('webpage');

var casper = require('casper').create({
  verbose: true,
  logLevel: 'info',
  pageSettings: {
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
  }
});

var url = 'http://sports.yahoo.com/nfl/players';
var links = [];
var ex_links = ['http://sports.yahoo.com/nfl/players/6760', 'http://sports.yahoo.com/nfl/players/25812'];

function getLinks(selector) {
  var links = document.querySelectorAll(selector);
  return Array.prototype.map.call(links, function(e) {
    return e.getAttribute('href');
  });
}

// casper.start(url);

// casper.waitForSelector('#yom-league-players', function() {
//   this.click('a[data-rapid_p="31"]');
// });

// casper.waitForSelector('.ysprow1', function() {
//   links = this.evaluate(getLinks, '.ysprow1 a');
// });

// casper.then(function() {
//   links = links.concat(this.evaluate(getLinks, '.ysprow2 a'));
// });

// casper.then(function() {
//   links.forEach(function(e, index, arr) {
//     arr[index] = 'http://sports.yahoo.com' + e;
//   });
//   links.forEach(function(e, index, arr) {
//     if(e.search(/teams/) != -1) links.splice(index, 1);
//   });
// });


casper.start().eachThen(ex_links, function(response) {
  
  var page = webpage.create();
  page.open(response.data, function(status) {
    var stats = page.evaluate(function() {
      var hrs = document.querySelectorAll('#mediasportsplayergamelog tbody');
      
      return hrs;
    });
    console.log('Stats are', stats);
  });
  // Try using raw phantomJS with page.open() here instead to parse the html
  
  this.thenOpen(response.data, function(response) {
    parseStats(this.getTitle(), this.getHTML('#mediasportsplayergamelog tbody', true));
  });
});

casper.run(function() {
  // this.echo(links.length + ' links found', 'GREEN_BAR');
  // this.echo(' - ' + links.join('\n - ')).exit();
  this.exit();
});
