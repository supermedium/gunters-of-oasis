var glob = require('glob');
var imagemin = require('imagemin');
var imageminJpegtran = require('imagemin-jpegtran');
var imageminPngquant = require('imagemin-pngquant');
var sharp = require('sharp');

var PLUGINS = [imageminJpegtran(), imageminPngquant({quality: '65-80'})];

imagemin(['assets/source/img/*.{jpg,png}'], 'assets/img', {
  plugins: PLUGINS
});

glob.sync('assets/source/img/portal/*').forEach(img => {
  sharp(img)
    .resize(2048, 1024)
    .toFile(img.replace('source/', '')
               .replace('png', 'jpg'));
});
