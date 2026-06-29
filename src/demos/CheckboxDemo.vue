<template>
  <div class="checkbox-demo container">
    <div class="card">
      <h1>Checkbox 多选框</h1>
      <p class="kv">
        基于 <code>CCheckbox</code> 的多选框组件，支持 v-model、半选状态、多选组，以及 small / medium / large 三种尺寸。
      </p>
    </div>

    <div class="card demo-card">
      <div class="card-head">
        <h3 class="demo-title">基础用法</h3>
        <button class="btn ghost small" @click="toggleCode('basic')">代码</button>
      </div>
      <div class="card-body">
        <div class="demo-area">
          <CCheckbox v-model="basic" label="同意用户协议" />
          <p class="preview-hint">当前状态：{{ basic ? '已勾选' : '未勾选' }}</p>
        </div>
        <Collapsible v-model="openCodes.basic">
          <CodeBlock :code="codes.basic" />
        </Collapsible>
      </div>
    </div>

    <div class="card demo-card">
      <div class="card-head">
        <h3 class="demo-title">多选组</h3>
        <button class="btn ghost small" @click="toggleCode('group')">代码</button>
      </div>
      <div class="card-body">
        <div class="demo-row demo-area">
          <CCheckbox v-model="hobbies" value="code" label="编程" />
          <CCheckbox v-model="hobbies" value="music" label="音乐" />
          <CCheckbox v-model="hobbies" value="game" label="游戏" />
        </div>
        <p class="preview-hint">已选：{{ hobbies.length ? hobbies.join('、') : '无' }}</p>
        <Collapsible v-model="openCodes.group">
          <CodeBlock :code="codes.group" />
        </Collapsible>
      </div>
    </div>

    <div class="card demo-card">
      <div class="card-head">
        <h3 class="demo-title">半选状态</h3>
        <button class="btn ghost small" @click="toggleCode('indeterminate')">代码</button>
      </div>
      <div class="card-body">
        <div class="demo-area">
          <CCheckbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            label="全选"
            @change="onCheckAllChange"
          />
          <div class="nested-group">
            <CCheckbox v-model="checkedItems" value="a" label="选项 A" />
            <CCheckbox v-model="checkedItems" value="b" label="选项 B" />
            <CCheckbox v-model="checkedItems" value="c" label="选项 C" />
          </div>
        </div>
        <Collapsible v-model="openCodes.indeterminate">
          <CodeBlock :code="codes.indeterminate" />
        </Collapsible>
      </div>
    </div>

    <div class="card demo-card">
      <div class="card-head">
        <h3 class="demo-title">尺寸</h3>
        <button class="btn ghost small" @click="toggleCode('sizes')">代码</button>
      </div>
      <div class="card-body">
        <div class="demo-row demo-area">
          <CCheckbox v-model="sizeSmall" size="small" label="Small" />
          <CCheckbox v-model="sizeMedium" size="medium" label="Medium" />
          <CCheckbox v-model="sizeLarge" size="large" label="Large" />
        </div>
        <Collapsible v-model="openCodes.sizes">
          <CodeBlock :code="codes.sizes" />
        </Collapsible>
      </div>
    </div>

    <div class="card demo-card">
      <div class="card-head">
        <h3 class="demo-title">禁用</h3>
        <button class="btn ghost small" @click="toggleCode('disabled')">代码</button>
      </div>
      <div class="card-body">
        <div class="demo-row demo-area">
          <CCheckbox v-model="disabledOff" disabled label="未选中禁用" />
          <CCheckbox v-model="disabledOn" disabled label="选中禁用" />
        </div>
        <Collapsible v-model="openCodes.disabled">
          <CodeBlock :code="codes.disabled" />
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
            <td>绑定值（Boolean 或 Array）</td>
            <td>Boolean / Array</td>
            <td>false</td>
          </tr>
          <tr>
            <td>value</td>
            <td>多选组时的选项值</td>
            <td>String / Number / Boolean</td>
            <td>—</td>
          </tr>
          <tr>
            <td>label</td>
            <td>显示文字</td>
            <td>String</td>
            <td>''</td>
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
            <td>indeterminate</td>
            <td>半选状态</td>
            <td>Boolean</td>
            <td>false</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { CCheckbox } from '@/lib'
import Collapsible from '@/components/Collapsible.vue'
import CodeBlock from '@/components/CodeBlock.vue'

const ALL_ITEMS = ['a', 'b', 'c']

export default {
  name: 'CheckboxDemo',
  components: { CCheckbox, Collapsible, CodeBlock },
  data() {
    return {
      basic: false,
      hobbies: ['code'],
      checkedItems: ['a'],
      checkAll: false,
      sizeSmall: true,
      sizeMedium: true,
      sizeLarge: true,
      disabledOff: false,
      disabledOn: true,
      openCodes: {
        basic: false,
        group: false,
        indeterminate: false,
        sizes: false,
        disabled: false,
      },
      codes: {
        basic: `<CCheckbox v-model="agreed" label="同意用户协议" />`,
        group: `<CCheckbox v-model="hobbies" value="code" label="编程" />
<CCheckbox v-model="hobbies" value="music" label="音乐" />
<CCheckbox v-model="hobbies" value="game" label="游戏" />`,
        indeterminate: `<CCheckbox
  v-model="checkAll"
  :indeterminate="isIndeterminate"
  label="全选"
  @change="onCheckAllChange"
/>
<CCheckbox v-model="checkedItems" value="a" label="选项 A" />`,
        sizes: `<CCheckbox v-model="val" size="small" label="Small" />
<CCheckbox v-model="val" size="medium" label="Medium" />
<CCheckbox v-model="val" size="large" label="Large" />`,
        disabled: `<CCheckbox v-model="off" disabled label="未选中禁用" />
<CCheckbox v-model="on" disabled label="选中禁用" />`,
      },
    }
  },
  computed: {
    isIndeterminate() {
      const len = this.checkedItems.length
      return len > 0 && len < ALL_ITEMS.length
    },
  },
  watch: {
    checkedItems(val) {
      this.checkAll = val.length === ALL_ITEMS.length
    },
  },
  methods: {
    toggleCode(key) {
      this.openCodes[key] = !this.openCodes[key]
    },
    onCheckAllChange(checked) {
      this.checkedItems = checked ? [...ALL_ITEMS] : []
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
.demo-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.25rem;
}
.nested-group {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-top: 0.75rem;
  padding-left: 1.5rem;
  border-left: 2px solid var(--border-subtle);
}
.preview-hint {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--muted);
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
