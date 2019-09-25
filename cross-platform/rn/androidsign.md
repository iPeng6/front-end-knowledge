# 安卓签名

<details>
<summary>参考 - 2019年05月21日</summary>

- [打包 APK](https://reactnative.cn/docs/signed-apk-android/)
- [签署您的应用](https://developer.android.com/studio/publish/app-signing)

</details>

## 1、生成签名文件

```bash
# ./android/app
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

## 2、修改 ./android/gradle.properties

```
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

## 3、修改 ./android/app/build.gradle

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

## 4、生成签名 apk

```bash
# 如果 package.json里配置了 build:android
# 生成路径 android/app/build/outputs/apk/release/app-release.apk
yarn build:android
```

## 5、安装到手机

前提确保连上手机，开启 USB 调试模式，（部分手机需要连续点击 关于手机 -> 版本号 才出开发人员选项 -> USB 调试模式）

```bash
adb devices # 确保手机连上电脑
adb install <your path>/android/app/build/outputs/apk/release/app-release.apk
```
