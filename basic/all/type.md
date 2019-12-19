# 类型

## 内建类型

<!-- tabs:start -->

#### ** Javascript **

最新的 ECMAScript 标准定义了 8 种数据类型:

- 7 种原始类型:
  - Undefined
  - Null
  - Number
  - String
  - Boolean
  - Symbol
  - BigInt(stage3)
- 和 Object

#### ** Dart **

Dart 对以下类型提供了特殊支持：

- numbers
- strings
- booleans
- lists (also known as arrays)
- sets
- maps
- runes (for expressing Unicode characters in a string)
- symbols

Dart 没有 byte、char 和 float，int、double 都是 64 位

<!-- tabs:end -->

### 数字

<!-- tabs:start -->

#### ** Javascript **

JavaScript 的 Number 对象是经过封装的能让你处理数字值的对象。Number 对象由 Number() 构造器创建。

JavaScript 的 Number 类型为[双精度 IEEE 754 64 位浮点](https://en.wikipedia.org/wiki/Floating-point_arithmetic)类型。

```js
let a = new Number('123') // a === 123 is false
let b = Number('123') // b === 123 is true
a instanceof Number // is true
b instanceof Number // is false

let num = 1
num.constructor === Number // true
num.__proto__ === Number.prototype // true
```

#### ** Dart **

dart 数字类型有 int、double，都是 [num](https://api.dart.dev/stable/dart-core/num-class.html) 的子类型

```dart
// int
var x = 1;
var hex = 0xDEADBEEF;

// double
var y = 1.1;
var exponents = 1.42e5;

// int 会自动转换成 double
double z = 1; // Equivalent to double z = 1.0.
```

<!-- tabs:end -->

#### 常用属性方法

<!-- tabs:start -->

#### ** Javascript **

```js
// 静态属性方法
Number.MAX_VALUE
Number.parseFloat(number) // 等于全局的 parseFloat
Number.parseInt(number)
Number.isInteger(number)
Number.isNaN(number)
Number.isFinite(number)

// 实例方法
Number.prototype.toFixed(?fractionDigits) // 保留几位小数，会四舍五入
Number.prototype.toExponential(?fractionDigits)  // 科学记数法 100 => "1e+2"
```

#### ** Dart **

- [num](https://api.dart.dev/stable/2.7.0/dart-core/num-class.html)

```dart
// 静态方法
parse(String input, [ num onError(String input) ]) → num
tryParse(String input) → num

// 属性
isFinite → bool
isFinite → bool
isInfinite → bool
isNaN → bool
isNegative → bool // 是否是负数

// 方法
abs() → num
ceil() → int
ceilToDouble() → double
clamp(num lowerLimit num upperLimit) → num // 超过最大值取最大值，超过最小值取最小值
compareTo(num other) → int
floorToDouble() → double
remainder(num other) → num // 取余数
truncate() → int // 取整数部分
truncateToDouble() → double
round() → int // 会四舍五入 保留整数
roundToDouble() → double
toDouble() → double
toInt() → int
toStringAsFixed(int fractionDigits) → String // 会四舍五入 保留指定小数
toStringAsPrecision(int precision) → String // 科学记数法
```

- [int](https://api.dart.dev/stable/2.7.0/dart-core/int-class.html)

```dart
// 属性
isEven → bool // 是否偶数
isOdd → bool

// 方法
toRadixString(int radix) → String // 进制转换
```

- [double](https://api.dart.dev/stable/2.7.0/dart-core/double-class.html)

<!-- tabs:end -->

### 字符串

<!-- tabs:start -->

#### ** Javascript **

```js
let name = 'ipeng6'
let say = `${name}'s age`
// 多行
let muti = `
  a
  b
`
```

#### ** Dart **

```dart
var name = 'ipeng6';
var say = '$name\'s age is ${10+10}';
// 多行
var s1 = '''
You can create
multi-line strings like this one.
''';
// raw
var s = r'In a raw string, not even \n gets special treatment.'; // \n不会被转义换行
```

<!-- tabs:end -->

## 类型检测

<!-- tabs:start -->

#### ** Javascript **

- `typeof` 操作符返回一个字符串，表示未经计算的操作数的类型。

```js
console.log(typeof 42)
// expected output: "number"

console.log(typeof 'blubber')
// expected output: "string"

console.log(typeof true)
// expected output: "boolean"

console.log(typeof declaredButUndefinedVariable)
// expected output: "undefined";
```

可能出现的值

| 类型                                                                                                          | 结果             |
| :------------------------------------------------------------------------------------------------------------ | :--------------- |
| [Undefined](https://developer.mozilla.org/en-US/docs/Glossary/Undefined)                                      | `"undefined"`    |
| [Null](https://developer.mozilla.org/en-US/docs/Glossary/Null)                                                | `"object"`       |
| [Boolean](https://developer.mozilla.org/en-US/docs/Glossary/Boolean)                                          | `"boolean"`      |
| [Number](https://developer.mozilla.org/en-US/docs/Glossary/Number)                                            | `"number"`       |
| [BigInt](https://developer.mozilla.org/en-US/docs/Glossary/BigInt)                                            | `"bigint"`       |
| [String](https://developer.mozilla.org/en-US/docs/Glossary/String)                                            | `"string"`       |
| [Symbol](https://developer.mozilla.org/en-US/docs/Glossary/Symbol) (ECMAScript 2015 新增)                     | `"symbol"`       |
| 宿主对象（由 JS 环境提供）                                                                                    | _取决于具体实现_ |
| [Function](https://developer.mozilla.org/en-US/docs/Glossary/Function) 对象 (按照 ECMA-262 规范实现 [[Call]]) | `"function"`     |
| 其他任何对象                                                                                                  | `"object"`       |

- `instanceof` 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

```js
function Car(make, model, year) {
  this.make = make
  this.model = model
  this.year = year
}
var auto = new Car('Honda', 'Accord', 1998)

console.log(auto instanceof Car)
// expected output: true

console.log(auto instanceof Object)
// expected output: true
```

- `Object.prototype.toString`

```js
var a = 123
console.log(Object.prototype.toString.call(a)) // [object Number]

var b = 'string'
console.log(Object.prototype.toString.call(b)) // [object String]

var c = []
console.log(Object.prototype.toString.call(c)) // [object Array]

var d = {}
console.log(Object.prototype.toString.call(d)) // [object Object]

var e = true
console.log(Object.prototype.toString.call(e)) // [object Boolean]

var f = null
console.log(Object.prototype.toString.call(f)) // [object Null]

var g
console.log(Object.prototype.toString.call(g)) // [object Undefined]

var h = function() {}
console.log(Object.prototype.toString.call(h)) // [object Function]

var A = new Number()
console.log(Object.prototype.toString.call(A)) // [object Number]
```

#### ** Dart **

关键字 `is` 、`is!`

```dart
if (emp is Person) {
  // Type check
  emp.firstName = 'Bob';
}
print( 1 is num); // true
print('a' is! String); // false

```

<!-- tabs:end -->

## 类型转换

<!-- tabs:start -->

#### ** Javascript **

Javascript

#### ** Dart **

关键字 `as`

```dart
const Object i = 3;
const list = [i as int]; // Use a typecast.
```

```dart
// String -> int
var one = int.parse('1');
assert(one == 1);

// String -> double
var onePointOne = double.parse('1.1');
assert(onePointOne == 1.1);

// int -> String
String oneAsString = 1.toString();
assert(oneAsString == '1');

// double -> String
String piAsString = 3.14159.toStringAsFixed(2);
assert(piAsString == '3.14');
```

<!-- tabs:end -->
