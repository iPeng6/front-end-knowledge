# Grid 布局

<details>
<summary>引用参考</summary>

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

### 1. display:grid|inline-grid

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

### 2. grid-template-columns\grid-template-rows、grid-template 属性

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

#### (1) fr 关键字

为了方便表示比例关系，网格布局提供了 fr 关键字（fraction 的缩写，意为"片段"）。如果两列的宽度分别为 1fr 和 2fr，就表示后者是前者的两倍。

```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr;
}
```

<div style="display: grid;grid-template-columns: 1fr 2fr;">
  <div style="background: red;">1</div>
  <div style="background: orange;">2</div>
</div>

fr 也可以与绝对长度的单位结合使用，这时会非常方便。

```css
.container {
  display: grid;
  grid-template-columns: 150px 1fr 2fr;
}
```

<div style="display: grid;grid-template-columns:150px 1fr 2fr;">
  <div style="background: red;">1</div>
  <div style="background: orange;">2</div>
  <div style="background: blue;">3</div>
</div>

#### (2) repeat()

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

#### (3) auto-fill 关键字

有时，单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用 auto-fill 关键字表示自动填充。

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-auto-rows: 50px;
}
```

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

#### (4) auto 关键字

auto 关键字表示由浏览器自己决定长度。

```css
.container {
  grid-template-columns: 100px auto 100px;
}
```

#### (5) 网格线名称

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

```html
/*vue*/
<template>
  <div class="grid-layout-demo3-1">
    <section>
      纵向网格线：
      <input type="radio" value="c1" v-model="dataType" id="demo3-1-c1" />
      <label for="demo3-1-c1">[c1]</label>
      <input type="radio" value="c2" v-model="dataType" id="demo3-1-c2" />
      <label for="demo3-1-c2">[c2]</label>
      <input type="radio" value="c3" v-model="dataType" id="demo3-1-c3" />
      <label for="demo3-1-c3">[c3]</label>
      <input type="radio" value="c4" v-model="dataType" id="demo3-1-c4" />
      <label for="demo3-1-c4">[c4]</label>
    </section>
    <section>
      水平网格线：
      <input type="radio" value="r1" v-model="dataType" id="demo3-1-r1" />
      <label for="demo3-1-r1">[r1]</label>
      <input type="radio" value="r2" v-model="dataType" id="demo3-1-r2" />
      <label for="demo3-1-r2">[r2]</label>
      <input type="radio" value="r3" v-model="dataType" id="demo3-1-r3" />
      <label for="demo3-1-r3">[r3]</label>
      <input type="radio" value="r4" v-model="dataType" id="demo3-1-r4" />
      <label for="demo3-1-r4">[r4]</label>
    </section>
    <div class="container" :data-type="dataType">
      <div v-for="n in 9">{{n}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dataType: 'c1',
      }
    },
  }
</script>
<style>
  .grid-layout-demo3-1 .container {
    display: grid;
    grid-template-columns: [c1 column-start] 100px [c2] 100px [c3] auto [c4];
    grid-template-rows: [r1 row-start] 100px [r2] 100px [r3] auto [r4];
    position: relative;
  }
  .grid-layout-demo3-1 div {
    border: 1px solid orange;
  }
  .grid-layout-demo3-1 .container::before {
    content: '';
    position: absolute;
    transition: left 0.25s, top 0.25s;
    background: red;
  }
  .grid-layout-demo3-1 .container[data-type^='c']::before {
    width: 3px;
    height: 100%;
    left: 0;
    top: 0;
    transform: translateX(-1.5px);
  }
  .grid-layout-demo3-1 .container[data-type^='r']::before {
    width: 100%;
    height: 3px;
    left: 0;
    top: 0;
    transform: translateY(-1.5px);
  }
  .grid-layout-demo3-1 .container[data-type='c2']::before {
    left: 100px;
  }
  .grid-layout-demo3-1 .container[data-type='c3']::before {
    left: 200px;
  }
  .grid-layout-demo3-1 .container[data-type='c4']::before {
    left: 100%;
  }
  .grid-layout-demo3-1 .container[data-type='r2']::before {
    top: 100px;
  }
  .grid-layout-demo3-1 .container[data-type='r3']::before {
    top: 200px;
  }
  .grid-layout-demo3-1 .container[data-type='r4']::before {
    top: 100%;
  }
