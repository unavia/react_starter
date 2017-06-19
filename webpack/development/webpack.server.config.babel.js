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
    // Public URL of output directory when referenced in a browser (should end in `/`)
    //  Relative URLs are resolved relative to 'index.html'
    publicPath: '/',
  },
  resolve: Resolve,
  // Enable source maps as a dev tool
  devtool: 'source-map',
  module: {
    rules: Rules,
  },
};
