# SCSS 和 Less 函数用法

SCSS 和 Less 都提供了丰富的内置函数，可以帮助我们更高效地编写样式代码。本文将介绍常用的函数用法。

## 1. SCSS 函数

### 1.1 颜色函数

#### `lighten()` - 变亮

```scss
$primary: #4a6fa5;
.lighter {
  color: lighten($primary, 20%); // 变亮 20%
}
```

#### `darken()` - 变暗

```scss
.darker {
  color: darken($primary, 20%); // 变暗 20%
}
```

#### `saturate()` - 增加饱和度

```scss
.more-saturated {
  color: saturate($primary, 30%); // 增加 30% 饱和度
}
```

#### `desaturate()` - 降低饱和度

```scss
.less-saturated {
  color: desaturate($primary, 30%); // 降低 30% 饱和度
}
```

#### `rgba()` - 创建 RGBA 颜色

```scss
.transparent {
  background-color: rgba($primary, 0.5); // 半透明
}
```

### 1.2 字符串函数

#### `quote()` - 添加引号

```scss
$font-name: Arial;
.font-family {
  font-family: quote($font-name); // "Arial"
}
```

#### `unquote()` - 移除引号

```scss
$url: 'images/logo.png';
.bg-image {
  background-image: url(unquote($url)); // url(images/logo.png)
}
```

#### `str-length()` - 获取字符串长度

```scss
$text: 'Hello World';
$length: str-length($text); // 11
```

### 1.3 数学函数

#### `abs()` - 绝对值

```scss
$num: -10;
.positive {
  margin: abs($num) px; // 10px
}
```

#### `ceil()` - 向上取整

```scss
$size: 12.3px;
.rounded-up {
  font-size: ceil($size); // 13px
}
```

#### `floor()` - 向下取整

```scss
.rounded-down {
  font-size: floor($size); // 12px
}
```

#### `round()` - 四舍五入

```scss
.rounded {
  font-size: round($size); // 12px
}
```

#### `max()` 和 `min()` - 最大/最小值

```scss
$widths: 200px, 300px, 150px;
.max-width {
  width: max($widths...); // 300px
}
.min-width {
  width: min($widths...); // 150px
}
```

### 1.4 列表函数

#### `length()` - 获取列表长度

```scss
$colors: red, green, blue;
$count: length($colors); // 3
```

#### `nth()` - 获取列表中的元素

```scss
.second-color {
  color: nth($colors, 2); // green
}
```

#### `append()` - 向列表添加元素

```scss
$new-colors: append($colors, yellow); // red, green, blue, yellow
```

#### `join()` - 合并两个列表

```scss
$more-colors: join($colors, $new-colors);
```

### 1.5 条件函数

#### `if()` - 三元运算符

```scss
$is-dark: true;
.theme {
  background-color: if($is-dark, #333, #fff);
  color: if($is-dark, #fff, #333);
}
```

### 1.6 循环函数

#### `@for` - 数字循环

```scss
// 从 1 到 5
@for $i from 1 through 5 {
  .item-#{$i} {
    width: 100px * $i;
  }
}

// 从 1 到 4（不包括 5）
@for $i from 1 to 5 {
  .box-#{$i} {
    margin-left: 10px * $i;
  }
}
```

#### `@each` - 列表循环

```scss
$colors: red, green, blue, yellow;

@each $color in $colors {
  .text-#{$color} {
    color: $color;
  }
}

// 循环 Map
$sizes: (
  small: 12px,
  medium: 16px,
  large: 20px,
);

@each $name, $size in $sizes {
  .font-#{$name} {
    font-size: $size;
  }
}
```

#### `@while` - 条件循环

```scss
$i: 1;
@while $i <= 3 {
  .col-#{$i} {
    width: 100% / 3 * $i;
  }
  $i: $i + 1;
}
```

### 1.7 自定义函数

```scss
@function rem($px, $base: 16px) {
  @return $px / $base * 1rem;
}

.element {
  font-size: rem(18px); // 1.125rem
  padding: rem(20px); // 1.25rem
}
```

## 2. Less 函数

### 2.1 颜色函数

#### `lighten()` - 变亮

```less
@primary: #4a6fa5;
.lighter {
  color: lighten(@primary, 20%); // 变亮 20%
}
```

#### `darken()` - 变暗

```less
.darker {
  color: darken(@primary, 20%); // 变暗 20%
}
```

#### `saturate()` - 增加饱和度

```less
.more-saturated {
  color: saturate(@primary, 30%); // 增加 30% 饱和度
}
```

#### `desaturate()` - 降低饱和度

```less
.less-saturated {
  color: desaturate(@primary, 30%); // 降低 30% 饱和度
}
```

#### `fade()` - 设置透明度

```less
.transparent {
  background-color: fade(@primary, 50%); // 半透明
}
```

#### `mix()` - 混合颜色

```less
@color1: red;
@color2: blue;
.mixed {
  color: mix(@color1, @color2, 50%); // 50% 混合
}
```

### 2.2 数学函数

#### `ceil()` - 向上取整

```less
@size: 12.3px;
.rounded-up {
  font-size: ceil(@size); // 13px
}
```

#### `floor()` - 向下取整

```less
.rounded-down {
  font-size: floor(@size); // 12px
}
```

#### `round()` - 四舍五入

```less
.rounded {
  font-size: round(@size); // 12px
}
```

#### `abs()` - 绝对值

```less
@num: -10;
.positive {
  margin: abs(@num) px; // 10px
}
```

#### `percentage()` - 转换为百分比

```less
@ratio: 0.5;
.width {
  width: percentage(@ratio); // 50%
}
```

### 2.3 字符串函数

#### `e()` - 转义字符串

```less
@prop: color;
.element {
  @{prop}: red; // color: red
}
```

