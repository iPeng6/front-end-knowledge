# Mac Chrome 禁用 Dark Mode

<details>
<summary>引用参考 - 2020/04/26</summary>

- [关闭 macOS Google Chrome 黑暗模式风格](https://www.jianshu.com/p/408c26f1cbd8) - _玉圣 2019.03.29_

</details>

```bash
# 取消黑暗模式
defaults write com.google.Chrome NSRequiresAquaSystemAppearance -bool YES

# 恢复
defaults write com.google.Chrome NSRequiresAquaSystemAppearance -bool NO
```
