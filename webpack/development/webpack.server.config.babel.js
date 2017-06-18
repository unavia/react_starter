const path = require('path');

const Webpack = require('../webpack');

const Paths = Webpack.ServerPaths;
const Resolve = Webpack.ServerResolve;
const Rules = Webpack.Rules;

module.exports = {
  // Webpack entry point (recursively bundle all imported files)
  entry: [ path.join(Paths.src, 'index.js') ],
  // Set target environment
  target: 'node',
  output: {
    path: Paths.build,
    filename: 'server.js',
    publicPath: '/',
  },
  resolve: Resolve,
  // Enable source maps as a dev tool
  devtool: 'source-map',
  module: {
    rules: Rules,
  },
};
