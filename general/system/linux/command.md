# 命令

<details>
<summary>引用参考 - 2019年6月21日</summary>

- [the-art-of-command-line](https://github.com/jlevy/the-art-of-command-line)
- [学会使用命令帮助](https://linuxtools-rst.readthedocs.io/zh_CN/latest/base/01_use_man.html)

</details>

## cd

切换目录

> cd <dir>

**实例**

```bash
cd / # 切换到根目录
cd ~ # 切换到用户主目录
cd .. # 切换到父级目录
```

## ls

列出当前目录下的文件及目录

> ls [-alrtAFR]<dir>

**参数**

- -a 显示所有文件及目录 (以"."开头的视为隐藏文件不会列出)
- -A 同 -a ，但不列出 "." (当前目录) 及 ".." (父目录)
- -l 列出详情
- -F 在列出的文件名称后加一符号；例如可执行档则加 "\*", 目录则加 "/"
- -R 列出所有子目录
- -r 倒序
- -t 按修改时间排序
- -S 按文件大小排序

**实例**

列出当前目录下所有名称以 s 开头的文件，按创建时间倒序:

```bash
ls -ltr s*
```

## pwd

查看当前目录

> pwd

## mkdir

用来创建目录

> mkdir [-p] <dir>

**参数**

- -p 创建路径

**实例**

```bash
mkdir -p demo/test1
```

## rm

删除文件或目录

> rm [options] <file>

**参数**

- -r 递归删除目录及子目录
- -f 强制删除
- -i 交互式删除，会逐一询问确认

**实例**

```bash
rm -r build
rm *
```

## cp

> cp [options] <source> <dest>

**参数**

- -a：此选项通常在复制目录时使用，它保留链接、文件属性，并复制目录下的所有内容。其作用等于 dpR 参数组合。
- -b：覆盖已存在的文件目标前将目标文件备份；
- -d：复制时保留链接。这里所说的链接相当于 Windows 系统中的快捷方式。
- -f：覆盖已经存在的目标文件而不给出提示。
- -i：与-f 选项相反，在覆盖目标文件之前给出提示，要求用户确认是否覆盖，回答"y"时目标文件将被覆盖。
- -p：除复制文件的内容外，还把修改时间和访问权限也复制到新文件中。
- -r/R：若给出的源文件是一个目录文件，此时将复制该目录下所有的子目录和文件。
- -l：不复制文件，只是生成链接文件。

**实例**

```bash
cp -a demo1 demo2
```

## pbcopy

这是 MAC 上的命令，[如何在 Linux 上使用 pbcopy 和 pbpaste 命令](https://linux.cn/article-9917-1.html)

复制到剪切板

eg

```bash
pbcopy < ~/.ssh/id_rsa.pub
```

## scp

scp 是 secure copy 的缩写, scp 是 linux 系统下基于 ssh 登陆进行安全的远程文件拷贝命令

> scp [options] <source> <target>

**参数**

- -1： 强制 scp 命令使用协议 ssh1
- -2： 强制 scp 命令使用协议 ssh2
- -4： 强制 scp 命令只使用 IPv4 寻址
- -6： 强制 scp 命令只使用 IPv6 寻址
- -B： 使用批处理模式（传输过程中不询问传输口令或短语）
- -C： 允许压缩。（将-C 标志传递给 ssh，从而打开压缩功能）
- -p：保留原文件的修改时间，访问时间和访问权限。
- -q： 不显示传输进度条。
- -r： 递归复制整个目录。
- -v：详细方式显示输出。scp 和 ssh(1)会显示出整个过程的调试信息。这些信息用于调试连接，验证和配置问题。
- -c cipher： 以 cipher 将数据传输进行加密，这个选项将直接传递给 ssh。
- -F ssh_config： 指定一个替代的 ssh 配置文件，此参数直接传递给 ssh。
- -i identity_file： 从指定文件中读取传输时使用的密钥文件，此参数直接传递给 ssh。
- -l limit： 限定用户所能使用的带宽，以 Kbit/s 为单位。
- -o ssh_option： 如果习惯于使用 ssh_config(5)中的参数传递方式，
- -P port：注意是大写的 P, port 是指定数据传输用到的端口号
- -S program： 指定加密传输时所使用的程序。此程序必须能够理解 ssh(1)的选项。

**实例**

```bash
scp local_file remote_username@remote_ip:remote_folder
或者
scp local_file remote_username@remote_ip:remote_file
或者
scp local_file remote_ip:remote_folder
或者
scp local_file remote_ip:remote_file
```

## uname

查看系统相关信息（内核版本号、硬件架构、主机名称和操作系统类型等）

> uname [-amnrsv]

**参数**

- -a 或--all 　显示全部的信息。
- -m 或--machine 　显示电脑类型。
- -n 或--nodename 　显示在网络上的主机名称。
- -r 或--release 　显示操作系统的发行编号。
- -s 或--sysname 　显示操作系统名称。
- -v 　显示操作系统的版本。

**实例**

```bash
uname -a
#> Darwin yuliang.peng 16.7.0 Darwin Kernel Version 16.7.0: Wed Oct 10 20:06:00 PDT 2018; root:xnu-3789.73.24~1/RELEASE_X86_64 x86_64
```

---

## tree

递归的显示目录结构，mac 默认没有原生支持

**安装**

```bash
brew install tree
```

> tree [options]

**参数**

- -L level 显示层级数
- -I pattern 忽略匹配模式的文件

**实例**

```bash
tree -L 2 -I node_modules
.
├── dist
│   ├── 626a9ece63e3666e79908d840cd2b4b4.jpg
│   ├── index.html
│   └── main.js
├── package-lock.json
├── package.json
├── src
│   ├── img.jpg
│   ├── index.js
│   └── style.css
└── webpack.config.js

2 directories, 9 files
```

## history

查看命令行输入历史

eg:

```bash
history
history | tail -10
history | grep 'search'
```

## ln

为某一个文件在另外一个位置建立一个同步的链接，引用同一份而不需要复制一份减少磁盘占用，链接又可分为两种 : 硬链接(hard link)与软链接(symbolic link)

软链接：

1. 软链接，以路径的形式存在。类似于 Windows 操作系统中的快捷方式
2. 软链接可以 跨文件系统 ，硬链接不可以
3. 软链接可以对一个不存在的文件名进行链接
4. 软链接可以对目录进行链接

硬链接：

1. 硬链接，以文件副本的形式存在。但不占用实际空间。
2. 不允许给目录创建硬链接
3. 硬链接只有在同一个文件系统中才能创建

**参数**

- -b 删除，覆盖以前建立的链接
- -d 允许超级用户制作目录的硬链接
- -f 强制执行
- -i 交互模式，文件存在则提示用户是否覆盖
- -n 把符号链接视为一般目录
- -s 软链接(符号链接)
- -v 显示详细的处理过程

**实例**

```bash
ln -s file1 link1
rm link1 # 可以直接删除link 而原文件还在
```

## cat

[cat](https://www.runoob.com/linux/linux-comm-cat.html)（英文全拼：concatenate）命令用于连接文件并打印到标准输出设备上。

```bash
# 显示文件内容
cat textfile1
```

## grep

[grep](https://www.runoob.com/linux/linux-comm-grep.html) 指令用于查找内容包含指定的范本样式的文件，如果发现某文件的内容符合所指定的范本样式，预设 grep 指令会把含有范本样式的那一列显示出来。若不指定任何文件名称，或是所给予的文件名为`-`，则 grep 指令会从标准输入设备读取数据。

```bash
grep 'search content' access.log | grep '2019:16:55'
history | grep 'search content'
```

## tail

[tail](https://www.runoob.com/linux/linux-comm-tail.html) 命令可用于查看文件的内容，有一个常用的参数 -f 常用于查阅正在改变的日志文件。

tail -f filename 会把 filename 文件里的最尾部的内容显示在屏幕上，并且不断刷新，只要 filename 更新就可以看到最新的文件内容。(自动滚屏显示最新内容)

> tail [参数] [文件]

```bash
tail -f notes.log
```

## ps

Linux [ps](http://www.runoob.com/linux/linux-comm-ps.html) （英文全拼：process status）命令用于显示当前进程的状态，类似于 windows 的任务管理器。

```bash
#显示所有进程信息，连同命令行
ps -ef | grep searchkeywords
```
