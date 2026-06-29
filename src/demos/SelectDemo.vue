<template>
  <div class="select-demo container">
    <div class="card">
      <h1>Select 选择器</h1>
      <p class="kv">
        基于 <code>CSelect</code> 的下拉选择器，支持 v-model、可清空、禁用选项，以及 small / medium / large 三种尺寸。
      </p>
    </div>

    <div class="card demo-card">
      <div class="card-head">
        <h3 class="demo-title">基础用法</h3>
        <button class="btn ghost small" @click="toggleCode('basic')">代码</button>
      </div>
      <div class="card-body">
        <div class="demo-area">
          <CSelect v-model="basic" :options="cityOptions" placeholder="请选择城市" />
          <p v-if="basic" class="preview-hint">当前值：{{ basic }}</p>
        </div>
        <Collapsible v-model="openCodes.basic">
          <CodeBlock :code="codes.basic" />
        </Collapsible>
      </div>
    </div>

    <div class="card demo-card">
      <div class="card-head">
        <h3 class="demo-title">尺寸</h3>
        <button class="btn ghost small" @click="toggleCode('sizes')">代码</button>
      </div>
      <div class="card-body">
        <div class="demo-stack demo-area">
          <CSelect v-model="sizeSmall" size="small" :options="cityOptions" placeholder="Small" />
          <CSelect v-model="sizeMedium" size="medium" :options="cityOptions" placeholder="Medium" />
          <CSelect v-model="sizeLarge" size="large" :options="cityOptions" placeholder="Large" />
        </div>
        <Collapsible v-model="openCodes.sizes">
          <CodeBlock :code="codes.sizes" />
        </Collapsible>
      </div>
    </div>

    <div class="card demo-card">
      <div class="card-head">
        <h3 class="demo-title">可清空 / 禁用</h3>
        <button class="btn ghost small" @click="toggleCode('state')">代码</button>
      </div>
      <div class="card-body">
        <div class="demo-stack demo-area">
          <CSelect v-model="clearableVal" clearable :options="cityOptions" placeholder="可清空" />
          <CSelect v-model="disabledVal" disabled :options="cityOptions" placeholder="Disabled" />
        </div>
        <Collapsible v-model="openCodes.state">
          <CodeBlock :code="codes.state" />
        </Collapsible>
      </div>
    </div>

    <div class="card demo-card">
      <div class="card-head">
        <h3 class="demo-title">禁用选项</h3>
        <button class="btn ghost small" @click="toggleCode('disabledOption')">代码</button>
      </div>
      <div class="card-body">
        <div class="demo-area">
          <CSelect v-model="roleVal" :options="roleOptions" placeholder="选择角色" />
        </div>
        <Collapsible v-model="openCodes.disabledOption">
          <CodeBlock :code="codes.disabledOption" />
        </Collapsible>
      </div>
    </div>

    <div class="card demo-card">
      <div class="card-head">
        <h3 class="demo-title">Interactive demo</h3>
        <button class="btn ghost small" @click="toggleCode('interactive')">代码</button>
      </div>
      <div class="card-body">
        <div class="interactive-layout">
          <aside class="interactive-controls">
            <div class="control-group">
              <span class="control-label">Size</span>
              <div class="option-group">
                <label v-for="s in ['small', 'medium', 'large']" :key="s" class="option-chip">
                  <input v-model="size" type="radio" :value="s" />
                  <span>{{ s }}</span>
                </label>
              </div>
            </div>
            <div class="control-group">
              <span class="control-label">Options</span>
              <div class="option-group">
                <label class="option-chip option-check">
                  <input v-model="clearable" type="checkbox" />
                  <span>Clearable</span>
                </label>
                <label class="option-chip option-check">
                  <input v-model="disabled" type="checkbox" />
                  <span>Disabled</span>
                </label>
              </div>
            </div>
          </aside>
          <div class="interactive-preview">
            <div class="preview-stage">
              <CSelect
                v-model="interactiveVal"
                :size="size"
                :clearable="clearable"
                :disabled="disabled"
                :options="cityOptions"
                placeholder="选择城市"
              />
              <p v-if="interactiveVal" class="preview-hint">当前值：{{ interactiveVal }}</p>
            </div>
          </div>
        </div>
        <Collapsible v-model="openCodes.interactive">
          <CodeBlock :code="codes.interactive" />
        </Collapsible>
      </div>
    </div>

    <div class="card">
      <div class="card-head">
        <h3 class="demo-title">API 简要</h3>
      </div>
      <table class="api-table bordered">
        <thead>
          <tr>
            <th>属性</th>
            <th>说明</th>
            <th>类型</th>
            <th>默认</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>modelValue / v-model</td>
            <td>绑定值</td>
            <td>String / Number</td>
            <td>''</td>
          </tr>
          <tr>
            <td>options</td>
            <td>选项列表，支持 { label, value, disabled }</td>
            <td>Array</td>
            <td>[]</td>
          </tr>
          <tr>
            <td>placeholder</td>
            <td>占位文本</td>
            <td>String</td>
            <td>请选择</td>
          </tr>
          <tr>
            <td>size</td>
            <td>尺寸：small / medium / large</td>
            <td>String</td>
            <td>medium</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>禁用</td>
            <td>Boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>clearable</td>
            <td>可一键清空</td>
            <td>Boolean</td>
            <td>false</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { CSelect } from '@/lib'
