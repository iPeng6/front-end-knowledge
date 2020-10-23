# CSRF

- [前端安全系列（二）：如何防止 CSRF 攻击？](https://tech.meituan.com/2018/10/11/fe-security-csrf.html)

## 概念

**CSRF**(Cross Site Request Forgery)，即跨站请求伪造，是⼀一种常⻅见的 Web 攻击，它利利⽤用⽤用户已登
录的身份，在⽤用户毫不不知情的情况下，以⽤用户的名义完成⾮非法操作。

- ⽤用户已经登录了了站点 A，并在本地记录了 cookie
- 在⽤用户没有登出站点 A 的情况下(也就是 cookie 生效的情况下)，访问了了恶意攻击者提供的恶意站点 B (B 站点要求访问站点 A)。
- 站点 A 没有做任何 CSRF 防御

## CSRF 攻击危害

- 利⽤⽤户登录态
- 用户不知情
- 完成业务请求
- 盗取⽤户资金(转账，消费)
- 冒充⽤户发帖背锅
- 损害⽹站声誉

## 防御

- Origin、Referer 校验
- csrf token
