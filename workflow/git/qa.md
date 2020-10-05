# 常见问题

## 如何添加本地项目到远程仓库？

1. 首先在远程新建一个空仓库得到新仓库的远程地址如`git@github.com:iPeng6/test_new_repo.git`
2. 在本地项目目录下执行命令

   ```bash
   git init # 如果还不是git项目需要init初始化，否则忽略这一步
   git remote add origin git@github.com:iPeng6/test_new_repo.git

   echo '# test new repo' >> README.md # 新建一些文件或者本地自己新建，一个仓库通常需要 README, LICENSE, .gitignore 文件

   git add .
   git commit -m 'first commit'
   git push --set-upstream origin master # 首次提交需要 set-upstream 一下 --set-upstream 缩写 -u
   ```

## 如何使提交到 gitlab 与 github 上的 commit author 是不同的?

- [Can I specify multiple users for myself in .gitconfig?](https://stackoverflow.com/questions/4220416/can-i-specify-multiple-users-for-myself-in-gitconfig/43654115#43654115)

## 改提交人信息

<details>
<summary>引用参考 - 2019年04月20日</summary>

- [Changing author info](https://help.github.com/en/articles/changing-author-info)

</details>

### 修改一条

```bash
git commit --amend --author='ipeng6<ipeng6@qq.com>'
```

### 批量

复制脚本控制台里粘贴回车，其中`OLD_EMAIL`为需要替换的旧邮箱， `CORRECT_NAME\CORRECT_EMAIL`为新的用户名邮箱

```bash
git filter-branch --env-filter '
OLD_EMAIL="yuliang.peng@liulishuo.com"
CORRECT_NAME="ipeng6"
CORRECT_EMAIL="ipeng6@qq.com"
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```

## 合并两个本地仓库并保留各自的提交历史

https://blog.csdn.net/gouboft/article/details/8450696

## git 解决远程仓库文件大小写问题

<details>
<summary>引用参考 - 2020年05月12日</summary>

- [git 解决远程仓库文件大小写问题](https://www.jianshu.com/p/420d38913578) _- 灰鸽 1 号 2017.07.25_
</details>

1. 设置本地 git 环境识别大小写

```bash
git config core.ignorecase false
```

2. 修改你需要重命名大写小的文件
3. 删除暂存区不需要的文件

```bash
# 删除Header文件夹下的所有文件
git rm --cached src/components/Header -r
```

4. 同步提交到远程仓库

```bash
git add .
git commit -m 'rename'
git push origin master
```
