# jsconfig

让 vscode 识别 alias

```json
{
  "include": ["./src/**/*"],
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "exclude": ["node_modules"]
}
```
