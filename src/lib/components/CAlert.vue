<template>
  <Teleport to="body" :disabled="!popup">
    <Transition :name="transitionName" @after-leave="onAfterLeave">
      <div
        v-if="isVisible"
        :class="alertClasses"
        :style="popupInlineStyle"
        role="alert"
      >
        <span v-if="showIcon" class="calert__icon" aria-hidden="true">
          <CIcon :name="iconName" :size="18" />
        </span>

        <div class="calert__content">
          <p v-if="hasTitle" class="calert__title">
            <slot name="title">{{ title }}</slot>
          </p>
          <div v-if="hasDescription" class="calert__desc">
            <slot>{{ description }}</slot>
          </div>
        </div>

        <button
          v-if="closable"
          type="button"
          class="calert__close"
          aria-label="关闭"
          @click="handleClose"
        >
          <CIcon name="close" :size="14" />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import CIcon from './CIcon.vue'

const PLACEMENTS = ['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right']

function slotHasContent(slotFn) {
  if (!slotFn) return false

  return slotFn().some((vnode) => {
    if (typeof vnode.children === 'string') return vnode.children.trim().length > 0

    return vnode.type !== Symbol.for('v-cmt')
  })
}

export default {
  name: 'CAlert',

  components: { CIcon },

  props: {
    modelValue: { type: Boolean, default: undefined },

    title: { type: String, default: '' },

    description: { type: String, default: '' },

    type: {
      type: String,
      default: 'info',
      validator: (v) => ['success', 'warning', 'info', 'error'].includes(v),
    },

    closable: { type: Boolean, default: false },

    showIcon: { type: Boolean, default: true },

    center: { type: Boolean, default: false },

    popup: { type: Boolean, default: false },

    placement: {
      type: String,
      default: 'top-right',
      validator: (v) => PLACEMENTS.includes(v),
    },

    duration: { type: Number, default: 0 },

    offset: { type: Number, default: 20 },

    stackOffset: { type: Number, default: 0 },

    onClosed: { type: Function, default: null },
  },

  emits: ['close', 'update:modelValue', 'closed'],

  data() {
    return {
      internalVisible: true,
      timer: null,
    }
  },

  computed: {
    isVisible: {
      get() {
        return this.modelValue !== undefined ? this.modelValue : this.internalVisible
      },
      set(val) {
        if (this.modelValue !== undefined) {
          this.$emit('update:modelValue', val)
        } else {
          this.internalVisible = val
        }
      },
    },

    iconName() {
      const map = {
        success: 'success',
        warning: 'warning',
        info: 'info',
        error: 'error',
      }

      return map[this.type] || 'info'
    },

    hasTitle() {
      return !!this.title || slotHasContent(this.$slots.title)
    },

    hasDescription() {
      return !!this.description || slotHasContent(this.$slots.default)
    },

    alertClasses() {
      return [
        'calert',
        `calert--${this.type}`,
        {
          'is-center': this.center,
          'calert--popup': this.popup,
          [`calert--${this.placement}`]: this.popup,
        },
      ]
    },

    popupInlineStyle() {
      if (!this.popup) return null

      const totalOffset = this.offset + this.stackOffset

      if (this.placement.startsWith('top')) {
        return { top: `${totalOffset}px` }
      }

      if (this.placement.startsWith('bottom')) {
        return { bottom: `${totalOffset}px` }
      }

      return null
    },

    transitionName() {
      if (!this.popup) return 'calert-fade'

      return this.placement.startsWith('bottom') ? 'calert-slide-bottom' : 'calert-slide-top'
    },
  },

  mounted() {
    if (this.popup && this.duration > 0) {
      this.startTimer()
    }
  },

  beforeUnmount() {
    this.clearTimer()
  },

  methods: {
    startTimer() {
      this.timer = setTimeout(() => {
        this.handleClose()
      }, this.duration)
    },

    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
    },

    handleClose(event) {
      this.clearTimer()
      this.isVisible = false
      this.$emit('close', event)
    },

    onAfterLeave() {
      this.$emit('closed')
      if (this.onClosed) this.onClosed()
    },
  },
}
</script>

<style scoped>
.calert {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  padding: 12px 14px;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  line-height: 1.5;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.calert.is-center {
  justify-content: center;
  text-align: center;
}

.calert--popup {
  position: fixed;
  z-index: 10060;
  width: auto;
  max-width: min(480px, calc(100vw - 32px));
  box-shadow: var(--shadow-lg);
}

.calert--popup.calert--top {
  left: 50%;
  transform: translateX(-50%);
}

.calert--popup.calert--top-left {
  left: 16px;
}

.calert--popup.calert--top-right {
  right: 16px;
}

.calert--popup.calert--bottom {
  left: 50%;
  transform: translateX(-50%);
}

.calert--popup.calert--bottom-left {
  left: 16px;
}

.calert--popup.calert--bottom-right {
  right: 16px;
}

.calert__icon {
  display: inline-flex;
  flex-shrink: 0;
  margin-top: 1px;
  line-height: 0;
}

.calert__content {
  flex: 1;
  min-width: 0;
}

.calert__title {
  margin: 0;
  font-weight: var(--font-weight-medium);
  color: var(--text);
}

.calert__desc {
  margin: 4px 0 0;
  color: var(--muted);
}

.calert__title + .calert__desc {
  margin-top: 4px;
}

.calert__close {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-left: auto;
  border: none;
  background: transparent;
  color: inherit;
  opacity: 0.7;
  cursor: pointer;
  line-height: 0;
  transition: opacity 0.15s ease;
}

.calert__close:hover {
  opacity: 1;
}

.calert--success {
  background: rgba(52, 211, 153, 0.1);
  border-color: rgba(52, 211, 153, 0.35);
  color: var(--swatch-4);
}

.calert--warning {
  background: rgba(252, 211, 77, 0.1);
  border-color: rgba(252, 211, 77, 0.35);
  color: var(--hl-num);
}

.calert--info {
  background: rgba(34, 211, 238, 0.1);
  border-color: var(--accent-border);
  color: var(--accent);
}

.calert--error {
  background: rgba(248, 113, 113, 0.1);
  border-color: rgba(248, 113, 113, 0.35);
  color: #f87171;
}

.calert--popup.calert--success,
.calert--popup.calert--warning,
.calert--popup.calert--info,
.calert--popup.calert--error {
  background: var(--surface-elevated);
}

.calert--success .calert__desc,
.calert--warning .calert__desc,
.calert--info .calert__desc,
.calert--error .calert__desc {
  color: var(--text);
  opacity: 0.85;
}

.calert-fade-leave-active,
.calert-slide-top-leave-active,
.calert-slide-bottom-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.calert-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.calert-slide-top-enter-active,
.calert-slide-top-leave-active,
.calert-slide-bottom-enter-active,
.calert-slide-bottom-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.calert-slide-top-enter-from,
.calert-slide-top-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

.calert-slide-top-enter-from.calert--top,
.calert-slide-top-leave-to.calert--top {
  transform: translateX(-50%) translateY(-12px);
}

.calert-slide-bottom-enter-from,
.calert-slide-bottom-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

.calert-slide-bottom-enter-from.calert--bottom,
.calert-slide-bottom-leave-to.calert--bottom {
  transform: translateX(-50%) translateY(12px);
}
</style>
