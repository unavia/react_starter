const path = require('path');

// Path constants
const AppPaths = {
  app: path.join(__dirname, '../app'),
  src: path.join(__dirname, '../app', 'src'),
  build: path.join(__dirname, '../app', 'public'),
  assets: path.join(__dirname, '../app', 'src', 'assets'),
};

const ServerPaths = {
  server: path.join(__dirname, '../server'),
  src: path.join(__dirname, '../server/src'),
  build: path.join(__dirname, '../server/build'),
};

// Resolve section of app webpack config
const AppResolve = {
  // Try resolving files with the following extensions (ie. App.js, App.jsx, App.json)
  extensions: [ '.js', '.jsx', '.json' ],
  // Use aliases to remove relative paths in component import statements
  alias: {
    '@components': path.join(AppPaths.src, 'components'),
    '@common': path.join(AppPaths.src, 'common'),
    '@styled': path.join(AppPaths.src, 'styled'),
    '@assets': path.join(AppPaths.src, 'assets'),
  },
};

// Resolve section of server webpack config
const ServerResolve = {
  // Try resolving files with the following extensions (ie. server.js, routes.json)
  extensions: [ '.js', '.json' ],
  // Use aliases to remove relative paths in component import statements
  alias: {
    '@api': path.join(ServerPaths.server, 'api'),
    '@server': path.join(ServerPaths.server),
  },
};

// Base Rules section of webpack config
const Rules = [
  {
    test: /\.jsx?$/,
    use: 'babel-loader',
    exclude: /node_modules/,
  },
  {
    test: /\.jsx?$/,
    use: 'eslint-loader',
    exclude: /node_modules/,
  },
  // WOFF fonts (use url-loader to 10000 bytes)
  {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash].[ext]',
          outputPath: 'fonts/',
          mimetype: 'application/font-woff',
        },
      },
    ],
  },
  // TTF and EOT fonts (use file-loader automatically)
  {
    test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'fonts/',
        },
      },
    ],
  },
];

module.exports = {
  AppPaths,
  ServerPaths,
  AppResolve,
  ServerResolve,
  Rules,
};
