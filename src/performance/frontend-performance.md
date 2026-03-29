# 前端性能优化

前端性能优化是提高用户体验的关键，通过优化加载速度、运行效率和资源使用，可以显著提升网站的性能。

## 1. 页面加载优化

### 资源压缩与合并

- **JavaScript 压缩**：使用工具如 Terser 压缩 JavaScript 文件
- **CSS 压缩**：使用工具如 cssnano 压缩 CSS 文件
- **HTML 压缩**：移除空白字符、注释等
- **资源合并**：减少 HTTP 请求数量

### 代码分割

- **按路由分割**：根据路由加载对应的代码
- **按组件分割**：按需加载组件
- **按功能分割**：将不同功能的代码分开打包

```javascript
// 动态导入
import('./module').then(module => {
  // 使用模块
});

// React 中的代码分割
import React, { Suspense, lazy } from 'react';
const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

### 懒加载

- **图片懒加载**：只加载可视区域内的图片
- **组件懒加载**：按需加载组件
- **路由懒加载**：根据路由按需加载代码

```html
<!-- 图片懒加载 -->
<img src="placeholder.jpg" data-src="actual-image.jpg" class="lazyload">

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('.lazyload');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          observer.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => observer.observe(img));
  });
</script>
```

### 预加载

- **预加载关键资源**：使用 `<link rel="preload">` 预加载关键资源
- **预连接**：使用 `<link rel="preconnect">` 预连接到域名
- **预获取**：使用 `<link rel="prefetch">` 预获取可能需要的资源

```html
<!-- 预加载字体 -->
<link rel="preload" href="fonts/font.woff2" as="font" type="font/woff2" crossorigin>

<!-- 预连接到 CDN -->
<link rel="preconnect" href="https://cdn.example.com">

<!-- 预获取下一页资源 -->
<link rel="prefetch" href="next-page.html">
```

### 缓存策略

- **浏览器缓存**：设置适当的 Cache-Control 头
- **Service Worker 缓存**：使用 Service Worker 缓存资源
- **CDN 缓存**：利用 CDN 缓存静态资源

```nginx
# Nginx 配置示例
location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
  expires 30d;
  add_header Cache-Control "public, max-age=2592000";
}
```

## 2. 运行时优化

### DOM 操作优化

- **减少 DOM 操作**：批量处理 DOM 操作
- **使用 DocumentFragment**：减少重排
- **使用虚拟 DOM**：如 React、Vue 等框架
- **避免频繁重排和重绘**：使用 transform 和 opacity 进行动画

```javascript
// 优化前
for (let i = 0; i < 1000; i++) {
  document.getElementById('list').innerHTML += `<li>Item ${i}</li>`;
}

// 优化后
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  fragment.appendChild(li);
}
document.getElementById('list').appendChild(fragment);
```

### 事件委托

- **使用事件委托**：减少事件监听器数量
- **避免在循环中绑定事件**：使用事件委托代替

```javascript
// 优化前
const items = document.querySelectorAll('.item');
items.forEach(item => {
  item.addEventListener('click', function() {
    console.log('Item clicked:', this.textContent);
  });
});

// 优化后
const container = document.getElementById('container');
container.addEventListener('click', function(event) {
  if (event.target.classList.contains('item')) {
    console.log('Item clicked:', event.target.textContent);
  }
});
```

### 内存管理

- **避免内存泄漏**：及时清理定时器、事件监听器等
- **使用 WeakMap 和 WeakSet**：允许垃圾回收
- **避免循环引用**：注意对象之间的引用关系

```javascript
// 内存泄漏示例
function setup() {
  const element = document.getElementById('element');
  element.addEventListener('click', function() {
    console.log('Element clicked');
  });
  // 元素被移除后，事件监听器仍然存在
}

// 优化后
function setup() {
  const element = document.getElementById('element');
  const handler = function() {
    console.log('Element clicked');
  };
  element.addEventListener('click', handler);
  
  // 清理函数
  return function cleanup() {
    element.removeEventListener('click', handler);
  };
}
```

### 计算优化

- **使用缓存**：缓存计算结果
- **使用 Web Workers**：处理计算密集型任务
- **避免重复计算**：使用 memoization

```javascript
// 使用 memoization
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const fibonacci = memoize(function(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});
```

## 3. 网络优化

### HTTP/2 与 HTTP/3

- **使用 HTTP/2**：支持多路复用、头部压缩等
- **使用 HTTP/3**：基于 QUIC 协议，提供更快的连接建立
- **启用 HTTPS**：提高安全性和性能

### 资源优先级

- **设置资源优先级**：使用 `priority` 属性
- **优化资源加载顺序**：先加载关键资源
- **避免阻塞渲染**：使用 `async` 和 `defer` 属性加载脚本

```html
<!-- 异步加载脚本 -->
<script async src="script.js"></script>

<!-- 延迟加载脚本 -->
<script defer src="script.js"></script>

