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
  console.log(`The number is ${aNumber}}.`); // 控制台打印
}

// js 没有入口函数，js文件或script标签内的语句会自动逐行执行
let number = 42; // 声明并初始化一个变量
number++; // 变量自增运算
printInteger(number); // 调用函数

```

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

<!-- tabs:end -->
