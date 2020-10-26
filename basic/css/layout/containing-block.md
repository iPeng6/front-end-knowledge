# 包含块

<details>
<summary>参考</summary>

- [布局和包含块](https://developer.mozilla.org/zh-CN/docs/Web/CSS/All_About_The_Containing_Block)

</details>

我们在设置元素尺寸属性（width、height、padding、margin 和 border）的百分比值或偏移属性（top、right、bottom 和 left）的值时，通常会有一个“相对参考系”，这个"相对参考系"一般是包裹着这个元素的块级祖先元素（一般是块级父元素）或离这个元素最近的非 static（relative、absolute 和 fixed）定位的祖先元素。这些具有“相对参考系”作用的祖先元素，其容纳区域（cotent box 或 padding box），称为 **包含块**

## ICB（initial containing block, 初始包含块）

任何一个元素都会有一个包含块作为设置尺寸属性和偏移属性的“相对参考系”，而对于顶层的根元素`<html />`，没有任何元素包裹它，但也具有包含块，它是一个不可见的矩形框，W3C 组织称之为 ICB（initial containing block, 初始包含块）。他的尺寸就是视口 viewport。

## 确定包含块

确定一个元素的包含块的过程完全依赖于这个元素的 position 属性：

1. 如果 position 属性为 **static** 、 **relative** 或 **sticky**，包含块可能由它的最近的**祖先块元素**（比如说inline-block, block 或 list-item元素）的内容区 content-box 的边缘组成，也可能会建立格式化上下文(比如说 a table container, flex container, grid container, 或者是 the block container 自身)。
2. 如果 position 属性为 **absolute** ，包含块就是由它的最近的 position 的值不是 static （也就是值为fixed, absolute, relative 或 sticky）的祖先元素的内边距区 padding-box 的边缘组成。**如果不存在这样的祖先元素，那么包含块就是初始包含块ICB**。
3. 如果 position 属性是 **fixed**，包含块是 viewport
4. <span style="color: red;">如果 position 属性是 absolute 或 fixed，包含块也可能是由满足以下条件的最近父级元素的内边距区的边缘组成的：</span>
   1. transform 或 perspective 的值不是 none
   2. will-change 的值是 transform 或 perspective
   3. filter 的值不是 none 或 will-change 的值是 filter(只在 Firefox 下生效).
   4. contain 的值是 paint (例如: contain: paint;)
