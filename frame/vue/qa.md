# 常见问题

- [vue-router 的 addRoutes 的刷新 404 和重复路由的终极解决方案](https://juejin.im/post/6844903937141637127)

## v-if 和 v-for 优先级

`src/compiler/codegen/index.js`

```js
export function genElement(el: ASTElement, state: CodegenState): string {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre
  }

  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    //
  }
}
```

`src/compiler/parser/index.js`

```js
if (inVPre) {
  processRawAttrs(element)
} else if (!element.processed) {
  // structural directives
  processFor(element)
  processIf(element)
  processOnce(element)
}
```

结论就是 v-for 高

## data 为什么是个函数

Vue 组件可能存在多个实例，如果使用对象形式定义 data，则会导致它们共用一个 data 对象

`src/core/instance/state.js`

```js
function initData(vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {}
}
```

## key 的作用和原理

key 的主要作用是唯一确定元素，避免频繁更新不同元素，减少 dom 操作，提高 diff 性能

`src/core/vdom/patch.js`

```js
function sameVnode(a, b) {
  return (
    a.key === b.key &&
    ((a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b)) ||
      (isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error)))
  )
}
```

从源码可知，如果不设置 key，那么 key 都是 undefined，那么 a.tag===b.tag 始终 true，剩下基本只要 tag 相同就认为是同一个节点，就会 patchVNode 继续递归下去

dff 的比较顺序：首首 尾尾 首尾 尾首

```js
// <li v-for 渲染下面数组
oldCh = [a, b, c, d]
newCh = [a, b, f, c, d]

没有key的比较顺序
a a
b b
c f // 因为tag相同
d c // 因为tag相同
+d

有key的比较顺序
a a
b b // 首c f不同, 于是比较 尾 d d
d d
c c
+f
```

## diff 算法理解

1. 只要引入了虚拟 dom，那么 diff 就是必然的，vue2.x 中每个 vue 实例最后都会 new Watcher，new Watcher 之后会立即将 this 赋值给 Dep.target,然后执行 update, 这个 watcher 的 update 里会去执行`render => vnode => patch => dom`，渲染函数里会触发 data 中数据的 get，从而使得 data 中所有 key 都会收集依赖这个 Dep.target 即 watcher，一旦数据更改，都会通知这个 watcher 去 update 整个组件，因为每次都是构建出一个完整的 VNode，所以 patch 时就得有个 diff 算法使得 patch 执行最少的 dom 操作
2. vnode 的比较顺序，深度优先，同级比较，同级比较时又会首尾两两比较优化性能，旧新的比较顺序是 `首首 => 尾尾 =>首尾=> 尾首`，如果没有匹配到再使用通用方式遍历查找，具体是根据新的 key 值去老的数组去捞，捞到了就移到剩余节点的队首，然后置空它，如果旧新数组不等长，旧的多了就删，新的多了就要插入，整体顺序是从两头朝中间聚拢式查找的

`src/core/vdom/patch.js`

```js
function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (isUndef(oldStartVnode)) {
      oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
    } else if (isUndef(oldEndVnode)) {
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      // Vnode moved right
      patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
      canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      // Vnode moved left
      patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
      canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
      if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
      idxInOld = isDef(newStartVnode.key)
        ? oldKeyToIdx[newStartVnode.key]
        : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
      if (isUndef(idxInOld)) {
        // New element
        createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
      } else {
        vnodeToMove = oldCh[idxInOld]
        if (sameVnode(vnodeToMove, newStartVnode)) {
          patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
          oldCh[idxInOld] = undefined
          canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
        } else {
          // same key but different element. treat as new element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
        }
      }
      newStartVnode = newCh[++newStartIdx]
    }
  }
  if (oldStartIdx > oldEndIdx) {
    refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
    addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
  } else if (newStartIdx > newEndIdx) {
    removeVnodes(oldCh, oldStartIdx, oldEndIdx)
  }
}
```

## 组件通信方式

- props/\$emit
- provide/inject
- $parent/$children
- $attrs/$listeners
- eventbus
- vuex

## vue 中的优化

- 异步路由
- keep-alive
- v-show
- v-for v-if
  - v-if 放外层
  - 如果是内层逻辑，根据 if 条件提前过滤，得到一个计算属性使用
- 长列表性能优化
  - Object.freeze 冻结不需要响应式的数据
  - [vue-virtual-scroll-list](https://github.com/tangbc/vue-virtual-scroll-list)
- 定时器销毁
- 图片懒加载
  - [vue-lazyload](https://github.com/hilongjw/vue-lazyload)
- 第三方库按需引入
- 无状态组件标记为函数式组件
- 子组件分割，因为没个 vue 实例对应一个 watcher，抽出组件可以缩小更新范围，每个组件只管理自己的子树

## vue3.0

- 更快
  - 虚拟 DOM 重写
  - 优化 slots 的生成
  - 静态树提升
  - 静态属性提升
  - 基于 Proxy 的响应式系统
- 更小:通过摇树优化核心库体积
- 更容易维护:TypeScript + 模块化
- 更加友好
  - 跨平台:编译器核心和运行时核心与平台无关，使得 Vue 更容易与任何平台(Web、
    Android、iOS)一起使用
- 更容易使用
  - 改进的 TypeScript 支持，编辑器能提供强有力的类型检查和错误及警告
  - 更好的调试支持
  - 独立的响应化模块
  - Composition API
