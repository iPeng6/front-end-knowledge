# 常见问题

1、 ios solve the error `No bundle URL present`

```
# 清缓存重启
rm -rf ios/build/; kill $(lsof -t -i:8081); react-native run-ios
```
