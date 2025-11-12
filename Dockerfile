# Build stage
FROM node:22-alpine AS builder

# 设置工作目录
WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm@9.12.1

# 复制 package 文件
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建应用
RUN pnpm run build

# Runtime stage
FROM node:22-alpine

# 设置工作目录
WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm@9.12.1

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# 复制 package 文件
COPY package.json pnpm-lock.yaml ./

# 安装生产依赖（忽略 prepare 脚本，避免 husky 错误）
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

# 从构建阶段复制构建结果
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# 创建数据目录（用于持久化数据）
RUN mkdir -p /app/data

# 暴露端口
EXPOSE 3000

# 健康检查（增加启动时间防止超时）
HEALTHCHECK --interval=30s --timeout=10s --start-period=120s --retries=5 \
  CMD node -e "require('http').get('http://127.0.0.1:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})" || exit 1

# 启动应用（添加日志输出帮助调试）
CMD ["sh", "-c", "echo 'Starting WhitefirePass...' && pnpm run start"]
