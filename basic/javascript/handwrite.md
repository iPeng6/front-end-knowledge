# Javascript 手写

- [Javascript 手写](#javascript-手写)
  - [手写原生 Ajax](#手写原生-ajax)
  - [手写操作 cookie](#手写操作-cookie)
  - [柯里化](#柯里化)
  - [手写 call、apply、bind](#手写-callapplybind)
  - [防抖节流](#防抖节流)
  - [手写 jsonp](#手写-jsonp)
  - [模拟FPS](#模拟fps)
  - [模拟 setTimeout](#模拟-settimeout)
  - [模拟 setInterval](#模拟-setinterval)
  - [flat 展平数组](#flat-展平数组)
  - [实现 new](#实现-new)
  - [实现 instanceof](#实现-instanceof)
  - [promisify](#promisify)
  - [compose](#compose)

## 手写原生 Ajax

```js
var xhr = new XMLHttpRequest()
xhr.open('GET', url)
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.responseText)
  }
}
xhr.send()
```

## 手写操作 cookie

```js
//读Cookie
function getCookie(objName) {
  //获取指定名称的cookie的值
  var arrStr = document.cookie.split('; ')
  for (var i = 0; i < arrStr.length; i++) {
    var temp = arrStr[i].split('=')
    if (temp[0] == objName) return unescape(temp[1])
  }
  return ''
}
//es6版
function getCookies() {
  let cookies = {}
  document.cookie.match(/\w+=\w+;/gi).forEach((item) => {
    let [key, val] = item.split('=')
    cookies[key] = val.slice(0, -1)
  })
  return cookies
}

//设置cookie的值
function setCookie(cname, cvalue, exdays) {
  var d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  var expires = 'expires=' + d.toGMTString()
  document.cookie = cname + '=' + escape(cvalue) + '; ' + expires
}
```

## 柯里化

```js
/*
function add(a, b, c) {
  return a + b + c
}
add(1)(2)(3)
*/

function curry(fn) {
  var l = fn.length
  var args = []
  return function c(x) {
    args.push(x)
    if (args.length === l) {
      return fn.apply(this, args)
    }
    return c
  }
}
function add1(a, b, c) {
  return a + b + c
}

var add = curry(add1)
console.log(add(1)(2)(3))

function add(a) {
  var list = [a]
  var st = null
  return function _add(b) {
    var sum = list.reduce((m, n) => m + n, b)
    clearTimeout(st)
    st = setTimeout(function () {
      console.log(sum)
    }, 0)
    list.push(b)
    return _add
  }
}

add(1)(2)(3)(3)(3)
```

## 手写 call、apply、bind

```js

Function.prototype.call = function (ctx,...args) {
  ctx = typeof ctx === 'object' && ctx !== null ? ctx : window

  const key = Symbol()
  ctx[key] = this

  const result = ctx[key]( ...args)
  delete ctx[key]
  return result
}

Function.prototype.apply = function (ctx, args) {
  ctx = typeof ctx === 'object' ? ctx : window

  const key = Symbol()
  ctx[key] = this

  const result = ctx[key]( ...args)
  delete ctx[key]
  return result
}

Function.prototype.bind = function (ctx) {
  ctx = typeof ctx === 'object' ? ctx : window
  return (...args) => {
    return this.call(ctx, ...args)
  }
}
```

## 防抖节流

```js
// 函数防抖实现
function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

// 函数节流实现
function throttle(fn, cycle) {
  let start = Date.now()
  let now
  let timer
  return function (...args) {
    now = Date.now()
    clearTimeout(timer)
    if (now - start >= cycle) {
      fn.apply(this, args)
      start = now
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, cycle)
    }
  }
}
```

## 手写 jsonp

```js
function jsonp({ url, data, success, fail }) {
  // 安装回调
  const fnName = 'jsonp' + Math.random().toString(36).slice(-8)
  window[fnName] = success

  // 拼接url
  const query = Object.keys(data)
    .map((key) => `${key}=${data[key]}`)
    .join('&')
  const separator = url.includes('?') ? '&' : '?'
  url = url + separator + query + '&callback=' + fnName

  // 创建script请求
  const script = document.createElement('script')
  script.src = url
  script.onerror = fail
  document.head.appendChild(script)
}

// 调用
jsonp({
  url: 'http://www.example.com',
  data: { id: 1 },
  success(res) {
    console.log(res)
  },
  fail(error) {
    console.log(error)
  },
})
```
## 模拟FPS

```js
/**
 * 统一一段时间内总帧数，得到一帧需要的毫秒数，再用 1000 毫秒除以 一帧所需要的时间
 * 前面不是很准，但是时间越长越准确
 */
function fps() {
  let frame = 0
  let start = Date.now()
  let now
  let raf
  function loop() {
    frame++
    now = Date.now()

    const fps = Math.round(1000 / ((now - start) / frame))

    // 一秒内的可能不太准
    if (frame > 100) {
      console.log(fps)
    }

    raf = requestAnimationFrame(loop)
  }
  loop()
  return () => {
    cancelAnimationFrame(raf)
  }
}

// 直接统计 requestAnimationFrame 时间得到每一帧时间 得到fps 不太稳定
function fps2() {
  let last = Date.now()
  let raf
  function loop() {
    const fps = Math.round(1000 / (Date.now() - last))
    console.log(fps)
    last = Date.now()
    raf = requestAnimationFrame(loop)
  }
  loop()
  return () => {
    cancelAnimationFrame(raf)
  }
}
```

## 模拟 setTimeout

```js
function timeout(fn, delay) {
  let raf
  let start = Date.now()
  function loop() {
    if (Date.now() - start > delay) {
      fn()
      return
    }
    raf = requestAnimationFrame(loop)
  }
  loop()
  return () => {
    cancelAnimationFrame(raf)
  }
}

const cancel = timeout(() => {
  console.log('timeout')
}, 2000)
```

## 模拟 setInterval

```js
function interval(fn, cycle) {
  let raf
  let last = Date.now()
  let now
  function loop() {
    now = Date.now()
    if (now - last >= cycle) {
      fn()
      last = now
    }

    raf = requestAnimationFrame(loop)
  }
  loop()
  return () => {
    cancelAnimationFrame(raf)
  }
}

const cancel = interval(() => {
  console.log(1)
}, 1000)

```

## flat 展平数组

```js
/**
 * 多维数组展平成一维数组
 * [1, [2, [3]], [4]] => [1, 2, 3, 4]
 * @param data
 */

function flat(arr) {
  return arr.reduce((ret, item) => {
    if (Array.isArray(item)) {
      return ret.concat(flat(item))
    }
    return ret.concat(item)
  }, [])
}

function flat2(arr, depth = 1) {
  function loop(arr, i) {
    return arr.reduce((ret, item) => {
      if (i < depth && Array.isArray(item)) {
        const res = ret.concat(loop(item, i + 1))
        return res
      }
      return ret.concat(item)
    }, [])
  }
  return loop(arr, 1)
}

console.log(flat2([1, [2, [3, [4, 5]]], 7, [[[8], 9], 0]], 2))
```

## 实现 new

```js
function myNew(Ctor, ...args) {
  const obj = Object.create(Ctor.prototype)
  const res = Ctor.apply(a, args)
  return typeof res === 'object' && res !== null? res : obj
}
```

## 实现 instanceof

```js
function instanceOf(left, right) {
  left = left.__proto__
  let rightV = right.prototype
  while (left) {
    if (left === rightV) {
      return true
    }
    left = left.__proto__
  }
  return false
}

function A() {}
let a = new A()
b = Object.create(a)

console.log(b instanceof A)
console.log(instanceOf(b, A))
```

## promisify

```js
function promisify(fn) {
  return (...args) =>
    new Promise((resolve, reject) => {
      fn(args, (error, value) => {
        if (error) {
          reject(error)
        } else {
          resolve(value)
        }
      })
    })
}
```

## compose

```js
function compose(...fns) {
  return (...args) => {
    return fns.slice(1).reduce((ret, fn) => fn(ret), fns[0](...args))
  }
}

const add = (x, y) => x + y
const square = (z) => z * z
const doble = (m) => m * 2

const nf = compose(add)

console.log(nf(1, 2))
```
