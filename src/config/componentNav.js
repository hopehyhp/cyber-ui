/** 组件文档侧边栏导航配置 */

export const topLinks = [
  { label: '更新日志', to: '/components#changelog' },
  { label: '设计原则', to: '/components#design' },
]

export const guideNav = [
  { label: '介绍', to: '/components' },
  { label: '安装', to: '/components#install' },
  { label: '快速上手', to: '/components#quickstart' },
  { label: '主题定制', to: '/components/palette' },
  { label: '图标', to: '/components#icons' },
]

export const componentGroups = [
  {
    category: 'Basic',
    categoryLabel: '基础',
    items: [
      { name: 'Button', label: '按钮', to: '/components/button', ready: true },
      { name: 'Icon', label: '图标', to: '/components#icons', ready: false },
      { name: 'Badge', label: '徽标', to: '/components/badge', ready: true },
    ],
  },
  {
    category: 'Form',
    categoryLabel: '表单',
    items: [
      { name: 'Input', label: '输入框', to: '/components/input', ready: true },
      { name: 'Select', label: '选择器', ready: false },
      { name: 'Switch', label: '开关', ready: false },
      { name: 'Checkbox', label: '多选框', ready: false },
    ],
  },
  {
    category: 'Theme',
    categoryLabel: '主题',
    items: [
      { name: 'Palette', label: '色彩', to: '/components/palette', ready: true },
      { name: 'Typography', label: '字体', ready: false },
      { name: 'Border', label: '边框', ready: false },
    ],
  },
  {
    category: 'Data',
    categoryLabel: '数据',
    items: [
      { name: 'Table', label: '表格', ready: false },
      { name: 'Tag', label: '标签', ready: false },
      { name: 'Progress', label: '进度条', ready: false },
    ],
  },
  {
    category: 'Notice',
    categoryLabel: '反馈',
    items: [
      { name: 'Alert', label: '警告', ready: false },
      { name: 'Message', label: '消息提示', ready: false },
      { name: 'Dialog', label: '对话框', ready: false },
    ],
  },
  {
    category: 'Navigation',
    categoryLabel: '导航',
    items: [
      { name: 'Menu', label: '导航菜单', ready: false },
      { name: 'Tabs', label: '标签页', ready: false },
      { name: 'Breadcrumb', label: '面包屑', ready: false },
    ],
  },
]

export const readyComponents = componentGroups
  .flatMap((g) => g.items)
  .filter((item) => item.ready)
