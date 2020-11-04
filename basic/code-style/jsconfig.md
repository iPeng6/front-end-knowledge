# jsconfig

<details>
<summary>参考</summary>

- https://code.visualstudio.com/docs/languages/jsconfig

</details>

jsconfig.json 让 vscode 识别 alias

```json
{
  "include": ["./src/**/*"],
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```
