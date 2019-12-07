# TypeScript

- [react-typescript-cheatsheet](https://github.com/sw-yx/react-typescript-cheatsheet)
- [深入理解 Typescript](https://jkchao.github.io/typescript-book-chinese/)
- [Typescript 入门教程](https://ts.xcatliu.com/)

- [索引类型、映射类型与条件类型](https://cloud.tencent.com/developer/article/1444693)


## TypeScript 是什么

1. 是微软开发的一项开源技术；
2. 属于 JavaScript 类型的超集，即 JavaScript 支持的 TypeScript 全都支持，但是 TS 支持的 JS 原生不一定支持；
3. 给予原生 JavaScript 类型支持，原生 JavaScript 其实是动态类型的编程语言，有一句话大家应该听说过，「动态类型一时爽，代码重构火葬场」；而 TypeScript 的存在，就相当于对 JavaScript 在大型项目的开发上，给予有力的支撑。

## 为什么选择 TypeScript

### 辅助开发流

我们在进行软件开发的时候，通常都是接口先行的（这里的接口不是狭义上的 interface）。
具体到前端来说，面对一个页面，即是自顶向下的，设计组件。
这其中就包括组件功能的划分，组件之间的交互，以及理解如何组合组件形成一个新的子系统，各个新的子系统又联系在一起，形成一个更大的系统，最终有效的结合在一起，组成最后的页面。
在这些逻辑关系中，接口都发挥着重要的作用。而现如今的前端，除了需要处理 view 层逻辑，还需要处理 service 逻辑以及页面中间态逻辑，这其中 TypeScript 能发挥巨大价值。
没有理清楚接口就尝试写代码，相当于一开始就陷入细节的陷阱里。
其实不仅是写代码，如果有熟悉写书的朋友一定知道，在写一本书之前，最先做的就是写目录，一本书的目录写好了，那么这本书的整体方向脉络基本就决定，而剩下要去做的，就是填充内容了。

### 更早发现错误

前端业务里，有大部分的 bug 是由于调用方对实现方所需的类型的不确定导致的，而通过 typescript 的类型校验，可以直接在编译阶段直接规避该问题。

### 显著提升的代码效率

当你的项目中使用 TypeScript 时，大部分时候我们都不需要关注所调用的代码具体是怎么实现的，依赖了哪些参数，只要通过类型就可以初步判断。
并且在 vscode 编辑器强大的支持下，我们可以实现诸如代码自动引入，类型未编译即可校验等强大功能。
