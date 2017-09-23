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
var position_links = [
  'http://sports.yahoo.com/nfl/players?type=position&c=NFL&pos=QB',
  'http://sports.yahoo.com/nfl/players?type=position&c=NFL&pos=RB',
  'http://sports.yahoo.com/nfl/players?type=position&c=NFL&pos=WR',
  'http://sports.yahoo.com/nfl/players?type=position&c=NFL&pos=TE',
  'http://sports.yahoo.com/nfl/players?type=position&c=NFL&pos=K'
];

var pos_array = ['QB', 'RB', 'WR', 'TE', 'K'];
var pos_counter = 0;
var pos = '';

function getLinks(selector) {
  var links = document.querySelectorAll(selector);
  return Array.prototype.map.call(links, function(e) {
    return e.getAttribute('href');
  });
}

// Unfortunately, CasperJS doesn't seem to like nested eachThen methods much, so we have to repeat the code for every position

casper.start(position_links[0]);

casper.then(function() {
  this.waitForSelector('#yom-league-players', function() {
    links = this.evaluate(getLinks, '.ysprow1 a, .ysprow2 a');
  });
});

casper.then(function() {
  links.forEach(function(e, index, arr) {
    arr[index] = 'http://sports.yahoo.com' + e;
  });
  links.forEach(function(e, index, arr) {
    if (e.search(/teams/) != -1) links.splice(index, 1);
  });
  links = shuffleArray(links);
  pos = pos_array[pos_counter];
});

casper.then(function() {
  this.eachThen(links, function(response) {
    console.log(response.data);
    this.thenOpen(response.data, function() {
      this.wait(Math.random() * 4000 + 2000);
      var title = this.getTitle().match(/\w+\s\w+/g);
      var stats = this.evaluate(parseStats);
      prepareData(title, stats, pos);
    });
  });
});

casper.thenOpen(position_links[1], function() {
  pos_counter++;
});

casper.then(function() {
  this.waitForSelector('#yom-league-players', function() {
    links = this.evaluate(getLinks, '.ysprow1 a, .ysprow2 a');
  });
});

casper.then(function() {
  links.forEach(function(e, index, arr) {
    arr[index] = 'http://sports.yahoo.com' + e;
  });
  links.forEach(function(e, index, arr) {
    if (e.search(/teams/) != -1) links.splice(index, 1);
  });
  links = shuffleArray(links);
  pos = pos_array[pos_counter];
});

casper.then(function() {
  this.eachThen(links, function(response) {
    console.log(response.data);
    this.thenOpen(response.data, function() {
      this.wait(Math.random() * 4000 + 2000);
      var title = this.getTitle().match(/\w+\s\w+/g);
      var stats = this.evaluate(parseStats);
      prepareData(title, stats, pos);
    });
  });
});

casper.thenOpen(position_links[2], function() {
  pos_counter++;
});

casper.then(function() {
  this.waitForSelector('#yom-league-players', function() {
    links = this.evaluate(getLinks, '.ysprow1 a, .ysprow2 a');
  });
});

casper.then(function() {
  links.forEach(function(e, index, arr) {
    arr[index] = 'http://sports.yahoo.com' + e;
  });
  links.forEach(function(e, index, arr) {
    if (e.search(/teams/) != -1) links.splice(index, 1);
  });
  links = shuffleArray(links);
  pos = pos_array[pos_counter];
});

casper.then(function() {
  this.eachThen(links, function(response) {
    console.log(response.data);
    this.thenOpen(response.data, function() {
      this.wait(Math.random() * 4000 + 2000);
      var title = this.getTitle().match(/\w+\s\w+/g);
      var stats = this.evaluate(parseStats);
      prepareData(title, stats, pos);
    });
  });
});

casper.thenOpen(position_links[3], function() {
  pos_counter++;
});

casper.then(function() {
  this.waitForSelector('#yom-league-players', function() {
    links = this.evaluate(getLinks, '.ysprow1 a, .ysprow2 a');
  });
});

casper.then(function() {
  links.forEach(function(e, index, arr) {
    arr[index] = 'http://sports.yahoo.com' + e;
  });
  links.forEach(function(e, index, arr) {
    if (e.search(/teams/) != -1) links.splice(index, 1);
  });
  links = shuffleArray(links);
  pos = pos_array[pos_counter];
});

casper.then(function() {
  this.eachThen(links, function(response) {
    console.log(response.data);
    this.thenOpen(response.data, function() {
      this.wait(Math.random() * 4000 + 2000);
      var title = this.getTitle().match(/\w+\s\w+/g);
      var stats = this.evaluate(parseStats);
      prepareData(title, stats, pos);
    });
  });
});

casper.thenOpen(position_links[4], function() {
  pos_counter++;
});

casper.then(function() {
  this.waitForSelector('#yom-league-players', function() {
    links = this.evaluate(getLinks, '.ysprow1 a, .ysprow2 a');
  });
});

casper.then(function() {
  links.forEach(function(e, index, arr) {
    arr[index] = 'http://sports.yahoo.com' + e;
  });
  links.forEach(function(e, index, arr) {
    if (e.search(/teams/) != -1) links.splice(index, 1);
  });
  links = shuffleArray(links);
  pos = pos_array[pos_counter];
});

casper.then(function() {
  this.eachThen(links, function(response) {
    console.log(response.data);
    this.thenOpen(response.data, function() {
      this.wait(Math.random() * 4000 + 2000);
      var title = this.getTitle().match(/\w+\s\w+/g);
      var stats = this.evaluate(parseStats);
      prepareData(title, stats, pos);
    });
  });
});

casper.run();