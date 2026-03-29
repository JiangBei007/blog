# CSS 进阶

CSS 是网页样式的核心，掌握 CSS 进阶技巧可以帮助我们创建更加美观和响应式的网页。

## 1. CSS Grid 布局

CSS Grid 是一种二维布局系统，允许我们同时控制行和列。

### 基本语法

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 200px;
  gap: 20px;
}
```

### 常用属性

- `grid-template-columns`: 定义列的大小和数量
- `grid-template-rows`: 定义行的大小和数量
- `grid-column`: 定义项目的列位置
- `grid-row`: 定义项目的行位置
- `grid-area`: 定义项目的区域
- `gap`: 定义项目之间的间距

### 示例

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.grid-item {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
}
```

## 2. Flexbox 布局

Flexbox 是一种一维布局系统，适合处理行或列的布局。

### 基本语法

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### 常用属性

- `flex-direction`: 定义主轴方向
- `justify-content`: 定义主轴上的对齐方式
- `align-items`: 定义交叉轴上的对齐方式
- `flex-wrap`: 定义是否换行
- `flex-grow`: 定义项目的增长比例
- `flex-shrink`: 定义项目的缩小比例
- `flex-basis`: 定义项目的基准大小

### 示例

```css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.flex-item {
  flex: 1 1 200px;
  margin: 10px;
  padding: 20px;
  background-color: #e0e0e0;
  border-radius: 8px;
}
```

## 3. CSS 动画

CSS 动画允许我们创建平滑的过渡效果和动画。

### 过渡动画

```css
.transition-element {
  transition: all 0.3s ease;
}

.transition-element:hover {
  transform: scale(1.1);
  background-color: #ff6b6b;
}
```

### 关键帧动画

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animated-element {
  animation: fadeIn 0.6s ease-out;
}
```

### 常用动画属性

- `animation-name`: 定义动画名称
- `animation-duration`: 定义动画持续时间
- `animation-timing-function`: 定义动画 timing 函数
- `animation-delay`: 定义动画延迟
- `animation-iteration-count`: 定义动画重复次数
- `animation-direction`: 定义动画方向
- `animation-fill-mode`: 定义动画填充模式

## 4. CSS 变量

CSS 变量允许我们定义可重用的值，提高代码的可维护性。

### 基本语法

```css
:root {
  --primary-color: #4a6fa5;
  --secondary-color: #f4a261;
  --font-size: 16px;
  --spacing: 20px;
}

.element {
  color: var(--primary-color);
  font-size: var(--font-size);
  margin: var(--spacing);
}
```

### 变量的优势

- 便于维护：只需修改一处，多处生效
- 支持动态修改：可以通过 JavaScript 修改变量值
- 提高可读性：使用有意义的变量名

## 5. CSS 预处理器

CSS 预处理器如 Sass 和 Less 提供了更强大的功能，如变量、嵌套、混合等。

### Sass 示例

```scss
// 变量
$primary-color: #4a6fa5;
$secondary-color: #f4a261;

// 嵌套
.header {
  background-color: $primary-color;
  padding: 20px;
  
  .nav {
    display: flex;
    justify-content: space-between;
    
    a {
      color: white;
      text-decoration: none;
      
      &:hover {
        color: $secondary-color;
      }
    }
  }
}

// 混合
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  @include flex-center;
  flex-direction: column;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
}
```

## 6. CSS 选择器进阶

### 伪类选择器

```css
/*  hover 状态 */
a:hover {
  color: #ff6b6b;
}

/* 第一个子元素 */
ul li:first-child {
  font-weight: bold;
}

/* 最后一个子元素 */
ul li:last-child {
  margin-bottom: 0;
}

/* 第 n 个子元素 */
ul li:nth-child(2n) {
  background-color: #f0f0f0;
}
```

### 伪元素

```css
/* 内容前添加 */
.element::before {
  content: "★";
  color: #ffd700;
  margin-right: 5px;
}

/* 内容后添加 */
.element::after {
  content: "...";
}

/* 选中的文本 */
::selection {
  background-color: #ff6b6b;
  color: white;
}
```

## 7. 响应式设计

### 媒体查询

```css
/* 移动设备 */
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
  
  .nav {
    flex-direction: column;
  }
}

/* 平板设备 */
@media (min-width: 769px) and (max-width: 1024px) {
  .container {
    padding: 20px;
  }
}

/* 桌面设备 */
@media (min-width: 1025px) {
  .container {
    padding: 30px;
  }
}
```

### 视口单位

```css
.hero {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text {
  font-size: 5vw;
  line-height: 1.2;
}
```

## 8. CSS 性能优化

### 选择器优化

- 避免使用过于复杂的选择器
- 优先使用类选择器，避免使用标签选择器
- 避免使用通配符选择器

### 样式优化

- 减少 CSS 文件大小
- 避免使用 `!important`
- 合理使用继承
- 避免不必要的动画和过渡

### 加载优化

- 使用 CSS 压缩
- 合理使用媒体查询
- 考虑使用 CSS-in-JS 或 CSS 模块

## 总结

CSS 进阶技巧可以帮助我们创建更加美观、响应式和高性能的网页。通过掌握 Grid、Flexbox、动画、变量等技术，我们可以更高效地实现复杂的布局和交互效果。在实际开发中，我们应该根据具体需求选择合适的技术，并注意代码的可维护性和性能。