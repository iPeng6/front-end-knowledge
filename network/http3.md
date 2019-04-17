# HTTP/3

<details>
<summary>参考 - 2019年04月17日</summary>

- [维基百科](https://zh.wikipedia.org/wiki/%E5%BF%AB%E9%80%9FUDP%E7%BD%91%E7%BB%9C%E8%BF%9E%E6%8E%A5)
- [HTTP/3 已经箭在弦上，你准备好了吗？](https://liudanking.com/performance/http-3-explained-are-you-ready/)
- [HTTP/3 详解](https://http3-explained.haxx.se/zh/)
- [Web 通信协议，你还需要知道： SPDY 和 QUIC](https://segmentfault.com/a/1190000016265991)

</details>

HTTP/3 目前还没有正式发布，在这之前我们首先需要了解下 QUIC。

**QUIC（Quick UDP Internet Connections）** 是一种实验性的传输层网络传输协议，由 Google 开发，在 2013 年实现。QUIC 使用 UDP 协议，它在两个端点间创建连接，且支持多路复用。在设计之初，QUIC 希望能够提供等同于 SSL/TLS 层级的网络安全保护，减少数据传输及创建连接时的延迟，双向控制带宽，以避免网络拥塞。Google 希望使用这个协议来取代 TCP 协议，使网页传输速度加快，计划将 QUIC 提交至互联网工程任务小组（IETF），让它成为下一代的正式网络规范。2015 年 6 月，QUIC 的网络草案被正式提交至互联网工程任务组。2018 年 10 月，互联网工程任务组 HTTP 及 QUIC 工作小组正式将基于 QUIC 协议的 HTTP (HTTP over QUIC) 重命名为 `HTTP/3` 以为确立下一代规范做准备。
