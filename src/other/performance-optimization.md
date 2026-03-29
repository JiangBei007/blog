# 前端性能优化

前端性能优化是提升用户体验的关键环节。本文将从多个维度详细介绍前端性能优化的策略和最佳实践。

---

## 目录

1. [资源加载优化](#资源加载优化)
2. [代码优化](#代码优化)
3. [渲染优化](#渲染优化)
4. [网络优化](#网络优化)
5. [缓存策略](#缓存策略)
6. [图片优化](#图片优化)
7. [框架特定优化](#框架特定优化)
8. [性能监控与分析](#性能监控与分析)

---

## 资源加载优化

### 1. 代码分割与懒加载

#### 路由懒加载

```javascript
// Vue Router
const routes = [
  {
    path: '/about',
    component: () => import('./views/About.vue'), // 按需加载
  },
];

// React Router
const About = lazy(() => import('./pages/About'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}
```

#### 组件懒加载

```javascript
// Vue 异步组件
const AsyncComponent = defineAsyncComponent(
  () => import('./components/HeavyComponent.vue'),
);

// React 动态导入
const HeavyChart = lazy(() => import('./components/HeavyChart'));
```

#### 图片懒加载

```html
<!-- 原生懒加载 -->
<img
  src="placeholder.jpg"
  data-src="real-image.jpg"
  loading="lazy"
  alt="描述"
/>

<!-- 使用 Intersection Observer -->
<img class="lazy-image" data-src="image.jpg" alt="描述" />
```

```javascript
// Intersection Observer 实现懒加载
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy-image');
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll('.lazy-image').forEach((img) => {
  imageObserver.observe(img);
});
```

### 2. 预加载与预获取

```html
<!-- DNS 预解析 -->
<link rel="dns-prefetch" href="//cdn.example.com" />

<!-- 预连接 -->
<link rel="preconnect" href="https://api.example.com" />

<!-- 预获取关键资源 -->
<link rel="prefetch" href="/next-page.js" />

<!-- 预加载关键资源 -->
<link rel="preload" href="/critical.css" as="style" />
<link
  rel="preload"
  href="/font.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>

<!-- 预渲染下一页 -->
<link rel="prerender" href="/next-page.html" />
```

### 3. 脚本加载优化

```html
<!-- async: 异步加载，加载完成后立即执行 -->
<script async src="analytics.js"></script>

<!-- defer: 延迟执行，DOM 解析完成后执行 -->
<script defer src="app.js"></script>

<!-- module: 自动延迟加载 -->
<script type="module" src="app.js"></script>
```

| 属性   | 加载时机       | 执行时机           | 使用场景           |
| ------ | -------------- | ------------------ | ------------------ |
| 无     | 阻塞 HTML 解析 | 立即执行           | 关键脚本           |
| async  | 并行加载       | 加载完成后立即执行 | 独立脚本（如统计） |
| defer  | 并行加载       | DOM 解析完成后     | 依赖 DOM 的脚本    |
| module | 并行加载       | 延迟执行           | ES6 模块           |

---

## 代码优化

### 1. JavaScript 优化

#### 减少重排重绘

```javascript
// ❌ 不好的做法：多次触发重排
const element = document.getElementById('box');
element.style.width = '100px';
element.style.height = '100px';
element.style.margin = '10px';

// ✅ 好的做法：使用 CSS 类或一次性修改
// 方法 1: 使用 class
box.classList.add('new-size');

// 方法 2: 使用 cssText
element.style.cssText = 'width: 100px; height: 100px; margin: 10px;';

// 方法 3: 使用 requestAnimationFrame
requestAnimationFrame(() => {
  element.style.width = '100px';
  element.style.height = '100px';
});
```

#### 事件委托

```javascript
// ❌ 不好的做法：给每个子元素绑定事件
document.querySelectorAll('.item').forEach((item) => {
  item.addEventListener('click', handleClick);
});

// ✅ 好的做法：使用事件委托
document.getElementById('list').addEventListener('click', (e) => {
  if (e.target.matches('.item')) {
    handleClick(e);
  }
});
```

#### 防抖与节流

```javascript
// 防抖：延迟执行，只执行最后一次
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 使用场景：搜索输入
searchInput.addEventListener(
  'input',
  debounce((e) => {
    performSearch(e.target.value);
  }, 300),
);

// 节流：固定频率执行
function throttle(fn, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// 使用场景：滚动事件
window.addEventListener(
  'scroll',
  throttle(() => {
    loadMoreData();
  }, 200),
);
```

#### 虚拟列表

```javascript
// 只渲染可视区域的列表项
function VirtualList({ items, itemHeight, height }) {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(height / itemHeight),
    items.length,
  );

  const visibleItems = items.slice(startIndex, endIndex);
  const offsetY = startIndex * itemHeight;

  return (
    <div
      style={{ height, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item) => (
            <div key={item.id} style={{ height: itemHeight }}>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### 2. CSS 优化

#### 关键 CSS 内联

```html
<head>
  <!-- 关键 CSS 直接内联 -->
  <style>
    /* 首屏必需的样式 */
    .header {
      /* ... */
    }
    .hero {
      /* ... */
    }
    .nav {
      /* ... */
    }
  </style>

  <!-- 非关键 CSS 异步加载 -->
  <link
    rel="preload"
    href="non-critical.css"
    as="style"
    onload="this.onload=null;this.rel='stylesheet'"
  />
  <noscript><link rel="stylesheet" href="non-critical.css" /></noscript>
</head>
```

#### CSS 选择器优化

```css
/* ❌ 避免过深的选择器 */
div.container > ul.list > li.item > a.link {
}

/* ✅ 使用简洁的选择器 */
.list-link {
}

/* ❌ 避免通用选择器 */
.container * {
  margin: 0;
}

/* ✅ 直接指定元素 */
.container h1,
.container p {
  margin: 0;
}
```

#### 使用 CSS 硬件加速

```css
/* 触发 GPU 加速 */
.animated-element {
  transform: translateZ(0);
  will-change: transform;
}

/* 动画结束后移除 will-change */
.animated-element.animation-complete {
  will-change: auto;
}
```

#### CSS 容器查询

```css
/* 响应式组件，无需依赖视口 */
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}
```

### 3. Tree Shaking

```javascript
// ✅ 使用具名导出，支持 Tree Shaking
import { map, filter } from 'lodash-es';

// ❌ 避免全量导入
import _ from 'lodash';

// ✅ 使用副作用标记 (package.json)
{
  "sideEffects": [
    "*.css",
    "*.scss"
  ]
}
```

---

## 渲染优化

### 1. 减少重排(Reflow)和重绘(Repaint)

```javascript
// ❌ 强制同步布局（强制重排）
function badExample() {
  const boxes = document.querySelectorAll('.box');
  boxes.forEach((box) => {
    const width = box.offsetWidth; // 读取
    box.style.width = width + 10 + 'px'; // 写入
  });
}

// ✅ 批量读取和写入
function goodExample() {
  const boxes = document.querySelectorAll('.box');

  // 先读取
  const widths = Array.from(boxes).map((box) => box.offsetWidth);

  // 再写入
  requestAnimationFrame(() => {
    boxes.forEach((box, index) => {
      box.style.width = widths[index] + 10 + 'px';
    });
  });
}
```

### 2. 使用 DocumentFragment

```javascript
// ❌ 多次 DOM 操作
const list = document.getElementById('list');
items.forEach((item) => {
  const li = document.createElement('li');
  li.textContent = item;
  list.appendChild(li); // 每次都会触发重排
});

// ✅ 使用 DocumentFragment
const fragment = document.createDocumentFragment();
items.forEach((item) => {
  const li = document.createElement('li');
  li.textContent = item;
  fragment.appendChild(li);
});
list.appendChild(fragment); // 只触发一次重排
```

### 3. 虚拟 DOM 优化

```javascript
// React: 使用 React.memo 避免不必要的渲染
const MemoizedComponent = React.memo(({ data }) => {
  return <div>{data.name}</div>;
}, (prevProps, nextProps) => {
  return prevProps.data.id === nextProps.data.id;
});

// Vue: 使用 v-once 和 computed
<template>
  <!-- 只渲染一次 -->
  <div v-once>{{ staticContent }}</div>

  <!-- 缓存计算结果 -->
  <div>{{ filteredList }}</div>
</template>

<script>
export default {
  computed: {
    filteredList() {
      return this.list.filter(item => item.active);
    }
  }
}
</script>
```

### 4. Web Workers

```javascript
// 将耗时计算移到 Worker
// worker.js
self.onmessage = function (e) {
  const { data } = e;
  const result = heavyComputation(data);
  self.postMessage(result);
};

// main.js
const worker = new Worker('worker.js');
worker.postMessage(largeData);
worker.onmessage = function (e) {
  console.log('计算结果:', e.data);
};
```

---

## 网络优化

### 1. HTTP/2 与 HTTP/3

```nginx
# Nginx 启用 HTTP/2
server {
    listen 443 ssl http2;
    server_name example.com;

    # 启用服务器推送（HTTP/2）
    location = /index.html {
        http2_push /styles.css;
        http2_push /app.js;
    }
}
```

### 2. 资源压缩

```javascript
// Webpack 配置
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // 移除 console
            drop_debugger: true, // 移除 debugger
          },
        },
      }),
    ],
  },
};
```

### 3. Gzip/Brotli 压缩

```nginx
# Nginx 启用 Brotli
brotli on;
brotli_comp_level 6;
brotli_types text/plain text/css application/javascript application/json;

