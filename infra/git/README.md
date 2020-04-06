# Git

<details>
<summary>参考 - 2019年09月14日</summary>

- [代码合并：Merge、Rebase 的选择](https://github.com/geeeeeeeeek/git-recipes/wiki/5.1-%E4%BB%A3%E7%A0%81%E5%90%88%E5%B9%B6%EF%BC%9AMerge%E3%80%81Rebase-%E7%9A%84%E9%80%89%E6%8B%A9)
- [git book](https://git-scm.com/book/en/v2) [[中文]](https://git-scm.com/book/zh/v2)
- [learngitbranching](https://learngitbranching.js.org/)

</details>

## 4 个区

- 工作区( Working Area )
- 暂存区( Stage )
- 本地仓库( Local Repository )
- 远程仓库( Remote Repository )

## 5 种状态

以上 4 个区，进入每一个区成功之后会产生一个状态，再加上最初始的一个状态，一共是 5 种状态。以下我们把这 5 种状态分别命名为：

- 未修改( Origin )
- 已修改( Modified )
- 已暂存( Staged )
- 已提交( Committed )
- 已推送( Pushed )

## 基本的 Git 工作流程如下：

1. 在工作目录中修改文件。
2. 暂存文件，将文件的快照放入暂存区域。
3. 提交更新，找到暂存区域的文件，将快照永久性存储到 Git 仓库目录

![](https://git-scm.com/book/en/v2/images/areas.png)

```bash
git add .   # 把所有文件放入 暂存区；

git commit -m "comment"  # 把所有文件从 暂存区 提交进 本地仓库；

git push # 把所有文件从 本地仓库 推送进 远程仓库。
```

## 配置

- git config 会配置 `.git/config` 文件，当前使用仓库的 Git 目录中的 config 文件：针对该仓库。
- git config --global 会配置 `~/.gitconfig` 或 `~/.config/git/config` 文件：只针对当前用户。
- git config --system 会配置 `/etc/gitconfig` 文件中的变量: 包含系统上每一个用户及他们仓库的通用配置。

## 配置用户信息

```bash
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com

git config --global pull.rebase true
```

## 检查配置项

```bash
git config --list
git config user.name # 查看某一项的值
```

## 查看撤销修改

```bash
git diff # 已修改，未暂存
git diff --cached # 已暂存，未提交
git diff master origin/master # 已提交，未推送

# 撤销
# 已修改，未暂存
git checkout .
# 或者
git reset --hard

# 已暂存，未提交
git reset # 先撤掉add状态
git checkout .
# 或者
git reset --hard

# 已提交，未推送
git reset --hard origin/master

# 已推送
git reset --hard HEAD^
git push -f # 慎重！

```
