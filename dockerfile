# 使用基于 Alpine 的 Node.js 18 镜像作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 将 package.json 和 package-lock.json 复制到工作目录
COPY package*.json ./

# 安装依赖
RUN npm install

# 将当前目录下的所有文件复制到工作目录
COPY . .

# 暴露容器运行时的端口
EXPOSE 3102 3087

# 定义容器启动时执行的命令
# CMD ["npm", "run", "dev"]
