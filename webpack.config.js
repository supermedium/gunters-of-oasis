var MinifyPlugin = require('babel-minify-webpack-plugin');
var fs = require('fs');
var htmlMinify = require('html-minifier').minify;
var moment = require('moment');
var ip = require('ip');
var Nunjucks = require('nunjucks');
var path = require('path');
var webpack = require('webpack');

process.env.HOST = ip.address();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Set up templating.
var nunjucks = Nunjucks.configure(path.resolve(__dirname, 'src'), {noCache: true});
nunjucks.addGlobal('DEBUG_AFRAME', process.env.DEBUG_AFRAME);
nunjucks.addGlobal('HOST', ip.address());
nunjucks.addGlobal('IS_PRODUCTION', process.env.NODE_ENV === 'production');
nunjucks.addGlobal('IS_WEBPACK', true);
nunjucks.addGlobal('DATETIME', Date.now());
nunjucks.addGlobal('PRETTY_DATETIME', moment().format('MMMM Do YYYY, h:mm a'));

// Initial Nunjucks render.
var html = nunjucks.render('index.html');
if (process.env.NODE_ENV === 'production') {
  // Minify HTML.
  var htmlConfig = {collapse: true, collapseWhitespace: true, conservativeCollapse: true,
                    removeComments: true}
  html = htmlMinify(html, htmlConfig);
}
fs.writeFileSync('index.html', html);

// For development, watch HTML for changes to compile Nunjucks.
// The production Express server will handle Nunjucks by itself.
if (process.env.NODE_ENV !== 'production') {
  fs.watch('src', {recursive: true}, (eventType, filename) => {
    if (filename.indexOf('.html') === -1 && filename.indexOf('featured.json') === -1) {
      return;
    }
    console.log(`${filename} updated.`);
    try {
      fs.writeFileSync('index.html', nunjucks.render('index.html'));
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
