# 布局

## 一、左边固定右边自适应

### 1、float\margin-left

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
    outline: 1px solid red;
    width: 300px;
    height: 200px;

    position: relative;
  }
  .item {
    outline: 1px solid black;
    width: 50px;
    height: 60px;

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
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
    outline: 1px solid red;
    width: 300px;
    height: 200px;
    position: relative;
  }
  .item {
    outline: 1px solid black;
    width: 50px;
    height: 60px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    outline: 1px solid red;
    width: 300px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .item {
    outline: 1px solid black;
    width: 50px;
    height: 60px;
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
