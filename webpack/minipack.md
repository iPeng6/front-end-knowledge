# minipack

> 源码：https://github.com/ronami/minipack/blob/master/src/minipack.js

```js
/**
 * Module bundlers 模块打包器可以将一小段代码编译成一些更大更复杂的代码使之可以在浏览器中运行
 * 这些小代码段就是一些JavaScript文件，通过模块系统(https://webpack.js.org/concepts/modules)
 * 来建立依赖关系
 *
 * 模块打包器有个 entry file 入口文件的概念，不像在浏览器里通过插入script标签来运行js, 打包器需要
 * 知道我们应用的主文件是哪个来启动我们整个应用
 *
 * 我们的打包器会从入口文件开始分析文件依赖，然后进一步分析出依赖文件的依赖直到分析完我们应用里的
 * 每个模块，得出他们是怎么一个依赖另一个的
 *
 * 这种对项目的理解称作 dependency graph 依赖图
 *
 * 这个例子里，我们将创建一个依赖图，然后用它把所有模块打包成一个 bundle
 *
 * 让我们开始 :)
 *
 * 请注意：这只是一个简单的例子，只处理了循环依赖，缓存模块导出，每个模块只转换一次，以使例子尽量简单
 */

const fs = require('fs');
const path = require('path');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const { transformFromAst } = require('babel-core');

let ID = 0;

// 我们从创建一个函数开始，它将接收一个文件路径，然后读取内容解析出它的依赖
function createAsset(filename) {
  // 读取内容字符串
  const content = fs.readFileSync(filename, 'utf-8');

  // 现在我们尝试计算出这个文件依赖于哪些文件，我们可以通过查找 import 字符串，但是这方法太
  // 笨了，我可以使用 JavaScript parser.
  //
  // JavaScript parsers 是读取和理解JavaScript代码的工具。可生成更加抽象的模型，我们叫做
  // AST(abstract syntax tree 抽象语法树)
  //
  // 我强烈建议你看看 AST Explorer (https://astexplorer.net) 看看 AST 到底长啥样
  //
  // AST 包含了我们代码的很多信息，我们可以查看它来理解我们的代码想干啥
  const ast = babylon.parse(content, {
    sourceType: 'module',
  });

  // 这个数组将存储这个模块依赖模块的相对路径
  const dependencies = [];

  // 我们通过遍历 AST 来尝试理解我们的模块依赖于哪些模块。为了做的这一点，我们检查下 AST 里的
  // 每个import声明语句
  traverse(ast, {
    // EcmaScript 模块非常简单因为是静态的，这意味着我们不能 import 一个变量，或者条件性的
    // import 另一个模块。每当我们看到一个import语句时，我们就可以将其值视为一个依赖
    ImportDeclaration: ({ node }) => {
      // 我们将 import 的值 push 到 dependencies 数组中
      dependencies.push(node.source.value);
    },
  });

  // 我们通过一个累加器作为模块的唯一标识
  const id = ID++;

  // 我们使用的 ES modules 和 其他 JavaScript 特性可能并不是所有浏览器都支持，为了让我们
  // 的 bundle 能在所有浏览器里运行我们通过 babel 转换一下(see https://babeljs.io)
  //
  // `presets` 选项一个规则集合告诉 Babel 怎么转换我们的代码，使用 `babel-preset-env`
  // 可以转换出大部分浏览器能够运行的代码
  const { code } = transformFromAst(ast, null, {
    presets: ['env'],
  });

  // 返回这个模块的所有信息
  return {
    id,
    filename,
    dependencies,
    code,
  };
}

// 现在我们可以解析出单个模块的依赖了，我们将开始解析入口文件及依赖
//
// 然后，我们再解析它每个依赖的依赖直到解析完应用里的所有模块，得到他们如何一个依赖另一个的，返回可理解的
// dependency graph 依赖图
function createGraph(entry) {
  // 开始转换入口文件
  const mainAsset = createAsset(entry);

  // 我们将使用一个 queue 队列来转换每个 asset 的依赖，为了做到这一点我们定义一个只包含一个入口asset的数组
  const queue = [mainAsset];

  // 使用 `for ... of` 来循环迭代我们的 queue，一开始queue里面就一个asset，但随着迭代过程我们将
  // 往queue里面加些新的 assets. 这个循环会在 queue 空时结束。
  for (const asset of queue) {
    // 每个assets都有一个它依赖模块的相对路径列表，遍历它们通过我们的`createAsset()`函数转换
    // 之后将该依赖信息存到这个对象里以便追踪
    asset.mapping = {};

    // 模块所在目录
    const dirname = path.dirname(asset.filename);

    // 遍历相对路径列表找到依赖模块
    asset.dependencies.forEach(relativePath => {
      // 我们`createAsset()`函数期望的是一个绝对路径，dependencies依赖数组是一个相对路径数组.
      // 这些路径相对于导入它们的文件。我们通过相对路径和父级asset目录路径组合转换为绝对路径
      const absolutePath = path.join(dirname, relativePath);

      // 转换asset，读取内容，提取依赖
      const child = createAsset(absolutePath);

      // 我们有必要知道`asset`依赖的`child`。我们通过一个新属性`mapping`存储 child 的id,来表示
      // 它们的依赖关系
      asset.mapping[relativePath] = child.id;

      // 最后我们将 child asset 添加到 queue，这样它的依赖会继续遍历转换
      queue.push(child);
    });
  }

  // 到这里queue只是一个包含了目标应用所有模块的数组： 这就是我们怎么表示 graph 的
  return queue;
}

// 接下来，我们定义一个函数，使用我们的 graph，然后返回可以在浏览器里运行的 bundle
//
// 我们的 bundle 就是个自调用函数
//
// (function() {})()
//
// 该函数值只接受一个参数：一个包含了 graph 中所有模块信息的对象
function bundle(graph) {
  let modules = '';

  // 在我们获得该函数主体之前，我们先构造一个将要传入的对象。请注意我们为每个模块构建的这个字符串最终使用了大括号({})包裹,
  // 那么加在中间的字符串需要 `key: value,` 格式
  graph.forEach(mod => {
    // 在这个对象里 graph 中的每个模块都有一个入口，我们使用模块id作为key和一个数组作为值（每个模块含有两个值）
    //
    // 第一个值是经过函数包裹之后的模块代码，这是因为每个模块需要有自己的作用域：在一个模块里定义变量不应该影响
    // 其他模块或者全局作用域
    //
    // 我们的模块在转换之后，使用的 CommonJS 模块系统：
    // 它们期望 `require`,`module` 和 `exports` 对象是可用的，这些在正常浏览器是不可用的，所有我们通过
    // 包裹函数来实现注入它们
    //
    // 第二个值，我们将模块依赖的map对象直接转成字符串，大概长这样：
    // { './relative/path': 1 }.
    //
    // 这是因为我们转换后的代码`require()` 调用传入的是相对路径，当这个函数被调用时，我们需要知道graph里与这个路径
    // 所对应的哪个模块被调用了
    modules += `${mod.id}: [
      function (require, module, exports) {
        ${mod.code}
      },
      ${JSON.stringify(mod.mapping)},
    ],`;
  });

  // 最后，我们实现这个自调用函数的主体部分
  //
  // 我们先创建一个`require()` 函数：接受一个模块id的参数，然后从之前构建的 `modules`对象里找到对应模块。
  // 然后解析出两个值，拿到我们的包裹函数和mapping对象
  //
  // 我们的模块代码`require()`调用时是用的相对路径而不是模块id,我们的require函数期望的是模块id.另外
  // 两个模块可能`require()`了相同的相对路径，但是可能是不同的模块
  //
  // 为了处理这个问题，当模块被required时我们创建一个新的专用的`require`函数给它使用，它将特定于该模块
  // 通过使用该模块的 mapping 对象就可以将相对路径转化成模块id。mapping 对象就是这样的：保存了特定于
  // 模块的相对路径和模块id的映射
  //
  // 最后，通过CommonJs，当一个模块被required时通过改变`exports`对象就可以暴露值内容了。`exports`
  // 对象，在模块代码里被改变之后，从`require()`函数返回
  const result = `
    (function(modules) {
      function require(id) {
        const [fn, mapping] = modules[id];
        function localRequire(name) {
          return require(mapping[name]);
        }
        const module = { exports : {} };
        fn(localRequire, module, module.exports);
        return module.exports;
      }
      require(0);
    })({${modules}})
  `;

  // 我们简单的返回结果，欢呼！:)
  return result;
}

const graph = createGraph('./example/entry.js');
const result = bundle(graph);

console.log(result);
```
