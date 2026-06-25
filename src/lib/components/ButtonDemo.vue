<template>
  <div class="button-demo container">
    <div class="card">
      <h1>Button 按钮</h1>
      <p class="kv">基于项目内的 <code>CButton</code> 封装的按钮组件，支持三种样式（primary / secondary / ghost），三种尺寸（small / medium / large），以及 loading 和 disabled 状态。</p>
      <p class="kv">下面的示例展示了常见用法与交互控制，便于在当前主题下查看效果。</p>
    </div>

    <!-- Basic -->
    <div class="card demo-card">
      <div class="card-head">
        <h3 class="demo-title">基础样式</h3>
        <button class="btn ghost small" @click="toggleCode('basic')">代码</button>
      </div>
      <div class="card-body">
        <div class="example-row demo-area">
          <CButton type="primary">Primary</CButton>
          
          <CButton type="secondary">Secondary</CButton>
          <CButton type="ghost">Ghost</CButton>
        </div>

        <Collapsible v-model="openCodes.basic">
          <CodeBlock :code="codes.basic" />
        </Collapsible>
      </div>
    </div>

    <!-- Sizes -->
    <div class="card demo-card">
      <div class="card-head">
        <h3 class="demo-title">尺寸</h3>
        <button class="btn ghost small" @click="toggleCode('sizes')">代码</button>
      </div>
      <div class="card-body">
        <div class="example-row demo-area">
          <CButton size="small">Small</CButton>
          <CButton size="medium">Medium</CButton>
          <CButton size="large">Large</CButton>
        </div>
        <Collapsible v-model="openCodes.sizes">
          <CodeBlock :code="codes.sizes" />
        </Collapsible>
      </div>
    </div>

    <!-- State -->
    <div class="card demo-card">
      <div class="card-head">
        <h3 class="demo-title">状态（Disabled / Loading）</h3>
        <button class="btn ghost small" @click="toggleCode('state')">代码</button>
      </div>
      <div class="card-body">
        <div class="example-row demo-area">
          <CButton disabled>Disabled</CButton>
          <CButton loading>Loading</CButton>
        </div>
        <Collapsible v-model="openCodes.state">
          <CodeBlock :code="codes.state" />
        </Collapsible>
      </div>
    </div>

    <!-- Variants -->
    <div class="card demo-card">
      <div class="card-head">
        <h3 class="demo-title">Plain / Round / Icon</h3>
        <button class="btn ghost small" @click="toggleCode('variants')">代码</button>
      </div>
      <div class="card-body">
        <div class="example-row demo-area">
          <CButton plain>Plain</CButton>
          <CButton round>Round</CButton>
          <CButton icon="settings" icon-only round aria-label="Settings" />
        </div>
        <Collapsible v-model="openCodes.variants">
          <CodeBlock :code="codes.variants" />
        </Collapsible>
      </div>
    </div>

    <!-- Group -->
    <div class="card demo-card">
      <div class="card-head">
        <h3 class="demo-title">Button Group</h3>
        <button class="btn ghost small" @click="toggleCode('group')">代码</button>
      </div>
      <div class="card-body">
        <div class="btn-group demo-area">
          <CButton type="primary">Left</CButton>
          <CButton type="primary">Center</CButton>
          <CButton type="primary">Right</CButton>
        </div>
        <Collapsible v-model="openCodes.group">
          <CodeBlock :code="codes.group" />
        </Collapsible>
      </div>
    </div>

    <!-- Block -->
    <div class="card demo-card">
      <div class="card-head">
        <h3 class="demo-title">Block 按钮（宽度 100%）</h3>
        <button class="btn ghost small" @click="toggleCode('block')">代码</button>
      </div>
      <div class="card-body">
        <div class="demo-area">
          <CButton type="primary" style="width:100%">Block Button</CButton>
        </div>
        <Collapsible v-model="openCodes.block">
          <CodeBlock :code="codes.block" />
        </Collapsible>
      </div>
    </div>

    <!-- Interactive -->
    <div class="card demo-card">
      <div class="card-head">
        <h3 class="demo-title">Interactive demo（可实时控制）</h3>
        <button class="btn ghost small" @click="toggleCode('interactive')">代码</button>
      </div>
      <div class="card-body">
        <div class="interactive-layout">
          <aside class="interactive-controls">
            <div class="control-group">
              <span class="control-label">Type</span>
              <div class="option-group">
                <label class="option-chip"><input type="radio" value="primary" v-model="type" /><span>Primary</span></label>
                <label class="option-chip"><input type="radio" value="secondary" v-model="type" /><span>Secondary</span></label>
                <label class="option-chip"><input type="radio" value="ghost" v-model="type" /><span>Ghost</span></label>
              </div>
            </div>
            <div class="control-group">
              <span class="control-label">Size</span>
              <div class="option-group">
                <label class="option-chip"><input type="radio" value="small" v-model="size" /><span>Small</span></label>
                <label class="option-chip"><input type="radio" value="medium" v-model="size" /><span>Medium</span></label>
                <label class="option-chip"><input type="radio" value="large" v-model="size" /><span>Large</span></label>
              </div>
            </div>
            <div class="control-group">
              <span class="control-label">State</span>
              <div class="option-group">
                <label class="option-chip option-check"><input type="checkbox" v-model="loading" /><span>Loading</span></label>
                <label class="option-chip option-check"><input type="checkbox" v-model="disabled" /><span>Disabled</span></label>
              </div>
            </div>
          </aside>
          <div class="interactive-preview">
            <div class="preview-stage">
              <CButton :type="type" :size="size" :loading="loading" :disabled="disabled" @click="onClick">{{ clickLabel }}</CButton>
            </div>
          </div>
        </div>
        <Collapsible v-model="openCodes.interactive">
          <CodeBlock :code="codes.interactive" />
        </Collapsible>
      </div>
    </div>

    <!-- API -->
    <div class="card">
      <div class="card-head">
        <h3 class="demo-title">API 简要</h3>
      </div>

      <table class="api-table bordered">
        <thead>
          <tr><th>属性</th><th>说明</th><th>类型</th><th>默认</th></tr>
        </thead>
        <tbody>
          <tr><td>type</td><td>按钮类型：primary / secondary / ghost</td><td>String</td><td>primary</td></tr>
          <tr><td>size</td><td>按钮尺寸：small / medium / large</td><td>String</td><td>medium</td></tr>
          <tr><td>disabled</td><td>禁用状态</td><td>Boolean</td><td>false</td></tr>
          <tr><td>loading</td><td>加载状态，显示 spinner 且触发点击被禁用</td><td>Boolean</td><td>false</td></tr>
          <tr><td>plain</td><td>朴素样式（类 outline）</td><td>Boolean</td><td>false</td></tr>
          <tr><td>round</td><td>圆角 pill 样式</td><td>Boolean</td><td>false</td></tr>
          <tr><td>icon</td><td>内置图标名称，如 settings / search / plus</td><td>String</td><td>—</td></tr>
          <tr><td>iconOnly</td><td>仅图标按钮，隐藏文字区域</td><td>Boolean</td><td>false</td></tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import CButton from './CButton.vue'
