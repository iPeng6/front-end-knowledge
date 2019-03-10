# 常见问题

## defer vs async

1. `<script src="example.js"></script>`

没有 defer 或 async 属性，浏览器会立即加载并执行相应的脚本。也就是说在渲染 script 标签之后的文档之前，不等待后续加载的文档元素，读到就开始加载和执行，此举会阻塞后续文档的加载；

2. `<script defer src="example.js"></script>`

有了 defer 属性，加载后续文档的过程和 js 脚本的加载(此时仅加载不执行)是并行进行的(异步)，js 脚本的执行需要等到文档所有元素解析完成之后，DOMContentLoaded 事件触发执行之前。

3. `<script async src="example.js"></script>`

有了 async 属性，表示后续文档的加载和渲染与 js 脚本的加载和执行是并行进行的，即异步执行；

![](./img/defer-async.jpeg)
也就是说 下载都是并行的，执行都是阻塞的，但是 defer 会放在文档解析完之后执行，async 是下好立即执行

## preload vs prefetch

`preload` 是一种声明式的获取（fetch）指令，可以强制浏览器请求资源，提高资源优先级，将加载与执行分离，不阻塞文档解析，同时不阻塞文档 onload 事件。

```html
<!-- 使用 link 标签静态标记需要优先加载的资源，并且是一定会用到的资源 -->
<link rel="preload" as="style" href="/path/to/style.css" />

<!-- 加载好后立即应用样式，模拟异步加载样式-->
<link rel="preload" as="style" href="test.css" onload="this.rel='stylesheet'" />

<!-- 立刻开始下载main.js(不阻塞parser)，并放在内存中，但不会执行其中的JS语句 -->
<link rel="preload" as="script" href="/main.js" />
```

`prefetch` 提示浏览器这个资源将来可能需要，但是把什么时间加载这个资源的决定权交给浏览器，并以较低的优先级获取，然后缓存到 disk 上，当页面上遇到 script 引用了这个资源可以快速的从 disk 缓存中获取。

```html
<!-- 预先加载一个将来可能会用到资源，但不一定会用到 -->
<link rel="prefetch" as="script" href="next.js" />

<!-- 以较低的优先级加载一个不是那么重要的资源 -->
<link
  rel="prefetch"
  as="script"
  href="https://unpkg.com/prismjs@1.15.0/components/prism-bash.min.js"
  onload="requestAnimationFrame(()=>{
    var script = document.createElement('script'); script.src = this.href; document.body.appendChild(script);
  })"
/>
```

什么时候该用 `preload`？ 什么时候又该用 `prefetch` ?

1. 对于当前页面很有必要的资源使用 preload，对于可能在将来的页面中使用的资源使用 prefetch。
2. preload 可提高资源优先级，prefetch 可以降低资源优先级
3. 用 preload 加载较晚发现的资源，可以较早的加载字体等
4. 如果从一个页面切换到另一个页面，preload 会立即中断，prefetch 不会，可解决跨页打点请求丢失问题
5. 为了提高下一页加载速度而不是当前页的使用 prefetch

参考：

- https://zhuanlan.zhihu.com/p/33759023
- https://juejin.im/post/58e8acf10ce46300585a7a42
- http://www.alloyteam.com/2016/05/preload-what-is-it-good-for-part1/
- https://segmentfault.com/a/1190000011577248
