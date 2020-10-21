# XSS

<details>
<summary>引用参考 - 2020/04/27</summary>

- [【译文】了解 XSS 攻击](https://zhuanlan.zhihu.com/p/21308080)
- [如何让前端更安全？——XSS 攻击和防御详解](https://mp.weixin.qq.com/s/6ChuUdOm7vej8vQ3dbC8fw?)
- [前端安全系列（一）：如何防止 XSS 攻击？](https://tech.meituan.com/2018/09/27/fe-security.html) _- 李阳 2018 年 09 月 27 日_

</details>

## 一、什么是 XSS

跨站点脚本（Cross-site scripting，XSS）是一种允许攻击者在另一个用户的浏览器中执行恶意脚本的脚本注入式攻击。

攻击者并不直接锁定受害者。而是利用一个受害者可能会访问的存在漏洞的网站，通过这个网站间接把恶意代码呈递给受害者。对于受害者的浏览器而言，这些恶意代码看上去就是网站正常的一部分，而网站也就无意中成了攻击者的帮凶。

## 二、恶意脚本能做啥

### 1. Cookie 窃取

攻击者能够通过`document.cookie`访问受害者与网站关联的 cookie，然后传送到攻击者自己的服务器，接着从这些 cookie 中提取敏感信息，如 Session ID。

### 2. 记录用户行为（Keylogging）

攻击者可以使用 `addEventListener`方法注册用于监听键盘事件的回调函数，并且把所有用户的敲击行为发送到他自己的服务器，这些敲击行为可能记录着用户的敏感信息，比如密码和信用卡号码。

### 3. 钓鱼网站（Phishing）

攻击者可以通过修改 DOM 在页面上插入一个假的登陆框，也可以把表单的`action`属性指向他自己的服务器地址，然后欺骗用户提交自己的敏感信息。

## 三、XSS 攻击类型

总体来说，XSS 分三类，存储型 XSS、反射型 XSS、基于 DOM 的 XSS 攻击。

### 1. 存储型 XSS

数据库中存有的存在 XSS 攻击的数据，返回给客户端。若数据未经过任何转义。被浏览器渲染。就可能导致 XSS 攻击；

### 2. 反射型 XSS

将用户输入的存在 XSS 攻击的数据，发送给后台，后台并未对数据进行存储，也未经过任何过滤，直接返回给客户端。被浏览器渲染。就可能导致 XSS 攻击；

### 3. DOM-XSS

纯粹发生在客户端的 XSS 攻击，这就非常值得留意了，因为即便你后端服务做到绝对安全也没用，这锅都得前端来背

比如：`http://www.some.site/page.html?lang=en` URL 上的参数直接拿来用了

```html
<script>
  const lang = document.location.href.substring(documnent.location.href.indexOf('lang=') + 5)
  document.querySelector('#currentLang').innerHTML = lang
</script>
```

恶意链接

```
http://www.some.site/page.html?lang=<script>alert(document.cookie)</script>
```

## 四、防范

根据客户端不可信任原则，前后端都必须校验处理

- 编码转义
  - html 特殊字符转义
  - url 编码
- 过滤校验
  - 危险标签过滤或校验拒绝
  - 黑白名单机制，只允许部分标签属性
- [CSP (Content Security Policy)](https://content-security-policy.com/)
  - 不许允不可信赖的来源：只有来自明确定义过的可信赖来源的外链资源才可以被下载
  - 不允许内联资源：行内脚本和内联 CSS 不允许被执行。
  - 不允许 eval 函数：Javascript 的`eval`函数不可以被使用
- HttpOnly Cookie

CSP 使用方式

meta

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self' ssl.google-analytics.com;" />
```

header

```
Content-Security-Policy: default-src 'none'; script-src 'self' ssl.google-analytics.com;
```
