# GPU 加速

<details>
<summary>参考</summary>

- [在 CSS 动画中使用硬件加速(翻译)](https://juejin.im/post/6844903649974435854)

</details>

## 创建

- transform
- opacity
- filter
- will-change
- `<video><iframe><canvas><webgl>`等元素


## GPU 加速会对定位有影响吗？

会有影响，如果 position 属性是 absolute 或 fixed，包含块可能是由满足以下条件的最近父级元素的 padding-box 边缘组成：
* transform 或 perspective 的值不是 none
* will-change 的值是 transform 或 perspective
* filter 的值不是 none 或 will-change 的值是 filter(只在 Firefox 下生效).
* contain 的值是 paint (例如: contain: paint;)

所以使用 transform、filter开启 GPU 加速时，会产生包含块，导致 fixed 元素不再相对于 viewpoint 定位了

下面是个在iframe里的例子，鼠标移入蓝色块会开启GPU加速，然后fixed元素跑里面了

<vuep template="#gpu-demo1" :iframe="true"></vuep>

<script v-pre type="text/x-template" id="gpu-demo1">
<style>
.box-parent{
  height: 50px;
  width: 300px;
  background: blue;
  margin-top: 100px;
}

.box-parent:hover {
  transform: translateX(0);
}

.box-fixed {
  position: fixed;
  top: 0;
  background: red;
}
</style>
<template>
  <div class="box-parent">
    <div class="box-fixed">fixed</div>
  </div>
</template>
<script></script>
</script>
