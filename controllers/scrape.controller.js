var casper = require('casperjs').create({
  verbose: true,
  logLevel: 'debug',
  pageSettings: {
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
  }
});

function getStats() {
  var url = 'sports.yahoo.com/nfl/players';
}

module.exports.getStats = getStats;