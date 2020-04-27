# 安卓 linux 服务器打包

<details>
<summary>引用参考 - 2019年09年15日</summary>

- [Linux 服务器搭建 Jenkins 自动化打包](https://fenglincanyi.github.io/2018/02/28/Linux服务器搭建Jenkins自动化打包/)

</details>

## 安装环境

我们需要 `解压缩工具` `git` `java jdk` `android sdk` `nvm node yarn` `react-native-cli` `jenkins`

### 基础工具 tar unzip git

```bash
# 压缩解压缩工具
yum install -y tar
yum install -y zip unzip

yum install -y git
```

### JDK

1. yum 安装 jdk

```bash
#查看可安装 java 版本
yum -y list java*

# 安装 java-1.8.0-openjdk-devel.x86_64
yum install -y java-1.8.0-openjdk-devel.x86_64 # 安装目录为 `/usr/lib/jvm`
```

2. 或者官网下载安装

   [jdk-8u221-linux-x64.tar.gz](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

   获取到地址后，进入到 `/home/java` 目录下，输入 `wget + 地址`下载，重命名为 `jdk-8u221-linux-x64.tar.gz`

   解压 `tar zxvf jdk-8u221-linux-x64.tar.gz`

   建一个 symbolic link 软链接 `ln -s /home/java/jdk1.8.0_221/bin/java /usr/bin/java`

3. 配置环境变量

```bash
vim /etc/profile

# 添加 JAVA_HOME
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk
# export JAVA_HOME=/home/java/jdk1.8.0_221
export JRE_HOME=$JAVA_HOME/jre
export PATH=$PATH:$JAVA_HOME/bin
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar

source /etc/profile
```

### Android SDK

只需下载 SDK 找到 Android Studio 下载页下的 Command line tools only 下的 [sdk-tools-linux-4333796.zip](https://developer.android.com/studio#downloads)

获取下载地址，在服务器上 `wget + 地址` 下载，然后解压重命名为 `android_sdk`

```bash
cd /home
wget <url>
unzip <package>
mv <package> android_sdk
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
# 查看可安装包
sdkmanager --list
sdkmanager "build-tools;29.0.1" "platform-tools" "platforms;android-29"
```

### gradle

找到最新版 https://gradle.org/releases， Download complete

根据 Gradle 官方推荐，我们将安装包的内容解压至`/opt/gradle`路径。

```bash
mkdir /opt/gradle
unzip -d /opt/gradle gradle-5.6.2-all.zip
```

配置环境变量

```bash
# gradle
export GRADLE_HOME=/opt/gradle/gradle-5.6.2
export PATH=$PATH:$GRADLE_HOME/bin
```

### nvm node yarn cli

```bash
# nvm install
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

nvm ls
nvm install --lts
nvm use <version>
node -v

# 全局安装 yarn， 当 nvm 切换 node 时也不影响
curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
sudo yum install yarn

npm i -g react-native-cli
```

## 安装配置 jenkins

### yum 安装 jenkins

yum 的 repos 中默认是没有 Jenkins 的，需要先将 Jenkins 存储库添加到 yum repos

```bash
wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key

yum install jenkins
```

Jenkins 安装好之后，需要修改一下默认配置。默认情况是 Jenkins 是使用 Jenkins 用户启动的，但这个用户目前系统并没有赋予权限，这里我们将启动用户修改为 root；另外 Jenkins 默认端口是 8080，这个跟 tomcat 的默认端口冲突，我们也修改一下默认端口。

```bash
vim /etc/sysconfig/jenkins

JENKINS_USER="root"
JENKINS_PORT="8090"
```

启动 jenkins

```bash
service jenkins start # stop restart
```

浏览器 [ip|域名]+端口 打开 jenkins（阿里云服务器需要设置端口策略才能访问自定义端口），接下来按照步骤 登录、设置密码、安装插件

### 配置

Manage Jenkins -> Global Tool Configuration 系统管理 -> 全局工具配置

![](img/jenkins_jdk.jpg ':size=600xauto')
![](img/jenkins_git_gradle.jpg ':size=600xauto')

设置 react-native package.json 打包脚本

```json
{
  ...
  "scripts": {
    ...
    "bundle:android": "react-native bundle --entry-file index.js --platform android --dev false --bundle-output ./android/app/src/main/assets/index.android.bundle",
    "build:android": "yarn bundle:android && cd android && ./gradlew clean --stacktrace && ./gradlew assembleRelease -x bundleReleaseJsAndAssets --stacktrace"
  },
  ...
}
```

!> 由于安装过程中 bundleReleaseJsAndAssets 这个任务存在问题，所以选择先自行打 bundle，然后 -x 排除掉此任务, 参考[issue](https://stackoverflow.com/questions/49513047/react-native-assemblerelease-fails-for-task-appbundlereleasejsandassets)

### 创建任务

新建一个自由风格的任务，配置

![](img/jenkins_task_git.jpg ':size=600xauto')
![](img/jenkins_task_build.jpg ':size=600xauto')
![](img/jenkins_task_after.jpg ':size=600xauto')

不记得路径 可以通过 `which` 查看

```bash
which java
which git
which gradle
```

## 遇到的一些问题

1. 开始构建时发现内存泄漏问题，将服务器内存从 1G 升级到 2G 解决
2. source /etc/profile 也是必要的，否则缺环境变量
3. 有些依赖 build-tools;23.0.1 android-23 的库，也要通过 sdkmanager 都安装上
4. 由于版本问题有的库不得不将 build.gradle `compileSdkVersion` `buildToolsVersion` 升级至 28，但是修改的是 node_moudles 下的代码，这里的方案是 fork 出来
   然后 package.json 修改 dependencies 依赖为 fork 库 `"react-native-orientation": "git://github.com/iPeng6/react-native-orientation.git"`
