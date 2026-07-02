<template>
  <ul
    :class="[
      'cmenu',
      `cmenu--${mode}`,
      { 'is-collapse': collapse && mode === 'vertical' },
    ]"
    role="menubar"
    :aria-orientation="mode === 'vertical' ? 'vertical' : 'horizontal'"
  >
    <slot />
  </ul>
</template>

<script>
export default {
  name: 'CMenu',

  provide() {
    return {
      menuRoot: this,
    }
  },

  props: {
    defaultActive: { type: String, default: '' },

    mode: {
      type: String,
      default: 'vertical',
      validator: (v) => ['horizontal', 'vertical'].includes(v),
    },

    collapse: { type: Boolean, default: false },
  },

  emits: ['select'],

  data() {
    return {
      activeIndex: this.defaultActive,
      openedMenus: [],
    }
  },

  watch: {
    defaultActive(val) {
      this.activeIndex = val
    },
  },

  methods: {
    handleItemClick(index) {
      this.activeIndex = index
      this.$emit('select', index)
    },

    handleSubMenuToggle(index) {
      const pos = this.openedMenus.indexOf(index)

      if (pos > -1) {
        this.openedMenus.splice(pos, 1)
      } else {
        this.openedMenus.push(index)
      }
    },

    isMenuOpen(index) {
      return this.openedMenus.includes(index)
    },

    isActive(index) {
      return this.activeIndex === index
    },
  },
}
</script>

<style scoped>
.cmenu {
  list-style: none;
  margin: 0;
  padding: 4px;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  background: var(--card-bg);
}

.cmenu--vertical {
  display: flex;
  flex-direction: column;
  width: 220px;
}

.cmenu--horizontal {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: auto;
}

.cmenu.is-collapse {
  width: 56px;
}
</style>
