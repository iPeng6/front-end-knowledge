# 高级概念

## 作用域与提升

- [ES6 变量作用域与提升：变量的生命周期详解](https://zhuanlan.zhihu.com/p/28494566)

无论作用域中的声明出现在什么地方，都将在代码本身被执行前首先进行处理。可以将这个过程形象地想象成所有的声明（变量和函数）都会被“移动”到各自作用域的最顶端，这个过程被称为**提升**。

1. 函数的提升优先级比变量高，会提升到变量之前
2. 函数的提升会将整个函数体一起提升
3. 变量重复声明会被忽略，赋值还留在原处等待运行，函数的重复声明会被覆盖

## 闭包

- [从 JS 垃圾回收机制和词源来透视闭包](https://juejin.im/entry/5aebc7a76fb9a07acc119269)

## 调用栈与执行上下文

- [JavaScript 中的执行上下文和调用栈是什么？](https://zcfy.cc/article/what-is-the-execution-context-amp-stack-in-javascript-by-david-shariff-4007.html)

## 原型链

![](img/prototypechain.png)

1. 所有对象的原型都指向 Object.prototype
2. 所有构造函数的原型指向 Function.prototype，包括 Object、Function
3. prototype 本质也是对象，其原型都指向 Object.prototype
4. 而 Object.prototype 的原型指向 null

## 线程机制与事件循环

- [从浏览器多进程到 JS 单线程，JS 运行机制最全面的一次梳理](http://www.dailichun.com/2018/01/21/js_singlethread_eventloop.html)
- [从 setTimeout/setInterval 看 JS 线程](https://palmer.arkstack.cn/2017/12/%E4%BB%8EsetTimeout-setInterval%E7%9C%8BJS%E7%BA%BF%E7%A8%8B/)
- [总是一知半解的 Event Loop](https://juejin.im/post/5927ca63a0bb9f0057d3608e)
