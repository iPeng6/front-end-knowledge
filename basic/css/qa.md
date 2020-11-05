# CSS QA

- [CSS QA](#css-qa)
  - [word-break: break-all 和 word-wrap: break-word 的区别](#word-break-break-all-和-word-wrap-break-word-的区别)
  - [word-spacing 和 white-space 区别](#word-spacing-和-white-space-区别)
  - [position取值及之间的区别](#position取值及之间的区别)
  - [margin 合并问题及解决](#margin-合并问题及解决)
  - [清除浮动方法有哪些](#清除浮动方法有哪些)
  - [选择器优先级及计算](#选择器优先级及计算)
  - [CSS单位](#css单位)
  - [一像素方案](#一像素方案)
  - [CSS 模块化/组件化设计](#css-模块化组件化设计)
  - [页面导入样式时，使用link和@import区别](#页面导入样式时使用link和import区别)

## word-break: break-all 和 word-wrap: break-word 的区别

![](/img/word-break-word-wrap.png ':size=400xauto')

## word-spacing 和 white-space 区别

word-spacing 表示单词之间间距，white-space 表示是否换行显示的

## position取值及之间的区别

- static 该关键字指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。此时 top, right, bottom, left 和 z-index 属性无效。
- relative 该关键字下，元素先放置在未添加定位时的位置，再在不改变页面布局的前提下调整元素位置（因此会在此元素未添加定位时所在位置留下空白）。
- absolute 相对于父级最近的 position 非 static 的元素，如果不存在则相对于 ICB 初始包含块。绝对定位的元素可以设置外边距（margins），且不会与其他边距合并。
- fixed 默认相对于视口 viewport。元素的位置在屏幕滚动时不会改变。
- sticky 元素根据正常文档流进行定位，然后相对它的最近滚动祖先（nearest scrolling ancestor）和 containing block (最近块级祖先 nearest block-level ancestor)

如果 position 属性是 absolute 或 fixed，包含块也可能是由满足以下条件的最近父级元素的内边距区的边缘组成的：

* transform 或 perspective 的值不是 none
* will-change 的值是 transform 或 perspective
* filter 的值不是 none 或 will-change 的值是 filter(只在 Firefox 下生效).
* contain 的值是 paint (例如: contain: paint;)

## margin 合并问题及解决

相邻元素的情况

1. 直接将元素的 margin 改为需要的值
2. 相邻元素中间添加一个 1px 的间隔元素
3. 相邻元素加上 display: inline-block; 或者 grid 与 inline-grid 后相邻元素之间的垂直外边距不会合并，不过注意 grid 的浏览器兼容性不太好。
4. 相邻元素可以在其中一个元素外面包一层 div，并设置触发 BFC
5. 浮动与绝对定位之类脱离文档流的元素不发生 margin 合并

## 清除浮动方法有哪些

1. 添加额外元素设置 clear: both
2. 使用伪元素:before :after 设置 clear: both
3. 触发 BFC 隔离浮动使之不影响外部元素

## 选择器优先级及计算

!important > 内联 > id > class、属性、伪类 > tag、伪元素

计算规则是分别统计 (内联, id, class、属性、伪类, tag、伪元素) 出现的次数得到 (a, b, c, d)，然后从左依次向右比较大小，大的胜出，相同继续找下一位比较，都相同，后面的覆盖前面的

通配符 `*` 关系选择器 `+, >, ~, ' '` 对优先级计算没有影响

`!important` 优先级最高，如果都有 `!important` 则还是上面的规则比较

## CSS单位

## 一像素方案

## CSS 模块化/组件化设计

## 页面导入样式时，使用link和@import区别

- link属于XHTML标签，除了加载CSS外，还能用于定义RSS,定义rel连接属性等作用；而@import是CSS提供的，只能用于加载CSS;
- 页面被加载的时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载;
