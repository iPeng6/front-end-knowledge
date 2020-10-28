# 源码学习与实现

实现地址 https://github.com/iPeng6/source-practice

## Todo

- [ ] vue-ui(element)
  - [x] Form\FormItem
  - [x] Message
- [x] vue-router
- [x] vuex
- [x] vue1.0
- [x] vue2.x
- [ ] vue3.0
- [ ] react-ui(antd)
  - [x] Form
  - [ ] Message
- [ ] react
- [ ] react-router
- [ ] redux
- [ ] babel
- [ ] webpack
- [ ] Promise
- [ ] Axios
- [ ] koa

## 为什么要阅读源码

人要饮水思源，活的明白通透

- 学习设计思想
- 加深知识理解
- 提高编程水平
- 面试不被忽悠
- 增强自信心
- 娱乐好奇感受精妙

## 如何阅读源码

- 站在巨人的肩膀上，提前阅读一些相关优质文章
  - 一方面有个大致了解，有个总体地图，避免到时走迷宫抓不住重点
  - 另一方面可以避免错失一些必要细节，避免走马观花
- 平时积累一些工作中遇到的问题，带着问题到源码里找答案，寻宝
- 一口吃不下一个大胖子，先能跑起来一个基本小例子
- 实际操作
  1. 首先 fork 一份源码库方便自己本地切分支打注释 log，提交笔记等
  2. 构建出带 source-map 的源码，方便调试打断点，观察调用栈等熟悉源码执行流程
    ```
    webpack --watch --config build/webpack.dev.config.js --devtool source-map
    rollup -w -c scripts/config.js --sourcemap
    ```
  3. 通过 package.json scripts 找配置找入口，分析目录结构，找到入口构造函数，找到兴趣点，记录文件方法等方便后续打断点
  4. 跑跑源码里的Demo，devtool 里 source -> cmd+p 直接定位文件打断点单步，ipad 上画画图
  5. 脚手架生成一个快速上手的小例子，尝试自己实现，逐步替换掉库引用，使得依然可以跑起来，里程碑
  6. 功能补充
