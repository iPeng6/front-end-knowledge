# GitHub Packages

参考：

- https://help.github.com/en/packages
- [Creating a personal access token for the command line](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)
- [Configuring npm for use with GitHub Packages](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages)

## 使用

### 1. 创建 token

github -> settings -> developer settings -> Personal access tokens -> Generate new token

### 2. 配置

```bash
$ npm login --registry=https://npm.pkg.github.com
> Username: USERNAME
> Password: TOKEN
> Email: PUBLIC-EMAIL-ADDRESS
```

会自动在全局 `~/.npmrc` 生成一个配置

```bash
//npm.pkg.github.com/:_authToken=20d843349550ea259xxxxxx
```

项目下增加 .npmrc 文件 配置 scope registry

```bash
@OWNER:registry=https://npm.pkg.github.com/OWNER
always-auth=true
```

package.json 中就可以安装使用私有包

```json
{
  "dependencies": {
    "@OWNER/comp-searchlist": "^1.1.4"
  }
}
```
