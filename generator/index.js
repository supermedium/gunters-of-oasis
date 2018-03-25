var fs = require('fs');
var nunjucks = require('nunjucks');

var template = fs.readFileSync('./src/index.html', 'utf-8');

var SECTORS = [
  {
    environmentType: 'forest',
    numZones: 15
  },
  {
    environmentType: 'tron',
    numZones: 30
  }
];

SECTORS.forEach(sector => {
  var html;
  var seed;
  seed = randomId();
  html = nunjucks.renderString(template, {
    environment: `preset: ${sector.environmentType}; seed: ${seed}`
  });
  fs.writeFileSync(`oasis/${seed}.html`, html);
});

function randomId () {
	var i;
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
