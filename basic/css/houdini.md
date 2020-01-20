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

```html
/*vue*/
<template>
  <div>
    <div class="houdini-paint-demo1"></div>
  </div>
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
<style>
  .houdini-paint-demo1 {
    height: 300px;
    --w: 50;
    --h: 50;
    --spacing: 10;
    background-image: paint(randomcolor);
  }
</style>
```

## CSS Typed Object Model

- [更高效、更安全地操作 CSSOM ：CSS Typed OM](https://juejin.im/post/5bc712245188255c352d8c5a)
- [Working with the new CSS Typed Object Model](https://developers.google.com/web/updates/2018/03/cssom)

```html
/*vue*/
<template>
  <div>
    <div class="houdini-typedom-demo1" id="typedombox1"></div>
  </div>
</template>
<script>
  export default {
    mounted() {
      const box = document.querySelector('#typedombox1')
      box.attributeStyleMap.set('width', CSS.px(200))
      box.attributeStyleMap.set('height', CSS.px(200))

      const x = box.computedStyleMap().get('width')
      console.log(x)
      box.attributeStyleMap.set('transform', new CSSTranslate(x, CSS.px(0)))
    }
  }
</script>
<style>
  .houdini-typedom-demo1 {
    background: linear-gradient(to right, #2c3e50, #4ca1af);
  }
</style>
```
