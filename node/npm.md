# npm

## 发布一个 unscoped public packages

1. 首先[注册](https://www.npmjs.com/signup)个账号
2. 创建你的 package
   ```bash
   mkdir npm-demo && cd npm-demo
   npm init # 起个唯一的名字，其他默认
   touch index.js # 创建入口文件  编辑内容
   ```
   eg:
   ```js
   // index.js
   exports.say = function() {
     console.log('hello world');
   };
   ```
3. 登录 npm

   ```bash
   npm login
   Username:
   Password:
   Email:
   Logged in as xxx on https://registry.npmjs.org/.
   ```

   > 登录之后其实会在 `~/.npmrc` 文件里  生成一个 token，在你的 npm 网站上可以管理 token 的创建删除
   >
   > ````.npmrc
   > //registry.npmjs.org/:_authToken=6d352771-8504-44c5-bf6f-asdfasdfasdf```
   > ````

4. 发布
   ```bash
   npm publish --access public
   ```
5. 取消发布
   ```bash
   npm unpublish
   ```
