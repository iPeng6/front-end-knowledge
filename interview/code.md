
# 编程

## 实现金额数字千分位表示

```js
// 递归方案
function foo(num) {
  const [intpart, decimalPart] = num.toString().split('.')
  const arr = []

  function loop(str) {
    arr.push(str.slice(-3))
    const remainstr = str.substr(0, str.length - 3)
    if (remainstr.length > 3) {
      loop(remainstr)
    } else {
      if (remainstr != '') {
        arr.push(remainstr)
      }
    }
  }
  loop(intpart)
  return arr.reverse().join(',') + (!!decimalPart ? '.' + decimalPart : '')
}

// for循环方案
function foo(num) {
  const [intPart, decimalPart] = num.toString().split('.')

  const arr = Array.from(intPart).reverse()
  for (let i = 1; i < intPart.length / 3; i++) {
    arr.splice(3 * i + i - 1, 0, ',')
  }
  return arr.reverse().join('') + (!!decimalPart ? '.' + decimalPart : '')
}

console.log(foo(12))
console.log(foo(0.45))
console.log(foo(12345.45))
console.log(foo(123456.45))
console.log(foo(1234567.45))
```

## 一维数组平均分成多维数组

将一个 [1,2,3...n] 的数组，随机、尽量平均的分成 m 组，输入为 m 跟一维数组，输出为分好组的二维数组，

举例：[1,2,3,4,5] 随机尽量平均的分成 2 组，那么其中一种可能的结果为 [[1,3],[2,4,5]]
</summary>

```js
function foo(arr, m) {
  const result = new Array(m).fill(0).map(() => [])
  let startIndex = 0

  do {
    const [getOne] = arr.splice(parseInt(Math.random() * arr.length), 1)
    startIndex = startIndex % m
    result[startIndex].push(getOne)
    startIndex++
  } while (arr.length > 0)

  return result
}
console.log(foo([1, 2, 3, 4, 5], 2))
console.log(foo([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3))
console.log(foo([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 3))
```

</details>
