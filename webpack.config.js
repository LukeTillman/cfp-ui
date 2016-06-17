let path = require('path');
let webpack = require('webpack');

// Paths
const PROJECT_DIR = path.resolve(__dirname);
const Paths = {
  SRC: path.resolve(PROJECT_DIR, 'src'),
  JS: path.resolve(PROJECT_DIR, 'src/js'),
  CSS: path.resolve(PROJECT_DIR, 'src/css'),
  OUT: path.resolve(PROJECT_DIR, 'dist')
};

// Export the webpack config
module.exports = {
  context: Paths.SRC,
  entry: './index.js',
  resolve: {
    extensions: [ '', '.js', '.jsx' ],
    root: [
      Paths.JS, Paths.CSS
    ]
  },
  output: {
    path: Paths.OUT,
    filename: 'cassandracfp.js'
  },
  module: {
    loaders: [
      // Babel transpiler (see .babelrc file for presets)
      { test: /\.jsx?$/, include: Paths.SRC, loader: 'babel' }
    ]
  }
};