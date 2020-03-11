# 手写代码

## 1、手写原生 Ajax

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

## 2、手写操作 cookie

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

### 3、柯里化

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
