# 代码规范 ESLint & Prettier

## 安装

rn >= 0.60 版 已经集成了 eslint 且 @react-native-community/eslint-config 也集成了 prettier, typescript

如果是老项目需要手动安装下基础库

```
yarn add --dev eslint
yarn add --dev @react-native-community/eslint-config
```

## 配置 .eslintrc.js

js vs json: js 可以方便写注释

```js
module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    semi: ['error', 'never'], // react社区 默认喜欢添加尾部分号
    quotes: ['error', 'single'],
    'comma-dangle': 'off', // 避免与 prettier 同时加了两个逗号
    'max-len': ['error', { code: 140 }],
    'keyword-spacing': 'off', // 避免与 prettier 同时加了两个空格
    'space-infix-ops': 'off', // 操作符 避免与 prettier 同时加了两个空格
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true, // prettier 默认是双引号
        trailingComma: 'all',
        jsxBracketSameLine: true, // jsx 头标签右 > 括号不折行
        printWidth: 140
      }
    ]
  }
}
```

## 配置 autofix on save

### vscode

工作区配置 .vscode/settings.json

```json
{
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "files.trimFinalNewlines": true,
  "editor.formatOnSave": false, // 避免与 eslint 重复保存（这个默认会使用 prettier 格式化代码）
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    { "language": "typescript", "autoFix": true },
    { "language": "typescriptreact", "autoFix": true }
  ]
}
```
