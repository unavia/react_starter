const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const Webpack = require('../webpack');

const Paths = Webpack.AppPaths;
const Resolve = Webpack.AppResolve;
const Rules = Webpack.Rules;

// Development specific rules
const DevRules = [
  {
    test: /\.s?css$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: { sourceMap: true },
      },
      {
        loader: 'sass-loader',
        options: { sourceMap: true },
      },
    ],
    exclude: /node_modules/,
  },
];

module.exports = {
  // Webpack entry point (recursively bundle all imported files)
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8000',
    'webpack/hot/only-dev-server',
    path.join(Paths.src, 'index.js'),
  ],
  output: {
    path: Paths.build,
    filename: 'bundle.js',
    // Public URL of output directory when referenced in a browser (should end in `/`)
    //  Relative URLs are resolved relative to 'index.html'
    publicPath: '/',
  },
  // Development server configuration
  devServer: {
    contentBase: Paths.build,
    historyApiFallback: true,
    hot: true,
    inline: true,
    publicPath: '/',
    // Proxy API requests to the API server (development)
    proxy: {
      '/api/*': 'http://localhost:3000',
    },
  },
  resolve: Resolve,
  // Enable source maps as a dev tool
  devtool: 'source-map',
  plugins: [
    // Generate an HTML file from a template and include all necessary scripts, etc
    new HtmlWebpackPlugin({
      title: 'React Starter Template',
      template: './app/src/index_template.html',
    }),
    // Enable hot module reloading
    new webpack.HotModuleReplacementPlugin(),
    // Named modules for HMR (uses file names instead of chunk hashes)
    new webpack.NamedModulesPlugin(),
    // Don't reload the page with errors (avoids red screen of death)
    // new webpack.NoEmitOnErrors(),
  ],
  module: {
    rules: Rules.concat(DevRules),
  },
};
