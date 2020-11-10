# Webpack

<details>
<summary>参考</summary>

官方文档

- [中文官网](https://www.webpackjs.com/concepts/)
- [构建性能](https://webpack.docschina.org/guides/build-performance/)

作者：前端宇宙 公号 / 刘小夕 系列

- [4W 字长文带你深度解锁 Webpack 系列(上)](https://mp.weixin.qq.com/s/OBUcxEFXKQQubP08LO2Uhg)
- [万字长文带你深度解锁 Webpack（进阶篇）](https://mp.weixin.qq.com/s/9XGaw2TmGbGolNKM1eJ4wQ)
- [带你深度解锁 Webpack 系列(优化篇)](https://mp.weixin.qq.com/s/1BdKGW43MqWWsdQJ7MYI7w)


</details>


## 一、什么是 Webpack

本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包工具。当 webpack 处理应用程序时，它会在内部构建一个 依赖图(dependency graph)，此依赖图会映射项目所需的每个模块，并生成一个或多个 bundle。

## 二、核心概念

- entry: 入口
- output: 输出
- loader: 模块转换器，用于把模块原内容按照需求转换成新内容
- plugins: 扩展插件，在 webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要做的事情

### 1. loader

[loaders](https://www.webpackjs.com/loaders/) webpack 可以使用 loader 来预处理文件。这允许你打包除 JavaScript 之外的任何静态资源。你可以使用 Node.js 来很简单地编写自己的 loader。

* url-loader 像 file loader 一样工作，但如果文件小于限制，可以返回 data URL
* file-loader 将文件发送到输出文件夹，并返回（相对）URL
* babel-loader 加载 ES2015+ 代码，然后使用 Babel 转译为 ES5
* style-loader 将模块的导出作为样式添加到 DOM 中
* css-loader 解析 CSS 文件后，使用 import 加载，并且返回 CSS 代码
* less-loader 加载和转译 LESS 文件
* sass-loader 加载和转译 SASS/SCSS 文件
* postcss-loader 使用 PostCSS 加载和转译 CSS/SSS 文件
* vue-loader 加载和转译 Vue 组件

### 2. plugins

[plugins](https://www.webpackjs.com/plugins/) webpack 有着丰富的插件接口(rich plugin interface)。webpack 自身的多数功能都使用这个插件接口。这个插件接口使 webpack 变得极其灵活。

* HtmlWebpackPlugin：会在打包结束之后自动创建一个index.html, 并将打包好的JS自动引入到这个文件中
* clean-webpack-plugin：在打包之前将我们指定的文件夹清空。应用场景每次打包前将目录清空, 然后再存放新打包的内容, 避免新老混淆问题，非官方功能。
* copy-webpack-plugin：打包相关的文档。除了JS/CSS/图片/字体图标等需要打包以外, 可能还有一些相关的文档也需要打包（word等）。文档内容是固定不变的, 我们只需要将对应的文件拷贝到打包目录中即可。
* mini-css-extract-plugin：是一个专门用于将打包的CSS内容提取到单独文件的插件。前面我们通过style-loader打包的CSS都是直接插入到head中的。
* webpack-merge：用于优化配置文件。针对不同的环境将不同的配置写到不同的文件中。如：common文件做公共配置项文件，dev文件为开发配置，prod文件为上线配置。在dev，prod文件中配置webpack-merge，使其分别同common文件合并，并暴露给外界。
* SplitChunksPlugin：Code-Splitting实现的底层就是通过Split-Chunks-Plugin实现的，其作用就是代码分割。
* HMR(HotModuleReplacementPlugin)：热更新插件, 会在内容发生改变的时候，时时的更新（打包）修改的内容但是不会重新刷新网站。推荐使用
* babel：将ES678高级语法转换为ES5低级语法，否则在低级版本浏览器中我们的程序无法正确执行。使用说明
* babel-preset-env：告诉webpack我们需要兼容哪些浏览器，然后babel就会根据我们的配置自动调整转换方案, 如果需要兼容的浏览器已经实现了, 就不转换了。
* babel/polyfill：没有对应关系就是指E5中根本就没有对应的语法, 例如Promise, includes等方法是ES678新增的。ES5中根本就没有对应的实现, 这个时候就需要再增加一些额外配置, 让babel自己帮我们实现对应的语法。

## 三、性能优化

- 尽量使用较新版本的 webpack、node
- 减少文件处理量
  - exclude/include 确保编译最少的文件
  - externals 排除 cdn 引用库
  - noParse 排除一些模块转换
  - IgnorePlugin 忽略第三方包指定目录 如语言包
- 拆包
  - DllPlugin 不经常更新的第三方库打成 dll 库单独引用
  - optimization.splitChunks 抽离公共代码公共组件或进一步分包
  - 借助 webpack-bundle-analyzer 分析
- 缓存
  - cache-loader 性能不够缓存来凑
  - HardSourceWebpackPlugin 为模块提供中间缓存
- 多线程
  - Happypack 启用多个子进程去并发处理
  - thread-loader 启用 worker 池
- webpack 自身的优化
  - tree-shaking
  - scope hoisting 作用域提升
- babel 配置的优化
  - @babel/plugin-transform-runtime 减少辅助函数重复注入
