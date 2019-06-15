# React Native With Typescript

<details>
<summary>参考 - 2019年06月15日</summary>

- [Using TypeScript with React Native](http://facebook.github.io/react-native/blog/2018/05/07/using-typescript-with-react-native)
- [Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
  </details>

1、 安装依赖生成配置

```bash
yarn add --dev typescript
yarn add --dev react-native-typescript-transformer
yarn add --dev @types/react @types/react-native
yarn tsc --init --pretty --jsx react
touch rn-cli.config.js
```

2、配置

`tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2015" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */,
    "module": "commonjs" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */,
    "lib": ["esnext"] /* Specify library files to be included in the compilation. */,
    "allowJs": true /* Allow javascript files to be compiled. */,
    "jsx": "react" /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */,
	  "noEmit": true /* Do not emit outputs. */,
    "strict": true /* Enable all strict type-checking options. */,
    "noImplicitAny": false /* Raise error on expressions and declarations with an implied 'any' type. */,
    "baseUrl": "./" /* Base directory to resolve non-absolute module names. */,
    "paths": {
      "src/*": ["./src/*"]
    } /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */,
    "allowSyntheticDefaultImports": true /* Allow default imports from modules with no default export. This does not affect code emit,
		 just typechecking. */,
    "esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for
  },
  "include": ["src/**/*"]
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
