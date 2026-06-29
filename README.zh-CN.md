<div align="center">

<p>
  <a href="./README.md">EN</a> · <strong>中文</strong>
</p>

# ⚡ Cyber UI

**赛博朋克风格的 Vue 3 组件库 · 文档站点一体仓库**

[![Vue 3](https://img.shields.io/badge/Vue-3.3-42b883?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.5-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Status](https://img.shields.io/badge/Status-Early%20Development-orange)](https://github.com/hopehyhp/cyber-ui)

[在线演示](https://ui.hopehu.cloud/) · [快速开始](#-快速开始) · [组件文档](#-组件文档) · [Issue 反馈](https://github.com/hopehyhp/cyber-ui/issues)

<br />

<img src="https://img.shields.io/badge/主题-Dark%20%7C%20Light-22d3ee?style=for-the-badge" alt="themes" />
<img src="https://img.shields.io/badge/风格-Cyberpunk-6366f1?style=for-the-badge" alt="style" />

</div>

---

## ✨ 特性

| | |
| --- | --- |
| 🎨 **双主题系统** | Dark / Light 一键切换，CSS 变量驱动，组件与文档站配色同步 |
| 🧩 **Vue 3 原生** | Composition / Options API 均可，基于 Vite 极速 HMR |
| 💠 **赛博视觉** | 青蓝 + 靛紫强调色、霓虹光晕、玻璃质感 surface |
| 📦 **Monorepo 结构** | `src/lib/` 组件库与文档站同仓开发，改组件即见文档 |
| 🔧 **可扩展图标** | 内置 `CIcon` + `registerIcon`，按需注册 SVG 路径 |

---

## 📸 预览

> 运行 `npm run dev` 后访问本地文档站，首页可实时切换主题并预览色卡。

```
┌─────────────────────────────────────────────────────┐
│  Cyber UI          组件 · Playground · 主题    [Dark]│
├─────────────────────────────────────────────────────┤
│                                                     │
│   ░░  Cyber UI  ░░   赛博朋克配色与组件预览          │
│                                                     │
│   ┌──────────────┐  ┌──────────────┐               │
│   │ Theme preview│  │ Appearance   │               │
│   │ ■ ■ ■ ■      │  │ [Dark][Light]│               │
│   │ [Primary]    │  └──────────────┘               │
│   └──────────────┘                                  │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 快速开始

### 环境要求

- **Node.js** ≥ 16
- **npm** ≥ 8

### 克隆 & 开发

```bash
git clone git@github.com:hopehyhp/cyber-ui.git
cd cyber-ui
npm install
npm run dev
```

浏览器打开终端提示的地址（默认 `http://localhost:5173`）。

### 在项目中使用

```bash
npm install cyber-ui
```

```js
// main.js
import { createApp } from 'vue'
import CyberUI from 'cyber-ui'
import 'cyber-ui/styles'

const app = createApp(App)
app.use(CyberUI)
app.mount('#app')
```

```vue
<script setup>
import { CButton, CIcon } from 'cyber-ui'
</script>

<template>
  <CButton type="primary" icon="search">搜索</CButton>
  <CIcon name="close" :size="20" />
</template>
```

### 构建

```bash
npm run build        # 文档站 + 组件库
npm run build:lib    # 仅组件库（npm 发布产物）
npm run preview      # 预览构建结果
```

---

## 📚 组件文档

组件 API、Props、示例代码均在本地文档站中维护。启动 `npm run dev` 后访问 **组件** 页面，涵盖：

- **基础** — Button、Badge
- **表单** — Input、Select、Switch、Checkbox
- **主题** — Palette、Typography、Border
- **数据** — Table、Tag、Progress
- **反馈** — Alert、Message、Tooltip、Dialog
- **导航** — Menu、Tabs、Breadcrumb

另提供图标注册表与 `registerIcon` 扩展说明。

---

## 🎨 主题

主题通过 `data-theme` 属性切换，所有组件使用 CSS 变量，无需硬编码颜色。

```html
<!-- 深色（默认） -->
<html data-theme="dark">

<!-- 浅色 -->
<html data-theme="light">
```

| Token | Dark | Light |
| --- | --- | --- |
| `--accent` | `#22d3ee` | `#0284c7` |
| `--accent-2` | `#6366f1` | `#6366f1` |
| `--text` | `#e8edf5` | `#0f172a` |
| `--bg-solid` | `#0f1419` | `#ffffff` |

主题定义位于 `src/styles/theme-dark.css` 与 `src/styles/theme-light.css`。

---

## 📁 项目结构

```
cyber-ui/
├── index.html                 # 应用入口
├── vite.config.js             # 文档站构建
├── vite.lib.config.js         # 组件库构建
├── src/
│   ├── main.js                # Vue 挂载 + 全局样式
│   ├── App.vue                # 文档站布局
│   ├── router/                # 路由（首页 / 组件文档）
│   ├── views/                 # 页面视图
│   ├── demos/                 # 组件文档 Demo（不发布）
│   ├── components/            # 文档站 UI（Header、CodeBlock…）
│   ├── config/                # 文档导航配置
│   ├── styles/
│   │   ├── themes.css         # 主题入口 & 全局样式
│   │   ├── theme-dark.css     # 深色 token
│   │   └── theme-light.css    # 浅色 token
│   └── lib/                   # 📦 组件库本体（npm 发布）
│       ├── index.js           # 统一导出
│       ├── icons/             # 图标注册表
│       └── components/        # 组件源码
└── package.json
```

---

## 🛠 脚本

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动 Vite 开发服务器 |
| `npm run build` | 生产环境构建（文档站 + 组件库） |
| `npm run build:lib` | 组件库构建（npm 发布产物） |
| `npm run preview` | 预览构建结果 |
| `npm run lint` | ESLint 检查并自动修复 |
| `npm run lint:check` | ESLint 仅检查 |
| `npm run format` | Prettier 格式化 |
| `npm run format:check` | Prettier 格式检查 |

---

## 🧑‍💻 开发指南

在 `src/lib/components/` 下新增组件，并在 `src/lib/index.js` 中导出。Demo 页面放在 `src/demos/`：

```js
// src/lib/index.js
export { default as CButton } from './components/CButton.vue'
export { default as CYourComponent } from './components/CYourComponent.vue'
```

**约定：**

1. 样式一律使用 `var(--accent)` 等 CSS 变量
2. 在 `src/demos/` 编写 Demo，并在 `src/router/index.js` 与 `src/config/componentNav.js` 注册
3. 组件命名以 `C` 前缀区分（如 `CButton`、`CIcon`）
4. 发包前执行 `npm run build:lib`，使用者需 `import 'cyber-ui/styles'`

---

## 🗺 路线图

- [x] 文档站骨架 & 路由
- [x] Dark / Light 双主题
- [x] 基础、表单、数据、反馈、导航组件
- [x] Typography / Border / Palette 主题 token 文档
- [x] `npm run build:lib` 组件库构建
- [ ] 在线 Playground & 可编辑示例
- [ ] npm 发包 & 独立文档部署

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feat/amazing-feature`
3. 提交改动：`git commit -m 'feat: add amazing feature'`
4. 推送分支：`git push origin feat/amazing-feature`
5. 发起 Pull Request

---

<div align="center">

**如果这个项目对你有帮助，欢迎点个 ⭐ Star**

Made with 💜 by [hopehyhp](https://github.com/hopehyhp)

</div>
