<template>
  <Teleport to="body">
    <Transition name="cdialog-fade" @after-enter="onAfterEnter" @after-leave="onAfterLeave">
      <div v-if="rendered" v-show="modelValue" class="cdialog-overlay" @click="onOverlayClick">
        <div
          ref="panelRef"
          class="cdialog"
          :class="{ 'cdialog--center': alignCenter }"
          :style="panelStyle"
          role="dialog"
          aria-modal="true"
          :aria-label="title || undefined"
          @click.stop
        >
          <header v-if="showHeader" class="cdialog__header">
            <slot name="header">
              <h3 class="cdialog__title">{{ title }}</h3>
            </slot>
            <button
              v-if="showClose"
              type="button"
              class="cdialog__close"
              aria-label="关闭"
              @click="handleClose"
            >
              <CIcon name="close" :size="18" />
            </button>
          </header>

          <div class="cdialog__body">
            <slot />
          </div>

          <footer v-if="showFooter || hasFooterSlot" class="cdialog__footer">
            <slot name="footer">
              <CButton type="ghost" label="取消" @click="handleClose" />
              <CButton type="primary" label="确定" @click="handleConfirm" />
            </slot>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import CIcon from './CIcon.vue'
import CButton from './CButton.vue'

function slotHasContent(slotFn) {
  if (!slotFn) return false

  return slotFn().some((vnode) => {
    if (typeof vnode.children === 'string') return vnode.children.trim().length > 0

    return vnode.type !== Symbol.for('v-cmt')
  })
}

export default {
  name: 'CDialog',

  components: { CIcon, CButton },

  props: {
    modelValue: { type: Boolean, default: false },

    title: { type: String, default: '' },

    width: { type: [String, Number], default: '480px' },

    modal: { type: Boolean, default: true },

    closeOnClickModal: { type: Boolean, default: true },

    closeOnPressEscape: { type: Boolean, default: true },

    showClose: { type: Boolean, default: true },

    alignCenter: { type: Boolean, default: true },

    destroyOnClose: { type: Boolean, default: false },

    showFooter: { type: Boolean, default: false },
  },

  emits: ['update:modelValue', 'open', 'close', 'opened', 'closed', 'confirm'],

  data() {
    return {
      rendered: this.modelValue,
    }
  },

  computed: {
    panelStyle() {
      const width = typeof this.width === 'number' ? `${this.width}px` : this.width

      return { width, maxWidth: 'calc(100vw - 32px)' }
    },

    showHeader() {
      return !!this.title || slotHasContent(this.$slots.header) || this.showClose
    },

    hasFooterSlot() {
      return slotHasContent(this.$slots.footer)
    },
  },

  watch: {
    modelValue(val) {
      if (val) {
        this.rendered = true
        this.$emit('open')
        this.$nextTick(() => {
          if (this.closeOnPressEscape) {
            document.addEventListener('keydown', this.onKeydown)
          }
        })
      } else {
        document.removeEventListener('keydown', this.onKeydown)
        this.$emit('close')
        if (this.destroyOnClose) {
          setTimeout(() => {
            if (!this.modelValue) this.rendered = false
          }, 300)
        }
      }
    },
  },

  beforeUnmount() {
    document.removeEventListener('keydown', this.onKeydown)
  },

  methods: {
    onKeydown(event) {
      if (event.key === 'Escape' && this.modelValue) {
        this.handleClose()
      }
    },

    onOverlayClick() {
      if (this.modal && this.closeOnClickModal) {
        this.handleClose()
      }
    },

    handleClose() {
      this.$emit('update:modelValue', false)
    },

    handleConfirm() {
      this.$emit('confirm')
      this.handleClose()
    },

    onAfterEnter() {
      this.$emit('opened')
    },

    onAfterLeave() {
      this.$emit('closed')
      if (this.destroyOnClose) {
        this.rendered = false
      }
    },
  },
}
</script>

<style scoped>
.cdialog-overlay {
  position: fixed;
  inset: 0;
  z-index: 10100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(2px);
}

.cdialog {
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 32px);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--surface-elevated);
  box-shadow: var(--shadow-lg), 0 0 24px var(--glow-color);
  overflow: hidden;
}

.cdialog--center .cdialog__body {
  text-align: center;
}

.cdialog__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-subtle);
}

.cdialog__title {
  margin: 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--text);
}

.cdialog__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  margin-left: auto;
  border: none;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  line-height: 0;
  border-radius: var(--radius-sm);
  transition:
    color 0.15s ease,
    background 0.15s ease;
}

.cdialog__close:hover {
  color: var(--text);
  background: var(--glass);
}

.cdialog__body {
  flex: 1;
  padding: 20px;
  overflow: auto;
  font-size: var(--font-size-sm);
  line-height: 1.6;
  color: var(--text);
}

.cdialog__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding: 12px 20px 16px;
  border-top: 1px solid var(--border-subtle);
}

.cdialog-fade-enter-active,
.cdialog-fade-leave-active {
  transition: opacity 0.25s ease;
}

.cdialog-fade-enter-active .cdialog,
.cdialog-fade-leave-active .cdialog {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.cdialog-fade-enter-from,
.cdialog-fade-leave-to {
  opacity: 0;
}

.cdialog-fade-enter-from .cdialog,
.cdialog-fade-leave-to .cdialog {
  opacity: 0;
  transform: scale(0.96) translateY(-8px);
}
</style>
