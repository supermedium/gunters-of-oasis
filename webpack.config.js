var MinifyPlugin = require('babel-minify-webpack-plugin');
var fs = require('fs');
var glob = require('glob');
var htmlMinify = require('html-minifier').minify;
var ip = require('ip');
var moment = require('moment');
var nunjucks = require('nunjucks');
var path = require('path');
var webpack = require('webpack');

var OasisGenerator = require('./generator/index');

process.env.HOST = ip.address();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Service worker.
fs.writeFileSync('./serviceWorker.js', nunjucks.render('serviceWorker.js', {
  cacheAlways: glob.sync('assets/img/*')
    .concat(glob.sync('assets/img/portal/*'))
    .concat(glob.sync('assets/fonts/portal/*'))
    .concat(glob.sync('assets/models/**/*.obj'))
    .concat(glob.sync('assets/models/**/*.mtl'))
    .concat(glob.sync('assets/audio/*'))
}));

// For development, watch HTML for changes to compile Nunjucks.
// The production Express server will handle Nunjucks by itself.
if (process.env.NODE_ENV !== 'production') {
  fs.watch('src', {recursive: true}, (eventType, filename) => {
    if (!filename.endsWith('.html')) { return; }
    console.log(`${filename} updated.`);
    try {
      OasisGenerator.generateFromJson('oasis.json');
    } catch (e) {
      console.error(e);
    }
  });
}

PLUGINS = [
  new webpack.EnvironmentPlugin(['HOST', 'NODE_ENV', 'SERVER_HOST'])
];
if (process.env.NODE_ENV === 'production') {
  PLUGINS.push(new MinifyPlugin({}, {
    sourceMap: 'source-map'
  }));
}

module.exports = {
  devtool: '#inline-source-map',
  devServer: {
    disableHostCheck: true
  },
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: 'build/build.js'
  },
  plugins: PLUGINS,
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: path => path.indexOf('node_modules') !== -1 || path.indexOf('panel') !== -1,
        loader: 'babel-loader'
      },
      {
        test: /\.json/,
        exclude: /(node_modules)/,
        loader: 'json-loader'
      },
      {
        test: /\.glsl/,
        exclude: /(node_modules)/,
        loader: 'webpack-glsl-loader'
      },
      {
        test: /\.styl/,
        exclude: /(node_modules)/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [require('autoprefixer')()]
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules')
    ]
  }
};
