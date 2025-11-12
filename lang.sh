#!/bin/bash

# WhitefirePass - 快速启动脚本
# 用法: lang [选项]

PROJECT_DIR="/data/data/com.termux/files/home/WhitefirePass"

cd "$PROJECT_DIR" || exit 1

MODE="${1:-dev}"

case "$MODE" in
  dev|"")
    echo "🎮 启动 WhitefirePass (开发模式)..."
    echo "📍 项目路径: $PROJECT_DIR"
    echo "🌐 打开浏览器访问: http://localhost:3000"
    echo ""
    npm run dev
    ;;
  start)
    echo "🎮 启动 WhitefirePass (生产模式)..."
    echo "📍 项目路径: $PROJECT_DIR"
    echo "🔨 编译项目中..."
    npm run build && npm run start
    ;;
  help)
    echo "WhitefirePass 游戏启动脚本"
    echo ""
    echo "用法: lang [选项]"
    echo ""
    echo "选项:"
    echo "  (留空或dev) - 开发模式 (默认) - 推荐用来玩游戏 ⭐"
    echo "  start       - 生产模式 - 需要编译，不推荐"
    echo "  help        - 显示此帮助信息"
    echo ""
    echo "示例:"
    echo "  lang       # 开发模式启动，然后打开 http://localhost:3000"
    echo "  lang help  # 显示帮助"
    ;;
  *)
    echo "❌ 未知选项: $MODE"
    echo "运行 'lang help' 查看帮助"
    exit 1
    ;;
esac
