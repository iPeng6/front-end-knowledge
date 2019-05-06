# npm

## npm 是什么

npm 是全世界最大的软件注册中心，是 node 默认的包管理工具，世界各地的开源开发者使用 npm 分享借鉴代码。

npm 包括三个部分

1. 网站 查找发布管理包
2. CLI 命令行工具
3. registry 存储软件包数据及元信息

## npm 安装更新

安装 node 会附带 npm, node 建议通过版本管理工具安装如 nvm

更新

```bash
npm install npm@latest -g
```

## 配置 registry

### 将公司的 npm 设置成默认的 Enterprise registry

```bash
npm config set registry https://registry.your-registry.npme.io/
```

### 使用 npmrc 管理多个 registry

- 安装
  ```bash
  npm i npmrc -g
  ```
- 创建 npm 企业配置文件

  ```bash
  npmrc -c work
  npm config set registry https://registry.your-company-registry.npme.io/
  ```

  这个会在用户根目录下新建.npmrcs 文件夹里面会有生成一个 work 文件，然后将用户目录下的.npmrc link 到这个文件

- 创建公用的 npm registry

  ```bash
  npmrc -c name-of-profile
  npm config set registry https://registry.npmjs.com/
  ```

  这个会在 npmrcs 文件夹里面会有生成一个 name-of-profile 文件，然后将用户目录下的.npmrc link 到这个文件

- 切换 registry

  ```bash
  npmrc profile-name
  ```

  本质是将~/.npmrc link 到 ~/.npmrcs/profile-name

- ~/.npmrc 文件类似这样

  ```bash
  registry=https://registry.npm.taobao.org/
  @coms:registry=http://reg-npmjs.staging.com/
  @comw:registry=https://registry-npm.company.work
  ```

### 使用淘宝镜像

```bash

# 全局配置

npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global

# 使用 cnpm

npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install [name]

```
