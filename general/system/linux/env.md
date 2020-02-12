# 环境变量

## Linux 环境变量分类

1. 系统环境变量：系统环境变量对该系统中所有用户都有效。

   eg: 编辑 `/etc/profile`

   ```bash
   vim /etc/profile
   export CLASSPATH=./JAVA_HOME/lib;$JAVA_HOME/jre/lib
   # 立即生效
   source /etc/profile
   ```

2. 用户环境变量：只对特定的用户有效。

   eg: 编辑 `~/.bash_profile`

   ```bash
   vim ~/.bash_profile
   export CLASSPATH=./JAVA_HOME/lib;$JAVA_HOME/jre/lib
   # 立即生效
   source /etc/profile
   ```

3. 临时环境变量：使用 `export` 命令，在当前终端下声明环境变量，关闭终端失效。

## Linux环境变量使用

### 一、Linux中常见的环境变量有：

- PATH：指定命令的搜索路径
- HOME：指定用户的主工作目录（即用户登陆到Linux系统中时，默认的目录）。
- HISTSIZE：指保存历史命令记录的条数。
- LOGNAME：指当前用户的登录名。
- HOSTNAME：指主机的名称，许多应用程序如果要用到主机名的话，通常是从这个环境变量中来取得的
- SHELL：指当前用户用的是哪种Shell。
- LANG/LANGUGE：和语言相关的环境变量，使用多种语言的用户可以修改此环境变量。
- MAIL：指当前用户的邮件存放目录。

### 二、修改和查看环境变量

- echo 显示某个环境变量值 echo $PATH
- export 设置一个新的环境变量 export HELLO="hello" (可以无引号)
- env 显示所有环境变量
- set 显示本地定义的shell变量
- unset 清除环境变量 unset HELLO
- readonly 设置只读环境变量 readonly HELLO