# 跨域

<details>
<summary>引用参考 - 2020/04/27</summary>

- [跨域](https://juejin.im/post/59c132415188256bb018e825) _- 考拉海购前端团队 2017 年 09 月 19 日_
- [Same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) _- MDN Last modified: Feb 22, 2020_
- [不要再问我跨域的问题了](https://segmentfault.com/a/1190000015597029) _- 写 Bug 更新于 2018-07-12_

</details>

## 一、why

同源: 如果两个页面拥有相同的协议（protocol），端口（port）和主机（host），那么这两个页面就属于同一个源（origin）。

同源策略([Same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy))：

- 通常浏览器允许进行跨域写操作（Cross-origin writes），如链接，重定向；
- 通常浏览器允许跨域资源嵌入（Cross-origin embedding），如 img、script 标签；
- 通常浏览器不允许跨域读操作（Cross-origin reads）。

## 二、解决方案

1. jsonp
2. cors
3. postMessage
