# 原型链

原型机制就是指对象中的一个内部链接引用另一个对象。如果在第一个对象上没有找到需要的属性或者方法引用，引擎就会继续在原型关联的对象上进行查找。同理，如果在后者中也没有找到需要的引用就会继续查找它的原型，以此类推。这一系列对象的链接被称为 “**原型链**”。

![](img/prototypechain.png)

1. 所有对象的原型都指向 Object.prototype
2. 所有构造函数的原型指向 Function.prototype，包括 Object、Function
3. prototype 本质也是对象，其原型都指向 Object.prototype
4. Object.prototype 的原型指向 null

## new 关键字机制

```js
function Foo() {
  this.name = 'name'
}

const a = new Foo()
```

首先每个函数默认都会自带一个名字刚好叫 `prototype` 的属性，且 `prototype` 下具有一个不可枚举的属性 `constructor` 指向关联函数（本例中是 Foo），代码有点类似这样:

```js
Foo.prototype = {
  constructor: Foo,
}
```

当执行 new 调用时:

1. 创建（或者说构造）一个全新的对象。
2. 这个新对象的原型会被连接到函数的 `prototype` 属性。
3. 这个新对象会绑定到函数调用的 this。
4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象，否则返回函数返回值。

类似这样：

```js
function myNew(Ctor, ...params) {
  const obj = Object.create(Ctor.prototype)
  const res = Ctor.apply(a, params)
  return typeof res === 'object' ? res : obj
}
```

## instanceof 机制

```js
function Foo() {}
function Child() {}
Child.prototype = Object.create(Foo.prototype)
const a = new Foo()
const c = new Child()

a instanceof Foo // true
c instanceof Child // true

c.__proto__.__proto__ === Foo.prototype // true
```

instanceof 操作符的左操作数是一个普通的对象，右操作数是一个函数。instanceof 回答的问题是：在 a 的整条原型链中是否有指向 Foo.prototype 的对象

```js
function instance_of(leftValue, rightValue) {

  let rightProto = rightValue.prototype // 取右表达式的 prototype 值
  leftValue = leftValue.__proto__ // 取左表达式的__proto__值

  while (leftValue) {
    if (leftValue === rightProto) {
      return true
    }
    leftValue = leftValue.__proto__
  }
  return false
}
```

根据原型链和 instanceof 可以得到几个有意思的结论，可以很好的考察这两个概念

```js
Object instanceof Object // true
Function instanceof Function // true
Object instanceof Function // true
Function instanceof Object // true
```
