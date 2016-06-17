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
  devtool: 'source-map',
  context: Paths.SRC,
  entry: './index.jsx',
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
      { test: /\.jsx?$/, include: Paths.SRC, loader: 'babel' },

      // CSS files
      { test: /\.css$/, loader: "style!css" },

      // Allow font loading (to support third party CSS referencing fonts)
      { 
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d\.\d\.\d)?$/, 
        loader: 'file',
        query: { name: 'fonts/[name].[ext]' }
      }
    ]
  },
  plugins: [
    // Define process.env.NODE_ENV in the app based on the setting during the build
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV === 'production' ? 'production' : 'development')
      }
    })
  ]
};