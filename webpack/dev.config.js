const path = require('path');
// const express = require('express');
const DashboardPlugin = require('webpack-dashboard/plugin');
const { merge } = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true, //只在本地生效,解决路由跳转问题 默认跳转到index.html
    //host: '0.0.0.0',
    proxy: [{
      path: '/api/myproject',
      target: 'http://192.168.105.80:8080',
      pathRewrite: {
        '^/api/myproject': '',
      },
    }],
  },
  plugins:[
    new DashboardPlugin()
  ],
  output: {
    filename: 'mydev.[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
});
