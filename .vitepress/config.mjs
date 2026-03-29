import { defineConfig } from 'vitepress';

const sidebar = [
  {
    text: 'Java',
    collapsed: false,
    items: [
      { text: 'Java 基础', link: '/java-basic/index' },
      { text: '数据库基础', link: '/database/index' },
      { text: 'Java 框架与库', link: '/java-framework/index' },
    ],
  },
  {
    text: '基础',
    collapsed: false,
    items: [
      { text: 'HTML5 新特性', link: '/html/html5-features' },
      { text: 'CSS 进阶', link: '/css/advanced-css' },
      { text: 'SCSS 和 Less 函数', link: '/css/scss-less-functions' },
      { text: 'JavaScript', link: '/js/index' },
      { text: 'JavaScript 深入', link: '/js/advanced-js' },
      { text: 'JavaScript-1', link: '/questions/js1' },
      { text: 'JavaScript-2', link: '/questions/js2' },
      { text: 'Css', link: '/questions/css' },
    ],
  },
  {
    text: '框架',
    collapsed: false,
    items: [
      { text: 'vue2', link: '/vue/vue2.x' },
      { text: 'vue3', link: '/vue/vue3.x' },
      { text: 'react', link: '/react/index' },
    ],
  },
  {
    text: 'Leet Code',
    collapsed: false,
    items: [
      { text: '数组', link: '/leetcode/array' },
      { text: '字符串', link: '/leetcode/string' },
      { text: '树', link: '/leetcode/tree' },
      { text: '链表', link: '/leetcode/list' },
      { text: '其它', link: '/leetcode/other' },
    ],
  },
  {
    text: '前端工程化',
    collapsed: false,
    items: [{ text: '工程化实践', link: '/engineering/frontend-engineering' }],
  },
  {
    text: '性能优化',
    collapsed: false,
    items: [
      { text: '前端性能优化', link: '/performance/frontend-performance' },
    ],
  },
  {
    text: '安全',
    collapsed: false,
    items: [{ text: '前端安全', link: '/security/frontend-security' }],
  },
  {
    text: 'Other',
    collapsed: false,
    items: [
      { text: 'git', link: '/other/git' },
      { text: 'browser', link: '/other/browser' },
      { text: 'design-pattern', link: '/other/design-pattern' },
    ],
  },
];

// const sidebar = {
//   '/frame/': [
//     {
//       text: 'vue2.x',
//       items: [{ text: '/Index/', link: '/vue/vue2.x' }],
//     },
//   ],
// };
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "JiangBei's Notes",
  description: '江北的技术笔记与学习记录',
  srcDir: 'src',
  base: '/blog/',
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.svg',
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Site Guide', link: '/site-guide/index' },
      {
        text: 'TypeScript',
        items: [{ text: 'typescript的内置工具类型', link: '/ts/utility' }],
      },
    ],

    sidebar: sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
  head: [
    ['link', { rel: 'icon', href: '/blog/logo.svg', type: 'image/svg+xml' }],
  ],
});
