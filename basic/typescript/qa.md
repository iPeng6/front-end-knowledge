# Typescript QA

## interface type 区别

1. 扩展语法不同

```ts
interface Foo {
  a: string
}
interface Bar extends Foo {
  b: number
}

type Bar = Foo & {
  b: number
}
```

2. interface 重名自动聚合， 也可以和已有的同名 class 聚合，很适合扩展第三方包，而 type 必须另起一个名字

```ts
interface A {
  a: String
}

interface A {
  b: number
}

type B= 'a'

// 标识符“B”重复
type B = 'b'
```

3. interface 只能表示 object/class/function 的类型，而 type 支持更复杂的类型操作

```ts
type Tuple = [number, string]
type Size = 'small' | 'default' | 'big' | number
```