# Gzip 备用
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css application/javascript;
```

### 4. CDN 使用

```html
<!-- 使用 CDN 加载常用库 -->
<script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>

<!-- 使用多 CDN 域名并行下载 -->
<link rel="stylesheet" href="https://cdn1.example.com/styles.css" />
<script src="https://cdn2.example.com/app.js"></script>
```

---

## 缓存策略

### 1. HTTP 缓存头

```nginx
# 静态资源长期缓存
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    add_header Vary "Accept-Encoding";
}

# HTML 文件不缓存
location ~* \.html$ {
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

### 2. Service Worker 缓存

```javascript
// service-worker.js
const CACHE_NAME = 'app-v1';
const urlsToCache = ['/', '/styles.css', '/app.js'];

// 安装时缓存
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  );
});

// 拦截请求
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 缓存命中则返回，否则网络请求
      if (response) {
        return response;
      }
      return fetch(event.request);
    }),
  );
});
```

### 3. 本地存储策略

```javascript
// 使用 IndexedDB 存储大量数据
const db = await openDB('myDB', 1, {
  upgrade(db) {
    db.createObjectStore('items', { keyPath: 'id' });
  },
});

// 缓存 API 响应
async function fetchWithCache(url) {
  const cacheKey = `api:${url}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    // 5 分钟内使用缓存
    if (Date.now() - timestamp < 5 * 60 * 1000) {
      return data;
    }
  }

  const response = await fetch(url);
  const data = await response.json();

  localStorage.setItem(
    cacheKey,
    JSON.stringify({
      data,
      timestamp: Date.now(),
    }),
  );

  return data;
}
```

---

## 图片优化

### 1. 响应式图片

```html
<!-- 使用 srcset 提供不同尺寸 -->
<img
  srcset="image-320w.jpg 320w, image-768w.jpg 768w, image-1200w.jpg 1200w"
  sizes="
    (max-width: 320px) 280px,
    (max-width: 768px) 720px,
    1200px
  "
  src="image-1200w.jpg"
  alt="响应式图片"
