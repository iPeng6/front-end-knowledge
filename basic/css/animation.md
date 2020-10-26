# 动画

<details>
<summary>引用参考 - 2020年09月22日</summary>

- [requestAnimationFrame 知多少？](https://www.cnblogs.com/onepixel/p/7078617.html)
- [前端动画大乱炖](https://www.jianshu.com/p/280e0ef90b96)

</details>

思考：前端动画技术有哪些，css 动画有哪些，如何设置动画无限循环、往复循环，如何提升动画性能

## 基本概念

- **帧**：在动画过程中，每一幅静止画面即为一“帧”；
- **帧率**：即每秒钟播放的静止画面的数量，单位是 fps(Frame per second)或赫兹(Hz)；
- **帧时长**：即每一幅静止画面的停留时间，单位一般是 ms(毫秒)；
- **丢帧**：在帧率固定的动画中，某一帧的时长远高于平均帧时长，导致其后续数帧被挤压而丢失的现象；

我们在显示器上看到的动画，每一帧变化都是系统绘制出来的（GPU 或者 CPU）。它的最高绘制频率受限于显示器的刷新频率（而非显卡，大多数是 60Hz）。

## 实现方式

- JavaScript：通过定时器（setTimeout 和 setIterval）来间隔改变元素样式，或者使用 requestAnimationFrame；
- CSS3：**transition** 和 **animation**；
- HTML5：使用 HTML5 提供的绘图方式（canvas、svg、webgl）；

### Transition

CSS 中的 transition 属性允许块级元素中的属性在指定的时间内平滑的改变

```css
transition: property duration timing-function delay;
```

| 值                         | 描述                                                                                            |
| :------------------------- | :---------------------------------------------------------------------------------------------- |
| transition-property        | 规定设置过渡效果的 CSS 属性的名称。（none / all / property）                                    |
| transition-duration        | 规定完成过渡效果需要多少秒或毫秒。                                                              |
| transition-timing-function | 规定速度效果的速度曲线。（linear、ease、ease-in、ease-out、ease-in-out、cubic-bezier(n,n,n,n)） |
| transition-delay           | 定义过渡效果何时开始。                                                                          |

### Animation

Animation 作用于元素本身而不是样式属性

```css
animation: name duration timing-function delay iteration-count direction;
```

| 值                        | 描述                                                                                        |
| :------------------------ | :------------------------------------------------------------------------------------------ |
| animation-name            | 规定需要绑定到选择器的 keyframe 名称。（keyframe name、none）                               |
| animation-duration        | 规定完成动画所花费的时间，以秒或毫秒计。                                                    |
| animation-timing-function | 规定动画的速度曲线。（linear、ease、ease-in、ease-out、ease-in-out、cubic-bezier(n,n,n,n)） |
| animation-delay           | 规定在动画开始之前的延迟。                                                                  |
| animation-iteration-count | 规定动画应该播放的次数。                                                                    |
| animation-direction       | 规定是否应该轮流反向播放动画。 （normal、alternate）                                        |
| animation-fill-mode       | 设置 CSS 动画在执行之前和之后如何将样式应用于其目标。(none、forwards、backwards、both)      |

<vuep template="#animation-demo1" :iframe="true"></vuep>

<script v-pre type="text/x-template" id="animation-demo1">
<style>
  .box {
    width: 50px;
    height: 50px;
    background: red;
    animation: move 1s linear infinite alternate;
  }
  @keyframes move {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(200px);
    }
  }
</style>
<template>
  <div class="box"></div>
</template>
<script>
  export default {}
</script>
</script>

### Canvas

`<canvas>`是 HTML5 新增的元素，作为页面图形绘制的容器，可用于通过使用 JavaScript 中的脚本来绘制图形。例如，它可以用于绘制图形，制作照片，创建动画，甚至可以进行实时视频处理或渲染，Canvas 具有如下特点：

- 依赖分辨率，基于位图；
- 不支持事件处理器；
- 弱的文本渲染能力；
- 能够以 .png 或 .jpg 格式保存结果图像；
- 最适合图像密集型的游戏，其中的许多对象会被频繁重绘；

<vuep template="#canvas-demo1"></vuep>

<script v-pre type="text/x-template" id="canvas-demo1">
<template>
   <canvas id="animation-canvas-demo1"></canvas>
</template>
<script>
export default {
  mounted() {
    var c = document.getElementById('animation-canvas-demo1'),
            $ = c.getContext('2d'),
            w = c.width = 800,                                //设置 Canvas 宽度（全屏）
            h = c.height = 500,                               //设置 Canvas 高度（全屏）
            t = 0, num = 450,                                 //num = 450 绘制数量
            u = 0, _u,                                        //线性渐变的颜色值
            s, a, b,
            x, y, _x, _y,
            _t = 1 / 100;                                     //控制摆动速度

    var anim = function() {
      $.globalCompositeOperation = 'source-over';           //默认，在目标图像上显示源图像
      $.fillStyle = 'hsla(0, 0%, 0%, .75)';                 //填充颜色
      $.fillRect(0, 0, w, h);                               //绘制“已填色”的矩形
      $.globalCompositeOperation = 'lighter';               //显示源图像 + 目标图像
      for (var i = 0; i < 2; i++) {
          x = 0; _u = (u / 4)+i;
          $.beginPath();
          //循环绘制个数（num），正玄 Math.sin(弧度)，余弦 Math.cos(弧度)
          for (var j = 0; j < num; j++) {
              x -= .72 * Math.sin(4);
              y = x * Math.sin(i + 3.0 * t + x / 20) / 2;
              _x = x * Math.cos(b) - y * Math.sin(b);
              _y = x * Math.sin(b) + y * Math.cos(b);
              b = (j * 3) * Math.PI / 6.8;
              $.lineWidth = .18;                                      //线条宽度
              $.arc(w / 2 - _x, h / 2 -_y, .5, 0, 2 * Math.PI);       //画圆（半径0.5）
          }

          //设置线性渐变
          var g = $.createLinearGradient(w / 2 + _x, h / 2 + _y,  0, w / 2 + _x, h / 2 + _y);
          g.addColorStop(0.0, 'hsla('+ u +',85%,50%,1)');
          g.addColorStop(0.5, 'hsla('+ _u +',85%,40%,1)');
          g.addColorStop(1, 'hsla(0,0%,5%,1)');
          $.strokeStyle = g;                                          //线条颜色为 g（线性渐变）
          $.stroke();
      }
      t += _t;                                                        //摆动速度会不断增加
      u -= .2;                                                        //改变颜色值
      window.requestAnimationFrame(anim);                             //绘制动画 anim
    };
    anim();

    //监听，当浏览器宽度和高度改变时，改变 Canvas 的宽度和高度
    window.addEventListener('resize', function() {
        c.width = w = window.innerWidth;
        c.height = h = window.innerHeight;
    }, false);
  }
}
</script>
</script>

### SVG

SVG (Scalable Vector Graphics)，意为可缩放矢量图形，用来定义用于网络的基于矢量的图形，使用 XML 格式定义图像，特点

- 不依赖分辨率，基于矢量图；
- 支持事件处理器；
- 最适合带有大型渲染区域的应用程序（比如谷歌地图）；
- 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）；
- 不适合游戏应用；

<vuep template="#svg-demo1"></vuep>

<script v-pre type="text/x-template" id="svg-demo1">
<template>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="height: 180px;">
    <rect x="50" y="20" rx="20" ry="20" width="150" height="150"
    style="fill:red;stroke:black;stroke-width:5;opacity:0.5"/>
  </svg>
</template>
<script></script>
</script>

### WebGL

WebGL 使得网页在支持 HTML `<canvas>` 标签的浏览器中，不需要安装任何插件，便可以使用基于 OpenGL ES 2.0 的 API 在 canvas 中进行 3D 渲染。 WebGL 程序由 JavaScript 的控制代码和在计算机的图形处理单元（GPU）中执行的特效代码(shader code，渲染代码) 组成。

## 几个常用的动画库

- [Ani.js -- 基于 CSS 动画的生命处理库](http://anijs.github.io/)
- [Dynamics.js -- 创建具有物理运动效果动画的 js 库](http://dynamicsjs.com/)
- [Animate.css -- 齐全的 CSS3 动画库](https://daneden.github.io/animate.css/)
- [Three.js -- 让用户通过 javascript 入手进入搭建 webgl 项目的类库](https://threejs.org/examples/)
