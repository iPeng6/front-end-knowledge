# React Native With Typescript

<details>
<summary>参考 - 2019年06月15日</summary>

- [Using TypeScript with React Native](http://facebook.github.io/react-native/blog/2018/05/07/using-typescript-with-react-native)
- [Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
  </details>

1、 安装依赖生成配置

```bash
yarn add --dev typescript react-native-typescript-transformer @types/react @types/react-native
yarn tsc --init --pretty --jsx react
touch rn-cli.config.js
```

2、配置

`tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "commonjs",
    "lib": ["esnext"],
    "allowJs": true,
    "jsx": "react",
    "noEmit": true,
    "strict": true,
    "noImplicitAny": false,
    "baseUrl": "./",
    "paths": {
      "src/*": ["./src/*"]
    },
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "resolveJsonModule": true
  },
  "include": ["src*"]
}
```

`rn-cli.config.js`

```js
module.exports = {
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer')
  },
  getSourceExts() {
    return ['ts', 'tsx', 'js', 'jsx']
  }
}
```
