# OAuth2.0

<details>
<summary>引用参考 - 2020年03月22日</summary>

- [微信网页授权](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)
- [OAuth 2.0 的四种方式](http://www.ruanyifeng.com/blog/2019/04/oauth-grant-types.html)

</details>

OAuth（开放授权）是一个开放标准，允许用户让第三方应用访问该用户在某一网站上存储的私密的资源（如头像、昵称、联系方式等），而无需将用户名和密码提供给第三方应用。目前版本 2.0 版本[RFC6749](http://www.rfcreader.com/#rfc6749)

## 流程

首先简单理解下流程，比如现在一些写字楼进去面试时都需要登记领取一个通行证才可以进出，一个写字楼有很多公司很多 hr，当一个来访者过来时首先需要确认其合法性，登记身份证确认你是个合法公民(app key、app secret)，然后询问你要面试的公司 hr 是否预约了这个候选人来获取授权(auth code)，得到授权后会发给你一个临时通行证(access token)，之后就可以凭借这个临时通行证自由进出写字楼，当然这个临时通行证是有失效时间的，比如当天有效，这样就能临时授权又保证了一定安全性。

## 令牌 token

临时通行证与密码的作用是一样的，所以也需要绝对保密防止泄露，临时通行证也就是令牌（token）有几个特性：

1. 令牌是短期的，到期会自动失效
2. 令牌可以被数据所有者撤销，会立即失效
3. 令牌有权限范围（scope）

上面这些设计，保证了令牌既可以让第三方应用获得权限，同时又随时可控，不会危及系统安全。这就是 OAuth 2.0 的优点。

## RFC 6749

OAuth 的核心就是向第三方应用颁发令牌，OAuth 2.0 规定了四种获得令牌的流程

- 授权码（authorization-code）
- 隐藏式（implicit）
- 密码式（password）：
- 客户端凭证（client credentials）

授权码方式是最常用的流程，安全性也最高，这里主要讲下授权码方式。

授权码（authorization code）方式，指的是第三方应用先申请一个授权码，然后再用该码获取令牌。它适用于那些有后端的 Web 应用。授权码通过前端传送，令牌则是储存在后端，而且所有与资源服务器的通信都在后端完成。这样的前后端分离，可以避免令牌泄漏。这里以微信网页授权为例

### 第一步、网页需要拿到该用户的微信数据，就需要微信授权，先通过一个链接获取授权码

```
// 格式
https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect

// eg:
https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx520c15f417810387&redirect_uri=https%3A%2F%2Fchong.qq.com%2Fphp%2Findex.php%3Fd%3D%26c%3DwxAdapter%26m%3DmobileDeal%26showwxpaytitle%3D1%26vb2ctag%3D4_2030_5_1194_60&response_type=code&scope=snsapi_base&state=123#wechat_redirect
```

- `appid` 参数让微信知道是哪个公众号在请求
- `redirect_uri` 参数表示授权后重定向的回调链接地址
- `response_type=code` 表示要求返回授权码
- `scope` 授权范围

### 第二步、页面跳转后会询问是否同意给予网页授权，如果用户同意授权，页面将跳转至

```
redirect_uri/?code=CODE&state=STATE
```

上面 URL 中，code 参数就是授权码。

### 第三步，网页拿到授权码以后，就可以在业务后端，向微信服务器请求令牌。

```
https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
```

- `appid` 公众号的唯一标识
- `secret` 公众号的 appsecret
- `code` 第一步获取的 code 参数
- `grant_type=authorization_code` 表示授权码方式

此时会返回

```json
{
  "access_token": "ACCESS_TOKEN",
  "expires_in": 7200,
  "refresh_token": "REFRESH_TOKEN",
  "openid": "OPENID",
  "scope": "SCOPE"
}
```

- `access_token` 就是我们要的网页授权接口调用凭证
- `refresh_token` 用户可以根据此 refresh_token 刷新 access_token，避免 access_token 避免授权泛滥

### 第四步，刷新 access_token（如果需要）

由于 access_token 拥有较短的有效期，当 access_token 超时后，可以使用 refresh_token 进行刷新，微信 refresh_token 有效期为 30 天，当 refresh_token 失效之后，需要用户重新授权。

```
https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=APPID&grant_type=refresh_token&refresh_token=REFRESH_TOKEN
```

返回

```json
{
  "access_token": "ACCESS_TOKEN",
  "expires_in": 7200,
  "refresh_token": "REFRESH_TOKEN",
  "openid": "OPENID",
  "scope": "SCOPE"
}
```

有了 access_token 就可以在业务后端请求获取微信的用户信息等。