import Collapsible from '../../components/Collapsible.vue'
import CodeBlock from '../../components/CodeBlock.vue'

export default {
  name: 'ButtonDemo',
  components: { CButton, Collapsible, CodeBlock },
  data() {
    return {
      type: 'primary',
      size: 'medium',
      loading: false,
      disabled: false,
      clicks: 0,
      openCodes: {
        basic: false,
        sizes: false,
        state: false,
        variants: false,
        group: false,
        block: false,
        interactive: false,
        api: false
      },
      codes: {
        basic: `Primary:
<CButton type="primary">Primary</CButton>

Secondary:
<CButton type="secondary">Secondary</CButton>

Ghost:
<CButton type="ghost">Ghost</CButton>`,
        sizes: `Small:
<CButton size="small">Small</CButton>

Medium:
<CButton size="medium">Medium</CButton>

Large:
<CButton size="large">Large</CButton>`,
        state: `Disabled:
<CButton disabled>Disabled</CButton>

Loading:
<CButton loading>Loading</CButton>`,
        variants: `Plain:
<CButton plain>Plain</CButton>

Round:
<CButton round>Round</CButton>

Icon:
<CButton icon="settings" icon-only round aria-label="Settings" />`,
        group: `Button Group:
<div class="btn-group">
  <CButton type="primary">Left</CButton>
  <CButton type="primary">Center</CButton>
  <CButton type="primary">Right</CButton>
</div>`,
        block: `Block:
<CButton type="primary" style="width: 100%">Block Button</CButton>`,
        interactive: `Interactive:
<CButton :type="type" :size="size" :loading="loading" :disabled="disabled" @click="onClick">{{ clickLabel }}</CButton>`
      }
    }
  },
  computed: {
    clickLabel() { return this.loading ? 'Loading...' : (this.disabled ? 'Disabled' : (this.clicks ? 'Clicked ' + this.clicks : 'Interactive')) }
  },
  methods: {
    onClick() {
      if (this.loading || this.disabled) return
      this.clicks++
    },
    toggleCode(key) { this.openCodes[key] = !this.openCodes[key] }
  }
}
</script>

