# Babel

## Core Library

Babel 的核心功能都内置在 [@babel/core](https://babeljs.io/docs/en/babel-core) 模块中。 安装它之后：

```bash
npm install --save-dev @babel/core
```

你就可以在你的 JavaScript 项目里直接 `require` 使用

```js
const babel = require('@babel/core');

babel.transform('code', optionsObject);
babel.parse(code, optionsObject, callbackFunction);
```

## CLI tool

[@babel/cli](https://babeljs.io/docs/en/babel-cli) 可以在命令行里使用 Babel 工具，安装和基本使用的例子：

```bash
npm install --save-dev @babel/core @babel/cli

./node_modules/.bin/babel src --out-dir lib
```

这会将 src 的所有 JavaScript 文件转换到 lib 中，并应用任何给定的转换 transformations，但这里还没指定，所以 lib 里的代码会跟 src 里的一样，我们可以在选项里明确指定哪些转换。上面我们使用了 `--out-dir` 选项，使用 `--help`可以查看所有选项，但现在对于我们最重要的两个选项是`--plugins`和 `--presets`.

## Plugins & Presets

**Transformations**

转换都是以插件的形式出现，就是一小段 JavaScript 代码用来告诉 babel 怎么转换代码，比如将 ES2015+ 语法转换成 ES5 我们用了一个官方插件
`@babel/plugin-transform-arrow-functions`:

```bash
npm install --save-dev @babel/plugin-transform-arrow-functions

./node_modules/.bin/babel src --out-dir lib --plugins=@babel/plugin-transform-arrow-functions
```

```js
const fn = () => 1;

// converted to
var fn = function fn() {
  return 1;
};
```

**Preset**

但是 ES2015+ 还有很多特性，不可能都一个个添加，这时我们就可以使用预置 `preset`, 一组提前确定了的插件集合。
你可以创建自己的预置插件集，这个例子里我们使用了比较优秀的预置 [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env).

```bash
npm install --save-dev @babel/preset-env

./node_modules/.bin/babel src --out-dir lib --presets=@babel/env
```

无需其他配置这个 preset 就将包含所有支持现代 JavaScript（ES2015,ES2016,etc.）的插件，但 presets 也有配置选项，我们来看看配置文件。

## Configuration

babel 有多种配置方案 [configure Babel](https://babeljs.io/docs/en/configuration)

1. babel.config.js

   如果需要一些编程能力

   ```js
   module.exports = function () {
   const presets = [ ... ];
   const plugins = [ ... ];

   return {
     presets,
     plugins
   };
   }
   ```

2. .babelrc

   只需要简单的静态配置

   ```json
   {
     "presets": [...],
     "plugins": [...]
   }
   ```

3. .babelrc.js

   跟 .babelrc 一样 只不过可以用 JavaScript 来写

   ```js
   const presets = [ ... ];
   const plugins = [ ... ];

   module.exports = { presets, plugins };
   ```

4. package.json

   直接 package.json 中配置 babel key

   ```json
   {
     "name": "my-package",
     "version": "1.0.0",
     "babel": {
       "presets": [ ... ],
       "plugins": [ ... ],
     }
   }
   ```

**Plugin 和 Preset 配置**

每个插件或预置有下面几种结构

- EntryTarget - 插件
- [EntryTarget, EntryOptions] - 插件加选项
- [EntryTarget, EntryOptions, string] - 插件加选项加名称
- ConfigItem - babel.createConfigItem() 生成的插件配置项

**EntryTarget**: string | {} | Function\
**EntryOptions**: undefined | {} | false

```js
plugins: [
  // EntryTarget
  '@babel/plugin-transform-classes',

  // [EntryTarget, EntryOptions]
  ['@babel/plugin-transform-arrow-functions', { spec: true }],

  // [EntryTarget, EntryOptions, string]
  ['@babel/plugin-transform-for-of', { loose: true }, "some-name"],

  // ConfigItem
  babel.createConfigItem(require("@babel/plugin-transform-spread")),
],
```

## Polyfill

[@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill) 模块包含了 [core-js](https://github.com/zloirock/core-js) 和自定义的[ regenerator runtime](https://github.com/facebook/regenerator/blob/master/packages/regenerator-runtime/runtime.js)来模拟全部的 ES2015+的环境。

这样我们就可以使用内建的 `Promise` 或 `WeakMap`，静态方法如 `Array.from` `Object.assign`, 实例方法如 `Array.prototype.includes`, 和 generator 函数

```bash
npm install --save @babel/polyfill # 注意是 --save 而不是--save-dev
```

当然也可以按需引入，`env` preset 提供了 `useBuiltIns` 选项，当设置成 `usage` 时 Babel 就会检测加载当前环境缺失的特性：

```js
const presets = [
  [
    '@babel/env',
    {
      targets: {
        edge: '17',
        firefox: '60',
        chrome: '67',
        safari: '11.1'
      },
      useBuiltIns: 'usage'
    }
  ]
];

module.exports = { presets };
```
