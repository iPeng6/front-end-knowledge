# 队列

在计算机科学中, 一个 **队列(queue)** 是一种特殊类型的抽象数据类型或集合。集合中的实体按顺序保存。

队列基本操作有两种: 向队列的后端位置添加实体，称为入队，并从队列的前端位置移除实体，称为出队。

队列中元素先进先出 FIFO (first in, first out)的示意

![Queue](https://upload.wikimedia.org/wikipedia/commons/5/52/Data_Queue.svg)

## 实现

1. 数组实现

```js
class Queue {
  items = []

  isEmpty() {
    return this.items.length == 0
  }

  size() {
    return this.items.length
  }

  enqueue(value) {
    return this.items.push(value)
  }

  dequeue() {
    if (this.isEmpty()) {
      return null
    }
    return this.items.shift()
  }

  peek() {
    if (this.isEmpty()) {
      return null
    }
    return this.items[0]
  }

  clear() {
    this.items = []
  }
}
```

2. 栈实现

使用两个栈反转后出队再恢复

![](img/queue.png ':size=300')

```js
import Stack from '../stack/Stack'
class Queue {
  stack1 = new Stack()
  stack2 = new Stack()

  isEmpty() {
    return this.stack1.isEmpty()
  }

  size() {
    return this.stack1.size()
  }

  enqueue(value) {
    return this.stack1.push(value)
  }

  dequeue() {
    if (this.isEmpty()) {
      return null
    }
    while (this.stack1.size()) {
      this.stack2.push(this.stack1.pop())
    }
    const ret = this.stack2.pop()
    while (this.stack2.size()) {
      this.stack1.push(this.stack2.pop())
    }
    return ret
  }

  peek() {
    if (this.isEmpty()) {
      return null
    }
    while (this.stack1.size()) {
      this.stack2.push(this.stack1.pop())
    }
    const ret = this.stack2.peak()
    while (this.stack2.size()) {
      this.stack1.push(this.stack2.pop())
    }
    return ret
  }

  clear() {
    this.stack1 = []
  }
}
```

3. 链表实现

```js
import LinkedList from '../linked-list/LinkedList'

class Queue {
  constructor() {
    this.linkedList = new LinkedList()
  }

  isEmpty() {
    return !this.linkedList.head
  }

  peek() {
    if (!this.linkedList.head) {
      return null
    }

    return this.linkedList.head.value
  }

  enqueue(value) {
    this.linkedList.append(value)
  }

  dequeue() {
    const removedHead = this.linkedList.deleteHead()
    return removedHead ? removedHead.value : null
  }

  toString(callback) {
    return this.linkedList.toString(callback)
  }
}
```
