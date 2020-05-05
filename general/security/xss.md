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

### 1. Cookie 窃取：

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

纯粹发生在客户端的 XSS 攻击，比如：http://www.some.site/page.html?default=French

```html
<select>
  <script>
    document.write(
      '<option value=1>' +
        document.location.href.substring(documnent.location.href.indexOf('default=') + 8) +
        '</option>',
    )
    document.write('<option value=2>English</option>')
  </script>
</select>
```

恶意链接

```
http://www.some.site/page.html?default=<script>alert(document.cookie)</script>
```

## 四、避免

- 编码转义
- 过滤校验
- CSP (Content Security Policy)
