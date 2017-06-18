const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const Webpack = require('../webpack');

const Paths = Webpack.AppPaths;
const Resolve = Webpack.AppResolve;
const Rules = Webpack.Rules;

// Production specific rules
const ProdRules = [
  {
    test: /\.s?css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [ 'css-loader', 'sass-loader' ],
    }),
    exclude: /node_modules/,
  },
];

module.exports = {
  // Webpack entry point (recursively bundle all imported files)
  entry: {
    app: [ path.join(Paths.src, 'index.js') ],
    vendor: [ 'react', 'react-dom' ],
  },
  output: {
    path: Paths.build,
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  resolve: Resolve,
  plugins: [
    new ExtractTextPlugin('styles_[name].css'),
    // Generate an HTML file from a template and include all necessary scripts, etc
    new HtmlWebpackPlugin({
      title: 'React Starter Template',
      template: './app/src/index_template.html',
    }),
    // Extract common code and place in a new file
    new webpack.optimize.CommonsChunkPlugin('common'),
    // Minify/uglify JS
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    // Compress assets with gzip (saves server-side CPU costs)
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js%|\.css%|\.html%/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  module: {
    rules: Rules.concat(ProdRules),
  },
};
