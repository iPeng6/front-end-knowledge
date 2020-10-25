# 手写

<details>
<summary>手写原生 Ajax</summary>

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

</details>

<details>
<summary>手写操作 cookie</summary>

```js
function getCookies() {
  let cookies = {}
  document.cookie.match(/\w+=\w+;/gi).forEach((item) => {
    let [key, val] = item.split('=')
    cookies[key] = val.slice(0, -1)
  })
  return cookies
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  var expires = 'expires=' + d.toGMTString()
  document.cookie = cname + '=' + escape(cvalue) + '; ' + expires
}
```

</details>

<details>
<summary>柯里化</summary>

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
    } else {
      return c
    }
  }
}

function add(a, b, c) {
  return a + b + c
}

var cadd = curry(add)
console.log(cadd(1)(2)(3))
```


</details>

<details>
<summary>手写 call、apply、bind</summary>

```js

Function.prototype.call = function (context, ...args) {
  context = typeof context === 'object' ? context : window

  const key = Symbol()
  context[key] = this

  const res = context[key](...args)
  delete context[key]
  return res
}

Function.prototype.apply = function (context, args) {
  context = typeof context === 'object' ? context : window

  const key = Symbol()
  context[key] = this
  const res = context[key](...args)
  delete context[key]
  return res
}

Function.prototype.bind = function (context) {
  context = typeof context === 'object' ? context : window
  return (...args) => {
    return this.call(context, ...args)
  }
}
```

</details>

<details>
<summary>防抖节流</summary>

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

</details>

<details>
<summary>手写 jsonp</summary>

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

</details>

<details>
<summary>模拟FPS</summary>

```js
let frame = 0;
let lastTime = Date.now();

const loop = function () {
    const now = Date.now();
    frame++;
    if (now > 1000 + lastTime) {
        fps = Math.round((frame * 1000) / (now - lastTime));
        console.log('fps', fps, frame);  // 每秒 FPS
        frame = 0;
        lastTime = now;
    };

    requestAnimationFrame(loop);
}
```

</details>

<details>
<summary>用 requestAnimationFrame 模拟 setTimeout</summary>

```js
function myTimeout(callback, delay) {
  let sum = 0
  let raf
  ;(function loop() {
    let now = Date.now()
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

myTimeout(function () {
  console.log(1)
}, 1000)
```

</details>

<details>
<summary>flat</summary>

```js
const arr = [1, [2, [3]], [4]]

function flat(arr) {
  return arr.reduce((res, a) => {
    if (Array.isArray(a)) {
      return res.concat(flat(a))
    }
    return res.concat(a)
  }, [])
}

console.log(flat(arr))

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

```

</details>

<details>
<summary>实现 new</summary>

```js
function myNew(Ctor, ...params) {
  const obj = Object.create(Ctor.prototype)
  const res = Ctor.apply(a, params)
  return typeof res === 'object' ? res : obj
}
```

</details>

<details>
<summary>实现金额数字千分位表示</summary>

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

</details>

<details>
<summary></summary>



</details>

<details>
<summary></summary>



</details>

<details>
<summary></summary>



</details>

<details>
<summary></summary>



</details>

<details>
<summary></summary>



</details>

<details>
<summary></summary>



</details>

<details>
<summary></summary>



</details>

<details>
<summary></summary>



</details>

<details>
<summary></summary>



</details>

<details>
<summary></summary>



</details>

<details>
<summary></summary>



</details>

<details>
<summary></summary>



</details>

<details>
<summary></summary>



</details>

<details>
<summary></summary>



</details>

<details>
<summary></summary>



</details>

<details>
<summary></summary>



</details>

<details>
<summary></summary>



</details>

<details>
<summary></summary>



</details>

<details>
<summary></summary>



</details>

<details>
<summary></summary>



</details>

<details>
<summary></summary>



</details>

<details>
<summary></summary>



</details>
