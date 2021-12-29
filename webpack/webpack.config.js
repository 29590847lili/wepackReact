const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
  optimization: {
    splitChunks: {
      // 自动提取所有公共模块到单独 bundle
      chunks: 'all'
    }
  },
    mode:'development',
    entry: {
        open: path.resolve(__dirname, '../src/exampleEntry/open.jsx'), // 指定多入口
        index:  path.resolve(__dirname, '../src/exampleEntry/index.jsx'), //指定入口文件，程序从这里开始编译,__dirname当前所在目录, ../表示上一级目录, ./同级目录
    },
    output: {
        path: path.resolve(__dirname, '../mydist'), // 输出的路径
        filename:'[name].[hash:5].js'  // 打包后文件 后缀加hash
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx'],  // 引用省略后缀
        alias:{
            '@': path.resolve('src')
        }
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
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test:  /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                //   options: {
                //     presets: ['@babel/preset-env', '@babel/preset-react']
                //   }
                }
            },
            {
                test: /\.(css|less)$/,
                use: [
                  { loader: "style-loader" },
                  { loader: "css-loader" },
                  {
                    loader: "less-loader",
                    options: {
                      lessOptions: {
                        javascriptEnabled: true,
                      },
                    },
                  },
                ],
              },
              {
                test: /\.s[ac]ss$/i,
                use: [
                  // 将 JS 字符串生成为 style 节点
                  'style-loader',
                  // 将 CSS 转化成 CommonJS 模块
                  'css-loader',
                  // 将 Sass 编译成 CSS
                  'sass-loader',
                ],
              },              
            
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),  // 清除打包文件
　　 　　new HtmlWebpackPlugin({    // 自动生成html
　　　　 　　template: path.resolve(__dirname, '../src/exampleEntry/index.html'),
　　　　　　 inject: true,
            minify:{//对html文件进行压缩
                removeAttributeQuotes:true, //去掉属性的双引号
                removeComments: true,//去掉注释
                collapseWhitespace: true,//去掉空白
            },
            filename: 'index.html', // 打包多入口输出的文件
            chunks: ['index']       // 对应得打包入口文件名
　　　　 }),
        new HtmlWebpackPlugin({
　　　　 　　template: path.resolve(__dirname, '../src/exampleEntry/open.html'),
　　　　　　 inject: true,
            filename: 'open.html', // 此处新增
            chunks: ['open']
　　　　 }),
        new HappyPack({
          //用id来标识 happypack处理那里类文件
          id: 'happyBabel',
          //如何处理  用法和loader 的配置一样
          loaders: ['babel-loader?cacheDirectory'],
          //共享进程池
          threadPool: happyThreadPool,
          //允许 HappyPack 输出日志
          verbose: true,
        })
　　 ]
}