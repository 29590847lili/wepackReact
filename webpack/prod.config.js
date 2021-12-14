const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const { merge }= require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [new CleanWebpackPlugin()],
  output: {
    filename: 'myprod.[chunkhash].js',
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/',
  },
});
