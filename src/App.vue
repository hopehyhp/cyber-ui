<template>
  <div id="app" class="app">
    <SiteHeader @change-theme="applyTheme" />
    <main class="container">
      <router-view />
    </main>
    <footer class="footer">© 2026 Cyber UI — 组件库官网骨架</footer>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import SiteHeader from './components/SiteHeader.vue'

export default defineComponent({
  components: { SiteHeader },
  mounted() {
    try {
      const raw = localStorage.getItem('theme') || 'dark'
      const t = raw === 'light' ? 'light' : 'dark'
      if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.setAttribute('data-theme', t)
      }
      if (raw !== t) localStorage.setItem('theme', t)
    } catch (e) {
      /* ignore */
    }
  },
  methods: {
    applyTheme(theme) {
      try {
        localStorage.setItem('theme', theme)
      } catch (e) {
        /* ignore */
      }
      if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.setAttribute('data-theme', theme)
      }
    },
  },
})
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
}

.container {
  flex: 1;
  padding: 2rem;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
}

.footer {
  /* ... existing styles ... */
}
</style>
