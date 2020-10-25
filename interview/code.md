# 编程

<details>
<summary>将一个 [1,2,3...n] 的数组，随机、尽量平均的分成 m 组，
输入为 m 跟一维数组，输出为分好组的二维数组，

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
