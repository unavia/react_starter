const path = require('path');

// Path constants
const AppPaths = {
  app: path.join(__dirname, '../app'),
  src: path.join(__dirname, '../app', 'src'),
  build: path.join(__dirname, '../app', 'public'),
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
  {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: 'url-loader?limit=10000&mimetype=application/font-woff',
  },
  {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: 'file-loader',
  },
  {
    test: /\.svg/,
    use: [
      {
        loader: 'url-loader',
        options: { limit: 8000 },
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
