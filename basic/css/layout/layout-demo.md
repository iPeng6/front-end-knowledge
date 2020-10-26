# 布局

## 一、左边固定右边自适应

### 1、float\margin-left

利用了block元素横向默认铺满的特性

```css
.left {
  float: left;
}
.right {
  margin-left: 100px;
}
```

<vuep template="#layout-wrapper-demo1"></vuep>

<script v-pre type="text/x-template" id="layout-wrapper-demo1">
<style>
  .layout-wrapper-demo1 {
    border: 1px solid black;
  }
  div {
    height: 50px;
  }
  .left {
    width: 100px;
    float: left;

    border: 1px solid blue;
  }
  .right {
    margin-left: 100px;

    border: 1px solid red;
  }
</style>
<template>
  <div class="layout-wrapper-demo1">
    <div class="left">left</div>
    <div class="right">right</div>
  </div>
</template>
<script>
  export default {}
</script>
</script>

### 2、float\ overflow

利用BFC元素不会和float元素重叠特性

```css
.left {
  float: left;
}
.right {
  overflow: auto;
}
```

<vuep template="#layout-wrapper-demo2"></vuep>

<script v-pre type="text/x-template" id="layout-wrapper-demo2">
<style>
  div {
    height: 50px;
  }
  .layout-wrapper-demo2 {
    border: 1px solid black;
  }
  .left {
    width: 200px;
    float: left;

    border: 1px solid blue;
  }
  .right {
    overflow: auto;

    border: 1px solid red;
  }
</style>
<template>
  <div class="layout-wrapper-demo2">
    <div class="left">left</div>
    <div class="right">right</div>
  </div>
</template>
<script>
  export default {}
</script>
</script>

### 3、flex

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

<vuep template="#layout-wrapper-demo3"></vuep>

<script v-pre type="text/x-template" id="layout-wrapper-demo3">
<style>
  div {
    height: 50px;
  }
  .layout-wrapper-demo3 {
    display: flex;
    border: 1px solid black;
  }
  .left {
    width: 300px;

    border: 1px solid blue;
  }
  .right {
    flex: 1;

    border: 1px solid red;
  }
</style>
<template>
  <div class="layout-wrapper-demo3">
    <div class="left">left</div>
    <div class="right">right</div>
  </div>
</template>
<script>
  export default {}
</script>
</script>

## 二、右边固定左边自适应

### 1、float\margin-right

利用了block元素横向默认铺满的特性，注意点是 float 元素放上面，优先进行计算

```css
.left {
  margin-left: 100px;
}
.right {
  float: right;
}
```

<vuep template="#layout-wrapper-demo2-1"></vuep>

<script v-pre type="text/x-template" id="layout-wrapper-demo2-1">
<style>
  .layout-wrapper {
    border: 1px solid black;
  }
  div {
    height: 50px;
  }
  .left {
    margin-right: 100px;
    border: 1px solid blue;
  }
  .right {
    float: right;
    width: 100px;
    border: 1px solid red;
  }
</style>
<template>
  <div class="layout-wrapper">
    <div class="right">right</div>
    <div class="left">left</div>
  </div>
</template>
<script>
  export default {}
</script>
</script>

### 2、float\ overflow

利用BFC元素不会和float元素重叠特性

```css
.left {
  float: left;
}
.right {
  overflow: auto;
}
```

<vuep template="#layout-wrapper-demo2-2"></vuep>

<script v-pre type="text/x-template" id="layout-wrapper-demo2-2">
<style>
  div {
    height: 50px;
  }
  .layout-wrapper {
    border: 1px solid black;
  }
  .left {
    overflow: auto;

    border: 1px solid blue;
  }
  .right {
    width: 200px;
    float: right;

    border: 1px solid red;
  }
</style>
<template>
  <div class="layout-wrapper">
    <div class="right">right</div>
    <div class="left">left</div>
  </div>
</template>
<script>
  export default {}
</script>
</script>

## 三、水平垂直居中

### 1、绝对定位 + 上下左右距离 0 + margin:auto

```css
.container {
  position: relative;
}
.item {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
```

<vuep template="#layout-wrapper-demo4"></vuep>

<script v-pre type="text/x-template" id="layout-wrapper-demo4">
<style>
  .container {
    position: relative;

    width: 300px;
    height: 200px;
    outline: 1px solid red;
  }
  .item {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;

    width: 50px;
    height: 60px;
    outline: 1px solid black;
  }
</style>
<template>
  <div class="container">
    <div class="item"></div>
  </div>
</template>
<script>
  export default {}
</script>
</script>

### 2、50%定位 + transform 负 50%

利用绝对定位相对于容器，而transform相对于自身

```css
.container {
  position: relative;
}
.item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

<vuep template="#layout-wrapper-demo5"></vuep>

<script v-pre type="text/x-template" id="layout-wrapper-demo5">
<style>
  .container {
    position: relative;

    width: 300px;
    height: 200px;
    outline: 1px solid red;
  }
  .item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 50px;
    height: 60px;
    outline: 1px solid black;
  }
</style>
<template>
  <div class="container">
    <div class="item"></div>
  </div>
</template>
<script>
  export default {}
</script>
</script>

### 3、flex 布局

```css
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

<vuep template="#layout-wrapper-demo6"></vuep>

<script v-pre type="text/x-template" id="layout-wrapper-demo6">
<style>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;

    outline: 1px solid red;
    width: 300px;
    height: 200px;
  }
  .item {
    width: 50px;
    height: 60px;
    outline: 1px solid black;
  }
</style>
<template>
  <div class="container">
    <div class="item"></div>
  </div>
</template>
<script>
  export default {}
</script>
</script>

## 四、9 宫格

### 1、flex

利用  flex-wrap: wrap; 换行机制

```css
.container {
  display: flex;
  flex-wrap: wrap;
}

.item {
  width: 33%;
}
```

<vuep template="#layout-wrapper-demo7"></vuep>

<script v-pre type="text/x-template" id="layout-wrapper-demo7">
<style>
  .container {
    display: flex;
    flex-wrap: wrap;
    width: 300px;
    height: 300px;
  }
  .item {
    width: 33%;

    outline: 1px solid black;
  }
</style>
<template>
  <div class="container">
    <div class="item" v-for="n in 9">{{n}}</div>
  </div>
</template>
<script>
  export default {}
</script>
</script>

### 2、grid

```css
.container {
  display: grid;
  grid-template: 1fr 1fr 1fr / 1fr 1fr 1fr;
}
```

<vuep template="#layout-wrapper-demo8"></vuep>

<script v-pre type="text/x-template" id="layout-wrapper-demo8">
<style>
  .container {
    display: grid;
    grid-template: 1fr 1fr 1fr / 1fr 1fr 1fr;

    width: 300px;
    height: 300px;
  }
  .item {
    outline: 1px solid black;
  }
</style>
<template>
  <div class="container">
    <div class="item" v-for="n in 9">{{n}}</div>
  </div>
</template>
<script>
  export default {}
</script>
</script>
