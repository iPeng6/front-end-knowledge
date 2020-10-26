# 格式化上下文

<details>
<summary>参考</summary>

- [块格式化上下文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)
- [行内格式化上下文（Inline formatting context）](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Inline_formatting_context)

</details>

- [格式化上下文](#格式化上下文)
  - [BFC(Block Formatting Context)](#bfcblock-formatting-context)
    - [创建 BFC 元素的方式有如下几种](#创建-bfc-元素的方式有如下几种)
    - [BFC 元素具有如下特性：](#bfc-元素具有如下特性)
  - [IFC](#ifc)
    - [创建方式](#创建方式)
    - [特性](#特性)

格式化上下文，它指的是具有某种 CSS 格式化规则（布局规则）的上下文环境，在这个上下文环境内的所有子元素，都将根据其特定的 CSS 格式化规则来进行排列。

我们可以给某个作为容器的元素指定特定的格式化上下文，也就是说我们可以定义一个具有特定布局规则的渲染区域。常见的格式化上下文有 BFC（CSS2.1 规范）、IFC（CSS2.1 规范）、 FFC（CSS3 规范新增）和 GFC（CSS3 规范新增），具体介绍如下：

## BFC(Block Formatting Context)

BFC, 全称是 block formatting context，它是一个独立封闭的渲染区域，在这个区域内的所有元素，从区域的顶部起，一个接一个地根据自身的布局特性进行排列：在这个区域内的块级元素 ，按从上到下的顺序显示，相邻的块级元素可以使用 margin 隔离，**但在垂直方向上相邻的块级元素会发生 margin 合并**；在这个区域内的 inline-level 或 inline-level-block 元素，则按从左到右的顺序显示。具有 BFC 格式化环境的元素，我们称之为 BFC 元素，可以说，BFC 定义了 BFC 元素 content 区域的渲染规则。

### 创建 BFC 元素的方式有如下几种

摘自 [MDN BFC](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

- **根元素** (`html`)
- **浮动元素** (`float` 不为 none)
- **绝对定位元素** (position 为 `absolute`、`fixed`)
- **表格类元素** (display: table、inline-table、table-caption、table-cell、table-row、table-row-group、table-header-group、table-footer-group)
- **弹性项** (display: flex 、inline-flex 元素的的直接子元素)
- **网格项** (display: grid 、 inline-grid 元素的的直接子元素)
- **行内块元素** (display: inline-block)
- `display`: `flow-root`(没有副作用)
- `overflow` 不为 visible 的块元素
- `contain` 为以下值的元素: layout, content 或 paint
- 多列容器 (元素的 column-count 或 column-width 不为 auto， 包括 column-count: 1 的元素)
- column-span: all 应当总是会创建一个新的BFC，即使该元素没有包裹在一个多列容器中

### BFC 元素具有如下特性：

#### 1、 对应一个独立、封闭的渲染区域，子元素的 CSS 样式不会影响 BFC 元素外部；

普通块级元素

<div style="background: green;">
  <div style="width:400px;background: yellow;margin-top: 100px;">margin-top为100px的子元素</div>
  普通块级元素
</div>

BFC 元素

<div style="background: green;display: flow-root;">
  <div style="width:400px;background: yellow;margin-top: 100px;">margin-top为100px的子元素</div>
  BFC元素(display: flow-root)
</div>

说明：

- 普通块级元素，其子元素的 margin-top，并没有隔开自身与父元素（普通块级元素），但是却作用到父元素外部（将父元素和叔伯元素或祖父元素隔开）
- BFC 元素，作为一个独立、封闭的渲染区域，其子元素的 margin-top，则会隔开自身与父元素（BFC 元素），而不会影响到父元素外部；

#### 2、 浮动子元素参与 BFC 父元素的高度计算，也就是 BFC 元素能够识别浮动元素

普通块级元素 (高度塌陷问题)

<div style="border:1px solid green;">
  <div style="border:1px solid red; float: left;">浮动子元素</div>
  <div style="border:1px solid red; float: left;">浮动子元素</div>
  <div style="border:1px solid red; float: left;">浮动子元素</div>
</div>
<div style="clear: both;"></div>

BFC 元素

<div style="border:1px solid green; display: flow-root;">
  <div style="border:1px solid red; float: left;">浮动子元素</div>
  <div style="border:1px solid red; float: left;">浮动子元素</div>
  <div style="border:1px solid red; float: left;">浮动子元素</div>
</div>
<div style="clear: both;"></div>

说明：

- BFC 元素，能够识别浮动子元素，浮动子元素参与 BFC 元素的高度计算，不会出现“高度塌陷”问题；
- 普通块级元素，不能够识别浮动子元素，会出现“高度塌陷”问题；

#### 3. 占据文档流的 BFC 元素（可使用 overflow: auto 创建），能够识别浮动的兄弟元素

<div style="border:1px solid red;">
  <div style="float:left;background:green;">浮动的兄弟元素</div>
  <div style="background: yellow;width: 400px;height:50px;">普通的块级元素</div>
</div>

<div style="border:1px solid red;">
  <div style="float:left;background:green;">浮动的兄弟元素</div>
  <div style="background: yellow;width: 400px;height:50px;overflow:auto;">BFC元素(overflow:auto)</div>
</div>
<div style="clear: both;"></div>

说明：

- 普通块级元素，不能够识别浮动的兄弟元素，会被浮动的兄弟元素覆盖部分内容；
- 占据文档流的 BFC 元素（可使用 overflow: auto 创建），能够识别浮动的兄弟元素，不会被浮动的兄弟元素覆盖，与之同行显示；

#### 4. 占据文档流的 BFC 元素（可使用 overflow: auto 创建），width 为 auto 时，会占满当前行的剩余宽度

<div style="border:1px solid red;">
  <div style="float:left;background:green;">浮动的兄弟元素</div>
  <div style="background: yellow;width: auto;height:50px;overflow:auto;">BFC元素(overflow:auto;width: auto;)</div>
</div>
<div style="clear: both;"></div>

简言之：

1. BFC 就像一道屏障，隔离出了 BFC 内部和外部，内部和外部区域的渲染相互之间不影响。BFC 有自己的一套内部子元素渲染的规则，不影响外部渲染，也不受外部渲染影响。
2. BFC 的区域不会和外部浮动盒子的外边距区域发生叠加。也就是说，外部任何浮动元素区域和 BFC 区域是泾渭分明的，不可能重叠。
3. BFC 在计算高度的时候，内部浮动元素的高度也要计算在内。也就是说，即使 BFC 区域内只有一个浮动元素，BFC 的高度也不会发生塌缩，高度是大于等于浮动元素的高度的。
4. HTML 结构中，当构建 BFC 区域的元素紧接着一个浮动盒子时，即，是该浮动盒子的兄弟节点，BFC 区域会首先尝试在浮动盒子的旁边渲染，但若宽度不够，就在浮动元素的下方渲染。

## IFC

IFC, 全称是 inline formatting context，其内部的元素，在水平方向上，一个接一个地显示；在垂直方向上，每个元素可以设置不同的对齐方式；IFC 内部的元素，被一行行的矩形框所包含，这些虚拟的矩形框，我们称为行框（line box）。IFC 的作用区域，可以看成是包含其所有子元素的行框组成的矩形区域。

### 创建方式

和 BFC 相比，它的创建方式是被动的、隐式的，是由所包含的子元素来创建：只有在一个区域内仅包含可水平排列的元素时才会生成，这些子元素可以是文本、inline-level 元素或 inline-block-level 元素。

### 特性

1. IFC 内部的元素，按从左到右、从上到下的顺序排布；
2. IFC 内部的每个元素，都可以通过设置 vertical-align 属性，来调整在垂直方向上的对齐；
3. 包含这些内部元素的矩形区域，形成的每一行，被称为 line box

**FFC**（flex formatting context）和 **GFC**（grid formatting context），分别是 flex 布局和 grid 布局的内容
