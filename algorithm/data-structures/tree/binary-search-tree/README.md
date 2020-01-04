# 二叉搜索树

在计算机科学中，二叉搜索树（Binary Search Tree）（有时称为有序或排序的二叉树）是一种能存储特定数据类型的容器。二叉搜索树允许快速查找、添加或者删除某一个节点，并且它是动态的集合。

二叉搜索树按照关键字顺序地保存节点，因此查找和其他操作可以使用二叉搜索原理：当在树（或者寻找插入新节点的地方）中查找节点时，它从根节点遍历到叶节点，与每个节点的关键字进行比较，然后基于比较结果，决定继续在左子树或者右子树中进行搜索。平均而言，每次比较将跳过树的大约一半的元素，这使得每次查找，插入或删除一个节点所花费的时间与树的节点个数的对数成（树的高度）正比，比线性表的性能要好很多，但比哈希表上的相应操作要慢。

下面是一个大小 9，深度 3，以 8 为根结点的二叉搜索树。

![Binary Search Tree](https://upload.wikimedia.org/wikipedia/commons/d/da/Binary_search_tree.svg)

[图形化演](https://www.cs.usfca.edu/~galles/visualization/BST.html)

## 实现

```js
import Comparator from '../../utils/comparator/Comparator'

class BinaryTreeNode {
  constructor(value = null) {
    this.left = null
    this.right = null
    this.parent = null
    this.value = value

    // This comparator is used to compare binary tree nodes with each other.
    this.nodeComparator = new Comparator()
  }

  get leftHeight() {
    if (!this.left) {
      return 0
    }

    return this.left.height + 1
  }

  get rightHeight() {
    if (!this.right) {
      return 0
    }

    return this.right.height + 1
  }

  get height() {
    return Math.max(this.leftHeight, this.rightHeight)
  }

  get balanceFactor() {
    return this.leftHeight - this.rightHeight
  }

  get uncle() {
    // Check if current node has parent.
    if (!this.parent) {
      return undefined
    }

    // Check if current node has grand-parent.
    if (!this.parent.parent) {
      return undefined
    }

    // Check if grand-parent has two children.
    if (!this.parent.parent.left || !this.parent.parent.right) {
      return undefined
    }

    // So for now we know that current node has grand-parent and this
    // grand-parent has two children. Let's find out who is the uncle.
    if (this.nodeComparator.equal(this.parent, this.parent.parent.left)) {
      // Right one is an uncle.
      return this.parent.parent.right
    }

    // Left one is an uncle.
    return this.parent.parent.left
  }

  setValue(value) {
    this.value = value

    return this
  }

  setLeft(node) {
    // Reset parent for left node since it is going to be detached.
    if (this.left) {
      this.left.parent = null
    }

    // Attach new node to the left.
    this.left = node

    // Make current node to be a parent for new left one.
    if (this.left) {
      this.left.parent = this
    }

    return this
  }

  setRight(node) {
    // Reset parent for right node since it is going to be detached.
    if (this.right) {
      this.right.parent = null
    }

    // Attach new node to the right.
    this.right = node

    // Make current node to be a parent for new right one.
    if (node) {
      this.right.parent = this
    }

    return this
  }

  removeChild(nodeToRemove) {
    if (this.left && this.nodeComparator.equal(this.left, nodeToRemove)) {
      this.left = null
      return true
    }

    if (this.right && this.nodeComparator.equal(this.right, nodeToRemove)) {
      this.right = null
      return true
    }

    return false
  }

  replaceChild(nodeToReplace, replacementNode) {
    if (!nodeToReplace || !replacementNode) {
      return false
    }

    if (this.left && this.nodeComparator.equal(this.left, nodeToReplace)) {
      this.left = replacementNode
      return true
    }

    if (this.right && this.nodeComparator.equal(this.right, nodeToReplace)) {
      this.right = replacementNode
      return true
    }

    return false
  }

  static copyNode(sourceNode, targetNode) {
    targetNode.setValue(sourceNode.value)
    targetNode.setLeft(sourceNode.left)
    targetNode.setRight(sourceNode.right)
  }

  traverseInOrder() {
    let traverse = []

    // Add left node.
    if (this.left) {
      traverse = traverse.concat(this.left.traverseInOrder())
    }

    // Add root.
    traverse.push(this.value)

    // Add right node.
    if (this.right) {
      traverse = traverse.concat(this.right.traverseInOrder())
    }

    return traverse
  }

  toString() {
    return this.traverseInOrder().toString()
  }
}

class BinarySearchTreeNode extends BinaryTreeNode {
  constructor(value = null, compareFunction = undefined) {
    super(value)

    // This comparator is used to compare node values with each other.
    this.compareFunction = compareFunction
    this.nodeValueComparator = new Comparator(compareFunction)
  }

  insert(value) {
    if (this.nodeValueComparator.equal(this.value, null)) {
      this.value = value

      return this
    }

    if (this.nodeValueComparator.lessThan(value, this.value)) {
      // Insert to the left.
      if (this.left) {
        return this.left.insert(value)
      }

      const newNode = new BinarySearchTreeNode(value, this.compareFunction)
      this.setLeft(newNode)

      return newNode
    }

    if (this.nodeValueComparator.greaterThan(value, this.value)) {
      // Insert to the right.
      if (this.right) {
        return this.right.insert(value)
      }

      const newNode = new BinarySearchTreeNode(value, this.compareFunction)
      this.setRight(newNode)

      return newNode
    }

    return this
  }

  find(value) {
    // Check the root.
    if (this.nodeValueComparator.equal(this.value, value)) {
      return this
    }

    if (this.nodeValueComparator.lessThan(value, this.value) && this.left) {
      // Check left nodes.
      return this.left.find(value)
    }

    if (this.nodeValueComparator.greaterThan(value, this.value) && this.right) {
      // Check right nodes.
      return this.right.find(value)
    }

    return null
  }

  contains(value) {
    return !!this.find(value)
  }

  remove(value) {
    const nodeToRemove = this.find(value)

    if (!nodeToRemove) {
      throw new Error('Item not found in the tree')
    }

    const { parent } = nodeToRemove

    if (!nodeToRemove.left && !nodeToRemove.right) {
      // Node is a leaf and thus has no children.
      if (parent) {
        // Node has a parent. Just remove the pointer to this node from the parent.
        parent.removeChild(nodeToRemove)
      } else {
        // Node has no parent. Just erase current node value.
        nodeToRemove.setValue(undefined)
      }
    } else if (nodeToRemove.left && nodeToRemove.right) {
      // Node has two children.
      // Find the next biggest value (minimum value in the right branch)
      // and replace current value node with that next biggest value.
      const nextBiggerNode = nodeToRemove.right.findMin()
      if (!this.nodeComparator.equal(nextBiggerNode, nodeToRemove.right)) {
        this.remove(nextBiggerNode.value)
        nodeToRemove.setValue(nextBiggerNode.value)
      } else {
        // In case if next right value is the next bigger one and it doesn't have left child
        // then just replace node that is going to be deleted with the right node.
        nodeToRemove.setValue(nodeToRemove.right.value)
        nodeToRemove.setRight(nodeToRemove.right.right)
      }
    } else {
      // Node has only one child.
      // Make this child to be a direct child of current node's parent.
      /** @var BinarySearchTreeNode */
      const childNode = nodeToRemove.left || nodeToRemove.right

      if (parent) {
        parent.replaceChild(nodeToRemove, childNode)
      } else {
        BinaryTreeNode.copyNode(childNode, nodeToRemove)
      }
    }

    // Clear the parent of removed node.
    nodeToRemove.parent = null

    return true
  }

  findMin() {
    if (!this.left) {
      return this
    }

    return this.left.findMin()
  }
}

export default class BinarySearchTree {
  constructor(nodeValueCompareFunction) {
    this.root = new BinarySearchTreeNode(null, nodeValueCompareFunction)

    // Steal node comparator from the root.
    this.nodeComparator = this.root.nodeComparator
  }

  insert(value) {
    return this.root.insert(value)
  }

  contains(value) {
    return this.root.contains(value)
  }

  remove(value) {
    return this.root.remove(value)
  }

  toString() {
    return this.root.toString()
  }
}
```

## 复杂度

### 时间复杂度

|  Access   |  Search   | Insertion | Deletion  |
| :-------: | :-------: | :-------: | :-------: |
| O(log(n)) | O(log(n)) | O(log(n)) | O(log(n)) |

### 空间复杂度

O(n)
