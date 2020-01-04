# 栈

在计算机科学中, 一个 **栈(stack)** 是一种抽象数据类型,用作表示元素的集合,具有两种主要操作:

- **push**, 添加元素到栈的顶端(末尾);
- **pop**, 移除栈最顶端(末尾)的元素.

以上两种操作可以简单概括为“后进先出(LIFO = last in, first out)”。

此外,应有一个 `peek` 操作用于访问栈当前顶端(末尾)的元素。

"栈"这个名称,可类比于一组物体的堆叠(一摞书,一摞盘子之类的)。

栈的 push 和 pop 操作的示意

![Stack](https://upload.wikimedia.org/wikipedia/commons/b/b4/Lifo_stack.png)

## 实现

1. 数组实现

```js
class Stack {
  items = []

  isEmpty() {
    return this.items.length == 0
  }

  size() {
    return this.items.length
  }

  push(value) {
    return this.items.push(value)
  }

  pop() {
    if (this.isEmpty()) {
      return null
    }
    return this.items.pop()
  }

  peek() {
    if (this.isEmpty()) {
      return null
    }
    return this.items[this.items.length - 1]
  }

  clear() {
    this.items = []
  }
}
```

2. 链表实现

```js
import LinkedList from '../linked-list/LinkedList'

class Stack {
  constructor() {
    this.linkedList = new LinkedList()
  }

  isEmpty() {
    return !this.linkedList.head
  }

  peek() {
    if (this.isEmpty()) {
      return null
    }

    return this.linkedList.head.value
  }

  push(value) {
    this.linkedList.prepend(value)
  }

  pop() {
    const removedHead = this.linkedList.deleteHead()
    return removedHead ? removedHead.value : null
  }

  toArray() {
    return this.linkedList.toArray().map(linkedListNode => linkedListNode.value)
  }

  toString(callback) {
    return this.linkedList.toString(callback)
  }
}
```
