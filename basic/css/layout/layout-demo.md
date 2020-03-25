# 布局

## 左边固定右边自适应

1.

```css
.left {
  width: 100px;
  float: left;
}
.right {
  margin-left: 100px;
}
```

```html
/*vue*/
<template>
  <div>
    <div class="layout-wrapper-demo1">
      <div class="left">left</div>
      <div class="right">right</div>
    </div>
  </div>
</template>
<script>
  export default {}
</script>
<style>
  .layout-wrapper-demo1 {
    border: 1px solid black;
  }
  .layout-wrapper-demo1 div {
    height: 50px;
  }
  .layout-wrapper-demo1 .left {
    width: 100px;
    float: left;

    border: 1px solid blue;
  }
  .layout-wrapper-demo1 .right {
    margin-left: 100px;

    border: 1px solid red;
  }
</style>
```

2.

```css
.left {
  width: 200px;
  float: left;
}
.right {
  overflow: auto;
}
```

```html
/*vue*/
<template>
  <div>
    <div class="layout-wrapper-demo2">
      <div class="left">left</div>
      <div class="right">right</div>
    </div>
  </div>
</template>
<script>
  export default {}
</script>
<style>
  .layout-wrapper-demo2 div {
    height: 50px;
  }
  .layout-wrapper-demo2 {
    border: 1px solid black;
  }
  .layout-wrapper-demo2 .left {
    width: 200px;
    float: left;

    border: 1px solid blue;
  }
  .layout-wrapper-demo2 .right {
    overflow: auto;

    border: 1px solid red;
  }
</style>
```

3.

```css
.wrapper {
  display: flex;
}
.left {
  width: 300px;
}
.right {
  flex: 1;
}
```

```html
/*vue*/
<template>
  <div>
    <div class="layout-wrapper-demo3">
      <div class="left">left</div>
      <div class="right">right</div>
    </div>
  </div>
</template>
<script>
  export default {}
</script>
<style>
  .layout-wrapper-demo3 div {
    height: 50px;
  }
  .layout-wrapper-demo3 {
    display: flex;
    border: 1px solid black;
  }
  .layout-wrapper-demo3 .left {
    width: 300px;

    border: 1px solid blue;
  }
  .layout-wrapper-demo3 .right {
    flex: 1;

    border: 1px solid red;
  }
</style>
```

## 右边固定左边自适应

## 水平垂直居中

## 9 宫格

```css
.container {
  display: flex;
  flex-wrap: wrap;
}

.item {
  width: 33%;
}
```

```html
/*vue*/
<template>
  <div class="layout-wrapper-demo6">
    <div class="container">
      <div class="item" v-for="n in 9">{{n}}</div>
    </div>
  </div>
</template>
<script>
  export default {}
</script>
<style>
  .layout-wrapper-demo6 .container {
    display: flex;
    flex-wrap: wrap;
    width: 300px;
    height: 300px;
  }
  .layout-wrapper-demo6 .item {
    width: 33%;

    outline: 1px solid black;
  }
</style>
```

```css
.container {
  display: grid;
  grid-template: 1fr 1fr 1fr / 1fr 1fr 1fr;
}
```

```html
/*vue*/
<template>
  <div class="layout-wrapper-demo6_1">
    <div class="container">
      <div class="item" v-for="n in 9">{{n}}</div>
    </div>
  </div>
</template>
<script>
  export default {}
</script>
<style>
  .layout-wrapper-demo6_1 .container {
    display: grid;
    grid-template: 1fr 1fr 1fr / 1fr 1fr 1fr;

    width: 300px;
    height: 300px;
  }
  .layout-wrapper-demo6_1 .item {
    outline: 1px solid black;
  }
</style>
```
