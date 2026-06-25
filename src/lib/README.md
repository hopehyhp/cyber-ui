Cyber UI 组件库 - 本地开发说明

位置: src/lib/

说明:

- 这个目录用于放置未来我们基于 element-plus 封装的组件。
- 每个组件应放到 `src/lib/components/`，并在本文件（或 `index.js`）中统一导出。
- 建议同时提供组件的文档示例（MDX/Markdown + demo 组件），并在文档站点中引用。

主题:

- 主题色卡定义在 `src/styles/themes.css`，组件应使用 CSS 变量 (例如 var(--accent)) 来保证主题切换生效。

示例:
// src/lib/components/CButton.vue
// export default { /_ ... _/ }

开发小贴士:

- 未来我们会把 element-plus 加入依赖并在组件中按需引入样式与类型。
  // Cyber UI - component library entry (placeholder)
  // TODO: 在这里导出我们封装的组件，例如：
  // export { default as CButton } from './components/CButton.vue'

export default {
// 占位导出
}
<template>

  <div class="theme-switcher">
    <button :class="['tbtn', { active: current === 'default' }]" @click="set('default')">Default</button>
    <button :class="['tbtn', { active: current === 'blue' }]" @click="set('blue')">Blue</button>
  </div>
</template>

<script>
export default {
  name: 'ThemeSwitcher',
  data() { return { current: 'default' } },
  mounted() {
    // read initial state from document
    this.current = document.documentElement.classList.contains('theme-blue') ? 'blue' : 'default'
  },
  methods: {
    set(theme) {
      this.current = theme
      this.$emit('change', theme)
      // also toggle on document so CSS variables apply to global elements
      if (theme === 'blue') document.documentElement.classList.add('theme-blue')
      else document.documentElement.classList.remove('theme-blue')
    }
  }
}
</script>

<style scoped>
.theme-switcher { display:flex; gap:8px }
.tbtn { padding:6px 10px; border-radius:6px; border:1px solid rgba(255,255,255,0.06); background:transparent; color:var(--muted); cursor:pointer }
.tbtn.active { border-color:var(--accent); color:var(--accent) }
</style>
<template>
  <header class="site-header card">
    <div class="left">
      <div class="logo">Cyber UI</div>
      <nav class="nav">
        <a href="#components">组件</a>
        <a href="#playground">Playground</a>
        <a href="#themes">主题</a>
      </nav>
    </div>
    <div class="right">
      <ThemeSwitcher @change="onThemeChange" />
    </div>
  </header>
</template>

<script>
import ThemeSwitcher from './ThemeSwitcher.vue'
export default {
  name: 'SiteHeader',
  components: { ThemeSwitcher },
  methods: {
    onThemeChange(theme) {
      this.$emit('change-theme', theme)
    }
  }
}
</script>

<style scoped>
.site-header { display:flex; align-items:center; justify-content:space-between; padding:12px 18px; background:transparent }
.left { display:flex; align-items:center; gap:18px }
.logo { font-weight:700; color:var(--accent); font-size:18px }
.nav a { color:var(--muted); margin-right:12px; text-decoration:none }
.nav a:hover { color:var(--accent-2) }
.right { display:flex; align-items:center }
</style>

/\* Global theme tokens for Cyber UI

- Default theme (root) is neon magenta/cyan cyberpunk
- .theme-blue overrides for a bluer variant
  Toggle by adding/removing the 'theme-blue' class on <html> or documentElement
  _/
  :root {
  --bg: #0b0710; /_ very dark _/
  --surface: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.08));
  --text: #e6edf3; /_ off-white \*/
  --muted: #9aa6b2;

/_ accents _/
--accent: #ff00c8; /_ neon magenta _/
--accent-2: #00fff0; /_ neon cyan _/
--accent-3: #7b61ff; /_ purple glow _/

--glass: rgba(255,255,255,0.03);
--neon-glow: 0 4px 24px rgba(255,0,200,0.16);
}

/_ Blue-leaning cyberpunk variant _/
.theme-blue {
--bg: #071428; /_ deep blue _/
--surface: linear-gradient(180deg, rgba(255,255,255,0.01), rgba(0,0,0,0.06));
--text: #dbeefb;
--muted: #8aa6bf;

--accent: #04d9ff; /_ bright cyan _/
--accent-2: #0066ff; /_ electric blue _/
--accent-3: #00ffe1; /_ aqua _/

--glass: rgba(255,255,255,0.02);
--neon-glow: 0 6px 30px rgba(4,217,255,0.12);
}

/_ Base page styles that use tokens _/
html,body,#app { height:100%; }
body { margin:0; background:var(--bg); color:var(--text); -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale }

/_ simple utility _/
.container { box-sizing:border-box }

/_ simple card _/
.card { background:var(--surface); border-radius:10px; padding:16px; box-shadow:var(--neon-glow) }
