<template>
  <header class="site-header">
    <router-link to="/" class="site-title" exact-active-class="active-link">Cyber UI</router-link>
    <nav class="site-nav">
      <router-link to="/" exact-active-class="active-link">Home</router-link>
      <router-link to="/components" exact-active-class="active-link">Components</router-link>
    </nav>
    <ThemeSwitcher @change-theme="$emit('change-theme', $event)" />
  </header>
</template>

<script>
import ThemeSwitcher from './ThemeSwitcher.vue'
export default {
  name: 'SiteHeader',
  components: { ThemeSwitcher },
  emits: ['change-theme'],
}
</script>

<style scoped>
.site-header {
  display: flex;
  align-items: center;
  padding: 0 2rem;
  height: var(--header-height, 60px);
  background: var(--glass);
  border-bottom: 1px solid var(--border-subtle);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 10;
}
.site-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--accent);
  text-decoration: none;
  margin-right: 2rem;
}
.site-nav {
  display: flex;
  gap: 1.5rem;
  margin-right: auto;
}
.site-nav a {
  color: var(--muted);
  text-decoration: none;
  font-size: 1rem;
  position: relative;
  transition: color 0.3s;
}
.site-nav a:hover {
  color: var(--text);
}
.site-nav .active-link {
  color: var(--accent);
}
.site-nav .active-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--accent);
}
/* position ThemeSwitcher neatly */
.site-header > *:last-child {
  margin-left: 1rem;
}
</style>
