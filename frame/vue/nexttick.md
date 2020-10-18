### Vue.nextTick

源码路径 [src/core/util/next-tick.js](https://github.com/vuejs/vue/blob/dev/src/core/util/next-tick.js)，以下版本为 2.6.11

判断顺序：1、Promise 2、MutationObserver 3、setImmediate 4、setTimeout 优先尝试 microtask 再 macrotask

```js
let timerFunc
// 1、Promise
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
  // 2、MutationObserver
} else if (
  !isIE &&
  typeof MutationObserver !== 'undefined' &&
  (isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]')
) {
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true,
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
  // 3、setImmediate
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
  // 4、setTimeout
} else {
  // Fallback to setTimeout.
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
```

可以看到 vue 的 nextTick 也正是利用 eventloop 的 microtask 的 Promise 和 MutationObserver，如果不支持再降级为 setImmediate、setTimeout

但是为什么一定要是 nextTick 之后才能拿到 dom 修改呢？我直接`Promise.resolve().then`可不可以呢？我们知道 vue 的响应机制是 get 时做依赖收集，在 set 时通知更新，通过源码我们发现 vue 为了优化会合并更新，最后也是调用的 nextTick

```js
// 1、src/core/observer/watcher.js
  run () {
    this.cb.call(this.vm, value, oldValue) // 真正的dom更新回调方法
  }
  update () {
    if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this)
    }
  }

// 2、src/core/observer/scheduler.js
const queue: Array<Watcher> = []
function flushSchedulerQueue () {
   for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    watcher.run()
   }
}
export function queueWatcher (watcher: Watcher) {
  const id = watcher.id
  if (has[id] == null) {
    has[id] = true
    if (!flushing) {
      queue.push(watcher)
    } else {
      let i = queue.length - 1
      while (i > index && queue[i].id > watcher.id) {
        i--
      }
      queue.splice(i + 1, 0, watcher)
    }
    // queue the flush
    if (!waiting) {
      waiting = true
      // 也是调用的 nextTick
      nextTick(flushSchedulerQueue)
    }
  }
}
// 3、nextTick(flushSchedulerQueue)
export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
}

// 4、timerFunc =》flushCallbacks
const callbacks = []
let pending = false

function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

```

所以其实是所有的数据的 set 都会通知 watcher.update，到了 update 的时候，watcher 却不着急，watcher 先排起队来，然后在 nextTick 时 flushSchedulerQueue 批量清空 watcher 执行 watcher.run.cb 才会有真实的 dom 更新

原来 vue 数据更新是异步的，也是调用了 nextTick，而 nextTick，执行时它也不着急，先把回调收集到 callbacks 中，然后启用一个 mcirotask 或者 macrotask 来统一 flushCallbacks,大概这么个包含关系

```js
mcirotask[
  flushCallbacks(
    [
      flushSchedulerQueue([watcher,watcher,watcher])
      user_nextTick_cb, // 用户主动调用$nextTick的回调
      user_nextTick_cb,// 用户主动调用$nextTick的回调
    ]
  )
]
```

由此可见，修改数据后拿不到真实 dom 的原因，其实是更新 dom 的回调压根还没执行，在 watcher 队列里等着呢，等事件循环清理 mcirotask 时才会真的执行，而用户主动写的 user_nextTick_cb 刚好排在后面才能拿到修改的真实 dom

那么如果用户 `Promise.resolve().then(()=>{})` 在 then 回调里去拿 dom 呢，队列大概会这样

```js
mcirotask[
  flushCallbacks(
    [
      flushSchedulerQueue([watcher,watcher,watcher])
      user_nextTick_cb, // 用户主动调用$nextTick的回调
    ]
  ),
  user_promise_then_cb // 在这里，它是一个新的microtask
]
```

所以也能拿到真实 dom，根据上面的理解，可以得到一个有意思的面试题

```js
<template>
  <div id="app">
    {{count}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  mounted () {
    this.count++
    Promise.resolve().then(() => {
      console.log('promise')
    })
    this.$nextTick(() => {
      console.log('nextTick')
    })
  },
}
</script>
```

输出顺序？

```
nextTick
promise
```

如果把 `this.count++` 注释掉，或者模板未使用这个 count 绑定，顺序就是

```
promise
nextTick
```

看看是否理解？

如果模板里有 count 绑定，执行 render 函数时就会有 watcher 收集，修改 count 时就会通知这个 watcher.update 就会调用一次 nextTick，以上代码的队列大概会是这样

```js
mcirotask[
  flushCallbacks(
    [
      flushSchedulerQueue([watcher]) // 1. 修改count的更新watcher
      user_nextTick_cb, // 3. 用户主动调用$nextTick的回调,它是被直接push到callbacks里的
    ]
  ),
  user_promise_then_cb // 2. 它是一个新的microtask
]
```

所以是先执行 flushCallbacks 输出 nextTick，再是 promise

如果注释掉 this.count++，那么顺序就是 promise 再 nextTick

```js
mcirotask[
  user_promise_then_cb // 1. 它是一个新的microtask,
  flushCallbacks(
    [
      user_nextTick_cb, // 2. 用户主动调用$nextTick的回调
    ]
  ),
]
```
