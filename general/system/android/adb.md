# ADB

- [华为卸载内置应用！最完美的 ADB 一键卸载工具](https://shadowq.com/1/4464.html)

常用 ADB 命令

1. 获取设备状态

   - 输入 adb devices 列出已连接设备
   - 输入 adb get-state 回车
     - device：设备正常连接
     - offline：连接出现异常，设备无响应
     - unknown：没有连接设备

2. 查看系统应用

   - 查看所有应用：adb shell pm list packages
   - 查看系统应用：adb shell pm list packages -s
   - 查看用户应用：adb shell pm list packages -3

3. 查看禁用的系统应用命令

   - 先输入 ADB-tools> adb shell
   - HWEVR:/ \$ pm list packages -s -d 回车
   - 再输入 pm list packages -s -d 回车

4. 重启命令

   - 重启手机：adb reboot
   - 重启到 recovery：adb reboot recovery
   - 重启到 fastboot：adb reboot fastboot

5. 禁用、启用、删除应用的命令

   - 禁用程序为 adb shell pm disable-user+空格+程序名；
   - 启用程序为 adb shell pm enable+空格+程序名；
   - 删除程序为 adb shell pm uninstall --user 0+空格+程序名
