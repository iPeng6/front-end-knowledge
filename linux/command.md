# 命令

## cd

切换目录

> cd [dirName]

**实例**

```bash
cd / # 切换到根目录
cd ~ # 切换到用户主目录
cd .. # 切换到父级目录
```

## ls

列出当前目录下的文件及目录

> ls [-alrtAFR][dirname]

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

> mkdir [-p] dirName

**参数**

- -p 创建路径

**实例**

```bash
mkdir -p demo/test1
```

## rm

删除文件或目录

> rm [options] file...

**参数**

- -r 递归删除目录及子目录
- -f 强制删除
- -i 交互式删除，会逐一询问确认

**实例**

```bash
rm -r build
rm *
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
