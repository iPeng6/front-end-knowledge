# MAC

端口占用问题

```
mac
  查看端口占用
    lsof -i tcp:9999
  杀掉进程
    kill -9 38168

windows
    netstat -aon | findstr "8080"
    taskkill /pid 4456 /F

```
