# Grid 布局

<details>
<summary>参考</summary>

- [CSS Grid 网格布局教程](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)
- [写给自己看的 display: grid 布局教程](https://www.zhangxinxu.com/wordpress/2018/11/display-grid-css-css3/?shrink=1#grid-template)
- [5 分钟学会 CSS Grid 布局](https://www.html.cn/archives/8506)

</details>

网格布局（Grid）是最强大的 CSS 布局方案。它将网页划分成一个个网格，可以任意组合不同的网格，做出各种各样的布局。

<div style="width:256px;display: grid; grid-template: 80px 80px 80px / 1fr 1fr 1fr;grid-gap: 8px; background: #dcecfc;color: #fff;">
  <div style="background:orange;grid-column: 1/3;">1</div>
  <div style="background:#123123;">2</div>
  <div style="background:green;grid-row: 2/4;">3</div>
  <div style="background:blue;grid-column: 2/4;">4</div>
  <div style="background:purple">5</div>
  <div style="background:#332444;">6</div>
</div>

**Grid VS Flex**: Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是**一维布局**。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是**二维布局**。Grid 布局远比 Flex 布局强大。

## Grid 容器属性

### display:grid|inline-grid

- display: grid

  <div style="border:1px solid">
  a
  <div style="width:256px;display: grid; grid-template: 80px 80px 80px / 1fr 1fr 1fr;grid-gap: 8px; background: #dcecfc;color: #fff;">
    <div style="background:orange;grid-column: 1/3;">1</div>
    <div style="background:#123123;">2</div>
    <div style="background:green;grid-row: 2/4;">3</div>
    <div style="background:blue;grid-column: 2/4;">4</div>
    <div style="background:purple">5</div>
    <div style="background:#332444;">6</div>
  </div>
  b
  <div>

- display: inline-grid

  <div style="border:1px solid">
  a
  <div style="width:256px;display: inline-grid; grid-template: 80px 80px 80px / 1fr 1fr 1fr;grid-gap: 8px; background: #dcecfc;color: #fff;">
    <div style="background:orange;grid-column: 1/3;">1</div>
    <div style="background:#123123;">2</div>
    <div style="background:green;grid-row: 2/4;">3</div>
    <div style="background:blue;grid-column: 2/4;">4</div>
    <div style="background:purple">5</div>
    <div style="background:#332444;">6</div>
  </div>
  b
  <div>

!> 注意，设为网格布局以后，容器子元素（项目）的 float、display: inline-block、display: table-cell、vertical-align 和 column-\*等设置都将失效。

### 1. grid-template-columns\grid-template-rows、grid-template 属性

```css
.container {
  grid-template-columns: <track-size> ... | <line-name> <track-size> ...;
  grid-template-rows: <track-size> ... | <line-name> <track-size> ...;
}
```

- `<track-size>`：网格尺寸，可以是长度值，百分比值，以及 fr 单位（网格剩余空间比例单位）。
- `<line-name>`：网格线名称

例子：

```css
.container {
  grid-template-rows: 25% 100px auto;
  grid-template-columns: 80px auto 200px;
}

/* 等同于 */
.container {
  grid-template: 25% 100px auto / 80px auto 200px;
}
```

```html
/*vue*/
<template>
  <div class="grid-layout-demo1">
    <div class="container">
      <div>1: 宽80px 高25%</div>
      <div>2: 宽auto 高25%</div>
      <div>3: 宽200px 高25%</div>
      <div>4: 宽80px 高100px</div>
      <div>5: 宽auto 高100px</div>
      <div>6: 宽200px 高100px</div>
      <div>7: 宽80px 高auto</div>
      <div>8: 宽auto 高auto</div>
      <div>9: 宽200px 高auto</div>
    </div>
  </div>
</template>
<script>
  export default {}
</script>
<style>
  .grid-layout-demo1 .container {
    height: 300px;
    display: grid;
    grid-template-columns: 80px auto 200px;
    grid-template-rows: 25% 100px auto;
  }
  .grid-layout-demo1 div {
    border: 1px solid orange;
  }
</style>
```

**grid-template** 是 grid-template-rows，grid-template-columns 和 grid-template-areas 属性的缩写。

```css
.container {
  grid-template: <grid-template-rows> / <grid-template-columns>;
}
```

#### (1) repeat()

有时候，重复写同样的值非常麻烦，尤其网格很多时。这时，可以使用 repeat()函数，简化重复的值。

```css
.container {
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(5, 50px);
}
```

repeat()接受两个参数，第一个参数是重复的次数，第二个参数是所要重复的值。

```html
/*vue*/
<template>
  <div class="grid-layout-demo2">
    <div class="container">
      <div v-for="n in 50">{{n}}</div>
    </div>
  </div>
</template>
<script>
  export default {}
</script>
<style>
  .grid-layout-demo2 .container {
    height: 300px;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(5, 50px);
  }
  .grid-layout-demo2 div {
    border: 1px solid orange;
  }
</style>
```

#### (2) auto-fill 关键字

有时，单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用 auto-fill 关键字表示自动填充。

```html
/*vue*/
<template>
  <div class="grid-layout-demo3">
    <div class="container">
      <div v-for="n in 10">{{n}}</div>
    </div>
  </div>
</template>
<script>
  export default {}
</script>
<style>
  .grid-layout-demo3 .container {
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);
    grid-auto-rows: 50px;
  }
  .grid-layout-demo3 div {
    border: 1px solid orange;
  }
</style>
```

#### (3) 网格线名称

grid-template-columns 属性和 grid-template-rows 属性里面，还可以使用方括号，指定每一根网格线的名字，方便以后的引用。

```css
.container {
  display: grid;
  grid-template-columns: [c1 column-start] 100px [c2] 100px [c3] auto [c4];
  grid-template-rows: [r1 row-start] 100px [r2] 100px [r3] auto [r4];
}
```

上面代码指定网格布局为 3 行 x 3 列，因此有 4 根垂直网格线和 4 根水平网格线。方括号里面依次是这八根线的名字。

网格布局允许同一根线有多个名字，比如[c1 column-start]。

### 2. grid-row-gap/grid-column-gap、grid-gap 属性

grid-row-gap 属性设置行与行的间隔（行间距），grid-column-gap 属性设置列与列的间隔（列间距）。

```css
.container {
  grid-row-gap: 10px;
  grid-column-gap: 20px;
}
/* 等同于 */
.container {
  grid-gap: 10px 20px;
}
```

```html
/*vue*/
<template>
  <div class="grid-layout-demo4">
    <div class="container">
      <div v-for="n in 10">{{n}}</div>
    </div>
  </div>
</template>
<script>
  export default {}
</script>
<style>
  .grid-layout-demo4 .container {
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);
    grid-auto-rows: 50px;
    grid-row-gap: 10px;
    grid-column-gap: 20px;
  }
  .grid-layout-demo4 div {
    border: 1px solid orange;
  }
</style>
```

**grid-gap** 属性是 grid-column-gap 和 grid-row-gap 的合并简写形式，语法如下。

```css
.container {
  grid-gap: <grid-row-gap> <grid-column-gap>;
}
```
