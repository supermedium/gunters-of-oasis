var fs = require('fs');
var nunjucks = require('nunjucks');

var template = fs.readFileSync('./src/index.html', 'utf-8');

var AVG_ZONES = 40;
var MIN_ZONES = 20;

// Generation config.
var SECTORS = [
  {
    environmentType: 'forest'
  },
  {
    environmentType: 'tron'
  },
  {
    environmentType: 'volcano'
  },
  {
    environmentType: 'arches'
  },
  {
    environmentType: 'japan'
  },
  {
    environmentType: 'egypt'
  }
];

/**
 * Links for home zone.
 * [
 *   [environmentType": "tron", "seed": "12345"}],
 *   [environmentType": "volcano", "seed": "abcdef"}]
 * ]
 */
var INDEX_SECTORS = [];

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
      seed: seed
    });
  }

  // Keep track of index sectors for the home zone.
  INDEX_SECTORS.push({
    environmentType: sector.environmentType,
    url: `oasis/${seed}.html`
  });
});

// Generate pages.
SECTOR_PAGES.forEach(sector => {
  sector.forEach(pageData => {
    html = nunjucks.renderString(template, pageData);
    fs.writeFileSync(`oasis/${pageData.seed}.html`, html);
  });
});

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
