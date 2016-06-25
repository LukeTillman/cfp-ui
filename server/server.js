const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const webpackDev = require('webpack-dev-middleware');
const proxy = require('http-proxy-middleware');

// Express App
const app = express();

// Webpack compiled assets
const compiler = webpack(webpackConfig);
app.use(webpackDev(compiler, {
  publicPath: '/assets/'
}));

// Serve up UI at root
const indexPath = `${__dirname}/index.html`;
app.use(/^\/$/, (req, res) => res.sendFile(indexPath));

// Otherwise proxy all calls
app.use(proxy({ target: 'http://cfpreview.cassandrasummit.org/', changeOrigin: true }))

// Start HTTP server
app.listen(3000);