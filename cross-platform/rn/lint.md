# 代码规范  ESLint & Prettier

## 安装

rn > 0.60 版 已经集成了 eslint 且 @react-native-community/eslint-config 也集成了 prettier, typescript

如果是老项目需要手动安装下基础库
```
yarn add --dev eslint
yarn add --dev @react-native-community/eslint-config
```

## 配置 .eslintrc.js

js vs json，可以方便写注释

```js
module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    semi: ['error', 'never'], // react系默认需要添加尾部分号
    quotes:['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
    'max-len': ['error', { code: 140 }],
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        trailingComma: 'all',
        jsxBracketSameLine: true, // jsx 头标签右 > 括号不折行
        printWidth: 140,
      },
    ],
  },
}
```

## 配置 autofix

### vscode

配置 .vscode/settings.json

```json
{
  "files.trimTrailingWhitespace": true,
	"files.insertFinalNewline": true,
	"files.trimFinalNewlines": true,
  "editor.formatOnSave": false, // 避免与 eslint 重复保存（这个默认会使用 Prettier 格式化代码）
	"eslint.autoFixOnSave": true,
	"eslint.validate": [
		"javascript",
		"javascriptreact",
		{"language":  "typescript",  "autoFix":  true  },
		{"language":  "typescriptreact",  "autoFix":  true  }
	],
}
```
