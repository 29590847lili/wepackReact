const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const packageInfo = require('../package.json');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry:  path.resolve(__dirname, '../src/index.jsx'), //指定入口文件
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.scss', 'css'],
        alias:{
            '@': path.resolve('src'),
            'shared': path.resolve(__dirname, '../src/app/shared/'),
        }
      },
    module: {
        rules: [
            {
                // test:  /\.(js|jsx)$/,
                // exclude: /node_modules/,
                test: [/\.jsx$/, /\.js$/],
                include: [path.resolve(process.cwd(), 'src')],
                use: {
                  loader: 'babel-loader',
                }
            },
            {
                test: /\.(css|less)$/,
                use: [
                  //{ loader: "style-loader" },
                  MiniCssExtractPlugin.loader,
                  { 
                    loader: "css-loader",
                    options: {
                      modules: true,
                      importLoaders: 1,
                    },
                  },
                  {
                    loader:'postcss-loader', 
                  },
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
                  //'style-loader', // 将 JS 字符串生成为 style 节点
                  MiniCssExtractPlugin.loader,
                  'css-loader', // 将 CSS 转化成 CommonJS 模块
                  'postcss-loader',
                  'sass-loader', // 将 Sass 编译成 CSS
                ],
              }, 
              {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader?name=static/fonts/[name].[ext]',
              }, 
              {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                  {
                    loader: 'url-loader?name=static/images/[name].[ext]',
                    options: {
                      limit: 8192,
                    },
                  },
                ],
              }             
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
　　 　　new HtmlWebpackPlugin({
　　　　 　　template: path.resolve(__dirname, '../src/index.html'),
　　　　　　 title: 'my project',
            version: `${packageInfo.version}`,
　　　　 }),
        new MiniCssExtractPlugin({
          filename: 'css/styles.[contenthash:8].css',
          linkType: "text/css",
        })
　　 ]
}