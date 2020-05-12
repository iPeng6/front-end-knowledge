# Webpack

官方文档

- [中文官网](https://www.webpackjs.com/concepts/)
- [构建性能](https://webpack.docschina.org/guides/build-performance/)

作者：前端宇宙 公号 / 刘小夕 系列

- [4W 字长文带你深度解锁 Webpack 系列(上)](https://mp.weixin.qq.com/s/OBUcxEFXKQQubP08LO2Uhg)
- [万字长文带你深度解锁 Webpack（进阶篇）](https://mp.weixin.qq.com/s/9XGaw2TmGbGolNKM1eJ4wQ)
- [带你深度解锁 Webpack 系列(优化篇)](https://mp.weixin.qq.com/s/1BdKGW43MqWWsdQJ7MYI7w)

## 一、什么是 Webpack

本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包工具。当 webpack 处理应用程序时，它会在内部构建一个 依赖图(dependency graph)，此依赖图会映射项目所需的每个模块，并生成一个或多个 bundle。

## 二、核心概念

- entry: 入口
- output: 输出
- loader: 模块转换器，用于把模块原内容按照需求转换成新内容
- plugins: 扩展插件，在 webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要做的事情

### 1. loader

### 2. plugins

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
  - scope hosting 作用域提升
- babel 配置的优化
  - @babel/plugin-transform-runtime 减少辅助函数重复注入