<!-- 设置图片优先级 -->
<img src="hero.jpg" alt="Hero" fetchpriority="high">
```

### CDN 使用

- **使用 CDN**：分发静态资源
- **选择合适的 CDN 节点**：减少网络延迟
- **配置 CDN 缓存**：提高资源加载速度

### 资源格式优化

- **使用现代图片格式**：WebP、AVIF 等
- **压缩图片**：使用工具如 ImageOptim、TinyPNG
- **使用 SVG**：对于图标等矢量图形

```html
<!-- 使用 WebP 图片 -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Image">
</picture>
```

### API 优化

- **减少 API 请求**：合并请求
- **使用缓存**：缓存 API 响应
- **使用分页**：避免一次性加载大量数据
- **使用 GraphQL**：按需获取数据

## 4. 渲染性能优化

### CSS 优化

- **避免 CSS 阻塞**：将关键 CSS 内联到 HTML 中
- **减少 CSS 选择器复杂度**：使用简单的选择器
- **避免使用 @import**：使用 link 标签代替
- **使用 CSS 变量**：提高可维护性

### JavaScript 优化

- **减少 JavaScript 执行时间**：优化代码逻辑
- **使用 requestAnimationFrame**：优化动画
- **使用 requestIdleCallback**：在空闲时间执行非关键任务
- **避免长任务**：将长任务拆分为小任务

```javascript
// 使用 requestAnimationFrame 优化动画
function animate() {
  // 动画逻辑
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// 使用 requestIdleCallback 执行非关键任务
requestIdleCallback(function(deadline) {
  while (deadline.timeRemaining() > 0) {
    // 执行非关键任务
  }
});
```

### 浏览器渲染优化

- **使用 will-change**：提示浏览器元素即将发生变化
- **避免 layout thrashing**：批量读取和写入 DOM 属性
- **使用 CSS transforms**：避免重排
- **使用 CSS containment**：减少渲染影响范围

```css
/* 使用 will-change */
.animated-element {
  will-change: transform;
  transition: transform 0.3s ease;
}

.animated-element:hover {
  transform: scale(1.1);
}

/* 使用 CSS containment */
.container {
  contain: layout paint;
}
```

## 5. 性能监控

### 核心 Web 指标

- **LCP (Largest Contentful Paint)**：最大内容绘制时间
- **FID (First Input Delay)**：首次输入延迟
- **CLS (Cumulative Layout Shift)**：累积布局偏移
- **INP (Interaction to Next Paint)**：交互到下一次绘制的时间

### 性能监控工具

- **Lighthouse**：Google 提供的性能评估工具
- **Web Vitals**：Google 提供的核心 Web 指标监控库
- **Performance API**：浏览器内置的性能监控 API
- **Sentry**：错误和性能监控平台

```javascript
// 使用 Performance API 监控性能
function measurePerformance() {
  const performanceEntries = performance.getEntriesByType('navigation');
  const navigationEntry = performanceEntries[0];
  
  console.log('LCP:', navigationEntry.largestContentfulPaint);
  console.log('FID:', navigationEntry.firstInputDelay);
  console.log('CLS:', navigationEntry.cumulativeLayoutShift);
}

// 使用 Web Vitals 库
import { getLCP, getFID, getCLS } from 'web-vitals';

getLCP(console.log);
getFID(console.log);
getCLS(console.log);
```

### 性能分析

- **Chrome DevTools**：使用 Performance 面板分析性能
- **Firefox DevTools**：使用 Performance 面板分析性能
- **Safari DevTools**：使用 Timeline 面板分析性能

## 6. 移动端性能优化

### 响应式设计

- **使用媒体查询**：适配不同屏幕尺寸
- **使用弹性布局**：Flexbox 和 Grid
- **使用相对单位**：rem、em、vw、vh 等

### 触摸优化

- **优化触摸事件**：使用 passive 事件监听器
- **避免 300ms 延迟**：使用 fastclick 或 CSS touch-action
- **优化滑动性能**：使用 CSS overscroll-behavior

```javascript
// 使用 passive 事件监听器
window.addEventListener('scroll', function() {
  // 滚动处理逻辑
}, { passive: true });

// 避免 300ms 延迟
html {
  touch-action: manipulation;
}
```

### 资源适配

- **响应式图片**：使用 srcset 和 sizes 属性
- **适配不同网络速度**：使用 adaptive loading
- **减少资源大小**：针对移动设备优化资源

```html
<!-- 响应式图片 -->
<img srcset="small.jpg 480w, medium.jpg 768w, large.jpg 1200w" 
     sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, 1200px" 
     src="medium.jpg" alt="Image">
```

## 7. 前端性能优化最佳实践

- **优化首屏加载**：减少首屏资源大小
- **使用骨架屏**：提升用户感知性能
- **实现渐进式加载**：先加载核心内容，再加载非核心内容
- **使用 Service Worker**：实现离线缓存
- **监控性能**：持续监控和优化性能
- **测试不同设备**：确保在各种设备上都有良好的性能

## 总结

前端性能优化是一个持续的过程，需要从多个方面入手，包括页面加载优化、运行时优化、网络优化、渲染性能优化等。通过合理使用各种优化技术，可以显著提升网站的性能和用户体验。在实际开发中，我们应该根据项目的具体情况，选择合适的优化策略，并持续监控和改进。