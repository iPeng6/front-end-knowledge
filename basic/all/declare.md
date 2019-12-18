# 声明

程序的运行离不开数据，而数据的存取则通过声明来指定，这其中一般包括：变量 or 常量、类型、名称、初始化值等信息

## 变量

<!-- tabs:start -->

#### ** Javascript **

```js
let name = 'ipeng6'
var name = 'ipeng6'

// 默认值 undefined
let name
```

let,var 区别？

#### ** Dart **

```dart
// name变量会被自动推断为 String 类型
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

- 使用 Object 时，我们只是在说接受任意类型，我们需要的是一个 Object。**类型系统会保证其类型安全**。
- 使用 dynamic 则是告诉编译器，我们知道自己在做什么，**不用做类型检测**。

<!-- tabs:end -->

## 常量

常量特性： 1. 只初始化一次 2. 不可改变

<!-- tabs:start -->

#### ** Javascript **

```js
const name = 'ipeng6'
```

Javascript 本身是个解释型语言，并需要编译，解释一句执行一句，也就不存在编译时，node 的解释也是说提供了 Javascript runtime 运行时

所以 js 的 `const` 是个运行时常量，如果我们将 webpack 的打包过程算作编译，那么个人认为 `process.env.NODE_ENV` 就是个编译时常量

因为在编译时即已经确定其值了 `process.env.NODE_ENV === 'production'` 会被编译为 `'production' === 'production'`

#### ** Dart **

dart 针对这两个特性出现了两个关键字 `final` `const`

- `final` 运行时常量，在程序运行的时候赋值，只能赋值一次，赋值后值不再改变
- `const` 编译时常量，声明时即初始化，只能通过静态数据赋值，在编译时即已确定其值

### (1) `const` 用在等号左边

作用是**声明常量**，且必须在**声明时赋值**，一旦赋值就**不允许修改**，而声明值一定要是**编译时常数**。

编译时常数：

1. 数值、字符串、其它的 const 变量
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

3. 集合或对象。集合必须用 const 修饰，对象的构造函数必须用 const 修饰。

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

final 强调的是**只能被赋值一次**，赋之后不能改变，它并不要求等号的右边是编译时常数，也不一定声明时赋值

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

<!-- tabs:end -->
