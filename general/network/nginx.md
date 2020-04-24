# nginx

## CentOS 7 下 yum 安装和配置 Nginx

```bash
# 安装
sudo yum install nginx

# 设置开机启动
sudo systemctl enable nginx

# 启动服务
sudo systemctl start nginx

# 停止服务
sudo systemctl stop nginx

# 重新启动
sudo systemctl restart nginx

# 重新加载 不关闭服务，重新载入配置文件，让设置生效。
sudo systemctl reload nginx
```

## 配置反向代理

```bash
cd /etc/nginx/conf.d
```

新建一个以.conf 结尾的文件，比如二级域名`jenkins.yuyou.info`，导向 8089 端口

```
server
{
        listen 80;
        server_name jenkins.yuyou.info;
        location / {
                proxy_redirect off;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_pass http://localhost:8089;
        }
}
```
