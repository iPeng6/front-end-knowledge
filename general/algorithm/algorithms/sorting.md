# 排序算法

- [十大经典排序算法](https://sort.hust.cc/)

![](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lm9JtwbhXVOfXyecToy%2F-Lm9KQIJAMvCgJQzErQS%2F-Lm9KSPi7v-ygMtlI6Zr%2Fsort.png?generation=1565688978687703&alt=media)

## 平方阶 O(n2)

### 1. 冒泡排序

遍历，依次两两比较，将大的数向后交换，这样一次遍历之后就会将最大的数移到未排序数列的最后，就像冒泡一样。

![](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lm9JtwbhXVOfXyecToy%2F-Lm9KQIJAMvCgJQzErQS%2F-Lm9KRSInFt3BHoLgdXb%2FbubbleSort.gif?generation=1565688974562234&alt=media)

```js
function bubbleSort(arr) {
  var len = arr.length
  for (var i = 0; i < len - 1; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // 相邻元素两两对比
        var temp = arr[j + 1] // 元素交换
        arr[j + 1] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}
```

### 2. 选择排序

始终从未排序的数列中找出最小数移到未排序数列最前面所以叫选择排序。

![](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lm9JtwbhXVOfXyecToy%2F-Lm9KQIJAMvCgJQzErQS%2F-Lm9KSObDh5VGWhPE8Wh%2FselectionSort.gif?generation=1565688983763784&alt=media)

```js
function selectionSort(arr) {
  var len = arr.length
  var minIndex, temp
  for (var i = 0; i < len - 1; i++) {
    minIndex = i
    for (var j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        // 寻找最小的数
        minIndex = j // 将最小数的索引保存
      }
    }
    temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  return arr
}
```

### 3. 插入排序

将待排序元素从后往前找插入到已排序元素的适当位置，就像打牌插牌一样。

![](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lm9JtwbhXVOfXyecToy%2F-Lm9KQIJAMvCgJQzErQS%2F-Lm9KSRUSDsU1-_gwBLT%2FinsertionSort.gif?generation=1565688978183976&alt=media)

```js
function insertionSort(arr) {
  var len = arr.length
  var preIndex, current
  for (var i = 1; i < len; i++) {
    preIndex = i - 1
    current = arr[i]
    while (preIndex >= 0 && arr[preIndex] > current) {
      // 待排序元素跟前一个数比较，如果前一个数大就往后挪
      arr[preIndex + 1] = arr[preIndex]
      preIndex--
    }
    // 找到合适的位置 插入
    arr[preIndex + 1] = current
  }
  return arr
}
```

## 线性对数阶 O(nlogn)

### 1. 归并排序

采用分治思想，先将元素分组，各分组里再分组，直到不可分，然后将各分组排好序，再**按序**合并各分组，最终将整体合并完成排序

![](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lm9JtwbhXVOfXyecToy%2F-Lm9KQIJAMvCgJQzErQS%2F-Lm9KR9MTC7BHYOobU-Y%2FmergeSort.gif?generation=1565688974047164&alt=media)

```js
function mergeSort(arr) {
  // 采用自上而下的递归方法
  var len = arr.length
  if (len < 2) {
    return arr
  }
  var middle = Math.floor(len / 2),
    left = arr.slice(0, middle),
    right = arr.slice(middle)
  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  var result = []

  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }

  while (left.length) result.push(left.shift())

  while (right.length) result.push(right.shift())

  return result
}
```

### 2. 快速排序

从数列里挑出一个元素作为基准，然后重新排序将小的移到基准左边，大的移到右边。然后再对左右子串使用相同方式。

![](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lm9JtwbhXVOfXyecToy%2F-Lm9KQIJAMvCgJQzErQS%2F-Lm9KR8iDzYGG-GLSb8O%2FquickSort.gif?generation=1565688974101077&alt=media)

```js
function quickSort(arr, left, right) {
  var len = arr.length,
    partitionIndex,
    left = typeof left != 'number' ? 0 : left,
    right = typeof right != 'number' ? len - 1 : right

  if (left < right) {
    partitionIndex = partition(arr, left, right)
    quickSort(arr, left, partitionIndex - 1)
    quickSort(arr, partitionIndex + 1, right)
  }
  return arr
}

function partition(arr, left, right) {
  // 分区操作
  var pivot = left, // 设定基准值（pivot）
    index = pivot + 1
  for (var i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, index)
      index++
    }
  }
  swap(arr, pivot, index - 1)
  return index - 1
}

function swap(arr, i, j) {
  var temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}
function partition2(arr, low, high) {
  let pivot = arr[low]
  while (low < high) {
    while (low < high && arr[high] > pivot) {
      --high
    }
    arr[low] = arr[high]
    while (low < high && arr[low] <= pivot) {
      ++low
    }
    arr[high] = arr[low]
  }
  arr[low] = pivot
  return low
}

function quickSort2(arr, low, high) {
  if (low < high) {
    let pivot = partition2(arr, low, high)
    quickSort2(arr, low, pivot - 1)
    quickSort2(arr, pivot + 1, high)
  }
  return arr
}
```

### 3. 堆排序

堆排序利用堆特性的排序算法。如一个最小堆，每次取出最小顶点，然后调整堆得到新的最小堆，再取最小顶点，直到堆只剩一个元素。

```js
var len // 因为声明的多个函数都需要数据长度，所以把len设置成为全局变量

function buildMaxHeap(arr) {
  // 建立大顶堆
  len = arr.length
  for (var i = Math.floor(len / 2); i >= 0; i--) {
    heapify(arr, i)
  }
}

function heapify(arr, i) {
  // 堆调整
  var left = 2 * i + 1,
    right = 2 * i + 2,
    largest = i

  if (left < len && arr[left] > arr[largest]) {
    largest = left
  }

  if (right < len && arr[right] > arr[largest]) {
    largest = right
  }

  if (largest != i) {
    swap(arr, i, largest)
    heapify(arr, largest)
  }
}

function swap(arr, i, j) {
  var temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

function heapSort(arr) {
  buildMaxHeap(arr)

  for (var i = arr.length - 1; i > 0; i--) {
    swap(arr, 0, i)
    len--
    heapify(arr, 0)
  }
  return arr
}
```
