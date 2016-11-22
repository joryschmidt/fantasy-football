var webpage = require('webpage');

var parseStats = function(title, body) {
  var page = webpage.create();
  page.content = body;
  page.evaluate(function() {
    console.log(document.getElementsByTagName('th'));
  });
  
  // page.includeJS('jquery.min.js', function() {
  //   page.evaluate(function() {
  //     console.log('QB Rating', $('.qb-rating').text());
  //   });
  // });
  
  // var name = title.match(/^\w+\s\w+/)[0];
  // var filename = name.replace(/\s/, '_') + '.json';
  // fs.write('qb/' + filename, data);
};

module.exports = parseStats;