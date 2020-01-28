# 布局

## 一、左边固定右边自适应

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
