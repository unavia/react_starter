const path = require('path');

// Path constants
const Paths = {
  app: path.join(__dirname, '../app'),
  src: path.join(__dirname, '../app', 'src'),
  public: path.join(__dirname, '../app', 'public'),
};

// Resolve section of webpak config
const Resolve = {
  // Try resolving files with the following extensions (ie. App.js, App.jsx, App.json)
  extensions: [ '.js', '.jsx', '.json' ],
  // Use aliases to remove relative paths in component import statements
  alias: {
    '@components': path.join(Paths.src, 'components'),
    '@common': path.join(Paths.src, 'common'),
    '@styled': path.join(Paths.src, 'styled'),
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
  Paths,
  Resolve,
  Rules,
};
