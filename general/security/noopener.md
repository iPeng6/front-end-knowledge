# 关于 rel="noopener" 属性

<details>
<summary>引用参考 - 2020/05/17</summary>

- [危险的 target="\_blank" 与 “opener”](https://mp.weixin.qq.com/s/T4jQUdS-rar7hr2EWilJrw) _- 创宇前端 2018-03-06_
- [About rel=noopener](https://mathiasbynens.github.io/rel-noopener/)
- [网页外链用了 target="\_blank"，结果悲剧了](https://mp.weixin.qq.com/s/hujbrCFotMgoNZzvCEkorA)

</details>

## 一、Why

当网站通过链接或者`window.open()`打开一个新标签时，会拿到一个对上一页面的引用对象 `window.opener`

```html
<a href="https://a.fake.site" target="_blank">进入一个“邪恶”的网站</a>
```

在跨域情况下，虽然这个对象只有部分访问权限，但是仍然可以访问到上一个页面的 location 对象，可修改可调用方法

```js
// 恶意代码
if (window.opener) {
  // 比如修改个 hash
  // 跨域情况下不能通过 `opener.location.hash = '#hax'` 直接修改
  // 但是可以直接操作 location
  opener.location = opener.document.referrer + '/#hax'

  // 或者直接替换成伪装页面
  opener.location.replace('https://a.fake.site/')
}
```

## 二、防御

给 a 标签加上 `rel="noopener noreferrer"` 属性，opener 就会被置为 null，也拿不到 referrer，如果为了 SEO 也可以加上 `nofollow`，告诉搜索引擎不要追踪特定的网页链接，避免辣鸡网站拉低本站的权重排名

```html
<a href="https://an.evil.site" target="_blank" rel="noopener noreferrer nofollow">进入一个“邪恶”的网站</a>
```

如果通过 js 打开新页面，可以代码直接将 opener 置为 null

```js
function openUrl(url) {
  const newTab = window.open()
  newTab.opener = null
  newTab.location = url
}
```

另外 noopener 还可以提高性能，如果在\_blank 链接中加入了 noopener，则此时两个标签页将会互不干扰，使得原页面的性能不会受到新页面的影响。
