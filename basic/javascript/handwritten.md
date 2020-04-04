# 手写代码

## 手写原生 Ajax

```js
var xhr = new XMLHttpRequest()
xhr.open('GET', url)
xhr.onreadystatechange = function() {
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
  document.cookie.match(/\w+=\w+;/gi).forEach(item => {
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
function curry(fn) {
  var l = fn.length
  var args = []
  return function c(x) {
    args.push(x)
    if (args.length === l) {
      return fn.apply(this, args)
    } else {
      return c
    }
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
    st = setTimeout(function() {
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
/**
 * 自定义call实现
 * @param context   上下文this对象
 * @param args      动态参数
 */
Function.prototype.myCall = function(context, ...args) {
  context = typeof context === 'object' ? context : window
  // 防止覆盖掉原有属性
  const key = Symbol()
  // 这里的this为需要执行的方法，将方法挂载到当前上下文对象上，这样当对象调用方法时内部this自动指向调用对象
  context[key] = this
  // 方法执行
  const result = context[key](...args)
  delete context[key]
  return result
}

/**
 * 自定义Apply实现
 * @param context   上下文this对象
 * @param args      参数数组
 */
Function.prototype.myApply = function(context, args) {
  context = typeof context === 'object' ? context : window
  // 防止覆盖掉原有属性
  const key = Symbol()
  // 这里的this为需要执行的方法
  context[key] = this
  // 方法执行
  const result = context[key](...args)
  delete context[key]
  return result
}

/**
 * 自定义bind实现
 * @param context     上下文
 * @returns {Function}
 */
Function.prototype.myBind = function(context) {
  context = typeof context === 'object' ? context : window
  return (...args) => {
    this.call(context, ...args)
  }
}
```

## 防抖节流

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

## 手写 jsonp

```js
function jsonp(url: String, callback: String, params: Object) {
  var queryString =
    '?' +
    Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&')

  var script = document.createElement('script')
  script.src = url + queryString + '&callback=' + callback
  script.onerror =
    params.failure ||
    function(err) {
      //console.log(err)
    }

  window[callback] = params.success || function() {}
  document.head.appendChild(script)
}
```

## 用 requestAnimationFrame 模拟 setTimeout

```js
function myTimeout(callback, delay) {
  var sum = 0
  var raf
  ;(function loop() {
    var now = Date.now()
    raf = requestAnimationFrame(function() {
      sum += Date.now() - now
      if (sum > delay) {
        callback()
      } else {
        loop()
      }
    })
  })()

  return raf
}

function myClearTimeout(raf) {
  cancelAnimationFrame(raf)
}

var t = myTimeout(function() {
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
function flat(data) {
  let result = []
  function loop(arr) {
    arr.forEach(d => {
      if (Array.isArray(d)) {
        loop(d)
      } else {
        result.push(d)
      }
    })
  }
  loop(data)
  return result
}

const data = [1, [2, [3]], [4]]

console.log(flat(data))
```

## 实现 new

```js
function myNew(fn, ...params) {
  const a = Object.create(fn.prototype)
  const res = fn.call(a, ...params)
  if (res) {
    return res
  }
  return a
}
```

## 将一维数组随机分为 m 组，使得每一组个数尽量平均，例如[1,2,3,4,5] 分成 2 组得 [[3,1],[5,2,4]]

## 实现金额数字千分位表示
