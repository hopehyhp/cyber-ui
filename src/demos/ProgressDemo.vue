<template>
  <div class="progress-demo container">
    <div class="card">
      <h1>Progress 进度条</h1>
      <p class="kv">
        基于 <code>CProgress</code> 的进度条组件，支持线形 / 环形、状态色、不确定进度等。
      </p>
    </div>

    <div class="card demo-card">
      <div class="card-head">
        <h3 class="demo-title">线形进度</h3>
        <button class="btn ghost small" @click="toggleCode('line')">代码</button>
      </div>
      <div class="card-body">
        <div class="demo-stack demo-area">
          <CProgress :percentage="linePercent" />
          <div class="demo-controls">
            <button class="btn ghost small" @click="linePercent = Math.max(0, linePercent - 10)">
              -10
            </button>
            <button class="btn ghost small" @click="linePercent = Math.min(100, linePercent + 10)">
              +10
            </button>
          </div>
        </div>
        <Collapsible v-model="openCodes.line">
          <CodeBlock :code="codes.line" />
        </Collapsible>
      </div>
    </div>

    <div class="card demo-card">
      <div class="card-head">
        <h3 class="demo-title">状态</h3>
        <button class="btn ghost small" @click="toggleCode('status')">代码</button>
      </div>
      <div class="card-body">
        <div class="demo-stack demo-area">
          <CProgress :percentage="100" status="success" />
          <CProgress :percentage="70" status="warning" />
          <CProgress :percentage="40" status="exception" />
        </div>
        <Collapsible v-model="openCodes.status">
          <CodeBlock :code="codes.status" />
        </Collapsible>
      </div>
    </div>

    <div class="card demo-card">
      <div class="card-head">
        <h3 class="demo-title">尺寸 & 文字内置</h3>
        <button class="btn ghost small" @click="toggleCode('sizes')">代码</button>
      </div>
      <div class="card-body">
        <div class="demo-stack demo-area">
          <CProgress :percentage="60" size="small" />
          <CProgress :percentage="60" size="medium" />
          <CProgress :percentage="60" size="large" />
          <CProgress :percentage="75" text-inside />
          <CProgress :percentage="20" text-inside status="warning" />
        </div>
        <Collapsible v-model="openCodes.sizes">
          <CodeBlock :code="codes.sizes" />
        </Collapsible>
      </div>
    </div>

    <div class="card demo-card">
      <div class="card-head">
        <h3 class="demo-title">环形进度</h3>
        <button class="btn ghost small" @click="toggleCode('circle')">代码</button>
      </div>
      <div class="card-body">
        <div class="demo-row demo-area">
          <CProgress type="circle" :percentage="circlePercent" size="small" />
          <CProgress type="circle" :percentage="circlePercent" />
          <CProgress type="circle" :percentage="circlePercent" size="large" status="success" />
        </div>
        <Collapsible v-model="openCodes.circle">
          <CodeBlock :code="codes.circle" />
        </Collapsible>
      </div>
    </div>

    <div class="card demo-card">
      <div class="card-head">
        <h3 class="demo-title">不确定进度</h3>
        <button class="btn ghost small" @click="toggleCode('indeterminate')">代码</button>
      </div>
      <div class="card-body">
        <div class="demo-area">
          <CProgress indeterminate :show-text="false" />
        </div>
        <Collapsible v-model="openCodes.indeterminate">
          <CodeBlock :code="codes.indeterminate" />
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
            <td>percentage</td>
            <td>百分比 0–100</td>
            <td>Number</td>
            <td>0</td>
          </tr>
          <tr>
            <td>type</td>
            <td>类型</td>
            <td>line / circle</td>
            <td>line</td>
          </tr>
          <tr>
            <td>status</td>
            <td>状态色</td>
            <td>success / warning / exception</td>
            <td>''</td>
          </tr>
          <tr>
            <td>size</td>
            <td>尺寸</td>
            <td>small / medium / large</td>
            <td>medium</td>
          </tr>
          <tr>
            <td>showText</td>
            <td>显示文字</td>
            <td>Boolean</td>
            <td>true</td>
          </tr>
          <tr>
            <td>textInside</td>
            <td>文字内置（线形）</td>
            <td>Boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>indeterminate</td>
            <td>不确定进度</td>
            <td>Boolean</td>
            <td>false</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { CProgress } from '@/lib'
import Collapsible from '@/components/Collapsible.vue'
import CodeBlock from '@/components/CodeBlock.vue'

export default {
  name: 'ProgressDemo',
  components: { CProgress, Collapsible, CodeBlock },
  data() {
    return {
      linePercent: 50,
      circlePercent: 68,
      openCodes: {
        line: false,
        status: false,
        sizes: false,
        circle: false,
        indeterminate: false,
      },
      codes: {
        line: `<CProgress :percentage="50" />`,
        status: `<CProgress :percentage="100" status="success" />
<CProgress :percentage="70" status="warning" />
<CProgress :percentage="40" status="exception" />`,
        sizes: `<CProgress :percentage="60" size="small" />
<CProgress :percentage="75" text-inside />`,
        circle: `<CProgress type="circle" :percentage="68" />
<CProgress type="circle" :percentage="68" size="large" status="success" />`,
        indeterminate: `<CProgress indeterminate :show-text="false" />`,
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
  gap: 1rem;
}
.demo-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
}
.demo-controls {
  display: flex;
  gap: 0.5rem;
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
