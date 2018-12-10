# git

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
