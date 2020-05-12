# Lint

<details>
<summary>引用参考 - 2020/05/12</summary>

- [前端代码规范最佳实践](https://mp.weixin.qq.com/s/o43f-0ti8c2pofX0TJ8jCw) _- 前端开发 2020/05/11_

</details>

代码规范我们一般配置了 eslint，如何把 Lint 融入工程体系里呢？

## 第一层约束: IDE

VSCode 它只需要安装一个插件：eslint 插件，便可以做到智能提示，再配置下 autofix，更是能在编码时实时杜绝错误

```json
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

这里配置了`"editor.formatOnSave": false`是为了避免默认的 prettier 格式化规则跟 eslint 冲突

另外，配合 eslint-loader，使用浏览器也可以做到实时提示，下面是一段 vue-cli 的配置

```js
api.chainWebpack((webpackConfig) => {
  const { lintOnSave } = options
  const allWarnings = lintOnSave === true || lintOnSave === 'warning'
  const allErrors = lintOnSave === 'error'

  webpackConfig.module
    .rule('eslint')
    .pre()
    .exclude.add(/node_modules/)
    .add(path.dirname(require.resolve('@vue/cli-service')))
    .end()
    .test(/\.(vue|(j|t)sx?)$/)
    .use('eslint-loader')
    .loader(require.resolve('eslint-loader'))
    .options({
      extensions,
      cache: true,
      cacheIdentifier,
      emitWarning: allWarnings,
      // only emit errors in production mode.
      emitError: allErrors,
      eslintPath: path.dirname(
        resolveModule('eslint/package.json', cwd) || resolveModule('eslint/package.json', __dirname),
      ),
      formatter: loadModule('eslint/lib/formatters/codeframe', cwd, true),
    })
})
```

## 第二层约束: Git Hooks

git 自身包含许多 hooks，在 commit，push 等 git 事件前后触发执行。与 pre-commit hook 结合可以帮助校验 Lint，如果没有通过代码规范就不允许提交。

[husky](https://github.com/typicode/husky) 是一个使 git hooks 变得更简单的工具，只需要配置几行 package.json 就可以愉快的开始工作。

```json
// package.json
{
  "scripts": {
    "lint": "eslint . --cache"
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm lint"
    }
  }
}
```

或者结合 [lint-staged](https://github.com/okonet/lint-staged)调用校验规则

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.js|{lib,setup,bin,hot,tooling,schemas}/**/*.js|test/*.js|{test,examples}/**/webpack.config.js}": [
      "eslint --cache"
    ],
    "*.{ts,json,yml,yaml,md}|examples/*.md": ["prettier --check"],
    "*.md|{.github,benchmark,bin,examples,hot,lib,schemas,setup,tooling}/**/*.{md,yml,yaml,js,json}": ["cspell"]
  }
}
```

当然客户端校验是不可信的，通过命令我们可绕过 git hooks

```bash
git commit -n
# 或者
git commmit --no-verify
```

## 第三层约束: CI

git hooks 可以绕过，但 CI(持续集成) 是绝对绕不过的，因为它在服务端校验。使用 gitlab CI 做持续集成，配置文件 .gitlab-ci.yaml 如下所示

```yaml
lint:
  stage: lint
  only:
    - /^feature\/.*$/
  script:
    - npm lint
```
