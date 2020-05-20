# 手写代码

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
/**
 * 自定义call实现
 * @param context   上下文this对象
 * @param args      动态参数
 */
Function.prototype.myCall = function (context, ...args) {
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
Function.prototype.myApply = function (context, args) {
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
Function.prototype.myBind = function (context) {
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
  return function () {
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
  return function () {
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

## 用 requestAnimationFrame 模拟 setTimeout

```js
function myTimeout(callback, delay) {
  var sum = 0
  var raf
  ;(function loop() {
    var now = Date.now()
    raf = requestAnimationFrame(function () {
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

var t = myTimeout(function () {
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
    arr.forEach((d) => {
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
function myNew(Cons, ...params) {
  const obj = Object.create(Cons.prototype)
  const res = Cons.apply(a, params)
  return typeof res === 'object' ? res : obj
}
```

## 将一维数组随机分为 m 组，使得每一组个数尽量平均，例如[1,2,3,4,5] 分成 2 组得 [[3,1],[5,2,4]]

```js
function foo(arr, m) {
  const result = new Array(m).fill(0).map(() => [])
  let startIndex = 0

  do {
    const [getOne] = arr.splice(parseInt(Math.random() * arr.length), 1)
    startIndex = startIndex % m
    result[startIndex].push(getOne)
    startIndex++
  } while (arr.length > 0)

  return result
}
console.log(foo([1, 2, 3, 4, 5], 2))
console.log(foo([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3))
console.log(foo([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 3))
```

## 实现金额数字千分位表示

```js
// 递归方案
function foo(num) {
  const [intpart, decimalPart] = num.toString().split('.')
  const arr = []

  function loop(str) {
    arr.push(str.slice(-3))
    const remainstr = str.substr(0, str.length - 3)
    if (remainstr.length > 3) {
      loop(remainstr)
    } else {
      if (remainstr != '') {
        arr.push(remainstr)
      }
    }
  }
  loop(intpart)
  return arr.reverse().join(',') + (!!decimalPart ? '.' + decimalPart : '')
}

// for循环方案
function foo(num) {
  const [intPart, decimalPart] = num.toString().split('.')

  const arr = Array.from(intPart).reverse()
  for (let i = 1; i < intPart.length / 3; i++) {
    arr.splice(3 * i + i - 1, 0, ',')
  }
  return arr.reverse().join('') + (!!decimalPart ? '.' + decimalPart : '')
}

console.log(foo(12))
console.log(foo(0.45))
console.log(foo(12345.45))
console.log(foo(123456.45))
console.log(foo(1234567.45))
```

## 找出一个字符串中重复出现的子序列及次数

```js
function find(str) {}

const str = 'asdfsdfgadfdsfsdfgasdfadf'
```
