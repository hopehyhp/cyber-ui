<template>
  <div class="components-index">
    <header class="doc-header">
      <h1>Cyber UI</h1>
      <p class="lead">
        一套面向赛博风格的 Vue 3 组件库，提供按钮、输入框、图标等基础组件，并内置明暗双主题与色彩体系。
      </p>
    </header>

    <section id="install" class="doc-section card">
      <h2>安装</h2>
      <p class="kv">通过 npm 安装并在项目中注册：</p>
      <CodeBlock :code="installCode" />
    </section>

    <section id="quickstart" class="doc-section card">
      <h2>快速上手</h2>
      <p class="kv">在入口文件中引入样式并注册组件：</p>
      <CodeBlock :code="quickstartCode" />
    </section>

    <section id="design" class="doc-section card">
      <h2>设计原则</h2>
      <ul class="design-list">
        <li><strong>克制</strong> — 强调色与发光效果适度使用，避免视觉噪音。</li>
        <li><strong>一致</strong> — 组件共享 spacing、圆角、边框与阴影 token。</li>
        <li><strong>可主题</strong> — 通过 CSS 变量切换明暗主题，无需改组件代码。</li>
        <li><strong>可组合</strong> — 小组件优先，便于按需引入与二次封装。</li>
      </ul>
    </section>

    <section id="icons" class="doc-section">
      <h2>图标</h2>
      <p class="kv section-desc">
        内置 <code>CIcon</code> 组件与图标注册表，支持按需扩展。完整 API 文档即将补充。
      </p>
    </section>

    <section class="doc-section">
      <h2>组件总览</h2>
      <p class="kv section-desc">以下组件已提供演示与用法示例，点击卡片或左侧导航进入详情。</p>
      <div class="component-grid">
        <router-link
          v-for="item in readyComponents"
          :key="item.name"
          :to="item.to"
          class="component-card card"
        >
          <span class="card-name">{{ item.name }}</span>
          <span class="card-label">{{ item.label }}</span>
          <span class="card-arrow">→</span>
        </router-link>
      </div>
    </section>

    <section id="changelog" class="doc-section card">
      <h2>更新日志</h2>
      <dl class="changelog">
        <dt>v0.1.0</dt>
        <dd>初始版本：CButton、CInput、CIcon、CBadge 与 Palette 色彩展示。</dd>
      </dl>
    </section>
  </div>
</template>

<script>
import CodeBlock from '../components/CodeBlock.vue'
import { readyComponents } from '../config/componentNav.js'

export default {
  name: 'ComponentsIndex',
  components: { CodeBlock },
  data() {
    return {
      readyComponents,
      installCode: `# npm
npm install cyber-ui

# yarn
yarn add cyber-ui

# pnpm
pnpm add cyber-ui`,
      quickstartCode: `import { createApp } from 'vue'
import App from './App.vue'
import CyberUI from 'cyber-ui'
import 'cyber-ui/styles/themes.css'

const app = createApp(App)
app.use(CyberUI)
app.mount('#app')`,
    }
  },
}
</script>

<style scoped>
.doc-header {
  margin-bottom: 2rem;
}

.doc-header h1 {
  margin: 0 0 0.75rem;
  font-size: 2rem;
  font-weight: 700;
}

.lead {
  margin: 0;
  color: var(--muted);
  font-size: 1.05rem;
  line-height: 1.7;
  max-width: 640px;
}

.doc-section {
  margin-bottom: 2rem;
}

.doc-section h2 {
  margin: 0 0 1rem;
  font-size: 1.35rem;
  font-weight: 600;
}

.doc-section.card {
  padding: 1.5rem;
}

.kv {
  color: var(--muted);
  margin: 0 0 1rem;
  line-height: 1.6;
}

.section-desc {
  margin-bottom: 1.25rem;
}

.design-list {
  margin: 0;
  padding-left: 1.25rem;
  color: var(--muted);
  line-height: 1.8;
}

.design-list strong {
  color: var(--text);
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

.component-card {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1.25rem;
  text-decoration: none;
  color: inherit;
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    transform 0.2s;
  position: relative;
}

.component-card:hover {
  border-color: var(--accent-border);
  box-shadow: var(--neon-glow);
  transform: translateY(-2px);
}

.card-name {
  font-weight: 600;
  color: var(--accent);
}

.card-label {
  font-size: 0.875rem;
  color: var(--muted);
}

.card-arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted);
  opacity: 0;
  transition: opacity 0.2s;
}

.component-card:hover .card-arrow {
  opacity: 1;
  color: var(--accent);
}

.changelog {
  margin: 0;
}

.changelog dt {
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 0.35rem;
}

.changelog dd {
  margin: 0 0 1rem;
  color: var(--muted);
  line-height: 1.6;
}
</style>
