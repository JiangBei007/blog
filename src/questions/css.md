## css 画对角线

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title></title>
    <style>
      .triangle {
        border: 1px solid #333;
        width: 300px;
        height: 150px;
        background:
          linear-gradient(
            to top right,
            rgba(0, 0, 0, 0.1) 0%,
            rgba(0, 0, 0, 0.1) calc(50% - 1px),
            rgba(0, 0, 0, 0.8) 50%,
            rgba(0, 0, 0, 0.1) calc(50% + 1px),
            rgba(0, 0, 0, 0.1) 100%
          ),
          linear-gradient(
            to bottom right,
            rgba(0, 0, 0, 0.1) 0%,
            rgba(0, 0, 0, 0.1) calc(50% - 1px),
            rgba(0, 0, 0, 0.8) 50%,
            rgba(0, 0, 0, 0.1) calc(50% + 1px),
            rgba(0, 0, 0, 0.1) 100%
          );
      }
    </style>
  </head>
  <body>
    <div class="triangle"></div>
  </body>
</html>
```

## BFC

先来看两个相关的概念：

- Box: Box 是 CSS 布局的对象和基本单位，⼀个⻚⾯是由很多个 Box 组成的，这个 Box 就是我们所说的盒模型。
- Formatting context：块级上下⽂格式化，它是⻚⾯中的⼀块渲染区域，并且有⼀套渲染规则，它决定了其⼦元素将如何定位，以及和其他元素的关系和相互作⽤。

块格式化上下文（Block Formatting Context，BFC）是 Web 页面的可视化 CSS 渲染的一部分，是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的交互限定区域。

通俗来讲：BFC 是一个独立的布局环境，可以理解为一个容器，在这个容器中按照一定规则进行物品摆放，并且不会影响其它环境中的物品。如果一个元素符合触发 BFC 的条件，则 BFC 中的元素布局不受外部影响。

**创建 BFC 的条件：**

- 根元素：body；
- 元素设置浮动：float 除 none 以外的值；
- 元素设置绝对定位：position (absolute、fixed)；
- display 值为：inline-block、table-cell、table-caption、flex 等；
- overflow 值为：hidden、auto、scroll；

**BFC 的特点：**

- 垂直方向上，自上而下排列，和文档流的排列方式一致。
- 在 BFC 中上下相邻的两个容器的 margin 会重叠
- 计算 BFC 的高度时，需要计算浮动元素的高度
- BFC 区域不会与浮动的容器发生重叠
- BFC 是独立的容器，容器内部元素不会影响外部元素
- 每个元素的左 margin 值和容器的左 border 相接触

**BFC 的作用：**

- **解决 margin 的重叠问题**：由于 BFC 是一个独立的区域，内部的元素和外部的元素互不影响，将两个元素变为两个 BFC，就解决了 margin 重叠的问题。
- **解决高度塌陷的问题**：在对子元素设置浮动后，父元素会发生高度塌陷，也就是父元素的高度变为 0。解决这个问题，只需要把父元素变成一个 BFC。常用的办法是给父元素设置`overflow:hidden`。
- **创建自适应两栏布局**：可以用来创建自适应两栏布局：左边的宽度固定，右边的宽度自适应。

```css
.left{
     width: 100px;
     height: 200px;
     background: red;
     float: left;
 }
 .right{
     height: 300px;
     background: blue;
     overflow: hidden;
 }

<div class="left"></div>
<div class="right"></div>
```

左侧设置`float:left`，右侧设置`overflow: hidden`。这样右边就触发了 BFC，BFC 的区域不会与浮动元素发生重叠，所以两侧就不会发生重叠，实现了自适应两栏布局。

## 盒模型

CSS 盒模型本质上是一个盒子，封装周围的 HTML 元素，它包括：边距，边框，填充，和实际内容。

盒模型有两种：

- **标准盒模型**（content-box）：width = content
- **IE 盒模型**（border-box）：width = content + padding + border

```css
box-sizing: content-box; /* 标准盒模型 */
box-sizing: border-box; /* IE 盒模型（推荐） */
```

## 选择器优先级

优先级计算规则（从高到低）：

1. `!important`
2. 行内样式（style="..."）
3. ID 选择器（#id）
4. 类选择器、属性选择器、伪类选择器（.class、[attr]、:hover）
5. 元素选择器、伪元素选择器（div、::before）
6. 通配符选择器（\*）

权重计算：

- !important：∞
- 行内样式：1000
- ID 选择器：100
- 类/属性/伪类：10
- 元素/伪元素：1
- 通配符：0

## Flexbox 布局

Flexbox 是一维布局模型，用于在容器中分配空间和对齐内容。

**容器属性：**

```css
.container {
  display: flex;
  flex-direction: row | row-reverse | column | column-reverse; /* 主轴方向 */
  flex-wrap: nowrap | wrap | wrap-reverse; /* 换行 */
  flex-flow: <flex-direction> <flex-wrap>; /* 简写 */
  justify-content: flex-start | flex-end | center | space-between | space-around
    | space-evenly; /* 主轴对齐 */
  align-items: stretch | flex-start | flex-end | center | baseline; /* 交叉轴对齐 */
  align-content: flex-start | flex-end | center | space-between | space-around |
    stretch; /* 多行对齐 */
}
```

**项目属性：**

```css
.item {
  order: <integer>; /* 排序 */
  flex-grow: <number>; /* 放大比例 */
  flex-shrink: <number>; /* 缩小比例 */
  flex-basis: <length> | auto; /* 初始大小 */
  flex: <flex-grow> <flex-shrink> <flex-basis>; /* 简写 */
  align-self: auto | flex-start | flex-end | center | baseline | stretch; /* 单独对齐 */
}
```

## Grid 布局

Grid 是二维布局模型，可以同时处理行和列。

```css
.container {
  display: grid;
  grid-template-columns: 100px 1fr 100px; /* 列定义 */
  grid-template-rows: 100px 1fr 100px; /* 行定义 */
  grid-template-areas:
    'header header header'
    'sidebar content ads'
    'footer footer footer'; /* 区域定义 */
  grid-gap: 10px; /* 间距 */
  justify-items: start | end | center | stretch; /* 单元格内容水平对齐 */
  align-items: start | end | center | stretch; /* 单元格内容垂直对齐 */
}

