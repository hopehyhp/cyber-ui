<template>
  <div class="border-demo container">
    <div class="card">
      <h1>Border 边框</h1>
      <p class="kv">
        Cyber UI 通过 CSS 变量定义边框颜色、宽度与圆角，配合主题切换自动适配明暗模式。
      </p>
    </div>

    <div class="card demo-card">
      <div class="card-head">
        <h3 class="section-title">边框颜色 Border Color</h3>
        <button class="btn ghost small" @click="toggleCode('color')">代码</button>
      </div>
      <div class="card-body">
        <div class="border-grid">
          <div v-for="item in borderColors" :key="item.var" class="border-sample">
            <div class="border-box" :style="{ borderColor: `var(${item.var})` }" />
            <code class="token-name">{{ item.var }}</code>
            <span class="token-desc">{{ item.desc }}</span>
          </div>
        </div>
        <Collapsible v-model="openCodes.color">
          <CodeBlock :code="codes.color" />
        </Collapsible>
      </div>
    </div>

    <div class="card demo-card">
      <div class="card-head">
        <h3 class="section-title">圆角 Border Radius</h3>
        <button class="btn ghost small" @click="toggleCode('radius')">代码</button>
      </div>
      <div class="card-body">
        <div class="radius-grid">
          <div v-for="item in radiusTokens" :key="item.var" class="radius-sample">
            <div class="radius-box" :style="{ borderRadius: `var(${item.var})` }" />
            <code class="token-name">{{ item.var }}</code>
            <span class="token-value">{{ item.value }}</span>
          </div>
        </div>
        <Collapsible v-model="openCodes.radius">
          <CodeBlock :code="codes.radius" />
        </Collapsible>
      </div>
    </div>

    <div class="card demo-card">
      <div class="card-head">
        <h3 class="section-title">边框宽度 Border Width</h3>
        <button class="btn ghost small" @click="toggleCode('width')">代码</button>
      </div>
      <div class="card-body">
        <div class="width-list">
          <div v-for="item in borderWidths" :key="item.var" class="width-row">
            <code class="token-name">{{ item.var }}</code>
            <div class="width-box" :style="{ borderWidth: `var(${item.var})` }" />
            <span class="token-value">{{ item.value }}</span>
          </div>
        </div>
        <Collapsible v-model="openCodes.width">
          <CodeBlock :code="codes.width" />
        </Collapsible>
      </div>
    </div>

    <div class="card demo-card">
      <div class="card-head">
        <h3 class="section-title">组合示例</h3>
        <button class="btn ghost small" @click="toggleCode('combo')">代码</button>
      </div>
      <div class="card-body">
        <div class="combo-grid">
          <div class="combo-card combo-card--default">
            <span class="combo-label">Default</span>
            <p>默认边框 + 中等圆角</p>
          </div>
          <div class="combo-card combo-card--subtle">
            <span class="combo-label">Subtle</span>
            <p>弱边框 + 小圆角</p>
          </div>
          <div class="combo-card combo-card--accent">
            <span class="combo-label">Accent</span>
            <p>强调边框 + 霓虹光晕</p>
          </div>
          <div class="combo-card combo-card--dashed">
            <span class="combo-label">Dashed</span>
            <p>虚线边框 + 大圆角</p>
          </div>
        </div>
        <Collapsible v-model="openCodes.combo">
          <CodeBlock :code="codes.combo" />
        </Collapsible>
      </div>
    </div>

    <div class="card demo-card">
      <div class="card-head">
        <h3 class="section-title">阴影 Shadow</h3>
        <button class="btn ghost small" @click="toggleCode('shadow')">代码</button>
      </div>
      <div class="card-body">
        <div class="shadow-grid">
          <div v-for="item in shadows" :key="item.var" class="shadow-sample">
            <div class="shadow-box" :style="{ boxShadow: `var(${item.var})` }" />
            <code class="token-name">{{ item.var }}</code>
            <span class="token-desc">{{ item.desc }}</span>
          </div>
        </div>
        <Collapsible v-model="openCodes.shadow">
          <CodeBlock :code="codes.shadow" />
        </Collapsible>
      </div>
    </div>

    <div class="card">
      <div class="card-head">
        <h3 class="section-title">Token 参考</h3>
      </div>
      <table class="api-table bordered">
        <thead>
          <tr>
            <th>变量</th>
            <th>说明</th>
            <th>典型值</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in tokenTable" :key="row.var">
            <td><code>{{ row.var }}</code></td>
            <td>{{ row.desc }}</td>
            <td>{{ row.value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Collapsible from '@/components/Collapsible.vue'
import CodeBlock from '@/components/CodeBlock.vue'

export default {
  name: 'BorderDemo',
  components: { Collapsible, CodeBlock },
  data() {
    return {
      openCodes: {
        color: false,
        radius: false,
        width: false,
        combo: false,
        shadow: false,
      },
      borderColors: [
        { var: '--border', desc: '默认边框' },
        { var: '--border-subtle', desc: '弱边框 / 分割线' },
        { var: '--accent-border', desc: '强调色边框' },
        { var: '--code-border', desc: '代码块边框' },
      ],
      radiusTokens: [
        { var: '--radius-sm', value: '6px' },
        { var: '--radius-md', value: '10px' },
        { var: '--radius-lg', value: '12px' },
        { var: '--radius-xl', value: '16px' },
        { var: '--radius-full', value: '9999px' },
      ],
      borderWidths: [
        { var: '--border-width', value: '1px' },
        { var: '--border-width-md', value: '2px' },
      ],
      shadows: [
        { var: '--shadow-md', desc: '中等阴影' },
        { var: '--shadow-lg', desc: '大阴影' },
        { var: '--neon-glow', desc: '霓虹光晕' },
        { var: '--glow-color', desc: '发光色（用于 box-shadow）' },
      ],
      codes: {
        color: `/* 边框颜色 */
.panel {
  border: 1px solid var(--border);
}

.divider {
  border-color: var(--border-subtle);
}

.input:focus {
  border-color: var(--accent-border);
}

.code-block {
  border: 1px solid var(--code-border);
}`,
        radius: `/* 圆角 */
.chip {
  border-radius: var(--radius-sm);   /* 6px  小元素 */
}

.card {
  border-radius: var(--radius-md);   /* 10px 卡片 */
}

.modal {
  border-radius: var(--radius-lg);   /* 12px 弹窗 */
}

.banner {
  border-radius: var(--radius-xl);   /* 16px 大面板 */
}

.pill {
  border-radius: var(--radius-full); /* 胶囊形 */
}`,
        width: `/* 边框宽度 */
.list-item {
  border-bottom: var(--border-width) solid var(--border-subtle);
}

.focus-ring {
  outline: var(--border-width-md) solid var(--accent-border);
}`,
        combo: `/* 组合示例 */
/* Default — 默认边框 + 中等圆角 */
.card-default {
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-md);
  background: var(--code-gutter-bg);
}

/* Subtle — 弱边框 + 小圆角 */
.card-subtle {
  border: var(--border-width) solid var(--border-subtle);
  border-radius: var(--radius-sm);
  background: var(--code-gutter-bg);
}

/* Accent — 强调边框 + 霓虹光晕 */
.card-accent {
  border: var(--border-width) solid var(--accent-border);
  border-radius: var(--radius-md);
  box-shadow: var(--neon-glow);
  background: var(--code-gutter-bg);
}

/* Dashed — 虚线边框 + 大圆角 */
.drop-zone {
  border: var(--border-width-md) dashed var(--accent-border);
  border-radius: var(--radius-xl);
  background: var(--code-gutter-bg);
}`,
        shadow: `/* 阴影 */
.card {
  box-shadow: var(--shadow-md);
}

.dropdown {
  box-shadow: var(--shadow-lg);
}

/* 赛博风格霓虹光晕 */
.neon-btn {
  box-shadow: var(--neon-glow);
}

/* 叠加自定义发光 */
.glow-hover:hover {
  box-shadow: 0 0 16px var(--glow-color);
}`,
      },
      tokenTable: [
        { var: '--border', desc: '默认边框色', value: '主题相关' },
        { var: '--border-subtle', desc: '弱边框 / 分割线', value: '主题相关' },
        { var: '--accent-border', desc: '强调色边框', value: '主题相关' },
        { var: '--code-border', desc: '代码块边框', value: '主题相关' },
        { var: '--border-width', desc: '默认边框宽度', value: '1px' },
        { var: '--border-width-md', desc: '加粗边框宽度', value: '2px' },
        { var: '--radius-sm', desc: '小圆角', value: '6px' },
        { var: '--radius-md', desc: '中等圆角', value: '10px' },
        { var: '--radius-lg', desc: '大圆角', value: '12px' },
        { var: '--radius-xl', desc: '超大圆角', value: '16px' },
        { var: '--radius-full', desc: '全圆 / 胶囊', value: '9999px' },
        { var: '--shadow-md', desc: '中等阴影', value: '主题相关' },
        { var: '--shadow-lg', desc: '大阴影', value: '主题相关' },
        { var: '--neon-glow', desc: '霓虹光晕', value: '主题相关' },
      ],
    }
  },
  methods: {
    toggleCode(key) {
      this.openCodes[key] = !this.openCodes[key]
    },
  },
}
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.card {
  padding: 1rem;
  border-radius: var(--radius-md);
  background: var(--card-bg);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-md);
}
.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.kv {
  color: var(--muted);
}
.section-title {
  margin: 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
}
.token-name {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-xs);
  color: var(--accent);
  background: var(--accent-muted);
  padding: 0.15rem 0.4rem;
  border-radius: var(--radius-sm);
}
.token-desc,
.token-value {
  font-size: var(--font-size-xs);
  color: var(--muted);
}
.border-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 0.75rem;
}
.border-sample {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: var(--radius-md);
  background: var(--code-gutter-bg);
}
.border-box {
  width: 64px;
  height: 64px;
  border: var(--border-width-md) solid;
  border-radius: var(--radius-md);
  background: var(--glass);
}
.radius-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.radius-sample {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.radius-box {
  width: 72px;
  height: 72px;
  border: var(--border-width) solid var(--border);
  background: var(--accent-muted);
}
.width-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.width-row {
  display: grid;
  grid-template-columns: 160px 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  background: var(--code-gutter-bg);
  border: 1px solid var(--border-subtle);
}
.width-box {
  height: 0;
  border-style: solid;
  border-color: var(--accent);
}
.combo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.75rem;
}
.combo-card {
  padding: 1rem;
  border-radius: var(--radius-md);
  background: var(--code-gutter-bg);
}
.combo-card--default {
  border: var(--border-width) solid var(--border);
}
.combo-card--subtle {
  border: var(--border-width) solid var(--border-subtle);
  border-radius: var(--radius-sm);
}
.combo-card--accent {
  border: var(--border-width) solid var(--accent-border);
  box-shadow: var(--neon-glow);
}
.combo-card--dashed {
  border: var(--border-width-md) dashed var(--accent-border);
  border-radius: var(--radius-xl);
}
.combo-label {
  display: inline-block;
  margin-bottom: 0.35rem;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  color: var(--accent);
}
.combo-card p {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--muted);
}
.shadow-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.75rem;
}
.shadow-sample {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.25rem 1rem;
}
.shadow-box {
  width: 80px;
  height: 56px;
  border-radius: var(--radius-md);
  background: var(--card-bg);
  border: var(--border-width) solid var(--border-subtle);
}
.api-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.5rem;
}
.api-table.bordered th,
.api-table.bordered td {
  border: 1px solid var(--border);
  padding: 0.5rem 0.75rem;
}
.api-table.bordered thead th {
  background: var(--glass);
}
@media (max-width: 640px) {
  .width-row {
    grid-template-columns: 1fr;
  }
}
</style>