</style>
```

### 3. grid-row-gap/grid-column-gap、grid-gap 属性

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

### 4. grid-auto-columns/grid-auto-rows 属性

grid-auto-columns 属性和 grid-auto-rows 属性用来设置，浏览器自动创建的多余网格的列宽和行高。它们的写法与 grid-template-columns 和 grid-template-rows 完全相同。如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高。

```css
.container {
  grid-template-columns: 100px 100px 100px;
  grid-auto-rows: 50px;
}
```

### 5. grid-template-areas 属性

网格布局允许指定"区域"（area），一个区域由单个或多个单元格组成。grid-template-areas 属性用于定义区域。

```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-template-areas:
    'a b c'
    'd e f'
    'g h i';
}
```

区域的命名会影响到网格线。每个区域的起始网格线，会自动命名为区域名-start，终止网格线自动命名为区域名-end。

比如，区域名为 header，则起始位置的水平网格线和垂直网格线叫做 header-start，终止位置的水平网格线和垂直网格线叫做 header-end。

### 6. align-items/justify-items，place-items

- `justify-items` 指定了网格元素的水平呈现方式，是水平拉伸显示，还是左中右对齐
- `align-items` 指定了网格元素的垂直呈现方式，是垂直拉伸显示，还是上中下对齐
- `place-items` 是 `align-items`和`justify-items`的缩写

```css
.container {
  align-items: stretch | start | end | center;
  justify-items: stretch | start | end | center;
}
.container {
  place-items: <align-items> / <justify-items>;
}
```

```html
/*vue*/
<template>
  <div class="grid-layout-demo5">
    <section>
      justify-items:
      <input type="radio" value="stretch" v-model="justifyItems" id="demo5-justify-items-stretch" />
      <label for="demo5-justify-items-stretch">stretch</label>
      <input type="radio" value="start" v-model="justifyItems" id="demo5-justify-items-start" />
      <label for="demo5-justify-items-start">start</label>
      <input type="radio" value="end" v-model="justifyItems" id="demo5-justify-items-end" />
      <label for="demo5-justify-items-end">end</label>
      <input type="radio" value="center" v-model="justifyItems" id="demo5-justify-items-center" />
      <label for="demo5-justify-items-center">center</label>
    </section>
    <section>
      align-items:
      <input type="radio" value="stretch" v-model="alignItems" id="demo5-align-items-stretch" />
      <label for="demo5-align-items-stretch">stretch</label>
      <input type="radio" value="start" v-model="alignItems" id="demo5-align-items-start" />
      <label for="demo5-align-items-start">start</label>
      <input type="radio" value="end" v-model="alignItems" id="demo5-align-items-end" />
      <label for="demo5-align-items-end">end</label>
      <input type="radio" value="center" v-model="alignItems" id="demo5-align-items-center" />
      <label for="demo5-align-items-center">center</label>
    </section>
    <div class="container" :style="{justifyItems, alignItems}">
      <div v-for="n in 9" :class="'item-'+n">{{n}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        justifyItems: 'stretch',
        alignItems: 'stretch',
      }
    },
  }
</script>
<style>
  .grid-layout-demo5 .container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 50px;
  }
  .grid-layout-demo5 div {
    border: 1px solid orange;
  }

  .item-1 {
    background-color: #ef342a;
  }

  .item-2 {
    background-color: #f68f26;
  }

  .item-3 {
    background-color: #4ba946;
  }

  .item-4 {
    background-color: #0376c2;
  }

  .item-5 {
    background-color: #c077af;
  }

  .item-6 {
    background-color: #f8d29d;
  }

  .item-7 {
    background-color: #b5a87f;
  }

  .item-8 {
    background-color: #d0e4a9;
  }

  .item-9 {
    background-color: #4dc7ec;
  }
