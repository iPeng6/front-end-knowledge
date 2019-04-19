# 编码规范

<details>
<summary>参考 - 2019年04月19日</summary>

- [JavaScript 编码风格指南 – JavaScript 完全手册（2018 版）](https://www.css88.com/archives/9992)
- [clean-code-javascript](https://github.com/ryanmcdermott/clean-code-javascript)
- [The Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- [The AirBnb JavaScript Style Guide](https://github.com/airbnb/javascript) [[中文]](https://www.css88.com/archives/8345)
- [standard](https://github.com/standard/standard)
- [前端代码质量管理（一）](https://juejin.im/post/5cb5c3445188256c83279255)

</details>

您可以按照其中一份指南编码，或创建自己的编码风格。

GitHub 上的一个开源项目可能遵循一系列规则，您与团队合作的另一个项目可能会遵循完全不同的规则。

[Prettier](https://flaviocopes.com/prettier/) 是一个强大的工具，可以强制执行代码格式化，因此您应该使用它。

- **缩进**：使用空格而不是制表符，使用 2 个空格缩进。
- **分号**：不要使用分号。
- **行长**：如果可能的话，尝试在 80 个字符处换行。
- **内联注释**：在代码中使用内联注释。 仅将块注释用于文档。
- **没有死代码**：不要留下旧代码注释，以防以后有用。只保留你现在需要的代码，版本控制/你的笔记应用就是为此而设的。
- **只有在有用的时候才进行注释**：不要添加对理解代码没有帮助的注释。如果代码是通过使用良好的变量和函数命名以及 JSDoc 函数注释，那么应该是不言而喻的，不需要添加注释。
- **变量声明**：始终声明变量，避免污染全局对象。 永远不要使用 `var` 。 默认为 `const`，只有在重新分配变量时才使用 `let`。
- **常量**：在 CAPS 中声明所有的常量。 使用 `_` 分隔 `VARIABLE_NAME` （变量名）中的单词。
- **函数**：因为 `this` 工作原理的关系，使用箭头函数，比如在对象方法或构造函数中。除非您有特定的理由使用常规函数。将它们声明为 `const`，并尽可能使用隐式返回。可以随意使用嵌套函数将助手函数隐藏到其他代码中。
  ```js
  const test = (a, b) => a + b
  const another = a => a + 2
  ```
- **命名**：函数命名，变量命名和方法命名始终以小写字母开头（除非您将它们标识为私有，后面会详细介绍），并且使用 camelCased(驼峰命名) 。 只有构造函数和类名才应该以大写开始。 如果您使用的框架需要特定约定，请相应地改变您的习惯。 文件名应全部为小写，单词用 `-` 分隔。
- **特定于语句的格式和规则**：

  - **if**：始终使用 {} 。

  ```js
  if (condition) {
    statements
  }
  if (condition) {
    statements
  } else {
    statements
  }
  if (condition) {
    statements
  } else if (condition) {
    statements
  } else {
    statements
  }
  ```

  - **for**：始终在 initialization（初始值）中初始化长度以缓存它，不要在条件中插入它。避免使用 for ，除非与 `.??hasOwnProperty()` 一起使用。喜欢：

  ```js
  for (initialization; condition; update) {
    statements
  }
  ```

  - **while**

  ```js
  while (condition) {
    statements
  }
  ```

  - **do**

  ```js
  do {
    statements
  } while (condition)
  ```

  - **switch**

  ```js
  switch (expression) {
    case expression:
      statements
    default:
      statements
  }
  ```

  - **try**

  ```js
  try {
    statements
  } catch (variable) {
    statements
  }
  try {
    statements
  } catch (variable) {
    statements
  } finally {
    statements
  }
  ```

- **空格**：明智地使用空格来提高可读性：
  在关键字之后 `(` 前加一个空格，在二元操作符前后（ `+`， `-` ，`/`，`*`，`&&` ..）加一个空格; 在 for 语句中每个 `;` 之后加一个空格， 在每 `,` 之后加一个空格。
- **另起新行**：另起新行分隔逻辑相关的代码块。
- **引号**：支持使用单引号 '而不是双引号 " 。双引号是 HTML 标准中的属性，因此使用单引号可以避免在处理 HTML 字符串时需要删除或者转义双引号的问题。在适当时使用模板字面量，而不是变量插值。
