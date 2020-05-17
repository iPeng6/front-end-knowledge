# 跨域

<details>
<summary>引用参考 - 2020/04/27</summary>

- [跨域](https://juejin.im/post/59c132415188256bb018e825) _- 考拉海购前端团队 2017 年 09 月 19 日_
- [浏览器的同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy) _- MDN_
- [跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html) _- 阮一峰 2016 年 4 月 12 日_

</details>

## 一、Why

### 同源策略

**同源策略**: 是一个重要的安全策略，它用于限制一个源 `origin` 的文档或者它加载的脚本与另一个源的资源的交互。用于防止恶意的网站窃取数据，保证用户信息的安全。

**同源定义**: 如果两个 URL 拥有相同的协议`protocol`，端口`port`和主机`host`，那么这两个 URL 就是同源的，这个方案也被称为“协议/主机/端口元组”，或者直接是 “元组”。

那么如果没有同源策略会怎样？

1. CSRF 攻击

   比如购物网站 A，有个接口请求可以将商品添加到购物车 `/api/cart/add?productId=xxx`，那么促销网站 B 就可以诱导你打开 B 网站，然后直接跨域直接发起请求，利用浏览器自动会带上 cookie 的机制，让网站 A 以为是用户自己主动发起的请求

2. 没有限制的 DOM 读取

   比如钓鱼网站直接用 iframe 嵌入原来的网站，父窗体通过 js 就可以直接操控 DOM 读取密码等

```js
// html
//<iframe name="yinhang" src="www.yinhang.com"></iframe>

// 由于没有同源策略的限制，钓鱼网站可以直接拿到别的网站的DOM
const iframe = window.frames['yinhang']
const node = iframe.document.getElementById('你输入账号密码的Input')
console.log(`拿到了这个${node}，我还拿不到你刚刚输入的账号密码吗`)
```

### 同源策略的限制

严格的说，浏览器并不是拒绝所有的跨域请求，实际上拒绝的是跨域的读操作。

- 通常浏览器允许进行跨域写操作（Cross-origin writes），如链接，重定向以及表单提交；
- 通常浏览器允许跨域资源嵌入（Cross-origin embedding），如 img、script 标签；
- 通常浏览器不允许跨域读操作（Cross-origin reads）。

具体有

1. Cookie、LocalStorage 和 IndexDB 无法读取。
2. DOM 无法获得。
3. AJAX 请求不能发送。

### 为什么有跨域需求?

1. HTTP 连接数的限制，使得分域成为一种优化方案，通常页面的 web 服务会跟后端的接口域名分开部署，因此会出现跨域请求。
2. 工程服务化后，不同职责的服务分散在不同的工程中，往往这些工程的域名是不同的，但一个需求可能需要对应到多个服务，这时便需要调用不同服务的接口，因此会出现跨域请求。

那么，如何规避呢？

## 二、跨页面数据共享

### 1、document.domain

#### (1） 可以共享子域下的 Cookie

Cookie 是服务器写入浏览器的一小段信息，只有同源的网页才能共享。但是，两个网页一级域名相同，只是二级域名不同，浏览器允许通过设置 document.domain 共享 Cookie。

举例来说，\
A 网页是`http://w1.example.com/a.html`，\
B 网页是`http://w2.example.com/b.html`，\
那么只要设置相同的 document.domain，两个网页就可以共享 Cookie。

```js
document.domain = 'example.com'
```

另外，服务器如果指定 Cookie 的所属域名为一级域名，比如.example.com。那么子域名就也都可以访问这个 Cookie

```
Set-Cookie: key=value; domain=.example.com; path=/
```

如果服务端给 cookie 加上了 `HttpOnly` 标志，那么 js 就不可以直接访问到 document.cookie

```
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
```

#### (2）窗口间可以拿到 DOM

如果两个网页不同源，就无法拿到对方的 DOM。典型的例子是 iframe 窗口和 window.open 方法打开的窗口，它们与父窗口无法通信。

如果两个窗口一级域名相同，只是二级域名不同，那么设置上`document.domain`属性，就可以规避同源政策，拿到 DOM。

!> 注意，document.domain 这种方法只适用于 Cookie 和 iframe 窗口且一级域名相同的情况下，LocalStorage 和 IndexDB 无法通过这种方法规避同源政策，而要使用 PostMessage API。

### 2、PostMessage API

通常，对于两个不同页面的脚本，只有当执行它们的页面位于具有相同的协议（通常为 https），端口号（443 为 https 的默认值），以及主机 (两个页面的模数 Document.domain 设置为相同的值) 时，这两个脚本才能相互通信。window.postMessage() 方法提供了一种受控机制来规避此限制，只要正确的使用，这种方法就很安全。

```js
// 语法
otherWindow.postMessage(message, targetOrigin, [transfer])
// otherWindow 其他窗口的一个引用 比如： iframe.contentWindow 、执行window.open返回的窗口
// targetOrigin 通过窗口的origin属性来指定哪些窗口能接收到消息事件，其值可以是字符串"*"或者一个URI

// 消息接收
window.addEventListener(
  'message',
  (event) => {
    // 这里不准确，chrome没有这个属性，chrome的 event.origin 为 event.originalEvent.origin
    // var origin = event.origin || event.originalEvent.origin;
    var origin = event.origin
    if (origin !== 'http://example.org:8080') return

    // ...
    // event.data // 消息内容
    // event.origin // 消息发向的网址
    // event.source // 发送消息的窗口

    event.source.postMessage('I got it!', '*')
  },
  false,
)
```

## 三、跨域接口请求

### 1、JSONP

**原理**：虽然因为同源策略的影响，不能通过 XMLHttpRequest 请求不同域上的数据（Cross-origin reads）。但是，在页面上引入不同域上的 js 脚本文件却是可以的（Cross-origin embedding）。

实现

```js
function jsonp({ url, data, success, fail }) {
  // 安装回调
  const fnName = 'jsonp' + Math.random().toString(36).slice(-8)
  window[fnName] = success

  // 拼接url
  const query = Object.keys(data)
    .map((key) => `${key}=${data[key]}`)
    .join('&')
  const separator = url.includes('?') ? '&' : '?'
  url = url + separator + query + '&callback=' + fnName

  // 创建script请求
  const script = document.createElement('script')
  script.src = url
  script.onerror = fail
  document.head.appendChild(script)
}

// 调用
jsonp({
  url: 'http://www.example.com',
  data: { id: 1 },
  success(res) {
    console.log(res)
  },
  fail(error) {
    console.log(error)
  },
})
```

#### JSONP 的优缺点

优点：兼容性好（兼容低版本 IE）

缺点：

1. JSONP 只支持 GET 请求；
2. XMLHttpRequest 相对于 JSONP 有着更好的错误处理机制

### 2、CORS

CORS 是一个 W3C 标准，全称是"跨域资源共享"（Cross-origin resource sharing），它允许浏览器向跨源服务器，发出 XMLHttpRequest 请求，从而克服了 AJAX 只能同源使用的限制。值得注意的是浏览器将 CORS 请求分成了两类：简单请求（simple request）和非简单请求（not-so-simple request）。

#### （1）简单请求

只要同时满足以下两大条件，就属于简单请求。

1. 请求方法是以下三种方法之一：

   - HEAD
   - GET
   - POST

2. HTTP 的头信息不超出以下几种字段：

   - Accept
   - Accept-Language
   - Content-Language
   - Last-Event-ID
   - Content-Type：只限于三个值
     - text/plain
     - application/x-www-form-urlencoded
     - multipart/form-data
   - DPR
   - Downlink
   - Save-Data
   - Viewport-Width
   - Width

这是为了兼容表单（form），因为历史上表单一直可以发出跨域请求。AJAX 的跨域设计就是，只要表单可以发，AJAX 就可以直接发。凡是不同时满足上面两个条件，就属于非简单请求。

#### （2）非简单请求

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是`PUT`或`DELETE`，或者`Content-Type`字段的类型是`application/json`。

非简单请求的 CORS 请求，会在正式通信之前，增加一次 `OPTIONS` 类型的 HTTP 查询请求，称为"预检"请求（preflight）。

#### （3）相关请求响应头

请求

- **Origin**: 浏览器自动带上，用来说明本次请求来自哪个源（协议 + 域名 + 端口），服务端会根据此判断是否允许

预检请求

- **Access-Control-Request-Method**: 该字段是必须的，用来列出浏览器的 CORS 请求会用到哪些 HTTP 方法
- **Access-Control-Request-Headers**: 该字段是一个逗号分隔的字符串，指定浏览器 CORS 请求会额外发送的头信息字段

响应

- **Access-Control-Allow-Origin**: 必需，没有默认不允许，具体域名或者\*
- **Access-Control-Allow-Methods**: 必需，支持的所有跨域请求的方法
- **Access-Control-Allow-Headers**: 请求有额外头字段就必需，表明服务器支持的所有头信息字段
- **Access-Control-Allow-Credentials**: 可选，bool，表示是否允许发送 Cookie
- **Access-Control-Max-Age**: 可选，用来指定本次预检请求的有效期，单位为秒
- **Access-Control-Expose-Headers**: 该字段可选。CORS 请求时，XMLHttpRequest 对象的 getResponseHeader()方法只能拿到 6 个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在 Access-Control-Expose-Headers 里面指定

以 Node.js 后台配置(express 框架)为例：

```js
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  //这段仅仅为了方便返回json而已
  res.header('Content-Type', 'application/json;charset=utf-8')
  if (req.method == 'OPTIONS') {
    //让options请求快速返回
    res.sendStatus(200)
  } else {
    next()
  }
})
```

#### （4）OPTIONS 预检的优化

这里强调一下 `Access-Control-Max-Age`, 加上这个响应头可以用来指定本次预检请求的有效期，单位为秒。在这个时间范围内，所有同类型的请求都将不再发送预检请求而是直接使用此次返回的头作为判断依据，可以大幅优化请求次数。

#### （5） withCredentials 属性

CORS 请求默认不发送 Cookie 和 HTTP 认证信息。如果要把 Cookie 发到服务器，一方面要服务器同意，指定 Access-Control-Allow-Credentials 字段。

```
Access-Control-Allow-Credentials: true
```

另一方面，开发者必须在 AJAX 请求中打开 withCredentials 属性。

```js
var xhr = new XMLHttpRequest()
xhr.withCredentials = true
```

!> 注意，如果要发送 Cookie，Access-Control-Allow-Origin 就不能设为星号，必须指定明确的、与请求网页一致的域名。

整个 CORS 通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS 通信与同源的 AJAX 通信没有差别，代码完全一样。浏览器一旦发现 AJAX 请求跨源，就会自动添加这些附加的头信息，有时还会多出一次附加的预检，但用户不会有感觉。

因此，实现 CORS 通信的关键是服务器。只要服务器实现了 CORS 接口，就可以跨源通信。

## 四、代理

在开发环境，为了临时规避跨域接口的请求，可以通过本地 node 代理转发来规避，这里以 webpack 为例：

```js
{
  devServer: {
    port: port,
    open: true,
    overlay: {
       warnings: false,
      errors: true,
    },
    before: require('./mock/mock-server.js'),
    proxy: {
      '/proxy': {
        target: process.env.VUE_APP_BASE_API,
        pathRewrite: { '^/proxy': '' },
        changeOrigin: true, // target是域名的话，需要这个参数，
        secure: false, // 设置支持https协议的代理
      },
    },
  },
}
```
