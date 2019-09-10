# 自动打包脚本

./scripts/package.json

```json
{
  "name": "build-cli",
  "bin": {
    "build-cli": "build.js"
  },
  "dependencies": {
    "commander": "^2.20.0",
    "ora": "^3.4.0",
    "plist": "^3.0.1",
    "shelljs": "^0.8.3"
  }
}
```

./scripts/build.js

```js
#!/usr/bin/env node

const cmd = require('commander')
const sh = require('shelljs')
const fs = require('fs')
const path = require('path')
const packageJson = require('../package.json')
const ora = require('ora')
const loading = ora()
const plist = require('plist')

cmd
  .version('0.0.1')
  .description('A cli for RN build')
  .option('-i, --ios', 'build ios')
  .option('-a, --android', 'build android')
  .option('-d, --dev', 'build dev')
  .option('-t, --test', 'build test')
  .option('-p, --prod', 'build production')
  .parse(process.argv)

if (!cmd.ios && !cmd.android) {
  console.log('你需要指定打包平台 eg: --ios or --android')
  return
}

if (!cmd.dev && !cmd.test && !cmd.prod) {
  console.log('你需要指定环境参数 eg: --dev or --test or --prod')
  return
}

const env = cmd.dev ? 'dev' : cmd.test ? 'test' : 'prod'
cdRoot()
sh.mkdir('-p', './src')
sh.exec(`echo '{ "env": "${env}" }' > ./src/env.json`)

const NewFileName = getNewFileName()

const ApkReleaseDir = path.resolve(
  __dirname,
  '../android/app/build/outputs/apk/release'
)
const ReleaseApkName = 'app-release.apk'
const ReleaseApkFullPath = path.resolve(ApkReleaseDir, ReleaseApkName)
const NewApkFullPath = path.resolve(ApkReleaseDir, NewFileName)

const IpaReleaseDir = path.resolve(__dirname, '../ios/autoPackage')
const ReleaseIpaName = `${packageJson.name}.ipa`
const ReleaseIpaFullPath = path.resolve(IpaReleaseDir, ReleaseIpaName)
const NewIpaFullPath = path.resolve(IpaReleaseDir, NewFileName)

if (cmd.android) {
  console.time('android build:')
  buildAndroid()
  console.timeEnd('android build:')
} else if (cmd.ios) {
  console.time('ios build:')
  buildIos()
  console.timeEnd('ios build:')
}

async function buildAndroid() {
  console.log('>>> 安卓打包开始')

  console.log('>>> 清理 apk release', ApkReleaseDir)
  cleanApkRelease()

  console.log('>>> 同步 android build.gradle 版本')
  androidSyncVersion()

  console.log('>>> 打包开始')
  await bundleRelease()

  sh.mv(ReleaseApkFullPath, NewApkFullPath)

  console.log(`>>> 上传文件 ${NewApkFullPath}`)
  await upload(NewApkFullPath)

  console.log('<<< 安卓打包结束')
}

async function buildIos() {
  const bundleDir = path.resolve(__dirname, '../ios/bundle')
  const mainBundle = path.resolve(bundleDir, 'main.jsbundle')
  const isWorkspace = fs.existsSync(
    path.resolve(__dirname, `../ios/${packageJson.name}.xcworkspace`)
  )

  console.log('>>> iOS打包开始')

  console.log('>>> 清理 ipa release', IpaReleaseDir)
  cleanIpaRelease()

  if (isWorkspace) {
    console.log('>>> clean workspace')
    cleanWorkspace()
  } else {
    console.log('>>> clean project')
    cleanProject()
  }

  console.log('>>> 同步iOS plist 版本')
  iosSyncVersion()

  console.log('>>> 生成离线 bundle 包')
  cdRoot()
  sh.mkdir('-p', bundleDir)
  sh.exec(
    `react-native bundle --entry-file index.js  --platform ios --dev false --bundle-output ${mainBundle} --assets-dest ${bundleDir}`
  )

  if (isWorkspace) {
    console.log('>>> archive workspace')
    loading.start()
    await archiveWorkspace()
  } else {
    console.log('>>> archive project')
    loading.start()
    await archiveXcodeproj()
  }
  loading.stop()

  console.log('>>> export archive')
  exportArchive()

  sh.mv(ReleaseIpaFullPath, NewIpaFullPath)

  console.log(`>>> 上传文件 ${NewIpaFullPath}`)
  await upload(NewIpaFullPath)

  console.log('<<< iOS打包结束')
}

function cleanApkRelease() {
  sh.mkdir('-p', ApkReleaseDir)
  sh.rm('-r', ApkReleaseDir)
  sh.mkdir('-p', ApkReleaseDir)
}

function cleanIpaRelease() {
  cdIos()
  sh.mkdir('-p', IpaReleaseDir)
  sh.rm('-r', IpaReleaseDir)
  sh.mkdir('-p', IpaReleaseDir)
  sh.rm('-rf', `${packageJson.name}.xcarchive`)
}

function getNewFileName() {
  const platform = cmd.android ? 'android' : 'ios'
  const hash = sh.exec('git describe --always', { silent: true }).stdout.trim()
  const ext = cmd.android ? 'apk' : 'ipa'
  return `${packageJson.name}_${platform}_${env}_v${
    packageJson.version
  }_${getDate()}_${hash}.${ext}`
}

function getDate() {
  const now = new Date()
  function pad(num) {
    return String(num).padStart(2, '0')
  }
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(
    now.getDate()
  )}${pad(now.getHours())}${pad(now.getMinutes())}`
}

