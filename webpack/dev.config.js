const path = require('path');
// const express = require('express');
const DashboardPlugin = require('webpack-dashboard/plugin');
const { merge } = require('webpack-merge');
const HappyPack = require('happypack');
const os = require('os');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const baseConfig = require('./base.config.js');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })


module.exports = merge(baseConfig, {
  /*作用：
    1. 单入口chunk中，可以将node_modules中代码单独打包一个chunk最终输出
    2. 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
  */
 optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  // optimization: {//webpack4提供的优化项
  //   minimizer: [
  //     //压缩css
  //     new OptimizeCssAssetsPlugin({})
	//   ],
  // },
  devtool: 'source-map',
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
  module: {
    rules: [
      {
        test: /\.js$/,
        //把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
        use: 'happypack/loader?id=happyBabel',
        //排除node_modules 目录下的文件
        exclude: /node_modules/
      },
    ],
  },
  plugins:[
    //new DashboardPlugin(),
    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: 'happyBabel',
      //如何处理  用法和loader 的配置一样
      loaders: ['babel-loader?cacheDirectory'],
      //共享进程池
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true,
    }),
    new OptimizeCssAssetsPlugin()
  ],
  output: {
    filename: 'dev[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
});
