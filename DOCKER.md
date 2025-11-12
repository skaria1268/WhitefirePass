# WhitefirePass - Docker 部署指南

## 📦 快速开始

### 1. 使用 docker-compose（推荐）

```bash
# 进入项目目录
cd WhitefirePass

# 构建并启动
docker-compose up -d

# 访问应用
# 打开浏览器访问: http://localhost:3000
```

### 2. 使用 Docker 命令

```bash
# 构建镜像
docker build -t whitefire-pass:latest .

# 运行容器
docker run -d \
  --name whitefire-pass \
  -p 3000:3000 \
  -v whitefire-data:/app/data \
  --restart unless-stopped \
  whitefire-pass:latest

# 访问应用
# http://localhost:3000
```

## 🔧 环境配置

### 在 docker-compose 中配置（可选）

如果需要通过环境变量传入 API 配置，编辑 `docker-compose.yml`：

```yaml
environment:
  NODE_ENV: production
  NEXT_PUBLIC_APP_URL: http://your-domain:3000
```

### 运行时在前端配置（推荐）

启动后，在前端"模型选择"面板中填入：
- OpenAI 兼容 API URL (例如: `http://localhost:8000/v1`)
- API Key
- 模型名称

这样每次容器重启不需要重新配置。

## 💾 数据持久化

### 挂载点

- **卷名**: `whitefire-data`
- **容器路径**: `/app/data`
- **用途**: 存储应用数据（如保存的 Prompt 配置等）

### 查看数据卷位置

```bash
# 查看数据卷信息
docker volume inspect whitefire-data

# 输出示例：
# "Mountpoint": "/var/lib/docker/volumes/whitefire-data/_data"
```

### 备份数据

```bash
# 备份数据到本地
docker run --rm -v whitefire-data:/data -v $(pwd):/backup \
  alpine tar czf /backup/whitefire-data-backup.tar.gz -C /data .

# 恢复数据
docker run --rm -v whitefire-data:/data -v $(pwd):/backup \
  alpine tar xzf /backup/whitefire-data-backup.tar.gz -C /data
```

## 📋 常用命令

```bash
# 查看容器日志
docker-compose logs -f whitefire-pass

# 停止容器
docker-compose down

# 重启容器
docker-compose restart whitefire-pass

# 删除容器和数据卷
docker-compose down -v

# 进入容器内部（调试用）
docker-compose exec whitefire-pass sh
```

## 🚀 云部署示例

### AWS EC2

```bash
# 1. SSH 连接到 EC2 实例
ssh -i your-key.pem ec2-user@your-instance-ip

# 2. 安装 Docker 和 Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 3. 克隆项目
git clone <your-repo-url>
cd WhitefirePass

# 4. 启动应用
docker-compose up -d

# 5. 设置安全组（AWS）
# - 打开 3000 端口
# - 如果使用 HTTPS，也打开 443 端口
```

### DigitalOcean App Platform

```bash
# 使用 App Platform 的 Dockerfile 支持直接部署
# 1. 连接你的 GitHub 仓库
# 2. 选择 Dockerfile 部署
# 3. 设置环境变量（如需要）
# 4. 点击部署
```

### Docker Hub（可选）

如果想分享你的镜像：

```bash
# 登录 Docker Hub
docker login

# 标记镜像
docker tag whitefire-pass:latest username/whitefire-pass:latest

# 推送
docker push username/whitefire-pass:latest
```

## ⚙️ 性能优化

### 增加容器资源限制

编辑 `docker-compose.yml`：

```yaml
services:
  whitefire-pass:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
```

### 使用 Nginx 反向代理

创建 `nginx.conf`：

```nginx
upstream whitefire {
    server whitefire-pass:3000;
}

server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://whitefire;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

更新 `docker-compose.yml`：

```yaml
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - whitefire-pass
```

## 🔒 安全建议

1. **不要在 Dockerfile 中硬编码 API Key**
2. **使用 HTTPS** - 配置 SSL 证书
3. **限制容器资源** - 防止资源耗尽
4. **定期备份数据** - 使用 `docker volume` 备份命令
5. **更新基础镜像** - 定期运行 `docker pull node:22-alpine`

## 📊 监控

### 查看容器资源使用

```bash
docker stats whitefire-pass
```

### 设置日志监控

日志配置已在 `docker-compose.yml` 中设置：
- 最大日志大小: 10MB
- 保留日志文件: 3 个

## 🆘 故障排除

### 容器无法启动

```bash
# 查看错误日志
docker-compose logs whitefire-pass

# 检查端口是否被占用
lsof -i :3000

# 尝试重建镜像
docker-compose build --no-cache
```

### 访问不了应用

```bash
# 检查容器是否正常运行
docker-compose ps

# 检查网络连接
docker-compose exec whitefire-pass ping localhost

# 查看容器 IP
docker inspect whitefire-pass | grep IPAddress
```

### 数据丢失

```bash
# 检查数据卷是否存在
docker volume ls | grep whitefire-data

# 查看数据卷详情
docker volume inspect whitefire-data
```

## 📝 Dockerfile 说明

- **构建阶段**: 使用多阶段构建优化镜像大小
- **基础镜像**: `node:22-alpine` (轻量级)
- **健康检查**: 自动监控容器状态
- **非 root 用户**: 提高安全性（可选配置）

## 🎯 下一步

1. ✅ 测试本地 Docker 部署
2. ✅ 配置 API Key（前端填入）
3. ✅ 设置云服务器
4. ✅ 配置域名和 SSL
5. ✅ 设置自动备份

## 💬 需要帮助？

如有问题，请检查：
1. Docker 是否正确安装
2. 端口 3000 是否空闲
3. 磁盘空间是否充足
4. 容器日志是否有错误
