# package.json

## 作用

在你的包中创建 package.json 文件可以方便他人更好的管理安装，包发布必须包含 package.json 文件。

一个 package.json 文件:

- 列出项目依赖
- 指定版本使用[语义化版本控制](https://docs.npmjs.com/about-semantic-versioning)
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
npm init -y # 全部以yes默认答案
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
> npm set init.author.email "example-user@example.com"
> npm set init.author.name "example_user"
> npm set init.license "MIT"
```
