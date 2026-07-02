<template>
  <li
    :class="[
      'cbreadcrumb-item',
      { 'is-last': isLastItem },
    ]"
  >
    <a
      v-if="to && !isLastItem"
      :href="to"
      class="cbreadcrumb-item__link"
      @click.prevent="handleClick"
    >
      <CIcon v-if="icon" :name="icon" :size="14" class="cbreadcrumb-item__icon" />
      <slot>{{ label }}</slot>
    </a>
    <span v-else class="cbreadcrumb-item__text">
      <CIcon v-if="icon" :name="icon" :size="14" class="cbreadcrumb-item__icon" />
      <slot>{{ label }}</slot>
    </span>
    <span v-if="!isLastItem" class="cbreadcrumb-item__separator" aria-hidden="true">
      <CIcon v-if="showIconSeparator" :name="separatorIcon" :size="12" />
      <template v-else>{{ breadcrumbRoot.separator }}</template>
    </span>
  </li>
</template>

<script>
import CIcon from './CIcon.vue'

export default {
  name: 'CBreadcrumbItem',

  components: { CIcon },

  inject: ['breadcrumbRoot'],

  props: {
    label: { type: String, default: '' },

    to: { type: String, default: '' },

    icon: { type: String, default: '' },

    separatorIcon: { type: String, default: 'chevron-right' },

    /** 数据驱动模式下由父组件传入 */
    isLast: { type: Boolean, default: null },
  },

  emits: ['click'],

  computed: {
    isLastItem() {
      if (this.isLast !== null) {
        return this.isLast
      }

      return this.breadcrumbRoot.isLastItem(this)
    },

    showIconSeparator() {
      return this.breadcrumbRoot.separator === '/' && !!this.separatorIcon
    },
  },

  mounted() {
    if (this.isLast === null) {
      this.breadcrumbRoot.registerItem(this)
    }
  },

  beforeUnmount() {
    if (this.isLast === null) {
      this.breadcrumbRoot.unregisterItem(this)
    }
  },

  methods: {
    handleClick(event) {
      this.$emit('click', event)
    },
  },
}
</script>

<style scoped>
.cbreadcrumb-item {
  display: inline-flex;
  align-items: center;
  font-size: var(--font-size-sm);
}

.cbreadcrumb-item__link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--muted);
  text-decoration: none;
  transition: color 0.15s ease;
}

.cbreadcrumb-item__link:hover {
  color: var(--accent);
}

.cbreadcrumb-item__text {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--text);
  font-weight: var(--font-weight-medium);
}

.cbreadcrumb-item.is-last .cbreadcrumb-item__text {
  color: var(--accent);
}

.cbreadcrumb-item__icon {
  line-height: 0;
}

.cbreadcrumb-item__separator {
  display: inline-flex;
  align-items: center;
  margin: 0 8px;
  color: var(--muted);
  opacity: 0.5;
  user-select: none;
}
</style>
