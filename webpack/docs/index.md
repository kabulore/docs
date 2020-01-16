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
const path = require('path)

module.exports = {
  /**
   * @type 基础项
   * @property 入口
   * @description 项目打包入口文件
   */
  entry: './src/index',
  /**
   * @type 基础项
   * @property 出口
   * @description 项目最终打包后文件所在目录，必须是绝对路径
   */
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js'
  },
  module: {
    /**
     * @type 基础项
     * @property loader
     * @description 配置解析各种文件的 loader 。loader 的规则为自右向左、自下向上。
     */
    rules: {

    }
  }
}
```
