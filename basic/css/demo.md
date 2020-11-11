# 常见例子

## 省略号实现

## 一像素线实现

## 三角形

<vuep template="#triangle"></vuep>

<script v-pre type="text/x-template" id="triangle">
<style>
.box {
  width: 0;
  height: 0;
  border-top: 40px solid transparent;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
  border-bottom: 40px solid #ff0000;
}
</style>
<template>
  <div class="box"></div>
</template>
<script>
  export default {}
</script>
</script>

## 扇形

<vuep template="#fan-shape"></vuep>

<script v-pre type="text/x-template" id="fan-shape">
<style>
.box {
  width: 0;
  height: 0;
  border: solid 40px red;
  border-color: red transparent transparent transparent;
  border-radius: 40px;
}
</style>
<template>
  <div class="box"></div>
</template>
<script>
  export default {}
</script>
</script>
