<template>
  <div class="component-view">
    <aside class="sidebar">
      <nav class="component-nav">
        <h3>Components</h3>
        <router-link to="/components/button" exact-active-class="active-link">Button</router-link>
        <router-link to="/components/input" exact-active-class="active-link">Input</router-link>
        <router-link to="/components/badge" exact-active-class="active-link">Badge</router-link>
        <router-link to="/components/palette" exact-active-class="active-link">Palette</router-link>
        <!-- More components can be added here -->
      </nav>
    </aside>
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.component-view {
  display: flex;
  gap: 2rem;
}

.sidebar {
  width: 240px;
  flex-shrink: 0;
  position: static;
  top: auto;
  align-self: flex-start;
}

.component-nav {
  width: 100%;
}

.component-nav h3 {
  font-size: 1.2rem;
  color: var(--accent);
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 0.5rem;
}

.component-nav a {
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  color: var(--muted);
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.3s, color 0.3s;
}

.component-nav a:hover {
  background: var(--accent-muted);
  color: var(--text);
}

.component-nav .active-link {
  background: var(--accent);
  color: var(--text-on-accent);
  font-weight: bold;
}

.content {
  flex-grow: 1;
}
</style>