import Collapsible from '@/components/Collapsible.vue'
import CodeBlock from '@/components/CodeBlock.vue'

export default {
  name: 'SelectDemo',
  components: { CSelect, Collapsible, CodeBlock },
  data() {
    return {
      basic: '',
      sizeSmall: '',
      sizeMedium: '',
      sizeLarge: '',
      clearableVal: 'shanghai',
      disabledVal: '',
      roleVal: '',
      interactiveVal: '',
      size: 'medium',
      clearable: true,
      disabled: false,
      cityOptions: [
        { label: '上海', value: 'shanghai' },
        { label: '北京', value: 'beijing' },
        { label: '深圳', value: 'shenzhen' },
        { label: '杭州', value: 'hangzhou' },
      ],
      roleOptions: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor', disabled: true },
        { label: 'Viewer', value: 'viewer' },
      ],
      openCodes: {
        basic: false,
        sizes: false,
        state: false,
        disabledOption: false,
        interactive: false,
      },
      codes: {
        basic: `<CSelect v-model="value" :options="options" placeholder="请选择城市" />`,
        sizes: `<CSelect v-model="value" size="small" :options="options" />
<CSelect v-model="value" size="medium" :options="options" />
<CSelect v-model="value" size="large" :options="options" />`,
        state: `<CSelect v-model="value" clearable :options="options" />
<CSelect v-model="value" disabled :options="options" />`,
        disabledOption: `:options="[
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor', disabled: true },
  { label: 'Viewer', value: 'viewer' },
]"`,
        interactive: `<CSelect
  v-model="value"
  :size="size"
  :clearable="clearable"
  :disabled="disabled"
  :options="options"
  placeholder="选择城市"
/>`,
      },
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
.demo-area {
  padding: 0.6rem 0;
}
.demo-stack {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 360px;
}
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
  transition:
    color 0.15s,
    background 0.15s,
    border-color 0.15s;
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  min-height: 168px;
  height: 100%;
  padding: 2rem 1.5rem;
  border-radius: 8px;
  background: var(--code-gutter-bg);
  border: 1px dashed var(--accent-border);
}
.preview-stage .cselect {
  width: 100%;
  max-width: 280px;
}
.preview-hint {
  margin: 0;
  font-size: 0.85rem;
  color: var(--muted);
}
@media (max-width: 640px) {
  .interactive-layout {
    grid-template-columns: 1fr;
  }
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
.kv {
  color: var(--muted);
}
.demo-title {
  margin: 0 0 0.6rem 0;
}
</style>
