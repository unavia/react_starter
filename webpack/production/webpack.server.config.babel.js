const path = require('path');
const webpack = require('webpack');

const Webpack = require('../webpack');

const Paths = Webpack.ServerPaths;
const Resolve = Webpack.ServerResolve;
const Rules = Webpack.Rules;

module.exports = {
  // Webpack entry point (recursively bundle all imported files)
  entry: path.join(Paths.src, 'index.js'),
  // Set target environment
  target: 'node',
  output: {
    path: Paths.build,
    filename: 'server.js',
  },
  plugins: [
    // Minify/uglify JS
    new webpack.optimize.UglifyJsPlugin(),
  ],
  resolve: Resolve,
  module: {
    rules: Rules,
  },
  node: {
    __dirname: true,
  },
};
