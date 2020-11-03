# Docker

- [前端高级进阶：使用 docker 高效部署你的前端应用](https://mp.weixin.qq.com/s/ykyqb2clrYsWkCvR4k3KYA)

## 安装 docker

```bash
# apt升级
sudo apt-get update

# 添加相关软件包
sudo apt-get install \
apt-transport-https \ ca-certificates \
curl \ software-properties-common

# 下载软件包的合法性，需要添加软件源的 GPG 密钥
curl -fsSL https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu/gpg | sudo apt-key add -

# source.list 中添加 Docker 软件源
sudo add-apt-repository "deb [arch=amd64] https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu $(lsb_release -cs) stable"

# 安装 Docker CE
sudo apt-get update
sudo apt-get install docker-ce

# 启动 Docker CE
sudo systemctl enable docker
sudo systemctl start docker

# 建立 docker 用户组(附加)
sudo groupadd docker
sudo usermod -aG docker $USER

# Helloworld测试
docker run hello-world
```

# nginx 实例

```bash
docker pull nginx
docker images nginx
mkdir www
echo 'Hello docker !!!!' >> www/index.html
docker run -p 8000:80 -v $PWD/www:/usr/share/nginx/html nginx

```
