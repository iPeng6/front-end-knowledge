# Houdini

CSS Houdini 是一组底层 API，它们公开了 CSS 引擎的各个部分，从而使开发者可以通过这组 API 来扩展 CSS。它让开发者拥有了直接访问 CSSOM 的能力，开发者可以通过这组 API 来编写浏览器可解析的 CSS 代码，这让开发者可以在不需要等待浏览器的实现的前提下实现自己想要的 CSS 功能。

![](https://www.qed42.com/sites/default/files/inline-images/4_3.png)

1. Typed OM API
2. Properties & Values API
3. Paint API
4. Layout API
5. Animation worklet
6. Parser API
7. Font Metrics API

## CSS Paint API

🌰: 随机颜色

<vuep template="#houdini-paint"></vuep>

<script v-pre type="text/x-template" id="houdini-paint">
<style>
  .houdini-paint {
    height: 300px;
    width: 100%;
    --w: 50;
    --h: 50;
    --spacing: 10;
    background-image: paint(randomcolor);
  }
</style>
<template>
  <div class="houdini-paint"></div>
</template>
<script>
export default {
  mounted() {
    let blobURL = URL.createObjectURL(
      new Blob(
        [
          `(function() {
            class RandomColorPainter {
                // 可以获取的css属性，先写在这里
                // 我这里定义宽高和间隔，从css获取
                static get inputProperties() {
                  return ['--w', '--h', '--spacing'];
                }

                paint(ctx, PaintSize, props) {
                    const w = props.get('--w') && +props.get('--w')[0].trim() || 30;
                    const h = props.get('--h') && +props.get('--h')[0].trim() || 30;
                    const spacing = +props.get('--spacing')[0].trim() || 10;

                    for (let x = 0; x < PaintSize.width / w; x++) {
                        for (let y = 0; y < PaintSize.height / h; y++) {
                            ctx.fillStyle = "#"+Math.random().toString(16).slice(2, 8)
                            ctx.beginPath();
                            ctx.rect(x * (w + spacing), y * (h + spacing), w, h);
                            ctx.fill();
                        }
                    }
                }
            }
            registerPaint('randomcolor', RandomColorPainter);
          })()`
        ],
        { type: 'application/javascript' }
      )
    )
    CSS.paintWorklet.addModule(blobURL)

}
}
</script>

</script>

## CSS Typed Object Model

- [更高效、更安全地操作 CSSOM ：CSS Typed OM](https://juejin.im/post/5bc712245188255c352d8c5a)
- [Working with the new CSS Typed Object Model](https://developers.google.com/web/updates/2018/03/cssom)

<vuep template="#houdini-typedom"></vuep>

<script v-pre type="text/x-template" id="houdini-typedom">
<style>
  .houdini-typedom {
    background: linear-gradient(to right, #2c3e50, #4ca1af);
  }
</style>
<template>
  <div class="houdini-typedom" id="houdini-typedom"></div>
</template>
<script>
export default {
  mounted() {
    const box = document.querySelector('#houdini-typedom')
    box.attributeStyleMap.set('width', CSS.px(200))
    box.attributeStyleMap.set('height', CSS.px(200))

    const x = box.computedStyleMap().get('width')
    box.attributeStyleMap.set('transform', new CSSTranslate(x, CSS.px(0)))

}
}
</script>
</script>
