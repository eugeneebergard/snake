const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',

  devServer: {
    port: 8000,
    compress: true,
    open: true,
    hot: true
  },
});
