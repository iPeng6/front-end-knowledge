# React Native

<details>
<summary>参考 - 2019年05月21日</summary>

- [打包 APK](https://reactnative.cn/docs/signed-apk-android/)
- [签署您的应用](https://developer.android.com/studio/publish/app-signing)

</details>

## 安装环境

1、 node

```bash
brew install node # > v10

# 推荐使用 nvm 管理 node

# 淘宝镜像 加速

npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global

```

2、 watchman

```bash
brew install watchman # 热更新 文件监听
```

3、 命令行工具

```bash
npm install -g react-native-cli
```

## 创建项目

```bash
mkdir [dir] && cd [dir]
react-native init AwesomeProject
```

## 开发调试

package.json 中先添加几个脚本

```js
"scripts": {
	"start": "react-native start", // 启动 Metro JavaScript bundler server
	"android": "react-native run-android", // 启动安卓模拟器或设备
	"ios": "react-native run-ios", // 启动iOS模拟器
	"bundle-android": "react-native bundle --entry-file index.js --platform android --dev false --bundle-output ./android/app/src/main/assets/index.android.bundle --assets-dest ./android/app/src/main/res/", // 打包 bundle 离线包
	"bundle-ios": "react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ./ios/bundle/main.jsbundle --assets-dest ./ios/bundle", // 打包 bundle 离线包
	"build-android": "react-native run-android --variant=release", // 生存 apk release包
},
```

1. npm start // 启动服务
2. npm run bundle-{android,ios} // 打包 bundle 如果目录不存在手动建一个
3. adb reverse tcp:8081 tcp:8081 // android 端口映射
4. npm run {android,ios} // 启动模拟器或设备
5. npm run build-android // 测试 release 版

> 注意`--variant=release`参数只能在完成了下面的签名配置之后才可以使用。因为 release 相当于一个线上版本需要所有签名依赖打包到 apk 中才可离线运行

### 调试菜单

- Android 快捷键 cmd + M
- iOS 快捷键 cmd + D
- 真机 摇一摇

## 部署

### Android 打包 apk

1、 生成离线 bundle 包 npm run bundle-android

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

```
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
# ./android/
./gradlew assembleRelease # 生产包
./gradlew assembleDebug # 测试包

# 生成路径 android/app/build/outputs/apk/app-release.

# 如果 package.json里配置了 build-android
npm run build-android
```

6、 安装到手机

前提确保连上手机，开启 USB 调试模式，（部分手机需要连续点击 关于手机 里的 版本号 才出开发人员选项->USB 调试模式）

```
# 查看已连接设备
adb devices

adb install {your path}/android/app/build/outputs/apk/release/app-release.apk.apk
```

### iOS archive

先选择一个 iOS 设备，否则 archive 菜单灰色不可点

xcode -> product -> archive -> distribute

## 常见问题

1、 Solve the error `No bundle URL present`

```bash
rm -rf ios/build/; kill $(lsof -t -i:8081); react-native run-ios
```
