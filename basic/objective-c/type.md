# 声明、类型、字面量

## 类型判断

1. 获取类型

```oc
NSString *name = [NSString stringWithUTF8String:object_getClassName(self.var)];
```

2. 判断类型

```oc
[message isKindOfClass:[NSString class]
```
