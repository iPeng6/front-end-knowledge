# 常见问题

## preload vs prefetch

preload 是声明式的 fetch，可以强制浏览器请求资源，同时不阻塞文档 onload 事件。

Prefetch 提示浏览器这个资源将来可能需要，但是把决定是否和什么时间加载这个资源的决定权交给浏览器。

什么时候该用 `<link rel=”preload”>`？ 什么时候又该用 `<link rel=”prefetch”>` ?
建议：对于当前页面很有必要的资源使用 preload，对于可能在将来的页面中使用的资源使用 prefetch。
