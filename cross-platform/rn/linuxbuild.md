# 安卓服务器打包

## 安装环境

### JDK

1. yum 安装 jdk

   `yum -y list java*` 查看可安装 java 版本

   安装 java-1.8.0-openjdk-devel.x86_64

   执行 `yum install -y java-1.8.0-openjdk-devel.x86_64`，安装目录为 `/usr/lib/jvm`

2. 官网下载安装

   [jdk-8u221-linux-x64.tar.gz](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

   获取到地址后，进入到 `/home/java` 目录下，输入 `wget + 地址`下载，重命名为 `jdk-8u221-linux-x64.tar.gz`

   解压 `tar zxvf jdk-8u221-linux-x64.tar.gz`, 如果提示没有`tar`命令，输入 `yum install -y tar` 先安装 `tar`

   建一个 link `ln -s /home/java/jdk1.8.0_131/bin/java /usr/bin/java`

3. 配置环境变量

```bash
vim /etc/profile

# 添加 JAVA_HOME
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk
# export JAVA_HOME=/home/java/jdk1.8.0_131
export JRE_HOME=$JAVA_HOME/jre
export PATH=$PATH:$JAVA_HOME/bin
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar

source /etc/profile
```

### Android SDK

只需下载 SDK 找到 Android Studio 下载页下的 Command line tools only 下的 [sdk-tools-linux-4333796.zip]https://developer.android.com/studio#downloads

获取下载地址，在服务器上 `wget + 地址` 下载，然后解压重命名为 `android_sdk`

```bash
# 如果没有 unzip 先安装下命令
yum install -y unzip zip

cd /home
wget <url>
unzip <package>
mv package android_sdk
```

配置环境变量

```bash
export ANDROID_HOME=/home/android_sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

使用 [sdkmanager](https://developer.android.com/studio/command-line/sdkmanager) 安装 build-tools、platform-tools、android-29

```bash
sdkmanager "build-tools;29.0.1" "platform-tools" "platforms;android-29"
```
