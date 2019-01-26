# 常见算法

## 斐波那契数列

## 节流防抖

函数防抖（debounce）和函数节流（throttle）都是为了缓解函数频繁调用，它们相似，但有区别

```
正常执行： ********************
函数防抖： -----    *------------    *--    *
函数节流： ----*----*----*--    *
```

如上图，一个`*`代表一次函数调用，`函数防抖`是连续触发必须停顿一定时间后才会执行一次，之前的全部丢弃只触发最后一次，`函数节流`是一定时间段内只执行一次，即使连续触发也会保持时间周期，触发刚过间隔期的那一次调用，前面也全部丢弃，最后一次调用会在停止触发后等一个周期执行

```js
// 函数防抖实现
function debounce(fn, delay) {
  let timer = null
  return function() {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

// 函数节流实现
function throttle(fn, cycle) {
  let start = Date.now()
  let now
  let timer
  return function() {
    now = Date.now()
    clearTimeout(timer)
    if (now - start >= cycle) {
      fn.apply(this, arguments)
      start = now
    } else {
      timer = setTimeout(() => {
        fn.apply(this, arguments)
      }, cycle)
    }
  }
}
```

## 柯里化

## 深拷贝