/>

<!-- 使用 picture 元素 -->
<picture>
  <source srcset="image.avif" type="image/avif" />
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="兼容格式" />
</picture>
```

### 2. 图片格式选择

| 格式 | 特点               | 使用场景       |
| ---- | ------------------ | -------------- |
| AVIF | 压缩率最高         | 现代浏览器首选 |
| WebP | 压缩率高，支持广泛 | 通用选择       |
| JPEG | 有损压缩           | 照片类图片     |
| PNG  | 无损，支持透明     | 图标、截图     |
| SVG  | 矢量，可缩放       | Logo、图标     |

### 3. 图片压缩

```javascript
// 使用 Sharp 压缩图片 (Node.js)
const sharp = require('sharp');

sharp('input.jpg')
  .resize(800, 600, { fit: 'inside' })
  .jpeg({ quality: 80, progressive: true })
  .toFile('output.jpg');

// 转换为 WebP
sharp('input.jpg').webp({ quality: 85 }).toFile('output.webp');
```

### 4. CSS Sprites

```css
/* 将多个小图标合并为一张雪碧图 */
.icon {
  background-image: url('sprites.png');
  background-size: 200px 100px;
}

.icon-home {
  background-position: 0 0;
  width: 20px;
  height: 20px;
}

.icon-search {
  background-position: -20px 0;
  width: 20px;
  height: 20px;
}
```

---

## 框架特定优化

### 1. Vue 优化

```vue
<template>
  <!-- 使用 v-once 渲染静态内容 -->
  <div v-once>{{ staticText }}</div>

  <!-- 使用 v-memo 缓存列表项 -->
  <div v-for="item in list" :key="item.id" v-memo="[item.selected]">
    {{ item.name }}
  </div>

  <!-- 函数式组件 -->
  <FunctionalList :items="items" />
</template>

<script>
// 函数式组件
const FunctionalList = (props) => {
  return h(
    'ul',
    props.items.map((item) => h('li', item.name)),
  );
};

export default {
  // 异步组件
  components: {
    HeavyComponent: defineAsyncComponent(() => import('./HeavyComponent.vue')),
  },
};
</script>
```

### 2. React 优化

```jsx
import { memo, useMemo, useCallback, lazy, Suspense } from 'react';

