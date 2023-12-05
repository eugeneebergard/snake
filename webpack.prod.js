const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  // plugins: [
  //   new FileManagerPlugin({
  //     events: {
  //       onEnd: {
  //         copy: [{
  //           source: path.join('src', 'public'),
  //           destination: 'dist',
  //         }]
  //       },
  //     },
  //   })
  // ],
});