</style>
```

### 7. align-content/justify-content，place-content

此类属性仅在网格总大小小于 grid 容器宽度时候有效果。例如，我们网格设定的都是固定的宽高度值，结果还有剩余空间。

- `justify-content` 指定了网格元素的水平分布方式。
- `align-content` 则是指明垂直方向每一行 grid 元素的分布方式。
- `place-content` 为 `align-content`和`justify-content`的缩写

```css
.container {
  justify-content: stretch | start | end | center | space-between | space-around | space-evenly;
  align-content: stretch | start | end | center | space-between | space-around | space-evenly;
}
.container {
  place-content: <align-content> / <justify-content>;
}
```

```html
/*vue*/
<template>
  <div class="grid-layout-demo6">
    <section>
      justify-content:
      <input type="radio" value="stretch" v-model="justifyContent" id="demo5-justify-content-stretch" />
      <label for="demo5-justify-content-stretch">stretch</label>
      <input type="radio" value="start" v-model="justifyContent" id="demo5-justify-content-start" />
      <label for="demo5-justify-content-start">start</label>
      <input type="radio" value="end" v-model="justifyContent" id="demo5-justify-content-end" />
      <label for="demo5-justify-content-end">end</label>
      <input type="radio" value="center" v-model="justifyContent" id="demo5-justify-content-center" />
      <label for="demo5-justify-content-center">center</label>
      <input type="radio" value="space-between" v-model="justifyContent" id="demo5-justify-content-space-between" />
      <label for="demo5-justify-content-space-between">space-between</label>
      <input type="radio" value="space-around" v-model="justifyContent" id="demo5-justify-content-space-around" />
      <label for="demo5-justify-content-space-around">space-around</label>
      <input type="radio" value="space-evenly" v-model="justifyContent" id="demo5-justify-content-space-evenly" />
      <label for="demo5-justify-content-space-evenly">space-evenly</label>
    </section>
    <section>
      align-content:
      <input type="radio" value="stretch" v-model="alignContent" id="demo5-align-content-stretch" />
      <label for="demo5-align-content-stretch">stretch</label>
      <input type="radio" value="start" v-model="alignContent" id="demo5-align-content-start" />
      <label for="demo5-align-content-start">start</label>
      <input type="radio" value="end" v-model="alignContent" id="demo5-align-content-end" />
      <label for="demo5-align-content-end">end</label>
      <input type="radio" value="center" v-model="alignContent" id="demo5-align-content-center" />
      <label for="demo5-align-content-center">center</label>
      <input type="radio" value="space-between" v-model="alignContent" id="demo5-align-content-space-between" />
      <label for="demo5-align-content-space-between">space-between</label>
      <input type="radio" value="space-around" v-model="alignContent" id="demo5-align-content-space-around" />
      <label for="demo5-align-content-space-around">space-around</label>
      <input type="radio" value="space-evenly" v-model="alignContent" id="demo5-align-content-space-evenly" />
      <label for="demo5-align-content-space-evenly">space-evenly</label>
    </section>
    <div class="container" :style="{justifyContent, alignContent}">
      <div v-for="n in 9" :class="'item-'+n">{{n}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        justifyContent: 'stretch',
        alignContent: 'stretch',
      }
    },
  }
</script>
<style>
  .grid-layout-demo6 .container {
    display: grid;
    width: 400px;
    height: 300px;
    grid-template: auto auto auto / auto auto auto;
  }
  .grid-layout-demo6 div {
    border: 1px solid orange;
  }
</style>
```

### 8. grid-auto-flow 属性

划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是 row"先行后列"，即先填满第一行，再开始放入第二行，即下图数字的顺序。如果设置为 column 则"先列后行"。

指定 dense 会更紧凑的排布。

- row: 可以理解成俄罗斯方框 从下往上落子，colum: 可以理解成从右往左落子，遇到碰撞就停止。
- dense: 可以理解为落子的时候可以穿透，直到没有空间为止

```css
.container {
  width: 300px;
  height: 300px;
  display: grid;
  grid-template: 1fr 1fr 1fr / 1fr 1fr 1fr;
  grid-gap: 4px;
}
.item-1 {
  grid-row: 2/4;
}
.item-2 {
  grid-column: 2/3;
}
```

```html
/*vue*/
<template>
  <div class="grid-layout-demo8">
    <section>
      <input type="radio" value="row" v-model="flow" id="demo8-grid-auto-flow-row" /><label
        for="demo8-grid-auto-flow-row"
        >row</label
      >
      <input type="radio" value="column" v-model="flow" id="demo8-grid-auto-flow-column" /><label
        for="demo8-grid-auto-flow-column"
        >column</label
      >
      <input type="radio" value="row dense" v-model="flow" id="demo8-grid-auto-flow-row-dense" /><label
        for="demo8-grid-auto-flow-row-dense"
        >row dense</label
      >
      <input type="radio" value="column dense" v-model="flow" id="demo8-grid-auto-flow-column-dense" /><label
        for="demo8-grid-auto-flow-column-dense"
        >column dense</label
      >
    </section>
    <div class="container" :style="{gridAutoFlow:flow}">
      <div v-for="n in 7" :class="'item-'+n">{{n}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        flow: 'row',
      }
    },
  }