// 组件记忆化
const MemoizedList = memo(
  ({ items }) => {
    return (
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.items === nextProps.items;
  },
);

function App() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  // 缓存计算结果
  const filteredItems = useMemo(() => {
    return items.filter((item) => item.active);
  }, [items]);

  // 缓存回调函数
  const handleClick = useCallback((id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item,
      ),
    );
  }, []);

  return (
    <>
      <MemoizedList items={filteredItems} />
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
    </>
  );
}

// 代码分割
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### 3. Next.js 优化

```javascript
// next.config.js
module.exports = {
  // 图片优化
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
  },

  // 脚本优化
  experimental: {
    nextScriptWorkers: true,
  },
};

// 页面组件
import Image from 'next/image';
import Script from 'next/script';

export default function Page() {
  return (
    <>
      {/* 自动优化图片 */}
      <Image
        src="/photo.jpg"
        alt="照片"
        width={800}
        height={600}
        priority // 优先加载
      />

      {/* 优化第三方脚本 */}
      <Script
        src="https://analytics.com/script.js"
        strategy="lazyOnload" // 延迟加载
      />
    </>
  );
}
```

---

## 性能监控与分析

### 1. Core Web Vitals

```javascript
// 使用 web-vitals 库监控
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  const body = JSON.stringify(metric);

  // 发送到分析服务
  fetch('/analytics', {
    body,
    method: 'POST',
    keepalive: true,
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

| 指标 | 全称                      | 描述             | 目标值  |
| ---- | ------------------------- | ---------------- | ------- |
| LCP  | Largest Contentful Paint  | 最大内容绘制     | < 2.5s  |
| FID  | First Input Delay         | 首次输入延迟     | < 100ms |
| CLS  | Cumulative Layout Shift   | 累积布局偏移     | < 0.1   |
| FCP  | First Contentful Paint    | 首次内容绘制     | < 1.8s  |
| TTFB | Time to First Byte        | 首字节时间       | < 600ms |
| INP  | Interaction to Next Paint | 交互到下一次绘制 | < 200ms |

### 2. Performance API

```javascript
// 测量特定操作性能
const start = performance.now();
performHeavyOperation();
const duration = performance.now() - start;
console.log(`操作耗时: ${duration}ms`);

// 使用 Performance Observer
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('资源加载:', entry.name, entry.duration);
  }
});
observer.observe({ entryTypes: ['resource', 'navigation'] });

// 标记关键时间点
performance.mark('app-start');
// ... 应用初始化
performance.mark('app-ready');
performance.measure('app-init', 'app-start', 'app-ready');
```

### 3. 性能预算

```javascript
// bundlesize.config.js
module.exports = {
  files: [
    {
      path: './dist/app.js',
      maxSize: '150 kB',
      compression: 'gzip',
    },
    {
      path: './dist/vendor.js',
      maxSize: '250 kB',
      compression: 'gzip',
    },
    {
      path: './dist/styles.css',
      maxSize: '50 kB',
      compression: 'gzip',
    },
  ],
};

// Webpack 性能提示
module.exports = {
  performance: {
    hints: 'warning',
    maxEntrypointSize: 250000,
    maxAssetSize: 250000,
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js');
    },
  },
};
```

### 4. Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI

on: [push]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli@0.12.x
          lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
      },
    },
  },
};
```

---

## 最佳实践清单

### 开发阶段

- [ ] 使用代码分割减少首屏加载
- [ ] 实现图片懒加载和响应式图片
- [ ] 优化第三方脚本加载策略
- [ ] 使用防抖/节流优化高频事件
- [ ] 避免内存泄漏，及时清理事件监听和定时器
- [ ] 使用 Web Workers 处理复杂计算

### 构建阶段

- [ ] 启用 Tree Shaking 移除未使用代码
- [ ] 压缩 JavaScript、CSS 和 HTML
- [ ] 生成 Source Map 便于调试
- [ ] 设置合理的代码分割策略
- [ ] 优化资源哈希策略便于缓存

### 部署阶段

- [ ] 启用 Gzip/Brotli 压缩
- [ ] 配置合理的缓存策略
- [ ] 使用 CDN 分发静态资源
- [ ] 启用 HTTP/2 或 HTTP/3
- [ ] 配置 DNS 预解析和预连接

### 监控阶段

- [ ] 监控 Core Web Vitals 指标
- [ ] 设置性能预算并持续跟踪
- [ ] 定期进行 Lighthouse 审计
- [ ] 收集真实用户性能数据 (RUM)
- [ ] 建立性能回归测试

---

## 参考资源

- [Web Vitals](https://web.dev/vitals/)
- [Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Webpack 性能优化](https://webpack.js.org/guides/build-performance/)
- [React 性能优化](https://react.dev/reference/react)
- [Vue 性能优化](https://vuejs.org/guide/best-practices/performance.html)
