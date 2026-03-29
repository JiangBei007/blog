---
name: 'blog-project'
description: '管理和维护基于 VitePress 的博客项目，包括内容更新、主题配置和部署。当用户需要管理博客内容、配置主题或部署博客时调用。'
---

# 博客项目管理

## 项目结构

本项目是一个基于 VitePress 的博客项目，结构如下：

- `.vitepress/` - VitePress 配置和主题文件
  - `theme/` - 主题相关文件
  - `config.mjs` - VitePress 配置文件
- `src/` - 博客内容
  - `js/` - JavaScript 相关内容
  - `leetcode/` - LeetCode 题解
  - `other/` - 其他内容
  - `public/` - 静态资源
  - `questions/` - 问题解答
  - `react/` - React 相关内容
  - `site-guide/` - 站点指南
  - `ts/` - TypeScript 相关内容
  - `vue/` - Vue 相关内容
  - `index.md` - 首页
  - `markdown-examples.md` - Markdown 示例
- `package.json` - 项目依赖和脚本
- `deploy.sh` - 部署脚本

## 常用命令

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 部署

```bash
./deploy.sh
```

## 内容管理

### 添加新页面

1. 在 `src/` 目录下创建新的文件夹或 Markdown 文件
2. 更新 `.vitepress/config.mjs` 中的导航配置

### 主题配置

- 修改 `.vitepress/theme/` 目录下的文件
- 更新 `.vitepress/theme/styles/var.css` 中的样式变量

## 部署流程

1. 执行 `npm run build` 构建生产版本
2. 运行 `./deploy.sh` 脚本部署到 GitHub Pages

## 注意事项

- 确保所有 Markdown 文件格式正确
- 定期更新依赖以保持安全性
- 部署前测试本地构建是否成功
