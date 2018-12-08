# package.json

## 作用

在你的包中创建 package.json 文件可以方便他人更好的管理安装你的包，包发布必须包含 package.json 文件。

一个 package.json 文件:

- 列出项目依赖
- 指定版本 使用[语义化版本控制](https://docs.npmjs.com/about-semantic-versioning)
- 使得可重复构建，更易分享给其他开发者

> note: 为了让其他开发者更容易找到你的包，建议在 package.json 里写上自定义的 description 配置

## 字段

**必填项 name 和 version**

`name` 字段包含了你的包名，必须小写可以有连字符或者下划线
`version` 字段形如 x.x.x，必须遵循[语义化版本控制](https://docs.npmjs.com/about-semantic-versioning)规范

**Author 字段**

格式：`Your Name <email@example.com> (http://example.com)`

## 创建

```bash
npm init # 然后回答问题
npm init -y # 全部以yes默认答案,创建默认的package.json文件
```

```json
{
  "name": "my_package",
  "description": "",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/ashleygwilliams/my_package.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/ashleygwilliams/my_package/issues"
  },
  "homepage": "https://github.com/ashleygwilliams/my_package"
}
```

## 为 init 命令设置默认项

```bash
npm set init.author.email "example-user@example.com"
npm set init.author.name "example_user"
npm set init.license "MIT"
```

## 关于语义化版本控制

版本号建议从 1.0.0 开始，分为  主版本号 Major，次版本号 Minor， 补丁号 Patch，版本号升级按以下规则增长：

| Code status            | Stage         | Rule                      | Example version |
| ---------------------- | ------------- | ------------------------- | --------------- |
| 首次发版               | 新产品       | 从1.0.0开始               | 1.0.0           |
| 修复bug 向后兼容       | Patch release | 增加第三个数字            | 1.0.1           |
| 新特性 向后兼容        | Minor release | 增加第二数字第三个置0     | 1.1.0           |
| 破坏性变更 不向后兼容 | Major release | 增加第一个数字最后两位置0 | 2.0.0           |

### 指定更新类型

你可以在package.json文件里为依赖指定可接受的更新类型

- Patch releases: 1.0 or 1.0.x or ~1.0.4
- Minor releases: 1 or 1.x or ^1.0.4
- Major releases: * or x

这里我们可以看到 `~` 和 `^`的区别：
- ~ 匹配最新的 Patch release 最后一个数字
- ^ 匹配最新的 Minor release 中间那个数字
