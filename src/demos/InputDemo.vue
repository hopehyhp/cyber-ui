<template>
  <div class="input-demo container">
    <div class="card">
      <h1>Input 输入框</h1>
      <p class="kv">
        基于项目内的
        <code>CInput</code>
        封装的输入框组件，支持 v-model、前缀图标、可清空、密码可见切换，以及 small / medium / large 三种尺寸。
      </p>
    </div>

    <!-- Basic -->
    <div class="card demo-card">
      <div class="card-head">
        <h3 class="demo-title">基础用法</h3>
        <button class="btn ghost small" @click="toggleCode('basic')">代码</button>
      </div>
      <div class="card-body">
        <div class="demo-area">
          <CInput v-model="basic" placeholder="请输入内容" />
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
        <div class="demo-stack demo-area">
          <CInput v-model="sizeSmall" size="small" placeholder="Small" />
          <CInput v-model="sizeMedium" size="medium" placeholder="Medium" />
          <CInput v-model="sizeLarge" size="large" placeholder="Large" />
        </div>
        <Collapsible v-model="openCodes.sizes">
          <CodeBlock :code="codes.sizes" />
        </Collapsible>
      </div>
    </div>

    <!-- Disabled / Readonly -->
    <div class="card demo-card">
      <div class="card-head">
        <h3 class="demo-title">Disabled / Readonly</h3>
        <button class="btn ghost small" @click="toggleCode('state')">代码</button>
      </div>
      <div class="card-body">
        <div class="demo-stack demo-area">
          <CInput v-model="disabledVal" disabled placeholder="Disabled" />
          <CInput v-model="readonlyVal" readonly />
        </div>
        <Collapsible v-model="openCodes.state">
          <CodeBlock :code="codes.state" />
        </Collapsible>
      </div>
    </div>

    <!-- Icons -->
    <div class="card demo-card">
      <div class="card-head">
        <h3 class="demo-title">前缀 / 后缀图标</h3>
        <button class="btn ghost small" @click="toggleCode('icons')">代码</button>
      </div>
      <div class="card-body">
        <div class="demo-stack demo-area">
          <CInput v-model="searchVal" prefix-icon="search" placeholder="搜索..." clearable />
          <CInput v-model="userVal" prefix-icon="user" suffix-icon="lock" placeholder="用户名" />
        </div>
        <Collapsible v-model="openCodes.icons">
          <CodeBlock :code="codes.icons" />
        </Collapsible>
      </div>
    </div>

    <!-- Password -->
    <div class="card demo-card">
      <div class="card-head">
        <h3 class="demo-title">密码框</h3>
        <button class="btn ghost small" @click="toggleCode('password')">代码</button>
      </div>
      <div class="card-body">
        <div class="demo-area">
          <CInput
            v-model="passwordVal"
            type="password"
            prefix-icon="lock"
            show-password
            placeholder="请输入密码"
          />
        </div>
        <Collapsible v-model="openCodes.password">
          <CodeBlock :code="codes.password" />
        </Collapsible>
      </div>
    </div>

    <!-- Word limit -->
    <div class="card demo-card">
      <div class="card-head">
        <h3 class="demo-title">字数限制</h3>
        <button class="btn ghost small" @click="toggleCode('limit')">代码</button>
      </div>
      <div class="card-body">
        <div class="demo-area limit-area">
          <CInput
            v-model="limitVal"
            :maxlength="20"
            show-word-limit
            placeholder="最多 20 字"
          />
        </div>
        <Collapsible v-model="openCodes.limit">
          <CodeBlock :code="codes.limit" />
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
                <label class="option-chip option-check">
                  <input v-model="readonly" type="checkbox" />
                  <span>Readonly</span>
                </label>
              </div>
            </div>
          </aside>
          <div class="interactive-preview">
            <div class="preview-stage">
              <CInput
                v-model="interactiveVal"
                :size="size"
                :clearable="clearable"
                :disabled="disabled"
                :readonly="readonly"
                prefix-icon="search"
                placeholder="Type something..."
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

    <!-- API -->
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
            <td>String</td>
            <td>''</td>
          </tr>
          <tr>
            <td>type</td>
            <td>输入类型：text / password / email / number</td>
            <td>String</td>
            <td>text</td>
          </tr>
          <tr>
            <td>size</td>
            <td>尺寸：small / medium / large</td>
            <td>String</td>
            <td>medium</td>
          </tr>
          <tr>
            <td>placeholder</td>
            <td>占位文本</td>
            <td>String</td>
            <td>''</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>禁用</td>
            <td>Boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>readonly</td>
            <td>只读</td>
            <td>Boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>clearable</td>
            <td>可一键清空</td>
            <td>Boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>prefixIcon</td>
            <td>前缀图标名称</td>
            <td>String</td>
            <td>''</td>
          </tr>
          <tr>
            <td>suffixIcon</td>
            <td>后缀图标名称</td>
            <td>String</td>
            <td>''</td>
          </tr>
          <tr>
            <td>showPassword</td>
            <td>密码框显示切换按钮</td>
            <td>Boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>maxlength</td>
            <td>最大长度，0 表示不限制</td>
            <td>Number</td>
            <td>0</td>
          </tr>
          <tr>
            <td>showWordLimit</td>
            <td>显示字数统计</td>
            <td>Boolean</td>
            <td>false</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { CInput } from '@/lib'
import Collapsible from '@/components/Collapsible.vue'
import CodeBlock from '@/components/CodeBlock.vue'

export default {
  name: 'InputDemo',
  components: { CInput, Collapsible, CodeBlock },
  data() {
    return {
      basic: '',
      sizeSmall: '',
      sizeMedium: '',
      sizeLarge: '',
      disabledVal: '',
      readonlyVal: '只读内容',
      searchVal: '',
      userVal: '',
      passwordVal: '',
      limitVal: '',
      interactiveVal: '',
      size: 'medium',
      clearable: true,
      disabled: false,
      readonly: false,
      openCodes: {
        basic: false,
        sizes: false,
        state: false,
        icons: false,
        password: false,
        limit: false,
        interactive: false,
      },
      codes: {
        basic: `<CInput v-model="value" placeholder="请输入内容" />`,
        sizes: `<CInput v-model="value" size="small" placeholder="Small" />
<CInput v-model="value" size="medium" placeholder="Medium" />
<CInput v-model="value" size="large" placeholder="Large" />`,
        state: `<CInput v-model="value" disabled placeholder="Disabled" />
<CInput v-model="value" readonly />`,
        icons: `<CInput v-model="search" prefix-icon="search" placeholder="搜索..." clearable />
<CInput v-model="user" prefix-icon="user" suffix-icon="lock" placeholder="用户名" />`,
        password: `<CInput
  v-model="password"
  type="password"
  prefix-icon="lock"
  show-password
  placeholder="请输入密码"
/>`,
        limit: `<CInput
  v-model="value"
  :maxlength="20"
  show-word-limit
  placeholder="最多 20 字"
/>`,
        interactive: `<CInput
  v-model="value"
  :size="size"
  :clearable="clearable"
  :disabled="disabled"
  :readonly="readonly"
  prefix-icon="search"
  placeholder="Type something..."
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
.limit-area {
  padding-bottom: 1.5rem;
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
.preview-stage .cinput {
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
