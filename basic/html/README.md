# HTML

- [你需要知道的 HTML 知识](https://juejin.im/post/5e09d52c51882549333fbed6?utm_source=gold_browser_extension)
- [图标方案](https://github.com/kaola-fed/blog/issues/107)

## 标准

- [HTML 5.2](https://www.w3.org/TR/html52/)

## 分类

1. 块级元素: display 属性取 block、table、flex、grid 和 list-item 等值的独占一行显示的元素。

   - 每个块级元素独占一行，每个块级元素都会从新的一行开始，从上到下排布
   - 块级元素可以直接控制宽高以及盒子模型的相关 css 属性
   - 在不设置宽度的情况下，块级元素的宽度是他父级元素内容的宽度
   - 在不设置高度的情况下，块级元素的高度是他本身内容的高度

   `<div>` / `<h1>~<h6>` / `<hr>` / `ol ul li` / `dl dt dd` / `<table>` / `<p>` / `<form>`

2. 内联元素: display 属性取 inline 值的可在同一行内排列显示的元素。

   - 内联元素会和其他元素从左到右显示在一行
   - 宽高无效，但`水平方向`可以设置 `padding` 和 `margin`
   - 内联元素的宽高是由内容本身的大小决定的（文字、图片等）
   - 内联元素只能容纳文本或者其他内联元素（不要在内联元素中嵌套块级元素）

     1. 可置换行内元素

        `<img>`、`<object>`、`<video>` 和 `<embed>`，表单类的可替换元素有`<textarea>` 和 `<input>`， 有点特殊，可以设置宽高和 margin 类似 `inline-block` 元素。

     2. 不可置换行内元素

        `<a>` 、`<b>` 、`<strong>` 、`<span>` 、`<label>`、 `<select>` 、`<button>`

3. 内联块级：display 属性取 inline-block、inline-table、inline-flex 和 inline-grid 等值的兼具块级元素和行内级元素布局特性的元素。

   - 和其它 inline 元素同行显示
   - 可以设置宽高/margin/padding（水平和垂直）多个内联块级不会换行

## H5 新增

![](https://upload-images.jianshu.io/upload_images/7166236-7416a45973370997.png?imageMogr2/auto-orient/strip|imageView2/2/w/910/format/webp)
