# 前端工程化

前端工程化是指使用现代工具和流程来提高前端开发效率和代码质量。

## 1. 构建工具

### Webpack

Webpack 是一个模块打包器，用于将多个模块打包成一个或多个 bundle。

#### 基本配置

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    // 插件配置
  ],
  mode: 'production'
};
```

#### 常用插件

- `HtmlWebpackPlugin`: 生成 HTML 文件
- `MiniCssExtractPlugin`: 提取 CSS 到单独文件
- `CleanWebpackPlugin`: 清理构建目录
- `TerserWebpackPlugin`: 压缩 JavaScript
- `OptimizeCssAssetsWebpackPlugin`: 压缩 CSS

### Vite

Vite 是一个现代化的前端构建工具，以其快速的开发服务器和优化的构建过程而闻名。

#### 基本配置

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    minify: 'terser'
  },
  server: {
    port: 3000,
    open: true
  }
});
```

#### 优势

- 快速的开发服务器（基于 ES 模块）
- 优化的构建过程（使用 Rollup）
- 热模块替换（HMR）
- 开箱即用的 TypeScript 支持

### Rollup

Rollup 是一个 JavaScript 模块打包器，专注于生成更小、更快的 bundle。

#### 基本配置

```javascript
// rollup.config.js
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm'
  },
  plugins: [
    // 插件配置
  ]
};
```

#### 适用场景

- 库和框架的构建
- 对 bundle 大小要求较高的项目
- 输出 ES 模块的项目

## 2. 代码质量

### ESLint

ESLint 是一个用于识别和报告 JavaScript 代码中潜在问题的工具。

#### 基本配置

```javascript
// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'error'
  }
};
```

#### 常用插件

- `eslint-plugin-react`: React 相关规则
- `eslint-plugin-vue`: Vue 相关规则
- `eslint-plugin-typescript`: TypeScript 相关规则
- `eslint-plugin-prettier`: 与 Prettier 集成

### Prettier

Prettier 是一个代码格式化工具，确保代码风格一致。

#### 基本配置

```javascript
// .prettierrc.js
module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'avoid'
};
```

#### 与 ESLint 集成

```javascript
// .eslintrc.js
module.exports = {
  // ...
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  // ...
};
```

### TypeScript

TypeScript 是 JavaScript 的超集，添加了类型系统。

#### 基本配置

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "lib": ["es2015", "dom"],
    "jsx": "react",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

#### 类型定义

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): User {
  return {
    id,
    name: '张三',
    email: 'zhangsan@example.com'
  };
}

const user = getUser(1);
console.log(user.name);
```

## 3. CI/CD

### GitHub Actions

GitHub Actions 是 GitHub 提供的 CI/CD 服务，用于自动化构建、测试和部署。

#### 基本配置

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14.x'
    - run: npm install
    - run: npm test
    - run: npm run build
```

#### 部署配置

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14.x'
    - run: npm install
    - run: npm run build
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### GitLab CI/CD

GitLab CI/CD 是 GitLab 提供的 CI/CD 服务。

#### 基本配置

```yaml
# .gitlab-ci.yml
stages:
  - build
  - test
  - deploy

build:
  stage: build
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - dist

test:
  stage: test
  script:
    - npm test

deploy:
  stage: deploy
  script:
    - echo "Deploying to production"
  only:
    - main
```

### 持续集成最佳实践

- 每次提交都运行测试
- 使用自动化工具检查代码质量
- 自动化构建和部署
- 使用环境变量管理配置
- 监控构建和部署状态

## 4. 包管理

### npm

npm 是 Node.js 的包管理器，用于安装和管理依赖。

#### 常用命令

```bash
# 初始化项目
npm init

# 安装依赖
npm install package-name

# 安装开发依赖
npm install --save-dev package-name

# 运行脚本
npm run script-name

# 发布包
npm publish
```

#### package.json 示例

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "My project",
  "main": "index.js",
  "scripts": {
    "start": "webpack serve",
    "build": "webpack",
    "test": "jest"
  },
  "dependencies": {
    "react": "^17.0.2"
  },
  "devDependencies": {
    "webpack": "^5.64.4",
    "babel-loader": "^8.2.3"
  }
}
```

### Yarn

Yarn 是 Facebook 开发的包管理器，提供了更快的安装速度和更可靠的依赖管理。

#### 常用命令

```bash
# 初始化项目
yarn init

# 安装依赖
yarn add package-name

# 安装开发依赖
yarn add --dev package-name

# 运行脚本
yarn script-name

# 发布包
yarn publish
```

### pnpm

pnpm 是一个快速的包管理器，使用符号链接来节省磁盘空间。

#### 常用命令

```bash
# 初始化项目
pnpm init

# 安装依赖
pnpm add package-name

# 安装开发依赖
pnpm add -D package-name

# 运行脚本
pnpm script-name

# 发布包
pnpm publish
```

## 5. 项目结构

### 单页应用 (SPA) 结构

```
src/
├── assets/          # 静态资源
├── components/      # 组件
├── pages/           # 页面
├── services/        # API 服务
├── store/           # 状态管理
├── utils/           # 工具函数
├── App.js           # 应用入口组件
└── index.js         # 应用入口文件
```

### 多页应用 (MPA) 结构

```
src/
├── assets/          # 静态资源
├── components/      # 组件
├── pages/           # 页面
│   ├── home/        # 首页
│   ├── about/       # 关于页
│   └── contact/     # 联系页
├── services/        # API 服务
├── utils/           # 工具函数
└── index.js         # 应用入口文件
```

### 组件结构

```
components/
├── Button/          # 按钮组件
│   ├── index.js     # 组件入口
│   ├── Button.js    # 组件实现
│   └── Button.css   # 组件样式
├── Card/            # 卡片组件
│   ├── index.js
│   ├── Card.js
│   └── Card.css
└── Modal/           # 模态框组件
    ├── index.js
    ├── Modal.js
    └── Modal.css
```

## 6. 开发工具

### IDE 插件

- **VS Code**:
  - ESLint
  - Prettier
  - TypeScript
  - GitLens
  - Live Server

- **WebStorm**:
  - ESLint
  - Prettier
  - TypeScript
  - Git Integration

### 浏览器扩展

- **Chrome**:
  - React Developer Tools
  - Vue Devtools
  - Redux DevTools
  - Lighthouse
  - Web Vitals

- **Firefox**:
  - React Developer Tools
  - Vue Devtools
  - Redux DevTools
  - Lighthouse

## 7. 前端工程化最佳实践

- **模块化**：将代码分割成小的、可重用的模块
- **自动化**：使用工具自动化重复任务
- **标准化**：制定代码规范和最佳实践
- **监控**：监控应用性能和错误
- **文档**：编写清晰的文档
- **测试**：编写单元测试和集成测试

## 总结

前端工程化是现代前端开发的重要组成部分，通过使用构建工具、代码质量工具和 CI/CD 流程，可以提高开发效率、代码质量和用户体验。在实际开发中，我们应该根据项目的具体需求选择合适的工具和流程，并不断优化和改进。