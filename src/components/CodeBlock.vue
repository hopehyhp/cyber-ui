<template>
  <div class="codeblock">
    <div class="codeblock-header">
      <span v-if="lang" class="codeblock-lang">{{ lang }}</span>
      <span v-else class="codeblock-lang codeblock-lang--dot" aria-hidden="true"></span>
      <button
        class="copy-btn"
        type="button"
        @click="copy"
        :aria-label="copied ? 'Copied' : 'Copy'"
      >
        <span class="copy-icon">{{ copied ? '✓' : '⎘' }}</span>
        {{ copied ? '已复制' : '复制' }}
      </button>
    </div>
    <div class="codeblock-body">
      <div v-for="(line, i) in lines" :key="i" class="code-line">
        <span class="ln">{{ i + 1 }}</span>
        <code class="line-content" v-html="highlightedLines[i]"></code>
      </div>
    </div>
  </div>
</template>

<script>
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function highlightCode(txt) {
  const raw = String(txt)
  // 纯文本标签行（如 "Primary:"）不做 HTML 高亮
  if (!raw.includes('<')) return escapeHtml(raw)

  let out = escapeHtml(raw)
  out = out.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="hl-comment">$1</span>')
  // 属性必须先于标签，否则 class="hl-tag" 会被二次匹配破坏结构
  out = out.replace(
    /(\s+)([:@]?[a-zA-Z][a-zA-Z0-9:@-]*)(=)(&quot;.*?&quot;|'.*?'|[^\s>]+)/g,
    (_, sp, name, eq, val) => `${sp}<span class="hl-attr">${name}</span>${eq}<span class="hl-str">${val}</span>`
  )
  out = out.replace(
    /(&lt;\/?)([a-zA-Z][a-zA-Z0-9:-]*)/g,
    (_, p1, p2) => `${p1}<span class="hl-tag">${p2}</span>`
  )
  return out
}

export default {
  name: 'CodeBlock',
  props: {
    code: { type: String, default: '' },
    lang: { type: String, default: '' }
  },
  data() { return { copied: false } },
  computed: {
    source() {
      return this.code
    },
    lines() {
      const raw = this.source || ''
      if (!raw) return ['']
      return raw.split('\n')
    },
    highlightedLines() {
      return this.lines.map(line => highlightCode(line))
    }
  },
  methods: {
    async copy() {
      const text = this.source
      try {
        await navigator.clipboard.writeText(text)
        this.copied = true
        setTimeout(() => { this.copied = false }, 1200)
      } catch (e) {
        const ta = document.createElement('textarea')
        ta.value = text
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        this.copied = true
        setTimeout(() => { this.copied = false }, 1200)
      }
    }
  }
}
</script>

<style scoped>
.codeblock {
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--code-border);
  background: var(--code-bg);
  box-shadow: var(--shadow-md), inset 0 1px 0 var(--border-subtle);
}

.codeblock-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.45rem 0.75rem;
  background: var(--code-header);
  border-bottom: 1px solid var(--border-subtle);
}

.codeblock-lang {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted);
}

.codeblock-lang--dot::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--glow-color);
}

.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-left: auto;
  padding: 0.3rem 0.65rem;
  font-size: 0.75rem;
  color: var(--muted);
  background: var(--glass);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: color 0.15s, background 0.15s, border-color 0.15s;
}

.copy-btn:hover {
  color: var(--text);
  background: var(--accent-muted);
  border-color: var(--accent-border);
}

.copy-icon {
  font-size: 0.85rem;
  line-height: 1;
}

.codeblock-body {
  padding: 0.85rem 0;
  overflow: hidden;
}

.code-line {
  display: flex;
  align-items: flex-start;
  min-width: 0;
}

.ln {
  flex-shrink: 0;
  min-width: 2.5rem;
  padding: 0 0.65rem 0 0.75rem;
  text-align: right;
  user-select: none;
  border-right: 1px solid var(--border-subtle);
  background: var(--code-gutter-bg);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', monospace;
  font-size: 0.82rem;
  line-height: 1.65;
  color: var(--code-gutter);
}

.line-content {
  flex: 1;
  min-width: 0;
  padding: 0 1rem 0 0.75rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', monospace;
  font-size: 0.82rem;
  line-height: 1.65;
  tab-size: 2;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  word-break: break-word;
  color: var(--text);
}

:deep(.hl-tag) { color: var(--hl-tag); font-weight: 600; }
:deep(.hl-attr) { color: var(--hl-attr); }
:deep(.hl-str) { color: var(--hl-str); }
:deep(.hl-num) { color: var(--hl-num); }
:deep(.hl-comment) { color: var(--hl-comment); font-style: italic; }
</style>
