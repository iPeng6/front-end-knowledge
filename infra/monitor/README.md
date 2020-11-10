# 异常监控

<details>
<summary>参考</summary>

- [一篇文章教你如何捕获前端错误](https://cloud.tencent.com/developer/article/1477500)
- [把前端监控做到极致](https://zhuanlan.zhihu.com/p/32262716)

</details>


## 三方服务

- [sentry](https://sentry.io/welcome/)
- [Rollbar](https://rollbar.com/)

## 数据采集

1. window.onerror 捕获js运行时错误

```
window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) {
    // doSomething
}
```
2. window.addEventListener('error', event => (){}, true); 捕获资源加载异常
3. window.addEventListener('rejectionhandled', event => {}); 捕获Promise异常；addEventListener('unhandledrejection', callback) 捕获未处理异常
4. fetch与xhr错误的捕获 劫持

5. Vue.config.errorHandler

```js
Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
}
```

4. React Error Boundaries

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}
```

5. Patch try catch

```js
const prevSetTimeout = window.setTimeout

window.setTimeout = function (callback, timeout) {
  const self = this
  return prevSetTimeout(function () {
    try {
      callback.call(this)
    } catch (e) {
      // 捕获到详细的错误，在这里处理日志上报等了逻辑
      // ...
      throw e
    }
  }, timeout)
}
```

## 数据上报

```js
window.onerror = function (msg, url, row, col, error) {
  new Image().src = `/m?msg=${msg}&url=${url}&row=${row}&col=${col}&e=${error.stack}`
}
```