.item {
  grid-column: 1 / 3; /* 跨列 */
  grid-row: 1 / 2; /* 跨行 */
  grid-area: header; /* 区域放置 */
}
```

## 定位

```css
position: static | relative | absolute | fixed | sticky;

/* static：默认值，正常文档流 */
/* relative：相对定位，相对于自身原始位置 */
/* absolute：绝对定位，相对于最近的已定位祖先元素 */
/* fixed：固定定位，相对于浏览器窗口 */
/* sticky：粘性定位，基于滚动位置在 relative 和 fixed 之间切换 */
```

## 居中方案

**水平居中：**

```css
/* 行内元素 */
text-align: center;

/* 块级元素 */
margin: 0 auto;

/* Flexbox */
display: flex;
justify-content: center;
```

**垂直居中：**

```css
/* 单行文本 */
line-height: height;

/* Flexbox */
display: flex;
align-items: center;

/* Grid */
display: grid;
place-items: center;

/* 绝对定位 + transform */
position: absolute;
top: 50%;
transform: translateY(-50%);
```

**水平垂直居中：**

```css
/* Flexbox */
display: flex;
justify-content: center;
align-items: center;

/* Grid */
display: grid;
place-items: center;

/* 绝对定位 + transform */
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
```

## CSS 动画和过渡

**过渡（Transition）：**

```css
transition: property duration timing-function delay;

transition: all 0.3s ease;
transition: transform 0.5s ease-in-out 0.1s;
```

**动画（Animation）：**

```css
@keyframes animationName {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.element {
  animation: animationName 0.5s ease-in-out;
  animation: name duration timing-function delay iteration-count direction
    fill-mode;
}
```

## 响应式设计

**媒体查询：**

```css
@media screen and (max-width: 768px) {
  /* 移动端样式 */
}

@media screen and (min-width: 769px) and (max-width: 1024px) {
  /* 平板样式 */
}

@media screen and (min-width: 1025px) {
  /* 桌面端样式 */
}
```

**相对单位：**

```css
/* 视口单位 */
width: 100vw; /* 视口宽度 */
height: 100vh; /* 视口高度 */

/* 百分比 */
width: 50%;

/* rem/em */
font-size: 1rem; /* 根元素字体大小 */
font-size: 1em; /* 父元素字体大小 */
```

## CSS 变量

```css
:root {
  --primary-color: #007bff;
  --font-size: 16px;
}

.element {
  color: var(--primary-color);
  font-size: var(--font-size);
}
```

## 常用 CSS 技巧

**清除浮动：**

```css
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}

/* 或使用 overflow */
.container {
  overflow: hidden;
}
```

**文本溢出省略：**

```css
/* 单行省略 */
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 多行省略 */
.ellipsis-multiline {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
```

**三角形：**

```css
.triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid red;
}
```

**图片自适应：**

```css
img {
  max-width: 100%;
  height: auto;
  object-fit: cover;
}
```

**隐藏元素：**

```css
/* 占位隐藏 */
visibility: hidden;

/* 不占位隐藏 */
display: none;

/* 透明度为 0 */
opacity: 0;
```

## CSS 伪类和伪元素

**伪类：**

```css
a:hover {
  /* 鼠标悬停 */
}
a:active {
  /* 激活状态 */
}
a:visited {
  /* 已访问 */
}
a:link {
  /* 未访问 */
}
input:focus {
  /* 聚焦 */
}
:first-child {
  /* 第一个子元素 */
}
:last-child {
  /* 最后一个子元素 */
}
:nth-child(n) {
  /* 第 n 个子元素 */
}
:not(selector) {
  /* 排除选择器 */
}
```

**伪元素：**

```css
::before {
  /* 元素前插入内容 */
}
::after {
  /* 元素后插入内容 */
}
::first-letter {
  /* 首字母 */
}
::first-line {
  /* 首行 */
}
::selection {
  /* 选中的文本 */
}
```