function bundleRelease() {
  return new Promise(resolve => {
    const wt = fs.watch(ApkReleaseDir, (event, filename) => {
      if (filename && filename === ReleaseApkName) {
        wt.close()
        resolve()
      }
    })
    cdRoot()
    sh.exec('react-native run-android --variant=release')
  })
}

async function upload(path) {
  loading.start()
  await new Promise(resolve => {
    sh.exec(
      `rsync ${path} {user}@{host}:/{path}/${packageJson.name}/`,
      (code, stdout, stderr) => {
        if (code === 0) {
          resolve()
        } else {
          console.log(stderr)
        }
      }
    )
  })
  loading.stop()
  console.log(`done! open {download domain}${packageJson.name}/`)
}

function androidSyncVersion() {
  const gradlePath = path.resolve(__dirname, '../android/app/build.gradle')
  let fileStr = fs.readFileSync(gradlePath).toString()
  // versionCode 1
  // versionName "1.0"
  fileStr = fileStr.replace(/(versionCode )(.+)/, (match, $1, buidlNo) => {
    return $1 + (parseInt(buidlNo) + 1)
  })

  fileStr = fileStr.replace(/(versionName )(.+)/, `$1"${packageJson.version}"`)

  fs.writeFileSync(gradlePath, fileStr)
}

function iosSyncVersion() {
  const infoPlistPath = path.resolve(
    __dirname,
    `../ios/${packageJson.name}/Info.plist`
  )
  const serviceInfoPlistPath = path.resolve(
    __dirname,
    '../ios/NotificationService/Info.plist'
  )

  syncPlistVersion(infoPlistPath)
  syncPlistVersion(serviceInfoPlistPath)
}

function syncPlistVersion(infoPlistPath) {
  if (!fs.existsSync(infoPlistPath)) return

  const info = plist.parse(fs.readFileSync(infoPlistPath, 'utf8'))
  info['CFBundleShortVersionString'] = packageJson.version
  info['CFBundleVersion'] = String(parseInt(info['CFBundleVersion']) + 1)
  const xml = plist.build(info)
  fs.writeFileSync(infoPlistPath, xml)
}

function cleanProject() {
  cdIos()
  sh.exec(
    `xcodebuild clean -project ${packageJson.name}.xcodeproj -scheme ${packageJson.name} -configuration Debug`
  )
  sh.exec(
    `xcodebuild clean -project ${packageJson.name}.xcodeproj -scheme ${packageJson.name} -configuration Release`
  )
}

function archiveXcodeproj() {
  return new Promise(resolve => {
    cdIos()
    sh.exec(
      `xcodebuild archive -project ${packageJson.name}.xcodeproj -scheme ${packageJson.name} -archivePath ./${packageJson.name}.xcarchive`,
      { silent: true },
      (code, stdout, stderr) => {
        if (code === 0) {
          resolve()
        } else {
          console.log(stderr)
        }
      }
    )
  })
}

function cleanWorkspace() {
  console.log('>>> clean workspace')
  cdIos()
  sh.exec(
    `xcodebuild clean -workspace ${packageJson.name}.workspace -scheme ${packageJson.name} -configuration Debug`
  )
  sh.exec(
    `xcodebuild clean -workspace ${packageJson.name}.workspace -scheme ${packageJson.name} -configuration Release`
  )
}

function archiveWorkspace() {
  return new Promise(resolve => {
    cdIos()
    sh.exec(
      `xcodebuild archive -workspace ${packageJson.name}.xcworkspace -scheme ${packageJson.name} -archivePath ./${packageJson.name}.xcarchive`,
      { silent: true },
      (code, stdout, stderr) => {
        if (code === 0) {
          resolve()
        } else {
          console.log(stderr)
        }
      }
    )
  })
}

function exportArchive() {
  const exportOptionsPlistPath = path.resolve(
    __dirname,
    `../ios/${packageJson.name}/ExportOptions.plist`
  )

  cdIos()
  sh.exec(
    `xcodebuild -exportArchive -exportOptionsPlist ${exportOptionsPlistPath} -archivePath ./${packageJson.name}.xcarchive -exportPath ${IpaReleaseDir} -allowProvisioningUpdates`
  )
}

function cdRoot() {
  sh.cd(path.resolve(__dirname, '..'))
}
function cdAndroid() {
  sh.cd(path.resolve(__dirname, '../android'))
}
function cdIos() {
  sh.cd(path.resolve(__dirname, '../ios'))
}
```

```bash
npm install
npm link

# eg:
build-cli --dev --android # 打包安卓开发 build-cli -da
```
