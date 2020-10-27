## 类型

最新的 ECMAScript 标准定义了 8 种数据类型:

- 7 种原始类型:
  - Number
  - String
  - Boolean
  - Null
  - Undefined
  - Symbol
  - BigInt
- 和 Object

可以认为只要不是原始类型的都是对象类型

### 类型判断

```js
Object.prototype.toString.call(1).slice(8, -1) === 'Number'
Object.prototype.toString.call('').slice(8, -1) === 'String'
Object.prototype.toString.call(true).slice(8, -1) === 'Boolean'
Object.prototype.toString.call(undefined).slice(8, -1) === 'Undefined'
Object.prototype.toString.call(Symbol(1)).slice(8, -1) === 'Symbol'
Object.prototype.toString.call(() => {}).slice(8, -1) === 'Function'

// 以上也可以通typeof直接判断，但是下面几种情况 typeof 都是 object，只能截取构造函数判断

typeof {} === 'object'
typeof [] === 'object'
typeof null === 'object'

Object.prototype.toString.call({}).slice(8, -1) === 'Object'
Object.prototype.toString.call([]).slice(8, -1) === 'Array'
Object.prototype.toString.call(null).slice(8, -1) === 'Null'
```
