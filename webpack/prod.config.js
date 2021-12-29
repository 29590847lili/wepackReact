const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const { merge }= require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  mode: 'production',
  optimization: {
    concatenateModules: true,// 以安全地被合并到单一模块中 生产模式被启用，其他模式禁用
  },
  // performance: {
  //   hints: false,
  //   //hints: 'error',
  // },
  plugins: [
    new CleanWebpackPlugin(),
    //使用 ParallelUglifyPlugin 并行压缩输出JS代码
    new ParallelUglifyPlugin({
      // 传递给 UglifyJS的参数如下：
      uglifyJS: {
        output: {
          //是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，
          //可以设置为false
          beautify: false, // 是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
          comments: true
        },
        compress: {
          //是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
          drop_console: true,
          //是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 5, 默认为不
          //转换，为了达到更好的压缩效果，可以设置为false
          collapse_vars: false,
          //是否提取出现了多次但是没有定义成变量去引用的静态值，比如将 x = 'xxx'; y = 'xxx'  转换成
          //var a = 'xxxx'; x = a; y = a; 默认为不转换，为了达到更好的压缩效果，可以设置为false
          reduce_vars: false
        }
      }
    }),
  ],
  output: {
    filename: 'pro[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
});
