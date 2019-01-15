# Git

- [代码合并：Merge、Rebase 的选择](https://github.com/geeeeeeeeek/git-recipes/wiki/5.1-%E4%BB%A3%E7%A0%81%E5%90%88%E5%B9%B6%EF%BC%9AMerge%E3%80%81Rebase-%E7%9A%84%E9%80%89%E6%8B%A9)

- [git book](https://git-scm.com/book/en/v2) [[中文]](https://git-scm.com/book/zh/v2)

三种状态

- **已修改（modified）** 表示修改了文件，但还没保存到数据库中
- **已暂存（staged）** 表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中。
- **已提交（committed）** 表示数据已经安全的保存在本地数据库中

三种存储区

- **Git 仓库** Git 用来保存项目的元数据和对象数据库的地方，这是 Git 中最重要的部分，从其它计算机克隆仓库时，拷贝的就是这里的数据。
- **工作目录** 是对项目的某个版本独立提取出来的内容。 这些从 Git 仓库的压缩数据库中提取出来的文件，放在磁盘上供你使用或修改。
- **暂存区域** 是一个文件，保存了下次将提交的文件列表信息，一般在 Git 仓库目录中

基本的 Git 工作流程如下：

1. 在工作目录中修改文件。
2. 暂存文件，将文件的快照放入暂存区域。
3. 提交更新，找到暂存区域的文件，将快照永久性存储到 Git 仓库目录

![](https://git-scm.com/book/en/v2/images/areas.png)

配置

- git config 会配置 `.git/config` 文件，当前使用仓库的 Git 目录中的 config 文件：针对该仓库。
- git config --global 会配置 `~/.gitconfig` 或 `~/.config/git/config` 文件：只针对当前用户。
- git config --system 会配置 `/etc/gitconfig` 文件中的变量: 包含系统上每一个用户及他们仓库的通用配置。

配置用户信息

```bash
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com

git config --global pull.rebase true
```

检查配置项

```
git config --list
git config user.name # 查看某一项的值
```
