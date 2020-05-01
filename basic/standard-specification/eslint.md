# ESLint

## vue 项目配置

工作目录下配置 .vscode/settings.json

```json
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

1. vscode 自带了 formatOnSave 功能，格式化规则有可能是用的 Vetur 或者 prettier 根据选择的默认格式化程序有关，这里禁用掉 formatOnSave 避免跟 eslint fix 冲突或者格式化两次造成闪烁的问题或者要保存两次的问题
2. eslint 的校验有时跟 项目工程 是耦合的，比如 eslint 错误导致 webpack devServer 服务不能启动，或者无法 git commit 或者 无法通过测试不能正确部署，所以 eslint autofix 一定是必要的，而 prettier 只是个格式化工具并不与工程藕合，所以我们格式化程序保留 eslint，在 eslint 下通过插件使用 prettier 规则

```js
// .eslintrc.js
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  globals: {
    __webpack_require__: true,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 120,
        tabWidth: 2,
      },
    ],
  },
}
```
