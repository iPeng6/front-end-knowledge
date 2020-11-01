# Diff 算法

## O(n3)

- [关于O(n^3)怎么计算出来的](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/151#issuecomment-510311760)

## O(n)

react 中的策略

1. 同级⽐较，WebUI中DOM节点跨层级的移动操作特别少，可以忽略不计。
2. 拥有不同类型的两个组件将会生成不同的树形结构。
3. 开发者可以通过key prop 来暗示哪些⼦元素在不同的渲染下能保持稳定;

这样只需要一次遍历O(n)
