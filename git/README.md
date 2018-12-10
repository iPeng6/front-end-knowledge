# git

## ssh

使用 SSH 协议可以连接和校验远程服务器及服务。使用 SSH keys,你就可以免密连接 GitHub 等远程仓库

1. 生成 SSH key

   ```bash
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

   Enter file in which to save the key (/Users/lls/.ssh/id_rsa): [直接回车]
   # 直接回车 默认会在 ~/.ssh/下生成名为 id_rsa 和 id_rsa.pub 密钥对
   # 输入名称如 id_rsa.github, 则会生成 id_rsa.github 和 id_rsa.github.pub 密钥对

   Enter passphrase (empty for no passphrase): [输入密码 一般不用 直接回车]
   Enter same passphrase again: [直接回车]
   ```

   > 注意：mac 下如果 key 不是用的默认的 id_rsa 则还需要 ssh-add

   ```bash
   ssh-add -K ~/.ssh/id_rsa.github
   ```

   > 使用 macOS Sierra 10.12.2 以上版本 需要修改配置文件 `~/.ssh/config`\
   > AddKeysToAgent 自动加载到 ssh-agent，UseKeychain 使用 keychain 管理密码

   ```text
   Host github
       HostName github.com
       User ipeng6@qq.com
       AddKeysToAgent yes
       UseKeychain yes
       IdentityFile /Users/you/.ssh/id_rsa.github
   Host gitlab
       Hostname git.gitlab.com
       User yuliang.peng@company.com
       AddKeysToAgent yes
       UseKeychain yes
       IdentityFile /Users/you/.ssh/id_rsa
   ```

2. 拷贝.pub 公钥到剪贴板或手动拷贝

   ```bash
   pbcopy < ~/.ssh/id_rsa.pub
   ```

3. 添加到 git 仓库网站的个人配置里

   如 github：点击头像->Settings->SSH and GPG keys-> New SSH key 按钮，将内容粘贴在 key 输入框中添加

## 添加本地项目到远程仓库

1. 首先在远程新建一个空仓库得到新仓库的远程地址如`git@github.com:iPeng6/test_new_repo.git`
2. 在本地项目目录下执行命令

   ```bash
   git init
   git remote add origin git@github.com:iPeng6/test_new_repo.git

   echo '# test new repo' >> README.md # 新建一些文件或者本地自己新建，一个仓库通常需要 README, LICENSE, and .gitignore.文件

   git add .
   git commit -m 'first commit'
   git push --set-upstream origin master # 首次提交需要 set-upstream 一下 --set-upstream 缩写 -u
   ```
