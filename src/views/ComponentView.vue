<template>
  <div class="docs-layout">
    <aside class="docs-sidebar">
      <div class="sidebar-brand">
        <span class="brand-logo" aria-hidden="true">
          <svg viewBox="0 0 32 32" width="28" height="28">
            <polygon
              points="16,2 29,9 29,23 16,30 3,23 3,9"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <text x="16" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">
              C
            </text>
          </svg>
        </span>
        <router-link to="/" class="brand-name">Cyber UI</router-link>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-block">
          <router-link
            v-for="link in topLinks"
            :key="link.label"
            :to="link.to"
            class="nav-link nav-link--top"
            active-class=""
            exact-active-class=""
          >
            {{ link.label }}
          </router-link>
        </div>

        <div class="nav-section">
          <h4 class="nav-section-title">开发指南</h4>
          <router-link
            v-for="item in guideNav"
            :key="item.label"
            :to="item.to"
            class="nav-link"
            :class="{ 'is-active': isGuideActive(item) }"
          >
            {{ item.label }}
          </router-link>
        </div>

        <div class="nav-section">
          <h4 class="nav-section-title">组件</h4>
          <div v-for="group in componentGroups" :key="group.category" class="nav-group">
            <p class="nav-category">
              <span>{{ group.category }}</span>
              <span class="nav-category-zh">{{ group.categoryLabel }}</span>
            </p>
            <component
              v-for="item in group.items"
              :key="item.name"
              :is="item.ready ? 'router-link' : 'span'"
              :to="item.ready ? item.to : undefined"
              class="nav-link nav-link--component"
              :class="{
                'is-active': item.ready && isComponentActive(item),
                'is-disabled': !item.ready,
              }"
            >
              <span class="component-en">{{ item.name }}</span>
              <span class="component-zh">{{ item.label }}</span>
            </component>
          </div>
        </div>
      </nav>
    </aside>

    <main class="docs-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import { topLinks, guideNav, componentGroups } from '../config/componentNav.js'

export default {
  name: 'ComponentView',
  data() {
    return { topLinks, guideNav, componentGroups }
  },
  methods: {
    isComponentActive(item) {
      if (!item.to) return false
      const path = item.to.split('#')[0]
      return this.$route.path === path
    },
    isGuideActive(item) {
      const [path, hash] = item.to.split('#')
      if (this.$route.path !== path) return false
      if (hash) return this.$route.hash === `#${hash}`
      return this.$route.name === 'ComponentsIndex' && !this.$route.hash
    },
  },
}
</script>

<style scoped>
.docs-layout {
  display: flex;
  min-height: calc(100vh - var(--header-height) - 4rem);
  margin: -2rem;
  width: calc(100% + 4rem);
}

.docs-sidebar {
  width: 260px;
  flex-shrink: 0;
  background: var(--menu-bg);
  border-right: 1px solid var(--border-subtle);
  position: sticky;
  top: var(--header-height);
  align-self: flex-start;
  max-height: calc(100vh - var(--header-height));
  overflow-y: auto;
  padding: 1.5rem 0 2rem;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0 1.25rem 1.25rem;
  border-bottom: 1px solid var(--border-subtle);
  margin-bottom: 0.75rem;
}

.brand-logo {
  color: var(--accent);
  display: flex;
  line-height: 0;
}

.brand-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
}

.brand-name:hover {
  opacity: 0.85;
}

.sidebar-nav {
  padding: 0 0.75rem;
}

.nav-block {
  padding: 0.25rem 0 0.75rem;
}

.nav-section {
  margin-top: 0.5rem;
  padding-top: 0.75rem;
}

.nav-section-title {
  margin: 0 0 0.5rem;
  padding: 0 0.75rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text);
}

.nav-group {
  margin-bottom: 0.75rem;
}

.nav-category {
  margin: 0.5rem 0 0.25rem;
  padding: 0 0.75rem;
  font-size: 0.75rem;
  color: var(--muted);
  display: flex;
  gap: 0.35rem;
}

.nav-category-zh {
  opacity: 0.85;
}

.nav-link {
  display: block;
  padding: 0.45rem 0.75rem;
  font-size: 0.875rem;
  color: var(--text);
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: color 0.2s;
  line-height: 1.5;
}

.nav-link--top {
  font-weight: 600;
}

.nav-link--component {
  display: flex;
  gap: 0.35rem;
  font-weight: 400;
}

.component-en {
  flex-shrink: 0;
}

.component-zh {
  color: var(--muted);
  font-size: 0.8125rem;
}

.nav-link:hover:not(.is-disabled) {
  color: var(--accent);
}

.nav-link:hover:not(.is-disabled) .component-zh {
  color: var(--accent);
  opacity: 0.75;
}

.nav-link.is-active {
  color: var(--accent);
  font-weight: 500;
}

.nav-link.is-active .component-zh {
  color: var(--accent);
  opacity: 0.8;
}

.nav-link.is-disabled {
  color: var(--muted);
  opacity: 0.55;
  cursor: not-allowed;
}

.docs-content {
  flex: 1;
  min-width: 0;
  padding: 2rem 2.5rem 3rem;
  max-width: 960px;
}

@media (max-width: 900px) {
  .docs-layout {
    flex-direction: column;
    margin: -1rem;
    width: calc(100% + 2rem);
  }

  .docs-sidebar {
    width: 100%;
    position: static;
    max-height: none;
    border-right: none;
    border-bottom: 1px solid var(--border-subtle);
  }

  .docs-content {
    padding: 1.5rem 1rem 2rem;
  }
}
</style>
