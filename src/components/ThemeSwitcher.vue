<template>
  <div class="theme-menu" ref="root">
    <button class="trigger" @click="toggle" :aria-expanded="open" aria-haspopup="true" aria-label="Theme menu">
      <svg v-if="current === 'dark'" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.6"/>
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
      </svg>
      <span class="caret">▾</span>
    </button>

    <div v-if="open" class="menu" role="menu">
      <div class="menu-section">
        <div class="menu-title">主题</div>
        <div class="menu-actions">
          <button class="btn ghost small" :class="{ active: current === 'dark' }" @click="selectTheme('dark')">黑色</button>
          <button class="btn ghost small" :class="{ active: current === 'light' }" @click="selectTheme('light')">白色</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThemeSwitcher',
  data() {
    return {
      open: false,
      current: typeof localStorage !== 'undefined'
        ? (localStorage.getItem('theme') === 'light' ? 'light' : 'dark')
        : 'dark'
    }
  },
  mounted() {
    this.current = this.normalizeTheme(this.current)
    this.apply(this.current)
    document.addEventListener('click', this.outsideClick)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.outsideClick)
  },
  methods: {
    toggle() { this.open = !this.open },
    normalizeTheme(t) {
      if (t === 'light') return 'light'
      return 'dark'
    },
    selectTheme(t) {
      this.current = t
      try { localStorage.setItem('theme', t) } catch (e) {}
      this.apply(t)
      this.$emit('change-theme', t)
      this.open = false
    },
    apply(t) {
      if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.setAttribute('data-theme', t)
      }
    },
    outsideClick(e) {
      const root = this.$refs.root
      if (!root) return
      if (!root.contains(e.target)) this.open = false
    }
  }
}
</script>

<style scoped>
.theme-menu { position: relative; display: inline-block; }
.trigger {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 10px; border-radius: var(--radius-sm);
  border: 1px solid var(--border-subtle);
  background: transparent; color: var(--text); cursor: pointer;
}
.trigger .caret { font-size: 0.8rem; opacity: 0.7; }
.menu {
  position: absolute; right: 0; top: calc(100% + 8px); width: 200px; z-index: 50;
  background: var(--menu-bg);
  border: 1px solid var(--border-subtle);
  padding: 0.75rem; border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
}
.menu-section { margin-bottom: 0; }
.menu-title { font-size: 0.85rem; color: var(--muted); margin-bottom: 0.4rem; }
.menu-actions { display: flex; gap: 0.5rem; }
.btn.small { padding: 6px 12px; font-size: 0.85rem; }
.btn.ghost.active {
  border-color: var(--accent-border);
  background: var(--accent-muted);
  color: var(--accent);
}
</style>