<style scoped>
.container { max-width:900px; margin:1rem auto; display:flex; flex-direction:column; gap:1rem }
.card { padding:1rem; border-radius:var(--radius-md); background:var(--card-bg); border:1px solid var(--border-subtle); box-shadow:var(--shadow-md) }
.card-head { display:flex; align-items:center; justify-content:space-between }
.card-body { display:flex; flex-direction:column; gap:0.75rem; }
.demo-area { padding: 0.6rem 0 }
.example-row { display:flex; gap:0.75rem; align-items:center; flex-wrap:wrap }
.interactive-layout {
  display: grid;
  grid-template-columns: minmax(220px, 260px) 1fr;
  gap: 1.25rem;
  align-items: stretch;
}
.interactive-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background: var(--code-gutter-bg);
  border: 1px solid var(--border-subtle);
}
.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.control-label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--muted);
}
.option-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}
.option-chip {
  position: relative;
  cursor: pointer;
}
.option-chip input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}
.option-chip span {
  display: inline-block;
  padding: 0.35rem 0.7rem;
  font-size: 0.82rem;
  line-height: 1.2;
  border-radius: 6px;
  color: var(--muted);
  background: var(--glass);
  border: 1px solid var(--border);
  transition: color 0.15s, background 0.15s, border-color 0.15s;
}
.option-chip:hover span {
  color: var(--text);
  border-color: var(--accent-border);
}
.option-chip input:checked + span {
  color: var(--text);
  background: var(--accent-muted);
  border-color: var(--accent-border);
  box-shadow: 0 0 12px var(--glow-color);
}
.interactive-preview {
  min-width: 0;
}
.preview-stage {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 168px;
  height: 100%;
  padding: 2rem 1.5rem;
  border-radius: 8px;
  background: var(--code-gutter-bg);
  border: 1px dashed var(--accent-border);
}
@media (max-width: 640px) {
  .interactive-layout {
    grid-template-columns: 1fr;
  }
}
.code { background:var(--code-gutter-bg); padding:0.6rem; border-radius:var(--radius-sm); color:var(--text); overflow:auto }
.code-block { background:var(--code-header); padding:0.5rem; border-radius:var(--radius-sm); margin-top:0.6rem; color:var(--text); border:1px solid var(--border-subtle) }
.api-table { width:100%; border-collapse:collapse; margin-top:0.5rem }
.api-table.bordered th, .api-table.bordered td { border:1px solid var(--border); padding:0.5rem 0.75rem }
.api-table.bordered thead th { background:var(--glass); }
.kv { color:var(--muted); }
.demo-title { margin:0 0 0.6rem 0 }
.btn-group { display:inline-flex; gap:0; border-radius:8px; overflow:hidden }
.btn-group .cbtn { border-radius:0; }
/* collapse handled by Collapsible component - keep minimal css */
</style>
