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
```

## CLI tool

[@babel/cli](https://babeljs.io/docs/en/babel-cli) 可以在命令行里使用 Babel 工具，安装和基本使用的  例子：

```bash
npm install --save-dev @babel/core @babel/cli

./node_modules/.bin/babel src --out-dir lib
```

这会将 src 的所有 JavaScript 文件转换到 lib 中，并应用任何给定的转换 transformations，但这里还没指定，所以 lib 里的代码会跟 src 里的一样， 我们可以在选项里明确指定哪些转换。上面我们使用  了 `--out-dir` 选项， 使用 `--help` 可以查看所有选项， 但现在对于我们最重要的两个选项是`--plugins`和 `--presets`.

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
你可以创建自己的  预置插件集， 这个例子里我们使用  比较优秀的预置 `env`.

```bash
npm install --save-dev @babel/preset-env

./node_modules/.bin/babel src --out-dir lib --presets=@babel/env
```

零配置，这个 preset 将包括所有插件来支持现代 JavaScript（ES2015,ES2016,etc.），但是 preset 也是有配置选项的，我们来看看配置文件。

## Configuration
