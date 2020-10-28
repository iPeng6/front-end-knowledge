# HSTS

<details>
<summary>参考</summary>

- [简单易懂 HSTS，你需要它！](https://juejin.im/post/5d8a34ea6fb9a04dfa09561b) _- 蜗牛的北极星之旅 2019 年 09 月 25 日_
- [HTTP 严格传输安全](https://zh.wikipedia.org/wiki/HTTP%E4%B8%A5%E6%A0%BC%E4%BC%A0%E8%BE%93%E5%AE%89%E5%85%A8) _- 维基百科_
- [你所不知道的 HSTS](https://www.barretlee.com/blog/2015/10/22/hsts-intro/) _- Barret 李靖 2015-10-22_


</details>

## 什么是 HSTS

**HSTS，HTTP Strict Transport Security**，简单说就是强制客户端使用 HTTPS 访问页面。

其原理就是：

* 在服务器响应头中添加 Strict-Transport-Security，可以设置 max-age
* 用户访问时，服务器种下这个头
* 下次如果使用 http 访问，只要 max-age 未过期，客户端会进行内部跳转，可以看到 307 Redirect Internel 的响应码
* 变成 https 访问源服务器

```
Status Code: 307 Internal Redirect

strict-transport-security: max-age=31536000; includeSubDomains; preload
```

## 有什么用

- https 更安全
- 避免服务端 301/302 来实现https跳转

## HSTS 问题

* 只有首次种下strict-transport-security响应头才行，如果服务器已经被劫持，用户没有访问过资源，那也没有办法了
* 纯 IP 的请求，HSTS 没法处理，比如 `http://2.2.2.2` ， 即便响应头中设置了 STS，浏览器也不会理会
* HSTS 只能在 80 和 443 端口之间切换，如果服务是 8080 端口，即便设置了 STS，也无效
* 如果浏览器证书错误，一般情况会提醒存在安全风险，然是依然给一个链接进入目标页，而 HSTS 则没有目标页入口，所以一旦证书配置错误，就是很大的故障了
* 如果服务器的 HTTPS 没有配置好就开启了 STS 的响应头，并且还设置了很长的过期时间，那么在你服务器 HTTPS 配置好之前，用户都是没办法连接到你的服务器的，除非 max-age 过期了。
