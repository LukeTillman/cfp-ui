let path = require('path');
let webpack = require('webpack');

// Paths
const PROJECT_DIR = path.resolve(__dirname);
const Paths = {
  SRC: path.resolve(PROJECT_DIR, 'src'),
  JS: path.resolve(PROJECT_DIR, 'src/js'),
  CSS: path.resolve(PROJECT_DIR, 'src/css'),
  IMAGES: path.resolve(PROJECT_DIR, 'src/images'),
  OUT: path.resolve(PROJECT_DIR, 'dist'),
  VENDOR: path.resolve(PROJECT_DIR, 'vendor'),
  SERVER: path.resolve(PROJECT_DIR, 'server')
};

// Export the webpack config
module.exports = {
  devtool: 'source-map',
  context: Paths.SRC,
  entry: './index.jsx',
  resolve: {
    extensions: [ '', '.js', '.jsx' ],
    root: [
      Paths.JS, Paths.CSS, Paths.IMAGES
    ],
    alias: {
      persona$: path.resolve(Paths.VENDOR, 'include.js')
    }
  },
  output: {
    path: Paths.OUT,
    filename: 'cassandracfp.js',
    publicPath: '/assets/'
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
      },

      // Allow PNG images to be required from code
      { 
        test: /\.png$/, 
        include: Paths.SRC, 
        loader: 'file',
        query: { name: 'images/[name].[ext]' } 
      },

      // The persona module from mozilla
      { test: /include\.js/, loader: `exports?navigator` }
    ]
  },
  plugins: [
    // Define process.env.NODE_ENV in the app based on the setting during the build
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV === 'production' ? 'production' : 'development')
      }
    })
  ],
  // Dev server options when running the watch npm task
  devServer: {
    contentBase: Paths.SERVER,
    proxy: {
      '/api/*': {
        // Proxy the current location of the live CFP app
        target: 'http://52.10.244.14/',
        rewrite(req) {
          req.url = req.url.replace(/^\/api/, '');
        }
      } 
    }
  }
};