#### `replace()` - 替换字符串

```less
@text: 'Hello World';
@new-text: replace(@text, 'World', 'Less'); // "Hello Less"
```

### 2.4 列表函数

#### `length()` - 获取列表长度

```less
@colors: red, green, blue;
@count: length(@colors); // 3
```

#### `extract()` - 获取列表中的元素

```less
.second-color {
  color: extract(@colors, 2); // green
}
```

### 2.5 类型检查函数

#### `isnumber()` - 检查是否为数字

```less
@value: 10;
@is-num: isnumber(@value); // true
```

#### `iscolor()` - 检查是否为颜色

```less
@is-color: iscolor(@primary); // true
```

#### `isstring()` - 检查是否为字符串

```less
@is-string: isstring(@text); // true
```

### 2.6 循环函数

Less 不像 SCSS 那样有内置的循环语法，但可以通过递归 mixins 来实现循环。

#### 数字循环

```less
// 定义循环 mixin
.loop(@counter) when (@counter > 0) {
  .item-@{counter} {
    width: 100px * @counter;
  }
  .loop(@counter - 1); // 递归调用
}

// 调用循环
.loop(5);
```

#### 范围循环

```less
// 从 start 到 end
.loop(@i, @n) when (@i =< @n) {
  .col-@{i} {
    width: 100% / @n * @i;
  }
  .loop(@i + 1, @n);
}

// 调用循环，从 1 到 6
.loop(1, 6);
```

#### 列表循环

```less
// 定义列表
@colors: red, green, blue, yellow;

// 循环 mixin
.loop-colors(@i: 1) when (@i =< length(@colors)) {
  @color: extract(@colors, @i);
  .text-@{color} {
    color: @color;
  }
  .loop-colors(@i + 1);
}

// 调用循环
.loop-colors();
```

#### 条件循环

```less
// 递归循环，直到满足条件
.loop(@i) when (@i > 0) {
  .box-@{i} {
    margin-left: 10px * @i;
  }
  .loop(@i - 1);
}

// 调用循环
.loop(3);
```

### 2.7 自定义函数（使用 Mixins 模拟）

Less 不支持像 SCSS 那样的 `@function` 语法，但可以通过 mixins 来实现类似的功能：

```less
.rem(@px, @base: 16px) {
  @result: unit(@px / @base, rem);
}

.element {
  .rem(18px);
  font-size: @result; // 1.125rem
}
```

## 3. 实际应用示例

### SCSS 实战：主题系统

```scss
$theme-colors: (
  primary: #4a6fa5,
  secondary: #f4a261,
  success: #2ecc71,
  danger: #e74c3c,
);

@function theme-color($key) {
  @return map-get($theme-colors, $key);
}

.button {
  background-color: theme-color(primary);

  &:hover {
    background-color: darken(theme-color(primary), 10%);
  }
}
```

### Less 实战：间距系统

```less
@spacer: 8px;

.spacing(@multiplier) {
  @result: @spacer * @multiplier;
}

.box {
  .spacing(2);
  padding: @result; // 16px

  .spacing(4);
  margin-bottom: @result; // 32px
}
```

### SCSS 实战：生成响应式断点

```scss
$breakpoints: (
  mobile: 480px,
  tablet: 768px,
  desktop: 1024px,
  wide: 1440px,
);

@mixin respond-to($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media (min-width: map-get($breakpoints, $breakpoint)) {
      @content;
    }
  }
}

.container {
  padding: 10px;

  @include respond-to(tablet) {
    padding: 20px;
  }

  @include respond-to(desktop) {
    padding: 30px;
  }
}
```

### SCSS 实战：生成网格系统

```scss
$columns: 12;

@for $i from 1 through $columns {
  .col-#{$i} {
    width: percentage($i / $columns);
    float: left;
  }
}

// 生成响应式网格
@for $i from 1 through $columns {
  @media (max-width: 768px) {
    .col-#{$i} {
      width: 100%;
    }
  }
}
```

### Less 实战：生成按钮变体

```less
@colors: primary, secondary, success, danger, warning;
@color-map: {
  primary: #4a6fa5;
  secondary: #f4a261;
  success: #2ecc71;
  danger: #e74c3c;
  warning: #f39c12;
};

.loop-buttons(@i: 1) when (@i =< length(@colors)) {
  @name: extract(@colors, @i);
  @color: @color-map[@name];

  .btn-@{name} {
    background-color: @color;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;

    &:hover {
      background-color: darken(@color, 10%);
    }
  }

  .loop-buttons(@i + 1);
}

.loop-buttons();
```

### SCSS 实战：生成动画延迟

```scss
$items: 5;
$base-delay: 0.1s;

@for $i from 1 through $items {
  .animate-item-#{$i} {
    animation: fadeIn 0.6s ease-out;
    animation-delay: $base-delay * $i;
  }
}
```

### Less 实战：生成工具类

```less
// 生成间距工具类
.loop-spacing(@i, @property, @direction) when (@i > 0) {
  .@{property}-@{direction}-@{i} {
    @{property}-@{direction}: @spacer * @i;
  }
  .loop-spacing(@i - 1, @property, @direction);
}

.loop-spacing(8, margin, top);
.loop-spacing(8, margin, bottom);
.loop-spacing(8, padding, left);
.loop-spacing(8, padding, right);
```

## 总结

SCSS 和 Less 都提供了强大的函数库，可以帮助我们：

- 更灵活地处理颜色
- 进行数学计算
- 操作字符串和列表
- 创建可复用的自定义函数
- 使用循环批量生成样式代码

选择 SCSS 还是 Less 主要取决于项目需求和团队偏好，但两者都能显著提升 CSS 开发效率。SCSS 的循环语法更加直观，而 Less 通过递归 mixins 也能实现类似功能。
