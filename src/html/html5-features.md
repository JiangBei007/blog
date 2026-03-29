# HTML5 新特性

HTML5 是 HTML 的第五个主要版本，引入了许多新特性和改进，使网页开发更加现代化和功能丰富。

## 1. 语义化标签

HTML5 引入了一系列语义化标签，使文档结构更加清晰，有助于搜索引擎理解页面内容。

```html
<header>页面头部</header>
<nav>导航菜单</nav>
<main>主要内容</main>
<section>内容区块</section>
<article>文章内容</article>
<aside>侧边栏</aside>
<footer>页脚</footer>
```

## 2. Canvas

Canvas 元素允许通过 JavaScript 绘制图形、动画和交互效果。

```html
<canvas id="myCanvas" width="400" height="200"></canvas>
<script>
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'red';
  ctx.fillRect(10, 10, 100, 100);
</script>
```

## 3. Web Storage

Web Storage 提供了在浏览器中存储数据的能力，包括 localStorage 和 sessionStorage。

```javascript
// 存储数据
localStorage.setItem('username', '张三');

// 读取数据
const username = localStorage.getItem('username');

// 删除数据
localStorage.removeItem('username');

// 清空所有数据
localStorage.clear();
```

## 4. Geolocation

Geolocation API 允许获取用户的地理位置信息。

```javascript
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log('纬度:', position.coords.latitude);
    console.log('经度:', position.coords.longitude);
  });
}
```

## 5. 表单增强

HTML5 增强了表单功能，添加了新的输入类型和属性。

```html
<input type="email" placeholder="请输入邮箱" />
<input type="tel" placeholder="请输入电话" />
<input type="date" placeholder="请选择日期" />
<input type="range" min="0" max="100" />
<input type="color" />
```

## 6. Web Workers

Web Workers 允许在后台线程中运行 JavaScript 代码，避免阻塞主线程。

```javascript
// 创建 Worker
const worker = new Worker('worker.js');

// 发送消息给 Worker
worker.postMessage('Hello Worker');

// 接收 Worker 的消息
worker.onmessage = (event) => {
  console.log('收到 Worker 的消息:', event.data);
};
```

## 7. WebSocket

WebSocket 提供了全双工通信通道，允许服务器和客户端之间实时通信。

```javascript
const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {
  console.log('连接已建立');
  socket.send('Hello Server');
};

socket.onmessage = (event) => {
  console.log('收到服务器消息:', event.data);
};
```

## 8. 多媒体元素

HTML5 引入了原生的音频和视频元素。

```html
<audio src="music.mp3" controls>您的浏览器不支持音频元素。</audio>

<video src="video.mp4" controls width="600">您的浏览器不支持视频元素。</video>
```

## 9. 拖放 API

HTML5 提供了原生的拖放功能。

```html
<div draggable="true" id="dragElement">可拖动元素</div>
<div id="dropZone">放置区域</div>

<script>
  const dragElement = document.getElementById('dragElement');
  const dropZone = document.getElementById('dropZone');

  dragElement.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', '拖动的数据');
  });

  dropZone.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  dropZone.addEventListener('drop', (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    console.log('接收到的数据:', data);
  });
</script>
```

## 10. 响应式设计

HTML5 支持响应式设计，通过媒体查询和其他技术适应不同屏幕尺寸。

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<style>
  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }
</style>
```

## 总结

HTML5 引入了许多强大的新特性，使网页开发更加灵活和功能丰富。这些特性不仅提高了开发效率，也改善了用户体验。在实际开发中，我们应该充分利用这些特性，构建现代化的 Web 应用。
