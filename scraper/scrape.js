var parseStats = require('./parse-stats');
var prepareData = require('./prepare-data');
var players = require('./player_links.js');

var fs = require('fs');

var casper = require('casper').create({
  verbose: true,
  logLevel: 'debug',
  pageSettings: {
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
  }
});

casper.start();


casper.run(function() {
  this.echo('Casper done', 'WARN_BAR');
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