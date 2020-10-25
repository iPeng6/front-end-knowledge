# 包含块

- [布局和包含块](https://developer.mozilla.org/zh-CN/docs/Web/CSS/All_About_The_Containing_Block)

我们在设置元素尺寸属性（width、height、padding、margin 和 border）的百分比值或偏移属性（top、right、bottom 和 left）的值时，通常会有一个“相对参考系”，这个"相对参考系"一般是包裹着这个元素的块级祖先元素（一般是块级父元素）或离这个元素最近的非 static（relative、absolute 和 fixed）定位的祖先元素。这些具有“相对参考系”作用的祖先元素，其容纳区域（cotent box 或 padding box），其实还有一个专门术语形容之，那就是**包含块**

- ICB（initial containing block, 初始包含块）

  任何一个元素都会有一个包含块作为设置尺寸属性和偏移属性的“相对参考系”，而对于顶层的根元素`<html />`，没有任何元素包裹它，但也具有包含块的，它是一个不可见的矩形框，W3C 组织称之为 ICB（initial containing block, 初始包含块）。

- 不同定位元素分别对应的包含块
  - static 和 relative 定位元素的包含块，为其块级祖先元素（通常是块级父元素）的 content box；
  - absolute 定位元素的包含块，为最近的非静态定位祖先元素的 padding box，查无非静态定位祖先元素，那么它的包含块是 ICB（即根元素`<html />`的包含块）；
  - fixed 定位元素的包含块，为当前 viewport（视窗）；
