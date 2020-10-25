# reset.css

大部分的时候，作为前端，我们在写 CSS 样式之前，都知道需要添加一份 reset.css ，用来消除不同的浏览器在默认样式上不同表现

## reset.css

先来看看早先 YUI 的一个版本的 reset.css，这是一份历史比较悠久的 RESET 方案:

```css
body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, fieldset, input, textarea, p, blockquote, th, td {
    margin: 0;
    padding: 0;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}
fieldset, img {
    border: 0;
}
address, caption, cite, code, dfn, em, strong, th, var {
    font-style: normal;
    font-weight: normal;
}
ol, ul {
    list-style: none;
}
caption, th {
    text-align: left;
}
h1, h2, h3, h4, h5, h6 {
    font-size: 100%;
    font-weight: normal;
}
q:before, q:after {
    content: '';
}
abbr, acronym {
    border: 0;
}
```

问题：

- 诸如 div 、dt、li 、th、td 等标签是没有默认 padding 和 margin 的；
- 如果我现在问你 fieldset 是什么标签，可能没几个人知道，相似的还有如 blockquote 、acronym 这种很生僻的标签，在 html 代码中基本不会出现的，其实没太大必要 RESET ，只会给每个项目徒增冗余代码；
- h标签抹除了字体大小粗细，如果没有另外设置也就抹除了原本标题的语义

## Normalize.css

Normalize.css 与 reset.css 的风格恰好相反，没有不管三七二一的一刀切，而是注重通用的方案，重置掉该重置的样式（例如body的默认margin），保留该保留的 user agent 样式，同时进行一些 bug 的修复，这点是 reset 所缺乏的。

### Normalize.css 做了什么

1. 统一了一些元素在所有浏览器下的表现，保护有用的浏览器默认样式而不是完全清零它们，让它们在各个浏览器下表现一致；
2. 为大部分元素提供一般化的表现；
3. 修复了一些浏览器的 Bug ，并且让它们在所有浏览器下保持一致性；
4. 通过一些巧妙的细节提升了 CSS 的可用性；
5. 提供了详尽的文档让开发者知道，不同元素在不同浏览器下的渲染规则；
