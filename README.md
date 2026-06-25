# Cyber UI — 组件库官网与骨架

这是 Cyber UI 组件库的官方文档站点与代码仓库（骨架）。本仓库同时保留组件库实现的位置（`src/lib/`），后续会逐步加入基于 Element Plus（Vue 3）的封装组件。

快速开始

1. 安装依赖

```bash
npm install
```

2. 启动开发服务器

```bash
npm run dev
```

项目结构（关键信息）

- `index.html` - 应用入口
- `src/main.js` - Vue 应用挂载点，同时引入了主题样式 `src/styles/themes.css`
- `src/App.vue` - 文档网站骨架（header、hero、组件占位、playground、主题展示）
- `src/components/` - UI 独立组件（SiteHeader、ThemeSwitcher 等）
- `src/styles/themes.css` - 赛博朋克风格色卡与 CSS 变量
- `src/lib/` - 组件库实现占位，未来在此实现并导出我们的 Cyber 组件

主题与色卡

当前支持两套主题（通过给 `html` 添加 `.theme-blue` 切换）:
- 默认赛博（magenta / cyan）
- 偏蓝赛博（blue / cyan）

组件开发注意

请在 `src/lib/` 下组织组件，并使用 `var(--...)` CSS 变量来读取主题色，这样可以在站点和组件之间统一切换主题。

后续计划

- 使用 Element Plus 对接并封装具有 Cyber 风格的组件
- 为每个组件添加独立示例和文档页面
- 增加在线 Playground 与可编辑示例

欢迎开始在 `src/lib/` 下实现第一个组件：CButton 或 CInput。
