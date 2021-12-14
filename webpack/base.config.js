const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const packageInfo = require('../package.json');

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
                // use: {
                //   loader: 'babel-loader',
                // }
                test: [/\.jsx$/, /\.js$/],
                include: [path.resolve(process.cwd(), 'src')],
                loader: 'babel-loader',
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
            //   {
            //     test: /\.(woff|woff2|eot|ttf|otf)$/,
            //     loader: 'file-loader?name=static/fonts/[name].[ext]',
            //   }, {
            //     test: /\.(png|svg|jpg|gif)$/,
            //     use: [
            //       {
            //         loader: 'url-loader?name=static/images/[name].[ext]',
            //         options: {
            //           limit: 8192,
            //         },
            //       },
            //     ],
            //   }             
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
　　 　　new HtmlWebpackPlugin({
　　　　 　　template: path.resolve(__dirname, '../src/index.html'),
　　　　　　 title: 'my project',
            version: `${packageInfo.version}`,
　　　　 })
　　 ]
}