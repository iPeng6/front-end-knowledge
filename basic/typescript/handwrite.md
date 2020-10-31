# Typescript 手写

- [Typescript 手写](#typescript-手写)
  - [用 ts 设计计算图形面积和](#用-ts-设计计算图形面积和)

## 用 ts 设计计算图形面积和

```
function main(shapes) {

}
main([
  new Rectangle(2, 2),
  new Rectangle(1, 2),
  new Square(2),
  new Cirle(3)
])
```

```ts
interface Shap {
  readonly area: number
}

class Rectangle implements Shap {
  constructor(public width: number, public height: number) {}
  get area() {
    return this.width * this.height
  }
}

class Square implements Shap {
  constructor(public width: number) {}
  get area() {
    return this.width * this.width
  }
}

class Cirle implements Shap {
  constructor(public r: number) {}
  get area() {
    return Math.PI * this.r * this.r
  }
}

function main(shapes: Shap[]) {
  return shapes.reduce((res, shap) => res + shap.area, 0)
}
const result = main([new Rectangle(2, 2), new Rectangle(1, 2), new Square(2), new Cirle(3)])

console.log(result)
```
