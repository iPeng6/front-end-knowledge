# 简介

<!-- tabs:start -->

#### ** Javascript **

Javascript

#### ** Dart **

Dart

<!-- tabs:end -->

## 基本程序

<!-- tabs:start -->

#### ** Javascript **

```javascript
// 声明函数
function printInteger(aNumber) {
  console.log(`The number is ${aNumber}}.`) // 控制台打印
}

// js 没有入口函数，js文件或script标签内的语句会自动逐行执行
let number = 42 // 声明并初始化一个变量
number++ // 变量自增运算
printInteger(number) // 调用函数
```

- 注释
  - 单行`//`
  - 多行`/* */`
  - 文档注释 [jsdoc](https://jsdoc.app/index.html)
- 可选分号结尾

#### ** Dart **

```dart
// 声明函数
printInteger(int aNumber) {
  print('The number is $aNumber.'); // 控制台打印
}

// 应用启动执行的入口
main() {
  var number = 42; // 声明并初始化一个变量
  number++; // 变量自增运算
  printInteger(number); // 调用函数
}
```

- 注释
  - 单行`//`
  - 多行`/* */`
  - 文档注释 `///` 注释中括号内的名称 `/// [references]` 会词法解析
- 分号结尾

<!-- tabs:end -->
