# 布局

<details>
<summary>引用参考 - 2020年02月08日</summary>

- [前端布局基础概述](https://mp.weixin.qq.com/s/-LcNZWFFty2lWuND6uuNNA)
- [CSS 中重要的 BFC](https://segmentfault.com/a/1190000013023485)
- [CSS margin 合并问题](https://segmentfault.com/a/1190000013735912)
- [视觉格式化模型](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Visual_formatting_model)
-
</details>

前端布局方案主要有三种：

- 传统布局方案（借助浮动、定位等手段）
- flex 布局方案
- grid 布局方案

## 文档流

我们常说的文档流其实分为**普通流**、**浮动流**、**定位流**三种。而普通流其实就是指 BFC 中的 FC。FC(Formatting Context)，直译过来是格式化上下文，它是页面中的一块渲染区域，有一套渲染规则，决定了其子元素如何布局，以及和其他元素之间的关系和作用。常见的 FC 有 BFC、IFC，还有 GFC 和 FFC。

三种文档流的定位方案

### 普通流(Normal flow)

- 在常规流中，盒一个接着一个排列;
- 在块级格式化上下文里面， 它们竖着排列；
- 在行内格式化上下文里面， 它们横着排列;
- 当 position 为 static 或 relative，并且 float 为 none 时会触发常规流；
- 对于静态定位(static positioning)，position: static，盒的位置是常规流布局里的位置；
- 对于相对定位(relative positioning)，position: relative，盒偏移位置由 top、bottom、left、right 属性定义。即使有偏移，仍然保留原有的位置 ，其它常规流不能占用这个位置。

### 浮动(Floats)

- 左浮动元素尽量靠左、靠上，右浮动同理
- 这导致常规流环绕在它的周边，除非设置 clear 属性
- 浮动元素不会影响块级元素的布局
- 但浮动元素会影响行内元素的布局，让其围绕在自己周围，撑大父级元素，从而间接影响块级元素布局
- 最高点不会超过当前行的最高点、它前面的浮动元素的最高点
- 不超过它的包含块，除非元素本身已经比包含块更宽
- 行内元素出现在左浮动元素的右边和右浮动元素的左边，左浮动元素的左边和右浮动元素的右边是不会摆放浮动元素的

### 绝对定位(Absolute positioning)

- 绝对定位方案，盒从常规流中被移除，不影响常规流的布局；
- 它的定位相对于它的包含块，相关 CSS 属性：top、bottom、left、right；
- 如果元素的属性 position 为 absolute 或 fixed，它是绝对定位元素；
- 对于 position: absolute，元素定位将相对于上级元素中最近的一个 relative、fixed、absolute，如果没有则相对于 ICB(初始包含块)，注意不是 body 也不是 html；
