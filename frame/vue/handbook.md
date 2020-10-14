# 要点总结

## 模板编译

模板看似写的 html 实际上写的是渲染函数，最终会被解析成 render 函数用来生成 虚拟 dom

```html
<div id="app">
  <button @click="add">{{count}}</button>
</div>
```

上面的 html 会被编译成下面这样

```js
;(function anonymous() {
  with (this) {
    return _c('div', { attrs: { id: 'app' } }, [_c('button', { on: { click: add } }, [_v(_s(count))])])
  }
})
```

其中`_c _v _s` 是一些方法的简写，源码路径 `src/core/instance/render-helpers/index.js`

```js
export function installRenderHelpers(target: any) {
  target._o = markOnce
  target._n = toNumber
  target._s = toString
  target._l = renderList
  target._t = renderSlot
  target._q = looseEqual
  target._i = looseIndexOf
  target._m = renderStatic
  target._f = resolveFilter
  target._k = checkKeyCodes
  target._b = bindObjectProps
  target._v = createTextVNode
  target._e = createEmptyVNode
  target._u = resolveScopedSlots
  target._g = bindObjectListeners
  target._d = bindDynamicKeys
  target._p = prependModifier
}
```

这里面没有 `_c` 这个就是 `$createElement` 在 `src/core/instance/render.js` 定义，用来创建 VNode 的，看下定义

```js
function createElement (
  context: Component,
  tag: any,
  data: any,
  children: any,
  normalizationType: any,
  alwaysNormalize: boolean
): VNode | Array<VNode>
```

## 生命周期

问题：

- 在生命周期里什么时候可以拿到 props、data、inject
- 虚拟 dom 构建完成发生在什么时期
- 什么时候拿到真实 dom
- 修改数据后可否立即获取数据，可否立即获取 dom

参考源码

```js
function Vue (options) {
  this._init(options) {
    initLifecycle(vm) // $parent,$root,$children,$refs
    initEvents(vm) // 处理父组件传递的事件和回调
    initRender(vm) // $slots, $scopedSlots, _c, $createElement, $attrs, $listeners
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm) // 挂载 props methods data, 处理响应式
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')
  }
}
```

- beforeCreate 钩子里 还不能拿到 props、data
- created 钩子可以拿到 props、data、inject
