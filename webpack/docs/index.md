---
sidebar: auto
footer: MIT Licensed | Copyright © 2020 Yinmu
---

# 配置

在此文档中，我们将直接使用配置好的详尽的文件，**通过注释的方式进行详细的解析**。

您可根据需要自行删减。

## 项目目录结构

```js
project/
  - config/
    - webpack.base.js
    - webpack.dev.js
    - webpack.prod.js
src/
  - index.js
package.json
```

以 `/` 来表示这是一个文件夹。

## 单入口项目

### webpack.base.js

我们在这个文件中存放开发环境和生产环境都会需要的配置。

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  /**
   * @property 单入口
   * @description 项目入口文件
   */
  entry: './src/index',
  /**
   * @property 出口
   * @description 项目最终打包后文件所在目录
   */
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')   // 必须是绝对路径
  },
  /**
   * @property 模式
   * @description 开发环境模式
   */
  mode: 'development',
  /**
   * @property 模块
   * @description 可配置 loader
   */
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ],
              plugins: [
                // 如果用到 generator 或者 async await 可以自行安装
                // @babel/runtime 以及 @babel/polyfill 需要 --save 一起打包到线上代码中
                // ['@babel/plugin-trnsform-runtime'],
                // ['@babel/runtime']
              ]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              outputPath: 'img/'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-withimg-loader'
          }
        ]
      }
    ]
  },
  /**
   * @property 插件
   * @description 可使用插件来实现特定效果
   */
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css' 
    })
  ],
  devtool: 'source-map',
  resolve: {
    modules: [path.resolve('node_modules')],
    extensions: ['.js', '.scss', '.css']
  },
  /**
   * @property 开发模式下本地服务配置
   * @description 配置项目启动之后所在的地址，以达到热更新预览的效果
   */
  devServer: {
    progress: true,
    contentBase: path.resolve(__dirname, 'dist')
  }
}
```

### webpack.dev.js

我们在这个文件中存放开发环境需要的配置，同时引入我们之前定义的 `webpack.base.js` 文件，并将配置通过第三方包 `webpack-merge` 进行合并。

```js
const path = require('path')
const Webpack = require('webpack')
const { smart } = require('webpack-merge')
const base = require('./webpack.base')

module.exports = smart(base, {
  /**
   * @property 模式
   * @description 开发环境模式
   */
  mode: 'development',
  /**
   * @property 插件
   * @description 开发环境所需要的一些插件
   */
  plugins: [
    new Webpack.NamedModulesPlugin(),   // 打印更新的模块路径
    new Webpack.HotModuleReplacementPlugin()   // 热更新插件
  ],
  /**
   * @property sourceMap
   * @description 生成 srouceMap 文件
   */
  devtool: 'source-map',
  /**
   * @property 开发模式下本地服务配置
   * @description 配置项目启动之后所在的地址，以达到热更新预览的效果
   */
  devServer: {
    hot: true,   // 热更新
    progress: true,   // 显示进度条
    contentBase: path.resolve(__dirname, 'dist')
  }
})
```

### webpack.prod.js

我们在这个文件中存放生产环境需要的配置，同时引入我们之前定义的 `webpack.base.js` 文件，并将配置通过第三方包 `webpack-merge` 进行合并。

```js
const { smart } = require('webpack-merge')
const base = require('./webpack.base')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Webpack = require('webpack')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')

module.exports = smart(base, {
  /**
   * @property 模式
   * @description 生产环境模式
   */
  mode: 'production',
  /**
   * @property 模块
   * @description 可配置 loader
   */
  module: {
    // noParse: ''   // 对某些已知没有依赖的模块，不再进行检测，节省打包时间
  },
  /**
   * @property 插件
   * @description 打包生产环境时所需要的一些插件
   */
  plugins: [
    new CleanWebpackPlugin(),
    new Webpack.BannerPlugin({
      banner: 'CopyRight © https://yinmu.me'
    })
  ],
  /**
   * @property 优化项
   * @description 打包生产环境时所需要的优化
   */
  optimization: {
    minimizer: [
      new UglifyjsWebpackPlugin({
        cache: true,
        parallel: true
      }), 
      new OptimizeCssAssetsWebpackPlugin()
    ]
  },
  /**
   * @property sourceMap
   * @description 不生成 srouceMap 文件
   */
  devtool: false
})
```