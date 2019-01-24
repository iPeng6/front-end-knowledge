# JavaScript 手册

参考

- [the-complete-javascript-handbook](https://medium.freecodecamp.org/the-complete-javascript-handbook-f26b2c71719c) [[中文 1]](https://www.css88.com/archives/9922) [[中文 2]](https://juejin.im/post/5bff57fee51d45021a167991)
- [Learn ES2015](https://babeljs.io/docs/en/learn) [[中文 1]](https://github.com/fengzilong/es6features-zhCN) [[中文 2]](http://caibaojian.com/es6.html)
- [here-are-examples-of-everything-new-in-ecmascript-2016-2017-and-2018](https://medium.freecodecamp.org/here-are-examples-of-everything-new-in-ecmascript-2016-2017-and-2018-d52fa3b5a70e)

## 简介

JavaScript 是世界上最流行的编程语言之一，现在也广泛用于除了浏览器之外的其他地方。 比如 Node.js 在过去几年中的崛起，打破了后端开发语言领域 – 这曾经是 Java，Ruby，Python，PHP 和传统的服务器端语言的天下。

JavaScript 手册遵循 2/8 原则：在 20％ 的时间内学习 80％ 的 JavaScript。

本手册旨在让你了解有关 JavaScript 的所有知识！

### JavaScript 的基本定义

JavaScript 是一种编程语言，它是：

- **高级语言**：提供的抽象，允许您忽略运行它的机器的详细信息。它使用垃圾收集器自动管理内存，因此您可以专注于代码，而不是管理内存位置，并且提供了许多结构，允许您处理功能强大的变量和对象。
- **动态语言**：与静态编程语言相反，动态语言在运行时执行许多静态语言在编译时执行的操作。 这有利有弊，它为我们提供了强大的功能，如动态类型，后期绑定，反射，函数式编程，对象运行时更改，闭包等等。
- **动态类型**：变量不强制执行类型。 您可以将任何类型的值重新分配给变量，例如将整数分配给包含字符串的变量。
- **弱类型**：与强类型相反，弱（或松散）类型的语言不强制执行对象的类型。这允许更多的灵活性，但是又将类型安全和类型检查拒之门外。（这也正是 TypeScript 和 Flow 正在改进的地方）
- **解释型**：它通常被称为解释型语言，这意味着它在程序运行之前不需要编译阶段，这和 C ， Java 或 Go 语言不同。实际上，出于性能原因，浏览器在执行之前会编译 JavaScript ，但这对您来说是不可感知的，因为不涉及额外的步骤。
- **多范式**：该语言不强制执行任何特定的编程范例，不像 Java 那样强制使用面向对象编程，或者像 C 那样强制命令式编程。您可以使用面向对象的范例编写 JavaScript ，使用原型和新的（从 ES6 开始）类(classes)语法。您可以使用函数式编程风格编写 JavaScript ，使用其一等函数，甚至以命令式（C-like）编写。

### JavaScript 版本

每当您阅读 JavaScript 相关内容时，您将不可避免地看到以下一些术语：

```
ES3、ES5、ES6、ES7、ES8、
ES2015、ES2016、ES2017、ES2018、
ECMAScript 2015、ECMAScript 2016、ECMAScript 2017、ECMAScript 2018
```

啥意思？其实都指的是 ECMAScript 的标准。JavaScript 是 ECMAScript 标准的一种实现简称 ES 。

除 JavaScript 外，也有其他语言实现了 ECMAScript，包括：

- ActionScript （Flash 脚本语言），自 Flash 宣布将于 2020 年正式停止维护以来，它的人气正在下降。
- JScript（微软脚本语言），因为当时只有 Netscape 支持 JavaScript 并且浏览器大战达到顶峰，微软必须为 Internet Explorer 构建自己的脚本语言。

当然，JavaScript 仍是最流行和广泛使用的 ES 实现。

**为何用一个这么奇怪的名字？**

[Ecma International](/standard-specification/standard-organization/ecma) 是瑞士标准协会，负责制定国际标准。当 JavaScript 被创建时，它由 Netscape 和 Sun Microsystems 呈给 Ecma，Ecma 的标准很多会起个编号，正好编号到 262 号，就把基于 JavaScript 的标准编为 ECMA-262 ，别名 ECMAScript。

**为何版本号有时数字有时年份？**

在 ES2015 之前，ECMAScript 规范通常按其版本号命名。 如 ES5 其实是 2009 年更新发布的 ECMAScript 规范的官方名称。

从 2015 年起，[TC39](/standard-specification/standard-organization/tc39) 决定每年发布一个版本，以年号作为版本号，以避免在版本之间闲置太多，并且反馈循环更快。但社区仍习惯性将 ES2015 称为 ES6，类推 ES2016 为 ES7 等等

![](img/esversion.png)

ES.Next 始终指向 JavaScript 的下一个版本。

### 最新版本

最新发布版本：[ECMA-262](http://www.ecma-international.org/ecma-262/)，ECMAScript 2018，2018 年 6 月发布。\
最新草稿版本：[tc39 ECMA-262](https://tc39.github.io/ecma262/)

## ES2015

### 简介

ECMAScript 2015 是 2015 年 6 月被批准的 ECMAScript 标准。

ES2015 是该语言的一次重大更新，自 2009 年被标准化的 ES5 以来的一次最主要更新。主要的 JavaScript 引擎也在实现这些特性。

查看[ES2015 标准](http://www.ecma-international.org/ecma-262/6.0/index.html)的所有规格

### ECMAScript 2015 特性

#### Arrows and Lexical This

箭头函数是使用 => 语法的简写函数，支持表达式和带函数体的写法，与普通函数不同的是，箭头函数与上下文共享同一个词法 this, 如果箭头函数在另一个函数里面那么它将共享它父级函数的“arguments”变量

```js
// Expression bodies
var odds = evens.map(v => v + 1)
var nums = evens.map((v, i) => v + i)

// Statement bodies
nums.forEach(v => {
  if (v % 5 === 0) fives.push(v)
})

// Lexical this
var bob = {
  _name: 'Bob',
  _friends: [1],
  printFriends() {
    this._friends.forEach(f =>
      console.log(this._name + ' knows ' + f, this === bob),
    )
  },
}
bob.printFriends() // returns: Bob knows 1 true

// Lexical arguments
function square() {
  let example = () => {
    let numbers = []
    for (let number of arguments) {
      numbers.push(number * number)
    }

    return numbers
  }

  return example()
}
square(2, 4, 7.5, 8, 11.5, 21) // returns: [4, 16, 56.25, 64, 132.25, 441]
```

#### Classes

ES2015 classes 只是一种基于原型的面向对象模式的语法糖，简单方便的声明形式使得类模式更易使用，也增加了互操作性。类支持基于原型的继承、super 调用、实例方法、静态方法和构造函数。

```js
class Person {
  constructor(name) {
    this.name = name
  }
  hello() {
    return 'Hello, I am ' + this.name + '.'
  }
}
class Actor extends Person {
  hello() {
    return super.hello() + ' I am an actor.'
  }
  static birth() {
    return new Person()
  }
  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }
  set age(years) {
    this.theAge = years
  }
}
var tomCruise = new Actor('Tom Cruise')
tomCruise.hello()
```

#### Enhanced Object Literals

增强的对象字面量，支持构造时指定原型`__proto__`, 属性`handle: handle`赋值简写，方法定义及 super 调用，使用计算属性名。这些加起来使得字面量跟类声明更相近，基于对象的设计也从这种便利中获益。

```js
var obj = {
  // 1. Sets the prototype. "__proto__" or '__proto__' would also work.
  __proto__: theProtoObj,
  // Computed property name does not set prototype or trigger early error for
  // duplicate __proto__ properties.
  ['__proto__']: somethingElse,
  // 2. Shorthand for ‘handler: handler’
  handler,
  // 3. Methods
  toString() {
    // 4. Super calls
    return 'd ' + super.toString()
  },
  // 5. Computed (dynamic) property names
  ['prop_' + (() => 42)()]: 42,
}
```

#### Template Strings

模板字符串提供了构建字符串的语法糖。这类似于 Perl、Python 和其他语言中的字符串插值特性。此外，作为可选项，使用标签可以自定义字符串的构建行为，避免注入攻击，或者基于字符串构建高阶的数据结构。

```js
// Basic literal string creation
const basic = `This is a pretty little template string.`

// Multiline strings
const multi = `In ES5 this is
 not legal.`

// Interpolate variable bindings
var name = 'Bob',
  time = 'today'
;`Hello ${name}, how are you ${time}?`

// Unescaped template strings
String.raw`In ES5 "\n" is a line-feed.`

// tag template

// Construct an HTTP request prefix is used to interpret the replacements and construction
tag`Hello ${a + b} world ${a * b}`
// the same as
tag(['Hello ', ' world ', ''], a + b, a * b)

GET`http://foo.org/bar?a=${a}&b=${b}
    Content-Type: application/json
    X-Credentials: ${credentials}
    { "foo": ${foo},
      "bar": ${bar}}`(myOnReadyStateChangeHandler)
```

#### Destructuring

解构允许使用模式匹配赋值，支持数组和对象。解构是会失败弱化的，类似对象查找过程 `foo['bar']`，如果未找到则置为 undefined 也可以指定默认值。

```js
// list matching
var [a, , b] = [1, 2, 3]
a === 1
b === 3

// object matching
var {
  op: a,
  lhs: { op: b },
  rhs: c,
} = getASTNode()

// object matching shorthand
// binds `op`, `lhs` and `rhs` in scope
var { op, lhs, rhs } = getASTNode()

// Can be used in parameter position
function g({ name: x }) {
  console.log(x)
}
g({ name: 5 })

// Fail-soft destructuring
var [a] = []
a === undefined

// Fail-soft destructuring with defaults
var [a = 1] = []
a === 1

// Destructuring + defaults arguments
function r({ x, y, w = 10, h = 10 }) {
  return x + y + w + h
}
r({ x: 1, y: 2 }) === 23
```

#### Default + Rest + Spread

被调函数支持设置参数默认值，`...` 运算符可以将数组展开成连续的参数给函数调用，`...` 在定义函数时也可以将剩余的参数收集成一个数组，剩余参数 Rest 代替了`arguments`的使用，更直接的解决常见问题。

```js
// Default
function f(x, y = 12) {
  // y is 12 if not passed (or passed as undefined)
  return x + y
}
f(3) == 15

// Rest
function f(x, ...y) {
  // y is an Array
  return x * y.length
}
f(3, 'hello', true) == 6

// Spread
function f(x, y, z) {
  return x + y + z
}
// Pass each elem of array as argument
f(...[1, 2, 3]) == 6
```

#### Let + Const

let 和 const 都是绑定构造的块级作用域。let 是新的 var。const 是单次赋值的。const 的静态限制禁止变量在赋值前使用。

```js
function f() {
  {
    let x
    {
      // this is ok since it's a block scoped name
      const x = 'sneaky'
      // error, was just defined with `const` above
      x = 'foo'
    }
    // this is ok since it was declared with `let`
    x = 'bar'
    // error, already declared above in this block
    let x = 'inner'
  }
}
```

#### Iterators + For..Of

Iterator 对象让 javascript 拥有了像 CLR IEnumerable 和 Java Iterable 一样自定义迭代器的能力。将 for..in 转换成基于迭代器的自定义遍历的 for..of 形式。不需要实现一个类似 LINQ 中惰性设计模式的数组。

```js
let fibonacci = {
  [Symbol.iterator]() {
    let pre = 0,
      cur = 1
    return {
      next() {
        ;[pre, cur] = [cur, pre + cur]
        return { done: false, value: cur }
      },
    }
  },
}

for (var n of fibonacci) {
  // truncate the sequence at 1000
  if (n > 1000) break
  console.log(n)
}

// Getting the iterator from an array returns an iterator of values
const a = [1, 2, 3]
let it = a[Symbol.iterator]()
console.log(it.next().value) //1
console.log(it.next().value) //2
console.log(it.next().value) //3

//get the index as well, using `entries()`
for (const [i, v] of ['a', 'b', 'c'].entries()) {
  console.log(i, v)
}

for ([key, val] of Object.entries({ a: 1, b: 2 })) {
  console.log(key, val)
}
```

Iteration 基于 [duck-typed](https://en.wikipedia.org/wiki/Duck_typing) 的接口(以下使用 TypeScript 的语法，仅供解释用)

```js
interface IteratorResult {
  done: boolean;
  value: any;
}
interface Iterator {
  next(): IteratorResult;
}
interface Iterable {
  [Symbol.iterator](): Iterator
}
```

#### Generators

Generators 使用 `function*` 和 `yield` 的语法简化了迭代器的书写。一个使用 `function*` 声明的函数返回一个 Generator 实例。Generators 也是迭代器的一种，但它拥有额外的 next 和 throw 方法。这允许值回到 generator 中，所以 yield 是一种返回（或抛出）值的表达式形式。

注意：可以用它来进行类似‘await’的异步编程，具体可以查看 ES7 的 [await](https://github.com/lukehoban/ecmascript-asyncawait) 提案

```js
var fibonacci = {
  [Symbol.iterator]: function*() {
    var pre = 0,
      cur = 1
    for (;;) {
      var temp = pre
      pre = cur
      cur += temp
      yield cur
    }
  },
}

for (var n of fibonacci) {
  // truncate the sequence at 1000
  if (n > 1000) break
  console.log(n)
}
```

这个 generator 接口定义是（使用 TypeScript 类型语法定义来解释）：

```ts
interface Generator extends Iterator {
  next(value?: any): IteratorResult
  throw(exception: any)
}
```

Unicode

支持完整 Unicode 的非破坏性添加，包括字符串中新的 unicode 字面量和新的 RegExp `u` 模式来处理码位（字符在字符集中的位置），以及新的 APIs 在 [21bit 码位级别](https://zh.wikipedia.org/wiki/Unicode#.E7.BC.96.E7.A0.81.E6.96.B9.E5.BC.8F) 上处理字符串，
增加这些支持后可以使用 Javascript 构建全球化应用。

```js
// same as ES5.1
'𠮷'.length == 2

// new RegExp behaviour, opt-in ‘u’
'𠮷'.match(/./u)[0].length == 2

// new form
;('\u{20BB7}' == '𠮷') == '\uD842\uDFB7'

// new String ops
'𠮷'.codePointAt(0) == 0x20bb7

// for-of iterates code points
for (var c of '𠮷') {
  console.log(c)
}
```

#### Modules

在 ES2015 之前，至少有三个主要的模块标准竞争，这些标准使社区支离破碎：

- AMD
- RequireJS
- CommonJS

ES2015 将这些标准化为通用的格式，在语言层面上得到了支持。运行时行为由宿主加载器定义，隐式异步模型 - 直到全部请求的模块均可用且经处理后，才会执行当前模块内的代码。

```js
// lib/math.js
export function sum(x, y) {
  return x + y
}
export var pi = 3.141593
```

```js
// app.js
import * as math from 'lib/math'
console.log('2π = ' + math.sum(math.pi, math.pi))
```

```js
// otherApp.js
import { sum, pi } from 'lib/math'
console.log('2π = ' + sum(pi, pi))
```

一些额外的新特性，包括 `export default` 以及 `export *`

```js
// lib/mathplusplus.js
export * from 'lib/math'
export var e = 2.71828182846
export default function(x) {
  return Math.exp(x)
}
```

```js
// app.js
import exp, { pi, e } from 'lib/mathplusplus'
console.log('e^π = ' + exp(pi))
```

#### Map + Set + WeakMap + WeakSet

用于实现常见算法的高效数据结构，WeakMaps 提供不会泄露的对象键(对象作为键名，而且键名指向对象)索引表 注：所谓的不会泄露，指的是对应的对象可能会被自动回收，回收后 WeakMaps 自动移除对应的键值对，有助于防止内存泄露

WeekSet 与 Set 区别：

1. WeakSet 的成员只能是对象，不能是其他类型的值
2. WeakSet 中的对象都是弱引用，如果其他对象都不再引用该对象，那么垃圾回收机制随时会回收该对象所占用的内存，由于垃圾回收的不可预测性，所以 ES6 规定 WeakSet 不可遍历。

WeekMap 与 Map 区别：

1. WeakMap 只接受对象作为键名（null 除外），不接受其他类型的值作为键名
2. WeakMap 的键名所指向的对象，不计入垃圾回收机制，注意弱引用的只是键名，而不是键值。键值依然是正常引用。

```js
// Sets
var s = new Set()
s.add('hello')
  .add('goodbye')
  .add('hello')
s.size === 2
s.has('hello') === true

// Maps
var m = new Map()
m.set('hello', 42)
m.set(s, 34)
m.get(s) == 34

// Weak Maps
var wm = new WeakMap()
wm.set(s, { extra: 42 })
wm.size === undefined

// Weak Sets
var ws = new WeakSet()
ws.add({ data: 42 })
// Because the added object has no other references, it will not be held in the set
// 因为加入的对象没有任何引用，它将不被保留在集合中，也就是可能会消失
```

#### Proxies

代理可以创造一个具备宿主对象全部可用行为的对象。可用于拦截、对象虚拟化、日志/分析等

```js
// Proxying a normal object
var target = {}
var handler = {
  get: function(receiver, name) {
    return `Hello, ${name}!`
  },
}

var p = new Proxy(target, handler)
p.world === 'Hello, world!'
```

```js
// Proxying a function object
var target = function() {
  return 'I am the target'
}
var handler = {
  apply: function(receiver, ...args) {
    return 'I am the proxy'
  },
}

var p = new Proxy(target, handler)
p() === 'I am the proxy'
```

所有运行时级别的元操作都有对应的陷阱（使得这些操作都可以被代理）

```js
var handler =
{
  // target.prop
  get: ...,
  // target.prop = value
  set: ...,
  // 'prop' in target
  has: ...,
  // delete target.prop
  deleteProperty: ...,
  // target(...args)
  apply: ...,
  // new target(...args)
  construct: ...,
  // Object.getOwnPropertyDescriptor(target, 'prop')
  getOwnPropertyDescriptor: ...,
  // Object.defineProperty(target, 'prop', descriptor)
  defineProperty: ...,
  // Object.getPrototypeOf(target), Reflect.getPrototypeOf(target),
  // target.__proto__, object.isPrototypeOf(target), object instanceof target
  getPrototypeOf: ...,
  // Object.setPrototypeOf(target), Reflect.setPrototypeOf(target)
  setPrototypeOf: ...,
  // for (let i in target) {}
  enumerate: ...,
  // Object.keys(target)
  ownKeys: ...,
  // Object.preventExtensions(target)
  preventExtensions: ...,
  // Object.isExtensible(target)
  isExtensible :...
}
```

#### Symbols

Symbol 能够实现对象状态的访问控制，允许使用 string(与 ES5 相同)或 symbol 作为键来访问属性。Symbol 是一个新的原语类型，可选的 name 参数可以用于调试——但并不是标识符的一部分（哪怕一样的 name 的两个 Symbol 也是不等的）。Symbol 是独一无二的(如同 gensym（所产生的符号)，但不是私有的，因为它们可以通过类似 Object.getOwnPropertySymbols 的反射特性暴露出来。

```js
(function() {

  // module scoped symbol
  var key = Symbol("key");

  function MyClass(privateData) {
    this[key] = privateData;
  }

  MyClass.prototype = {
    doStuff: function() {
      ... this[key] ...
    }
  };

  // Limited support from Babel, full support requires native implementation.
  typeof key === "symbol"
})();

var c = new MyClass("hello")
c["key"] === undefined
```

#### Subclassable Built-ins

ES2015 内建对象如 `Array`、`Date` 和 DOM `Elements` 可被子类化

```js
// User code of Array subclass
class MyArray extends Array {
  constructor(...args) {
    super(...args)
  }
}

var arr = new MyArray()
arr[1] = 12
arr.length == 2
```

#### Math + Number + String + Object APIs

许多新加库包括 Math 库， Array 转换 helpers 和用于拷贝的 Object.assign

```js
Number.EPSILON
Number.isInteger(Infinity) // false
Number.isNaN('NaN') // false

Math.acosh(3) // 1.762747174039086
Math.hypot(3, 4) // 5
Math.imul(Math.pow(2, 32) - 1, Math.pow(2, 32) - 2) // 2

'abcde'.includes('cd') // true
'abc'.repeat(3) // "abcabcabc"

Array.from(document.querySelectorAll('*')) // Returns a real Array
Array.of(1, 2, 3) // Similar to new Array(...), but without special one-arg behavior
;[0, 0, 0].fill(7, 1) // [0,7,7]
;[1, 2, 3].findIndex(x => x == 2) // 1
;['a', 'b', 'c'].entries() // iterator [0, "a"], [1,"b"], [2,"c"]
;['a', 'b', 'c'].keys() // iterator 0, 1, 2
;['a', 'b', 'c'].values() // iterator "a", "b", "c"

Object.assign(Point, { origin: new Point(0, 0) })
```

#### Binary and Octal Literals

加入了对二进制(b)和八进制(o)字面量的支持

```js
0b111110111 === 503 // true
0o767 === 503 // true
```

#### Promises

Promise 是用来进行异步编程的库，Promise 是对一个“将来可能会变得可用”的值的第一类表示，Promise 在现有的许多 JavaScript 库中使用

```js
function timeout(duration = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration)
  })
}

var p = timeout(1000)
  .then(() => {
    return timeout(2000)
  })
  .then(() => {
    throw new Error('hmm')
  })
  .catch(err => {
    return Promise.all([timeout(100), timeout(200)])
  })
```

#### Reflect API

整个反射 API 暴露了对象运行时级别的元操作，这实际上与 Proxy API 刚好相反，它允许在 proxy 捕获时调用与 Proxy 接口相对应的元操作。在实现 proxies 时尤其有用。

```js
var O = { a: 1 }
Object.defineProperty(O, 'b', { value: 2 })
O[Symbol('c')] = 3

Reflect.ownKeys(O) // ['a', 'b', Symbol(c)]

function C(a, b) {
  this.c = a + b
}
var instance = Reflect.construct(C, [20, 22])
instance.c // 42
```

#### Tail Calls

尾调用确保堆栈不会无限增长，在面对无限制输入时确保递归算法的安全。

```js
function factorial(n, acc = 1) {
    "use strict";
    if (n <= 1) return acc;
    return factorial(n - 1, n * acc);
}

// Stack overflow in most implementations today,
// but safe on arbitrary inputs in ES2015
factorial(100000)
```

## ES2016

ECMAScript 2016 ，于 2016 年 6 月完成。

与 ES2015 相比，ES2016 是 JavaScript 的一个小版本，仅包含两个功能：

- Array.prototype.includes
- 求幂运算符

### Array.prototype.includes()

此功能引入了更易读的语法，用于检查数组是否包含元素。而在之前需要使用 `indexOf` 检查数组中的索引来判断，如果元素不存在则返回 -1。

```js
// ES2015
if ([1, 2].indexOf(3) === -1) {
  console.log('Not found')
}

// ES2016
if (![1, 2].includes(3)) {
  console.log('Not found')
}
```

### 求幂运算符(\*\*)

求幂运算符 `**` 相当于 Math.pow()，而被直接引入语言本身，对于数学密集型的 JavaScript 应用程序来说是一个很好的补充。

```js
Math.pow(4, 2) === 4 ** 2 // 4*4
```

## ES2017

ECMAScript 2017，ECMA-262 标准版本的第 8 版（通常称为 ES2017 或 ES8），于 2017 年 6 月完成。

与 ES6 相比，ES8 是 JavaScript 的一个小版本，但它仍然引入了非常有用的功能：

- String padding
- Object.values
- Object.entries
- Object.getOwnPropertyDescriptors()
- 函数参数列表和调用中的尾随逗号
- Async Functions (异步函数)
- 共享内存 和 atomics

### String padding

字符串 padding 的作用是向字符串添加字符使其达到指定长度。

ES2017 引入了两个 String 方法：`padStart()` 和 `padEnd()`。

```js
padStart(targetLength [, padString])
padEnd(targetLength [, padString])
```

```js
'test'.padStart(8)
=> "    test"
'test'.padStart(8,'*')
=> "****test"
'test'.padEnd(8)
=> "test    "
'test'.padEnd(8,'ab')
=> "testabab"
```

### Object.values()

这个方法返回一个包含所有对象自身属性值的数组。

```js
const person = { name: 'Fred', age: 87 }
Object.values(person) // ['Fred', 87]

// also works with arrays
const people = ['Fred', 'Tony']
Object.values(people) // ['Fred', 'Tony']
```

### Object.entries()

返回对象自身属性的 `[key，value]` 数组

```js
const person = { name: 'Fred', age: 87 }
Object.entries(person) // [['name', 'Fred'], ['age', 87]]

const people = ['Fred', 'Tony']
Object.entries(people) // [['0', 'Fred'], ['1', 'Tony']]

for ([key, val] of Object.entries({ a: 1, b: 2 })) {
  console.log(key, val)
}
```

### getOwnPropertyDescriptors()

返回一个对象的所有自有属性描述，每个对象属性都有一些特性描述，包括：

- value：属性的值
- writable：true 表示该属性可以被修改
- get：属性的 getter 函数，在读取属性时调用
- set：属性的 setter 函数，在属性设置值时调用
- configurable：如果为 false ，则不能删除属性，也不能更改任何属性，但值除外
- enumerable：如果属性是可枚举的，则为 true

`Object.getOwnPropertyDescriptors(obj)` 接受一个对象，并返回属性描述集

```js
Object.getOwnPropertyDescriptors({a:1,b:2,get sum(){return this.a+this.b}});
{
	a: {
		value: 1,
		writable: true,
		enumerable: true,
		configurable: true
	},
	b: {
		value:2,
		writable: true,
		enumerable: true,
		configurable: true
	},
	sum: {
		enumerable: true,
		configurable: true,
		get: f sum(),
		set: undefined
	}
}
```

**那有啥子用呢？**

ES2015 提供了 `Object.assign()` 用来浅拷贝一个对象的所有可枚举的属性的到另一个对象，但是不能拷贝 `getter setter`

```js
const person1 = {
  set name(newName) {
    console.log(newName)
  },
}
// This won’t work:
const person2 = {}
Object.assign(person2, person1)

// But this will work:
const person3 = {}
Object.defineProperties(person3, Object.getOwnPropertyDescriptors(person1))
```

```js
person1.name = 'x'
=> "x"
person2.name = 'x' // 没有输出
person3.name = 'x'
=> "x"
```

person2 丢失了 `setter` ，因为它没有复制过来。使用 `Object.create()` 对浅拷贝对象也有同样的限制。

### Trailing commas

此功能允许在函数声明和函数调用中使用尾随逗号：

```
const doSomething = (var1, var2,) => {
  //...
}
doSomething('test2', 'test2',)
```

### Async functions

这是最重要最有用的一个特性。异步函数可以避免回调地狱，并让整个代码看起来更简单。

异步函数是 promises 和 generators 的组合，以简化 promises 调用，提高代码的可读性，但是不打破 promises 链式调用的限制。

async 关键字告诉 JavaScript 编译器要以不同的方式处理这个函数。在遇到函数中的 await 关键字时，编译器就会暂停。它假定 await 之后的表达式会返回一个 promise 并等待，直到 promise 完成或被拒绝。

```js
function doSomethingAsync() {
	return new Promise(resolve => {
		setTimeout(() => resolve('I did something'), 3000)
	})
}
async function doSomething() {
	console.log(await doSomethingAsync())
}
console.log('Before')
doSomething()
console.log('After')

=> Before
=> After
=> I did something // after 3s
```

异步函数可以非常容易地链式调用，并且语法比 Promise 更具可读性：

```js
function promiseToDoSomething() {
  return new Promise(resolve => {
    setTimeout(() => resolve('I did something'), 10000)
  })
}
async function watchOverSomeoneDoingSomething() {
  const something = await promiseToDoSomething()
  return something + ' and I watched'
}
async function watchOverSomeoneWatchingSomeoneDoingSomething() {
  const something = await watchOverSomeoneDoingSomething()
  return something + ' and I watched as well'
}
watchOverSomeoneWatchingSomeoneDoingSomething().then(res => {
  console.log(res)
})
```

### Shared Memory and Atomics

WebWorkers 用于在浏览器中创建多线程程序。但我们如果想在主 JS 线程和 WebWorkers 之间共享数据，必须复制数据，并使用 postMessage 将数据发送给另一个线程。

这个高级特性，是 JS 引擎的核心增强。主要的想法是将某种多线程特性引入到 JavaScript 中，让 JS 开发人员可以自己管理内存，编写高性能的并发程序。

这是通过一个叫作 `SharedArrayBuffer` 的全局对象来实现的，这个对象实质上将数据存储在共享内存中。因此，这些数据可以在主 JS 线程和 WebWorkers 工作线程之间共享。

但在线程之间共享内存会导致竞态条件。为了避免竞态条件，引入了 `Atomics` 全局对象。`Atomics` 提供了各种方法来在线程使用数据时锁定共享内存，还提供了安全更新共享内存数据的方法。

## ES2018

### Rest/Spread Properties

ES6 在处理数组解构时,引入了 rest(剩余)元素的概念，例如：

```js
const numbers = [1, 2, 3, 4, 5]
[first, second, ...others] = numbers
```

还有展开元素时：

```js
const numbers = [1, 2, 3, 4, 5]
const sum = (a, b, c, d, e) => a + b + c + d + e
const sum = sum(...numbers)
```

ES2018 为对象引入了类似的功能。

```js
const { first, second, ...others } = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
  fifth: 5,
}
first // 1
second // 2
others // { third: 3, fourth: 4, fifth: 5 }

const items = { first, second, ...others }
items //{ first: 1, second: 2, third: 3, fourth: 4, fifth: 5 }
```

### Asynchronous iteration

新的 `for-await-of` 构造允许您使用异步可迭代对象作为循环迭代：

```js
for await (const line of readLines(filePath)) {
  console.log(line)
}
```

由于这使用 await ，你只能在异步函数中使用它，就像普通的 await 一样

### Promise.prototype.finally()

当 Promise 完成，成功之后会一个接着一个调用 `then()`，如果失败则跳过`then()`，执行`catch()`.

`finally()` 允许你无论成功还是失败都可以运行一段代码

```js
fetch('file.json')
  .then(data => data.json())
  .catch(error => console.error(error))
  .finally(() => console.log('finished'))
```

### Regular Expression improvements

#### Lookbehinds

正则表达式改进，增加了后行断言(lookbehinds)：根据前面的内容匹配字符串。

先来看下先行断言(lookahead)：您可以使用 `?=` 匹配一个字符串，该字符串后面跟着一个特定的子字符串：

```js
/Roger(?=Waters)/
/Roger(?= Waters)/.test('Roger is my dog') //false
/Roger(?= Waters)/.test('Roger Waters is a famous musician') //true
```

`?!` 执行逆操作，匹配一个字符串，该字符串后面没有一个特定的子字符串：

```js
/Roger(?!Waters)/
/Roger(?! Waters)/.test('Roger is my dog') //true
/Roger(?! Waters)/.test('Roger Waters is a famous musician') //false
```

先行断言(lookahead)使用 `?=` 符号。它们已经可用了。

**后行断言(lookbehinds)**，是一个新功能，使用 `?<=`

```js
/(?<=Roger) Waters/
/(?<=Roger) Waters/.test('Pink Waters is my dog') //false
/(?<=Roger) Waters/.test('Roger Waters is a famous musician') //true
```

后行断言(lookbehind) 逆操作，使用 `?<!`

```js
/(?<!Roger) Waters/
/(?<!Roger) Waters/.test('Pink Waters is my dog') //true
/(?<!Roger) Waters/.test('Roger Waters is a famous musician') //false
```

不管是先行断言还是后行断言，匹配内容都不包括断言本身

```js
'Roger Waters is a famous musician'.match(/Roger (?=Waters)/)[0] // Roger
'Roger Waters is a famous musician'.match(/(?<=Roger) Waters/)[0] // Waters
```

#### Unicode property escapes \p{…} and \P{…}

在正则表达式模式中，您可以使用 `\d` 匹配任何数字，`\s` 匹配任何空白字符，\w 匹配任何字母数字字符，依此类推。

这个新功能将扩展此概念引入 `\p{}` 匹配所有 Unicode 字符，否定形式为 `\P{}` 。

任何 Unicode 字符都有一组属性。 例如，`Script` 确定语言系列，`ASCII` 是一个布尔值， 对于 `ASCII` 字符，值为 true，依此类推。 您可以将此属性放在花括号中，正则表达式将检查是否为真：

```js
/^\p{ASCII}+$/u.test('abc')   //✅
/^\p{ASCII}+$/u.test('ABC@')  //✅
/^\p{ASCII}+$/u.test('ABC🙃') //❌
```

`ASCII_Hex_Digit` 是另一个布尔属性，用于检查字符串是否仅包含有效的十六进制数字：

```js
/^\p{ASCII_Hex_Digit}+$/u.test('0123456789ABCDEF') //✅
/^\p{ASCII_Hex_Digit}+$/u.test('h')                //❌
```

还有许多其他布尔属性，您只需通过在花括号中添加它们的名称来检查它们，包括 `Uppercase`, `Lowercase`, `White_Space`, `Alphabetic`, `Emoji` 等：

```js
/^\p{Lowercase}$/u.test('h') //✅
/^\p{Uppercase}$/u.test('H') //✅
/^\p{Emoji}+$/u.test('H')   //❌
/^\p{Emoji}+$/u.test('🙃🙃') //✅
```

除了这些二进制属性之外，您还可以检查任何 unicode 字符属性以匹配特定值。在这个例子中，我检查字符串是用希腊语还是拉丁字母写的

```js
/^\p{Script=Greek}+$/u.test('ελληνικά') //✅
/^\p{Script=Latin}+$/u.test('hey') //✅
```

#### Named capturing groups

在 ES2018 中，正则匹配可以为捕获组起个名称

```js
const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/
const result = re.exec('2015-01-02')
// result.groups.year === '2015';
// result.groups.month === '01';
// result.groups.day === '02';
```

#### The 's’ flag for regular expressions

`s` 标志 single line 的缩写，它使得 `.` 可以匹配换行 `\r \n`

```js
;/hi.welcome/.test('hi\nwelcome') // false
;/hi.welcome/s.test('hi\nwelcome') // true
```

## 词汇结构

### Unicode

JavaScript 是用 Unicode 编写的。 这意味着您用任何语言编写标识符。注意：emoji 不可以。

```js
// How convenient!
var π = Math.PI
var λ = function() {}
var ಠ_ಠ = eval
var lolwat = 'heh'
var foo‌bar = 42
var 〱〱 = 2
〱〱 << 〱〱 // 8
var 哈 = 1
// Fun with Roman numerals
var Ⅳ = 4
var Ⅴ = 5
Ⅳ + Ⅴ // 9
var 😃 = 1 // 会报错 Uncaught SyntaxError: Invalid or unexpected toke
```

### 分号

JavaScript 具有非常类似于 C 的语法，但是分号并不是强制的，新设计的语言里可选分号的很多，光是 “可以加分号但是大家都不加” 的语言就有：Go, Scala, Ruby, Python, Swift, Groovy 等等，所以加不加分号纯看个人喜欢。

真正会导致上下文解析出问题的 token 有 5 个：括号，方括号，正则开头的斜杠，加号，减号。当以这些开头时需要加分号，而这种情况很少见，即使出现 linter 也会检查出来。
还有就是规避 return 换行问题。

所以现在很多开源库代码都不写无意义的分号。

### 空格

JavaScript 不认为空格有意义。多余的空格也会被格式化、压缩工具等剔掉，空格只不过可以保持代码的可读性，比如两个空格缩进。

### 大小写敏感

JavaScript 是大小写敏感的。变量 `name` 和 `Name` 是不一样的。

### 注释

两种注释形式

```js
/* 多行注释 */
// 单行注释
```

### 字面量和标识符

**字面量**：我们将源代码中编写的值称为字面量，例如数字，字符串，布尔或更高级的构造，如 对象字面量 或 数组字面量：

```js
5
'Test'
true
['a', 'b']
{color: 'red', shape: 'Rectangle'}
```

**标识符**：用于标识变量，函数，对象的字符序列，只能包含字母或数字或下划线（“\_”）和美元符号（“\$”），且不能以数字开头。区分大小写。

```js
test
TEST
_test
Test1
$test
```

### 保留字

你不能使用下列标识符，因为他们是语言保留字。

```js
break
do
instanceof
typeof
case
else
new
var
catch
finally
return
void
continue
for
switch
while
debugger
function
this
with
default
if
throw
delete
in
try
class
enum
extends
super
const
export
import
implements
let
private
public
interface
package
protected
static
yield
```

## 变量