</script>
<style>
  .grid-layout-demo8 .container {
    width: 300px;
    height: 300px;
    display: grid;
    grid-template: 1fr 1fr 1fr / 1fr 1fr 1fr;
    grid-gap: 4px;
  }
  .grid-layout-demo8 .item-1 {
    grid-row: 2/4;
  }
  .grid-layout-demo8 .item-2 {
    grid-column: 2/3;
  }
</style>
```

## Grid 项目属性

### 1. grid-column-start/grid-column-end 属性，grid-row-start/grid-row-end 属性

项目的位置是可以指定的，具体方法就是指定项目的四个边框，分别定位在哪根网格线。网格线从 1 开始。

- grid-column-start 属性：左边框所在的垂直网格线
- grid-column-end 属性：右边框所在的垂直网格线
- grid-row-start 属性：上边框所在的水平网格线
- grid-row-end 属性：下边框所在的水平网格线

```css
.item-1 {
  grid-column-start: 1;
  grid-column-end: 3;
}
/* 相当于 */
.item-1 {
  grid-column: 1/3;
}
```

<div style="width:256px;display: grid; grid-template: 80px 80px 80px / 1fr 1fr 1fr;grid-gap: 8px; background: #dcecfc;color: #fff;">
  <div style="background:orange;grid-column: 1/3;">1</div>
  <div style="background:#123123;">2</div>
  <div style="background:green;grid-row: 2/4;">3</div>
  <div style="background:blue;grid-column: 2/4;">4</div>
  <div style="background:purple">5</div>
  <div style="background:#332444;">6</div>
</div>

第一项定义从第一根纵线到第三个纵线，跨了两个单元格，水平线为默认第一个水平线到第二根水平线。有点像合并单元格。

### 2. grid-area 属性

grid-area 属性指定项目放在哪一个区域。

```css
.item-1 {
  grid-area: e;
}
```

1 号项目位于 e 区域

```html
/*vue*/
<template>
  <div class="grid-layout-demo7">
    <div class="container">
      <div v-for="n in 9" :class="'item-'+n">{{n}}</div>
    </div>
  </div>
</template>
<script>
  export default {}
</script>
<style>
  .grid-layout-demo7 .container {
    width: 300px;
    height: 300px;
    display: grid;
    grid-template: 1fr 1fr 1fr / 1fr 1fr 1fr;
    grid-gap: 4px;
    grid-template-areas:
      'a b c'
      'd e f'
      'g h i';
  }
  .grid-layout-demo7 .item-1 {
    grid-area: e;
  }
</style>
```

grid-area 属性还可用作 grid-row-start、grid-column-start、grid-row-end、grid-column-end 的合并简写形式，直接指定项目的位置。

```css
.item {
  grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
}
```

如

```css
.item-1 {
  grid-area: 1 / 1 / 3 / 3;
}
```

### 3. justify-self / align-self, place-self 属性

- justify-self 属性设置单元格内容的水平位置（左中右），跟 justify-items 属性的用法完全一致，但只作用于单个项目。
- align-self 属性设置单元格内容的垂直位置（上中下），跟 align-items 属性的用法完全一致，也是只作用于单个项目
- place-self 属性是 align-self 属性和 justify-self 属性的合并简写形式。

```css
.item {
  justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;
}
.item {
  place-self: <align-self> <justify-self>;
}
```
