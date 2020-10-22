# 路由

<details>
<summary>参考</summary>

- [理解 Web 路由](https://zhuanlan.zhihu.com/p/24814675)
- [阿里 P7：你了解路由吗？](https://juejin.im/post/5e85cb8151882573c66cf63f)
- [剖析单页面应用路由实现原理](https://github.com/happylindz/blog/issues/4) _- happylindz commented on 10 Dec 2017_
</details>

## 一、什么是路由

简单说路由就是 path 到函数的映射

## 二、router 和 route 的区别

route 就是一条路由，它将一个 path 路径和一个函数进行映射，例如：

```
/users        ->  getAllUsers()
/users/count  ->  getUsersCount()
```

而 router 可以理解为一个容器，或者说管理器，它管理了一组 route。当 path 改变时，去路由表里匹配出对应路由，执行函数

## 三、服务端路由

对于服务端来说，当收到一个请求，会根据 url，来找对应的映射函数执行，并返回结果。通常是读取一个文件或者从数据库读取数据。

```js
app.get('/', (req, res) => {
  res.sendFile('index')
})

app.get('/users', (req, res) => {
  db.queryAllUsers().then((data) => res.send(data))
})
```

## 四、客户端路由

对于客户端来说，路由的映射函数通常是进行一些 DOM 的显隐操作。当访问不同的路径的时候，会渲染不同的页面组件。客户端路由最常见的有以下两种实现方案：

- 基于 Hash
- 基于 History API

### （1）基于 Hash

url 上的 hash 以 # 开头，原本是为了作为锚点，方便用户在文章导航到相应的位置。因为 hash 值的改变不会引起页面的刷新，但可以触发相应 hashchange 事件

```js
class Router {
  constructor() {
    this.routes = {}
    this.currentUrl = ''
  }
  route(path, callback) {
    this.routes[path] = callback || function () {}
  }
  updateView() {
    this.currentUrl = location.hash.slice(1) || '/'
    this.routes[this.currentUrl] && this.routes[this.currentUrl]()
  }
  init() {
    window.addEventListener('load', this.updateView.bind(this), false)
    window.addEventListener('hashchange', this.updateView.bind(this), false)
  }
}
```

```js
<div id="app">
  <a href="#/">home</a>
  <a href="#/about">about</a>
  <a href="#/topics">topics</a>
  <div id="content"></div>
</div>
<script src="js/router.js"></script>
<script>
  const router = new Router();
  router.init();
  router.route('/', function () {
    document.getElementById('content').innerHTML = 'Home';
  });
  router.route('/about', function () {
    document.getElementById('content').innerHTML = 'About';
  });
  router.route('/topics', function () {
    document.getElementById('content').innerHTML = 'Topics';
  });
</script>
```

### （2）基于 History API

History 路由是基于 HTML5 规范，在 HTML5 规范中提供了 history.pushState || history.replaceState 来进行路由控制，并且不会刷新页面。

```js
// api
window.history.pushState(state, title, url)

// eg:
window.history.pushState({}, null, '/about')
```

参数说明

1. state：存储 JSON 字符串，可以用在 popstate 事件时，event.state 里获取
2. title：现在大多浏览器忽略这个参数，直接用 null 代替
3. url：任意有效的 URL，用于更新浏览器的地址栏，url 可以时绝对路径，也可以是相对路径。新的 url 与当前 url 的 origin 必须一致，否则报错。

还有几个 API

```js
window.history.back() //后退
window.history.forward() //前进
window.history.go(1) //前进一步，-2回退两不，window.history.length可以查看当前历史堆栈中页面的数量
```

history 的监听有个`popstate`事件，但是只在前进后退的时候触发，pushState、replaceState 时并不会触发，所以对于应用而言需要拦截所有情况

1. 点击浏览器的前进或后退按钮
2. 点击 a 标签
3. 在 JS 代码中触发 history.push(replace)State 函数

```js
// 1. 前进后腿 监听 popstate 事件
export class Route extends Component {
  componentWillMount() {
    window.addEventListener('popstate', this.handlePopState)
    register(this)
  }
  componentWillUnmount() {
    window.removeEventListener('popstate', this.handlePopState)
    unregister(this)
  }
  handlePopState = () => {
    this.forceUpdate()
  }
  // ...
}

// 2. link 标签自定义click事件，拦截调用pushState并主动广播组件更新
export class Link extends Component {
  handleClick = (e) => {
    e.preventDefault()
    const { to } = this.props
    window.history.pushState({}, null, to)
    instances.forEach((instance) => instance.forceUpdate())
  }
  render() {
    const { to, children } = this.props
    return (
      <a href={to} onClick={this.handleClick}>
        {children}
      </a>
    )
  }
}

// 3. 直接pushState之后，主动触发updateView
```

简单的做法，还可以装饰一下 pushState

```js
const pushState = history.pushState
history.pushState = function (...args) {
  pushState.apply(history, args)

  // emit a event or just run a callback
  emitEventOrRunCallback()
}
```

## 五、Hash 和 History 方式比较

- hash 兼容性更好，但`#/`看上去不是很舒服，基于 History API 的路由，更加直观和正式
- 基于 Hash 的路由不需要对服务器做改动，基于 History API 的路由需要服务器配合使得所有子路径都返回同一个 html
  - 原因是当刷新页面时，hash 部分是不会发到服务器的，所以始终是根路径，而 history 方式却是一个是实实在在的新路径，服务器不做处理会 404
- pushState 可以添加一个一模一样的 url 到栈中，而 hash 如果一样并不触发 hashchange 事件
- pushState 可以传通过 state 传递任何类型的数据
