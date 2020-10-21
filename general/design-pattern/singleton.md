# 单例模式

**定义：**保证一个类仅有一个实例，并提供一个访问它的全局访问点

```ts
class Singleton {
  // 1. 构造器私有化，外部不能new
  private constructor() {}

  // 2. 本类内部创建对象实例化
  private static instance: Singleton

  // 3. 提供一个公有的静态方法，返回实例对象
  public static getInstance(): Singleton {
    if (this.instance === null) {
      this.instance = new Singleton()
    }

    return this.instance
  }
}

console.log(Singleton.getInstance())
```

更通用的单例方法

```js
function singleton(fn) {
  let instance
  return (...args) => {
    return instance || (instance = fn.apply(this, args))
  }
}

const createMask = singleton(function () {
  return document.body.appendChild(document.createElement('div'))
})

// 始终返回第一次创建的dom，而不会重复创建
createMask()
```
