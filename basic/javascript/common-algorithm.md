# 常见算法

## 斐波那契数列

正常递归版本

```js
function fibonacci(n) {
  if (n == 0) return 0
  else if (n == 1) return 1
  else return fibonacci(n - 1) + fibonacci(n - 2)
}
```

代码优美逻辑清晰。但是这个版本有一个问题即存在大量的重复计算。如：当 n 为 5 的时候要计算 fibonacci(4) + fibonacci(3)当 n 为 4 的要计算 fibonacci(3) + fibonacci(2) ，这时 fibonacci(3)就是重复计算了。运行 fibonacci(50) 等半天才会出结果。

去除重复计算的递归版本

```js
function fib(n) {
  function fib_(n, a, b) {
    if (n == 0) return a
    else return fib_(n - 1, b, a + b)
  }
  return fib_(n, 0, 1)
}
```

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

维基百科：在计算机科学中，柯里化（英语：Currying），是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

由以上定义，柯里化又可理解为部分求值，返回接受剩余参数且返回结果的新函数。想要应用柯里化，我们必须先理解柯里化的作用和特点，这里我总结为以下三点：

1. 参数复用 – 复用最初函数的第一个参数
2. 提前返回 – 返回接受余下的参数且返回结果的新函数
3. 延迟执行 – 返回新函数，等待执行

```js
function curry(func) {
  var l = func.length
  return function curried() {
    var args = [].slice.call(arguments)
    if (args.length < l) {
      return function() {
        var argsInner = [].slice.call(arguments)
        return curried.apply(this, args.concat(argsInner))
      }
    } else {
      return func.apply(this, args)
    }
  }
}

var f = function(a, b, c) {
  return console.log([a, b, c])
}
var curried = curry(f)
curried(1)(2)(3)

function curry(f) {
  var l = f.length
  var args = [].slice.call(arguments, 1)

  return function c() {
    var _args = [].slice.call(arguments)
    args = args.concat(_args)
    if (args.length < l) {
      return c
    } else {
      return f.apply(this, args)
    }
  }
}

function fn(a, b, c) {
  console.log(a, b, c)
}

var cf1 = curry(fn, 1)
cf1(2)(3)
```

## 深拷贝

```js
JSON.parse(JSON.stringify(obj))

function clone(value, isDeep) {
  if (value === null) return null
  if (typeof value !== 'object') return value
  if (Array.isArray(value)) {
    if (isDeep) {
      return value.map(item => clone(item, true))
    }
    return [].concat(value)
  } else {
    if (isDeep) {
      var obj = {}
      Object.keys(value).forEach(item => {
        obj[item] = clone(value[item], true)
      })
      return obj
    }
    return { ...value }
  }
}

var objects = { c: { a: 1, e: [1, { f: 2 }] }, d: { b: 2 } }
var shallow = clone(objects, true)
console.log(shallow.c.e[1]) // { f: 2 }
console.log(shallow.c === objects.c) // false
console.log(shallow.d === objects.d) // false
console.log(shallow === objects) // false
```
