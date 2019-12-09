# 声明

程序的运行离不开数据，而数据的存取内存的开辟就得通过声明来指定，这其中一般包括：变量or常量、类型、名称、初始化值等信息

## 变量

<!-- tabs:start -->

#### ** Javascript **

```js
let name = 'ipeng6'
var name = 'ipeng6'

// 默认值 undefined
let name;
```

let,var 区别？

#### ** Dart **

```dart
// 声明并初始化一个name变量为 `ipeng6` 字符串，name变量会被自动推断为 String 类型
var name = 'ipeng6';

// 明确指定类型
String name = 'ipeng6';

// 动态类型
dynamic name = 'ipeng6';
Object name = 'ipeng6';

// 默认值为 null，即使指定了int类型，因为dart里所有类型都是 Object，默认值都是null
int lineCount;

```

[dynamic vs Object](https://dart.dev/guides/language/effective-dart/design#do-annotate-with-object-instead-of-dynamic-to-indicate-any-object-is-allowed)

<!-- tabs:end -->

## 常量

常量特性： 1. 只初始化一次 2. 不可改变

<!-- tabs:start -->

#### ** Javascript **

```js
const name = 'ipeng6'
```

#### ** Dart **

dart 针对这两个特性出现了两个关键字 `final` `const`，分别表示

### (1) `const` 用在等号左边

作用是**声明常量**，且必须在**声明变量时赋值**，一旦赋值就**不允许修改**，而声明值一定要是**编译时常数**。

`compile-time constants` 编译时常数：

1. 数值、字符串、其它的const变量
    ```dart
    const a = 1;
    const b = 'hello';
    const c = a;
    ```
2. 表达式。表达式的所有值都是编译时可知的。
    ```dart
    const a = 1;
    const b = a > 1 ? 2 : 1;
    ```

3. 集合或对象。集合必须用const修饰，对象的构造函数必须用const修饰。
    ```dart
    void main() {
      const a = const [1,2,3]; // 两个 const 右边一个可省略
      const b = ConstObject(2);
      b.log();
    }

    class ConstObject {

      final value;

      const ConstObject(this.value);

      log() {
        print(value);
      }
    }
    ```

### (2) `const` 用在等号右边

作用是**修饰值**，它意味着对象的整个**深度状态**可以在编译时完全确定，并且对象将被冻结并且完全不可变。

```dart
var a = 1;
var b = const [a, 2, 3]; // Error

var c = [1, 2, 3];
c[1] = 1; // Error
```

### (3) final 声明常量

final 强调的是**只能被赋值一次**，赋之后不能改变，它并不要求等号的右边是编译时常数

1. 文件中的变量声明：必须在声明时赋值。
2. 类的成员变量声明：可以在声明时赋值，也可以通过构造函数赋值语法糖 `ClassV({this.a})`，或者初始化列表的方式赋值。


🌰：

```dart
final name = 'ipeng6'; // Without a type annotation
final String nickname = 'ipeng6';
name = 'Alice'; // Error: a final variable can only be set once.

// compile-time constants
const bar = 1000000; // Unit of pressure (dynes/cm2)
const double atm = 1.01325 * bar; // Standard atmosphere

var a = const [1, 2, 3];
a[1] = 1; // Error

final b = const [1, 2, 3]
b[1] = 1; // Error

final b = [1, 2, 3];
b[1] = 1; // ok

const baz = [1, 2, 3]; // Equivalent to `const []`
baz = [42]; // Error
baz[1] = 1; // Error
```

那什么时候用`final`,什么时候用`const`?

<!-- tabs:end -->

## 类型检测

<!-- tabs:start -->

#### ** Javascript **

- `typeof` 操作符返回一个字符串，表示未经计算的操作数的类型。

```js
console.log(typeof 42);
// expected output: "number"

console.log(typeof 'blubber');
// expected output: "string"

console.log(typeof true);
// expected output: "boolean"

console.log(typeof declaredButUndefinedVariable);
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
| 宿主对象（由 JS 环境提供）                                                                                    | *取决于具体实现* |
| [Function](https://developer.mozilla.org/en-US/docs/Glossary/Function) 对象 (按照 ECMA-262 规范实现 [[Call]]) | `"function"`     |
| 其他任何对象                                                                                                  | `"object"`       |


- `instanceof` 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
var auto = new Car('Honda', 'Accord', 1998);

console.log(auto instanceof Car);
// expected output: true

console.log(auto instanceof Object);
// expected output: true
```

- `Object.prototype.toString`

```js
var a = 123;
console.log(Object.prototype.toString.call(a));    // [object Number]

var b = "string";
console.log(Object.prototype.toString.call(b));    // [object String]

var c = [];
console.log(Object.prototype.toString.call(c));    // [object Array]

var d = {};
console.log(Object.prototype.toString.call(d));    // [object Object]

var e = true;
console.log(Object.prototype.toString.call(e));    // [object Boolean]

var f =  null;
console.log(Object.prototype.toString.call(f));    // [object Null]

var g;
console.log(Object.prototype.toString.call(g));    // [object Undefined]

var h = function () {};
console.log(Object.prototype.toString.call(h));    // [object Function]

var A = new Number();
console.log(Object.prototype.toString.call(A));    // [object Number]
```

#### ** Dart **

关键字 `is` 、`is!`

```dart
if (emp is Person) {
  // Type check
  emp.firstName = 'Bob';
}

print('1' is! String); // false

const Object i = 3; // Where i is a const Object with an int value...
const map = {if (i is int) i: "int"}; // Use is and collection if.
const set = {if (list is List<int>) ...list}; // ...and a spread.
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

<!-- tabs:end -->

## 内建类型
