<template>
  <span
    :class="[
      'cbadge',
      {
        'cbadge--standalone': standalone,
        'cbadge--fixed': !standalone,
      },
    ]"
  >
    <slot />

    <sup
      v-show="visible"
      :class="[
        'cbadge__content',
        `cbadge__content--${type}`,
        { 'is-dot': isDot, 'is-round': round },
        badgeClass,
      ]"
      :style="contentStyle"
    >
      <slot name="content">{{ displayValue }}</slot>
    </sup>
  </span>
</template>

<script>
function slotHasContent(slotFn) {
  if (!slotFn) return false

  return slotFn().some((vnode) => {
    if (typeof vnode.children === 'string') return vnode.children.trim().length > 0

    return vnode.type !== Symbol.for('v-cmt')
  })
}

export default {
  name: 'CBadge',

  props: {
    value: { type: [String, Number], default: '' },

    max: { type: Number, default: 99 },

    isDot: { type: Boolean, default: false },

    hidden: { type: Boolean, default: false },

    showZero: { type: Boolean, default: false },

    type: {
      type: String,
      default: 'danger',
      validator: (v) => ['default', 'primary', 'success', 'warning', 'danger', 'info'].includes(v),
    },

    round: { type: Boolean, default: false },

    offset: {
      type: Array,
      default: () => [],
      validator: (v) => v.length === 0 || v.length === 2,
    },

    badgeClass: { type: String, default: '' },
  },

  computed: {
    standalone() {
      return !slotHasContent(this.$slots.default)
    },

    hasValue() {
      if (this.isDot) return true

      const val = this.value

      if (val === '' || val === null || val === undefined) return false

      if (typeof val === 'number') return this.showZero ? val >= 0 : val > 0

      return String(val).length > 0
    },

    visible() {
      return !this.hidden && this.hasValue
    },

    displayValue() {
      if (this.isDot) return ''

      const val = Number(this.value)

      if (!Number.isNaN(val) && typeof this.value === 'number') {
        return val > this.max ? `${this.max}+` : val
      }

      if (!Number.isNaN(val) && this.value !== '' && String(this.value).trim() !== '') {
        return val > this.max ? `${this.max}+` : this.value
      }

      return this.value
    },

    contentStyle() {
      if (!this.offset.length || this.standalone) return null

      const [x, y] = this.offset

      return {
        marginRight: `${-x}px`,
        marginTop: `${y}px`,
      }
    },
  },
}
</script>

<style scoped>
.cbadge {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
}

.cbadge--fixed {
  line-height: 1;
}

.cbadge__content {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 6px;
  border: 1px solid transparent;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  line-height: 1;
  white-space: nowrap;
  box-sizing: border-box;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.cbadge--fixed .cbadge__content {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  z-index: 1;
}

.cbadge__content.is-dot {
  min-width: 8px;
  width: 8px;
  height: 8px;
  padding: 0;
  border-radius: var(--radius-full);
}

.cbadge__content.is-round {
  border-radius: var(--radius-full);
}

.cbadge__content--default {
  background: var(--glass);
  border-color: var(--border);
  color: var(--text);
}

.cbadge__content--primary {
  background: var(--accent);
  border-color: var(--accent-border);
  color: var(--text-on-accent);
  box-shadow: 0 0 8px var(--glow-color);
}

.cbadge__content--success {
  background: var(--swatch-4);
  border-color: rgba(52, 211, 153, 0.45);
  color: #052e1f;
}

.cbadge__content--warning {
  background: var(--hl-num);
  border-color: rgba(252, 211, 77, 0.45);
  color: #422006;
}

.cbadge__content--danger {
  background: #f87171;
  border-color: rgba(248, 113, 113, 0.45);
  color: #450a0a;
  box-shadow: 0 0 8px rgba(248, 113, 113, 0.35);
}

.cbadge__content--info {
  background: var(--accent-2);
  border-color: rgba(99, 102, 241, 0.45);
  color: var(--text-on-accent);
}
</style>
