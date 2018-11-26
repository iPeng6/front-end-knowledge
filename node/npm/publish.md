# 发布

## 发布一个公有包

1. 首先[注册](https://www.npmjs.com/signup)个账号
2. 创建你的 package

   - unscoped
     ```bash
     mkdir npm-demo && cd npm-demo
     npm init # 起个唯一的名字，其他默认
     ```
   - scoped
     ```bash
     mkdir npm-demo && cd npm-demo
     npm init --scope=@my-username
     ```

   创建一个入口文件 index.js，eg:

   ```js
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

   > 登录之后会在 `~/.npmrc` 文件里生成一个 token，在你的 npm 网站上可以管理 token 的创建删除
   >
   > ```.npmrc
   > //registry.npmjs.org/:_authToken=6d352771-8504-44c5-bf6f-asdfasdfasdf
   > ```
   >
   > 退出登录：npm logout

4. 发布

   ```bash
   npm publish --access public
   ```

5. 取消发布

   ```bash
   npm unpublish --force
   ```
