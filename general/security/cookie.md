# Cookie 安全

## HttpOnly

## Samesite Cookie

防止 CSRF 攻击的办法已经有上面的预防措施。为了从源头上解决这个问题，Google 起草了一份草案来改进 HTTP 协议，那就是为 Set-Cookie 响应头新增 Samesite 属性，它用来标明这个 Cookie 是个“同站 Cookie”，同站 Cookie 只能作为第一方 Cookie，不能作为第三方 Cookie，Samesite 有两个属性值，分别是 Strict 和 Lax，下面分别讲解：

### Samesite=Strict

这种称为严格模式，表明这个 Cookie 在任何情况下都不可能作为第三方 Cookie，绝无例外。比如说 b.com 设置了如下 Cookie：

```
Set-Cookie: foo=1; Samesite=Strict
Set-Cookie: bar=2; Samesite=Lax
Set-Cookie: baz=3
```

我们在 a.com 下发起对 b.com 的任意请求，foo 这个 Cookie 都不会被包含在 Cookie 请求头中，但 bar 会。举个实际的例子就是，假如淘宝网站用来识别用户登录与否的 Cookie 被设置成了 Samesite=Strict，那么用户从百度搜索页面甚至天猫页面的链接点击进入淘宝后，淘宝都不会是登录状态，因为淘宝的服务器不会接受到那个 Cookie，其它网站发起的对淘宝的任意请求都不会带上那个 Cookie。

### Samesite=Lax

这种称为宽松模式，比 Strict 放宽了点限制：假如这个请求是这种请求（改变了当前页面或者打开了新页面）且同时是个 GET 请求，则这个 Cookie 可以作为第三方 Cookie。比如说 b.com 设置了如下 Cookie：

```
Set-Cookie: foo=1; Samesite=Strict
Set-Cookie: bar=2; Samesite=Lax
Set-Cookie: baz=3
```

当用户从 a.com 点击**链接**进入 b.com 时，foo 这个 Cookie 不会被包含在 Cookie 请求头中，但 bar 和 baz 会，也就是说用户在不同网站之间通过**链接跳转**是不受影响了。但假如这个请求是从 a.com 发起的对 b.com 的**异步请求**，或者页面跳转是通过表单的 post 提交触发的，则 bar 也不会发送。
