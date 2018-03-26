var fs = require('fs');
var Nunjucks = require('nunjucks');

var nunjucks = Nunjucks.configure(__dirname, {noCache: true});

// Generate from JSON filename.
function generateFromJson (filename) {
  generate(JSON.parse(fs.readFileSync(filename, 'utf-8')));
};
module.exports.generateFromJson = generateFromJson;

// Re-generate if already generated.
if (fs.existsSync('oasis.json')) {
  generateFromJson('oasis.json');
  return;
}

var AVG_ZONES = 40;
var MIN_ZONES = 20;

// Generation config.
var SECTORS = [
  {environmentType: 'forest'},
  {environmentType: 'tron'},
  {environmentType: 'volcano'},
  {environmentType: 'arches'},
  {environmentType: 'japan'},
  {environmentType: 'egypt'},
  {environmentType: 'contact'},
  {environmentType: 'goaland'},
  {environmentType: 'yavapai'},
  {environmentType: 'goldmine'},
  {environmentType: 'threetowers'},
  {environmentType: 'poison'},
  {environmentType: 'dream'},
  {environmentType: 'starry'},
  {environmentType: 'osiris'}
];

/**
 * Data structure for all sectors and zones to generate pages.
 * [
 *   [
 *     [environmentType": "tron", "seed": "12345"}],
 *     [environmentType": "tron", "seed": "54321"}]
 *   ],
 *   [
 *     [environmentType": "volcano", "seed": "abcdef"}],
 *     [environmentType": "volcano", "seed": "fedgto"}]
 *   ]
 * ]
 */
var SECTOR_PAGES = [];

// Generate sectors.
SECTORS.forEach((sector, sectorIndex) => {
  var i;
  var seed;

  // Generate zones for the sector.
  SECTOR_PAGES[sectorIndex] = SECTOR_PAGES[sectorIndex] || [];
  for (i = 0; i < Math.random() * AVG_ZONES + MIN_ZONES; i++) {
    seed = randomId();
    SECTOR_PAGES[sectorIndex].push({
      environment: `preset: ${sector.environmentType}; seed: ${seed}`,
      sectorType: sector.environmentType,
      seed: seed
    });
  }
});

// Generate links.
SECTOR_PAGES.forEach(sector => {
  sector.forEach(pageData => {
    var i;
    var randomZone;
    pageData.links = [];
    for (i = 0; i < Math.ceil(Math.random() * 5) + 2; i++) {
      // Get random zone.
      randomZone = sector[Math.floor(Math.random() * sector.length)];
      pageData.links.push({
        position: `${Math.random() * 60 - 30} 0 ${Math.random() * 60 - 30}`,
        sectorType: randomZone.sectorType,
        url: `oasis/${randomZone.seed}.html`
      })
    }
  });
});

// Generate home zone.
var HOME_ZONE = {
  IS_HOME: true,
  links: SECTOR_PAGES.map((sector, i) => {
    var randomZone;
    randomZone = sector[Math.floor(Math.random() * sector.length)];
    return {
      position: `${i} 1.6 -5`,
      sectorType: randomZone.sectorType,
      url: `oasis/${randomZone.seed}.html`
    };
  })
};

// Compile final data structure.
var DATA = {HOME: HOME_ZONE, SECTORS: SECTOR_PAGES};

// Write JSON.
fs.writeFileSync('oasis.json', JSON.stringify(DATA));

// Final step: Generate.
generate(DATA);

function generate (data) {
  var template = fs.readFileSync('./src/index.html', 'utf-8');

  // Write home.
  fs.writeFileSync(`index.html`, nunjucks.renderString(template, data.HOME));

  // Write sectors.
  data.SECTORS.forEach(sector => {
    sector.forEach(pageData => {
      html = nunjucks.renderString(template, pageData);
      fs.writeFileSync(`oasis/${pageData.seed}.html`, html);
    });
  });
}

/**
 * Random string.
 */
function randomId () {
	var i;
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var text = '';
  for (i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
