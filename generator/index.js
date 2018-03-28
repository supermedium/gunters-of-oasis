var fantasyNames = require('fantasy-names');
var fs = require('fs');
var Nunjucks = require('nunjucks');
var path = require('path');

var nunjucks = Nunjucks.configure('src', {noCache: true});

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
      name: capitalize(randomName()),
      sectorType: sector.environmentType,
      seed: seed,
      url: `../oasis/${seed}.html`,
    });
  }
});

// Generate links.
SECTOR_PAGES.forEach(sector => {
  sector.forEach(zone => {
    var i;
    var randomZone;
    zone.links = [];
    for (i = 0; i < Math.round(Math.random() * 5) + 2; i++) {
      // Get random zone.
      randomZone = Object.assign({}, sector[Math.floor(Math.random() * sector.length)]);
      delete randomZone.links;
      zone.links.push({
        position: `${Math.random() * 30 - 15} 0 ${Math.random() * 30 - 15}`,
        zone: Object.assign({}, randomZone)
      })
    }
  });
});

// Generate home zone.
var HOME_ZONE = {
  IS_HOME: true,
  links: SECTOR_PAGES.map((sector, i) => {
    var randomZone;
    randomZone = Object.assign({}, sector[Math.floor(Math.random() * sector.length)]);
    delete randomZone.links;
    return {
      position: `${i} 1.6 -5`,
      zone: randomZone
    };
  })
};

// Generate goal zone.
var GOAL_ZONE = {
  IS_GOAL: true,
  environment: 'preset: goldmine; seed: 660; skyColor: #361c1b; horizonColor: #943842; lighting: none; fog: 0.669; flatShading: false; playArea: 1.5; groundYScale: 20.18; groundColor: #361c1b; groundColor2: #38292b; dressing: cubes; dressingAmount: 100; dressingColor: #d19747; dressingScale: 3.65; dressingVariance: 2 2 2; dressingOnPlayArea: 0.0',
  links: SECTOR_PAGES.map((sector, i) => {
    var randomZone;
    randomZone = Object.assign({}, sector[Math.floor(Math.random() * sector.length)]);
    delete randomZone.links;
    return {
      position: `${i} 1.6 -5`,
      zone: randomZone
    };
  })
};

// Compile final data structure.
var DATA = {HOME: HOME_ZONE, SECTORS: SECTOR_PAGES, GOAL: GOAL_ZONE};

// Write JSON.
fs.writeFileSync('oasis.json', JSON.stringify(DATA));

// Final step: Generate.
generate(DATA);

function generate (data) {
  var template = fs.readFileSync('./src/index.html', 'utf-8');

  // Write home.
  fs.writeFileSync(`index.html`, nunjucks.renderString(template, data.HOME));

  // Write goal.
  fs.writeFileSync(`goal.html`, nunjucks.renderString(template, data.GOAL));

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

var GROUPS = [
  ['places', 'planets'],
  ['places', 'realms'],
  ['places', 'stars'],
];

function randomName (sectorType) {
  if (sectorType === 'dream') {
    return fantasyNames('places', 'sky_islands');
  }
  if (sectorType === 'tron') {
    return fantasyNames('places', 'space_colonys');
  }
  if (sectorType === 'volcano') {
    return fantasyNames('places', 'volcanos');
  }
  if (Math.random() < 0.3) {
    return fantasyNames('places', 'planets');
  } else if (Math.random() < 0.6) {
    return fantasyNames('places', 'realms');
  } else {
    return fantasyNames('places', 'lands');
  }
}

function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
