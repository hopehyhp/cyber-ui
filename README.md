<div align="center">

<p>
  <strong>EN</strong> · <a href="./README.zh-CN.md">中文</a>
</p>

# ⚡ Cyber UI

**A cyberpunk-styled Vue 3 component library · docs & source in one repo**

[![Vue 3](https://img.shields.io/badge/Vue-3.3-42b883?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.5-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Status](https://img.shields.io/badge/Status-Early%20Development-orange)](https://github.com/hopehyhp/cyber-ui)

[Live Demo](https://ui.hopehu.cloud/) · [Quick Start](#-quick-start) · [Component Docs](#-component-docs) · [Issues](https://github.com/hopehyhp/cyber-ui/issues)

<br />

<img src="https://img.shields.io/badge/Theme-Dark%20%7C%20Light-22d3ee?style=for-the-badge" alt="themes" />
<img src="https://img.shields.io/badge/Style-Cyberpunk-6366f1?style=for-the-badge" alt="style" />

</div>

---

## ✨ Features

| | |
| --- | --- |
| 🎨 **Dual themes** | Dark / Light toggle, CSS variables, synced across docs & components |
| 🧩 **Vue 3 native** | Composition & Options API, Vite-powered HMR |
| 💠 **Cyber aesthetic** | Cyan + indigo accents, neon glow, glass surfaces |
| 📦 **Monorepo layout** | `src/lib/` library co-located with the docs site |
| 🔧 **Extensible icons** | Built-in `CIcon` + `registerIcon` for SVG paths |

---

## 📸 Preview

> Run `npm run dev` and open the local docs site. Switch themes on the home page to preview the palette.

```
┌─────────────────────────────────────────────────────┐
│  Cyber UI          Components · Playground · Theme [Dark]│
├─────────────────────────────────────────────────────┤
│                                                     │
│   ░░  Cyber UI  ░░   Cyberpunk palette & components │
│                                                     │
│   ┌──────────────┐  ┌──────────────┐               │
│   │ Theme preview│  │ Appearance   │               │
│   │ ■ ■ ■ ■      │  │ [Dark][Light]│               │
│   │ [Primary]    │  └──────────────┘               │
│   └──────────────┘                                  │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Requirements

- **Node.js** ≥ 16
- **npm** ≥ 8

### Clone & develop

```bash
git clone git@github.com:hopehyhp/cyber-ui.git
cd cyber-ui
npm install
npm run dev
```

Open the URL shown in the terminal (default `http://localhost:5173`).

### Use in a project

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
  <CButton type="primary" icon="search">Search</CButton>
  <CIcon name="close" :size="20" />
</template>
```

### Build

```bash
npm run build        # docs site + library
npm run build:lib    # library only (npm publish output)
npm run preview      # preview production build
```

---

## 📚 Component Docs

API, props, and live examples live in the local docs site. Run `npm run dev` and open **Components**:

- **Basic** — Button, Badge
- **Form** — Input, Select, Switch, Checkbox
- **Theme** — Palette, Typography, Border
- **Data** — Table, Tag, Progress
- **Feedback** — Alert, Message, Tooltip, Dialog
- **Navigation** — Menu, Tabs, Breadcrumb

Also includes the icon registry and `registerIcon` extension guide.

---

## 🎨 Theming

Switch themes via the `data-theme` attribute. All components use CSS variables — no hard-coded colors.

```html
<!-- dark (default) -->
<html data-theme="dark">

<!-- light -->
<html data-theme="light">
```

| Token | Dark | Light |
| --- | --- | --- |
| `--accent` | `#22d3ee` | `#0284c7` |
| `--accent-2` | `#6366f1` | `#6366f1` |
| `--text` | `#e8edf5` | `#0f172a` |
| `--bg-solid` | `#0f1419` | `#ffffff` |

Theme tokens are defined in `src/styles/theme-dark.css` and `src/styles/theme-light.css`.

---

## 📁 Project Structure

```
cyber-ui/
├── index.html                 # app entry
├── vite.config.js             # docs site build
├── vite.lib.config.js         # library build
├── src/
│   ├── main.js                # Vue bootstrap + global styles
│   ├── App.vue                # docs layout
│   ├── router/                # routes (home / component docs)
│   ├── views/                 # page views
│   ├── demos/                 # component demos (not published)
│   ├── components/            # docs UI (Header, CodeBlock…)
│   ├── config/                # docs navigation config
│   ├── styles/
│   │   ├── themes.css         # theme entry & globals
│   │   ├── theme-dark.css     # dark tokens
│   │   └── theme-light.css    # light tokens
│   └── lib/                   # 📦 component library (npm publish)
│       ├── index.js           # public exports
│       ├── icons/             # icon registry
│       └── components/        # component source
└── package.json
```

---

## 🛠 Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build (docs + library) |
| `npm run build:lib` | Library build (npm publish output) |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint with auto-fix |
| `npm run lint:check` | ESLint check only |
| `npm run format` | Prettier format |
| `npm run format:check` | Prettier check only |

---

## 🧑‍💻 Development

Add components under `src/lib/components/` and export them from `src/lib/index.js`. Place demos in `src/demos/`:

```js
// src/lib/index.js
export { default as CButton } from './components/CButton.vue'
export { default as CYourComponent } from './components/CYourComponent.vue'
```

**Conventions:**

1. Use CSS variables like `var(--accent)` for all styling
2. Add demos in `src/demos/` and register routes in `src/router/index.js` and `src/config/componentNav.js`
3. Prefix component names with `C` (e.g. `CButton`, `CIcon`)
4. Run `npm run build:lib` before publishing; consumers need `import 'cyber-ui/styles'`

---

## 🗺 Roadmap

- [x] Docs site skeleton & routing
- [x] Dark / Light themes
- [x] Basic, form, data, feedback, navigation components
- [x] Typography / Border / Palette theme token docs
- [x] `npm run build:lib` library build
- [ ] Online Playground & editable examples
- [ ] npm publish & standalone docs deployment

---

## 🤝 Contributing

Issues and pull requests are welcome!

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Commit: `git commit -m 'feat: add amazing feature'`
4. Push: `git push origin feat/amazing-feature`
5. Open a Pull Request

---

<div align="center">

**If this project helps you, consider giving it a ⭐**

Made with 💜 by [hopehyhp](https://github.com/hopehyhp)

</div>
