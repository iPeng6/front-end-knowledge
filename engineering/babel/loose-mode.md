# loose mode

Babel 大多插件分两种模式 `normal mode` 和 `loose mode`.

- **normal mode**: 转换而来的代码尽量接近 ES6 语义规范
- **loose mode**: 转换而来的代码更接近 es5 的写法，更简单，更像是人手写的
  - 优点：兼容旧引擎，可能更快
  - 缺点：如果将转换后的代码再转回 natvie ES6 代码，可能会有问题，这种风险也不太值得

## 模式切换

比如 class 的转换，就可以切换模式

```json
{
  "plugins": [
    ["@babel/plugin-transform-classes", {
      "loose": true
    }]
  ]
}
```

## 实例

让我们看下实际例子中两种模式的区别

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return `(${this.x}, ${this.y})`;
  }
}
```

- normal mode

  在 normal 模式中，属性方法需要通过 `Object.defineProperty` 添加，并确保不可枚举，就像 ES6 规范指定的那样。

```js
'use strict';

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var Point = (function() {
  function Point(x, y) {
    _classCallCheck(this, Point);

    this.x = x;
    this.y = y;
  }

  _createClass(Point, [
    {
      key: 'toString',
      value: function toString() {
        return '(' + this.x + ', ' + this.y + ')';
      },
    },
  ]);

  return Point;
})();
```

- loose mode

  loose 模式中，就是通常添加属性的方式，就像手写的一样，简洁但仍然不推荐

```js
'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var Point = (function() {
  function Point(x, y) {
    _classCallCheck(this, Point);

    this.x = x;
    this.y = y;
  }

  Point.prototype.toString = function toString() {
    return '(' + this.x + ', ' + this.y + ')';
  };

  return Point;
})();
```
