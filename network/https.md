# HTTPS

## HTTPS 概念

[HTTPS](https://zh.wikipedia.org/wiki/%E8%B6%85%E6%96%87%E6%9C%AC%E4%BC%A0%E8%BE%93%E5%AE%89%E5%85%A8%E5%8D%8F%E8%AE%AE) 超文本传输安全协议（Hypertext Transfer Protocol Secure，缩写：HTTPS，常称为 HTTP over TLS，HTTP over SSL 或 HTTP Secure）是一种通过计算机网络进行安全通信的传输协议。HTTPS 经由 HTTP 进行通信，但利用 SSL/TLS 来加密数据包。HTTPS 开发的主要目的，是提供对网站服务器的身份认证，保护交换数据的隐私与完整性。这个协议由网景公司（Netscape）在 1994 年首次提出，随后扩展到互联网上。

## HTTP 的安全风险

不使用 SSL/TLS 的 HTTP 通信，就是不加密的通信。所有信息明文传播，带来了三大风险。

- （1） 窃听风险（eavesdropping）：第三方可以获知通信内容。
- （2） 篡改风险（tampering）：第三方可以修改通信内容。
- （3） 冒充风险（pretending）：第三方可以冒充他人身份参与通信。

SSL/TLS 协议是为了解决这三大风险而设计的，希望达到：

- （1） 所有信息都是加密传播，第三方无法窃听。
- （2） 具有校验机制，一旦被篡改，通信双方会立刻发现。
- （3） 配备身份证书，防止身份被冒充。

## 历史

1994 年，NetScape 公司设计了 SSL 协议（Secure Sockets Layer）的 1.0 版，但是未发布。

1995 年，NetScape 公司发布 SSL 2.0 版，很快发现有严重漏洞。

1996 年，SSL 3.0 版问世，得到大规模应用。

1999 年，互联网标准化组织 ISOC 接替 NetScape 公司，发布了 SSL 的升级版 TLS 1.0 版。

2006 年和 2008 年，TLS 进行了两次升级，分别为 TLS 1.1 版和 TLS 1.2 版。

2018 年 8 月， TLS 1.3 版发表

在 SSL 更新到 3.0 时，IETF 对 SSL3.0 进行了标准化，并添加了少数机制(但是几乎和 SSL3.0 无差异)，标准化后的 IETF 更名为 TLS1.0(Transport Layer Security 安全传输层协议)，可以说 TLS 就是 SSL 的新版本 3.1，TLS 是 SSL 标准化后的另一个名称。
