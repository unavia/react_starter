const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
    // Public URL of output directory when referenced in a browser (should end in `/`)
    //  Relative URLs are resolved relative to 'index.html'
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
    // Copy assets folder to public directory
    new CopyWebpackPlugin([ { from: Paths.assets, to: 'assets' } ]),
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
