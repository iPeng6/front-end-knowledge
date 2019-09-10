# React Native

<details>
<summary>参考 - 2019年05月21日</summary>

- [打包 APK](https://reactnative.cn/docs/signed-apk-android/)
- [签署您的应用](https://developer.android.com/studio/publish/app-signing)

</details>

## 安装环境

1、 node

推荐 [nvm](https://github.com/nvm-sh/nvm) 管理和切换 node 版本

```bash
# install & update nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

# 配置 ～/.zshrc
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# 立即生效
source ~/.zshrc

# usage
nvm install node # install latest version
nvm install 6.14.4 # or 10.10.0, 8.9.1, etc
nvm ls-remote # list available versions using ls-remote
nvm ls # list installed versions
nvm use <version> # 切换版本

# npm 加速 使用淘宝镜像
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global
```

推荐 [yarn](https://yarnpkg.com/zh-Hans/) 作为包管理工具

why yarn ?

- 极其快速(缓存+并行)、特别安全(文件校验)、超级可靠(lockfile)
- issue: [react-native-cli is not compatible with npm@5](https://github.com/facebook/react-native/issues/14767)

```bash
# 如果您使用 nvm 或类似的东西，您应该排除安装 Node.js 以便使用 nvm 的 Node.js 版本。
brew install yarn --without-node

# usage
yarn # 安装全部依赖 or yarn install
yarn add <package>
yarn add <package> --dev
yarn remove <package>
yarn upgrade <package>

yarn [run] <script> # run 可省略

yarn global add <package>
```

2、 watchman

```bash
brew install watchman # 热更新 文件监听
```

3、 命令行工具

```bash
yarn global add react-native-cli
or
npm install -g react-native-cli
```

## 创建 RN 项目

```bash
mkdir <dir> && cd <dir>
react-native init AwesomeProject
```

## 开发调试

package.json 中先添加几个常用脚本

```js
"scripts": {
	"start": "react-native start", // 启动 Metro JavaScript bundler server
	"android": "react-native run-android", // 启动安卓模拟器或设备
	"ios": "react-native run-ios", // 启动iOS模拟器
	"bundle:android": "react-native bundle --entry-file index.js --platform android --dev false --bundle-output ./android/app/src/main/assets/index.android.bundle --assets-dest ./android/app/src/main/res/", // 打包 bundle 离线包
	"bundle:ios": "react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ./ios/bundle/main.jsbundle --assets-dest ./ios/bundle", // 打包 bundle 离线包
	"build:android": "react-native run-android --variant=release", // 生成 apk release包
},
```

1. yarn start // 启动服务
2. yarn bundle:{android,ios} // 打包 bundle 如果目录不存在手动建一个
3. yarn {android,ios} // 启动模拟器或设备运行 app
4. yarn build:android // 打包 apk

> - 注意`--variant=release`参数只能在完成了下面的签名配置之后才可以使用。因为 release 相当于一个线上版本需要所有签名依赖打包到 apk 中才可离线运行
> - 如果安卓手机连不上电脑<br>
>   adb devices // 查看手机是否连上<br/>
>   adb reverse tcp:8081 tcp:8081 // android 端口映射

调试菜单

- Android 快捷键 cmd + M
- iOS 快捷键 cmd + D
- 真机 摇一摇

调试工具

- [debugging](https://reactnative.cn/docs/debugging/)
- [react-native-debugger](https://github.com/jhen0409/react-native-debugger)

## 打包

### Android 打包 apk

1、 生成离线 bundle 包 yarn bundle:android

2、 生成签名文件

```bash
# ./android/app
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

3、 修改 ./android/gradle.properties

```
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

4、 修改 ./android/app/build.gradle

```gradle
android {
	...
	defaultConfig { ... }
	signingConfigs {
			release {
				storeFile file(MYAPP_RELEASE_STORE_FILE)
				storePassword MYAPP_RELEASE_STORE_PASSWORD
				keyAlias MYAPP_RELEASE_KEY_ALIAS
				keyPassword MYAPP_RELEASE_KEY_PASSWORD
			}
	}
	buildTypes {
			release {
					...
					signingConfig signingConfigs.release
			}
	}
}
```

5、 生成签名 apk

```bash
# 如果 package.json里配置了 build:android
# 生成路径 android/app/build/outputs/apk/release/app-release.apk
yarn build:android
```

6、 安装到手机

前提确保连上手机，开启 USB 调试模式，（部分手机需要连续点击 关于手机->版本号 才出开发人员选项->USB 调试模式）

```bash
adb devices # 确保手机连上电脑
adb install <your path>/android/app/build/outputs/apk/release/app-release.apk
```

### iOS archive

先选择一个 iOS 设备，否则 archive 菜单灰色不可点

xcode -> product -> archive -> distribute
