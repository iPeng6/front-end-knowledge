# jsconfig

让 vscode 识别 alias

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
