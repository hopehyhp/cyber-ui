<template>
  <div
    :class="[
      'cinput',
      `cinput--${size}`,
      {
        'is-disabled': disabled,
        'is-readonly': readonly,
        'is-focused': focused,
        'has-prefix': hasPrefix,
        'has-suffix': hasSuffix,
      },
    ]"
    @click="focusInput"
  >
    <span v-if="hasPrefix" class="cinput__prefix" aria-hidden="true">
      <CIcon v-if="prefixIcon" :name="prefixIcon" :size="iconSize" />
      <slot v-else name="prefix" />
    </span>

    <input
      ref="inputRef"
      class="cinput__inner"
      :value="modelValue"
      :type="inputType"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength > 0 ? maxlength : undefined"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    />

    <span v-if="hasSuffix" class="cinput__suffix">
      <button
        v-if="showClear"
        type="button"
        class="cinput__action"
        aria-label="Clear"
        @mousedown.prevent
        @click.stop="clear"
      >
        <CIcon name="close" :size="iconSize" />
      </button>

      <button
        v-else-if="showPasswordToggle"
        type="button"
        class="cinput__action"
        :aria-label="passwordVisible ? 'Hide password' : 'Show password'"
        @mousedown.prevent
        @click.stop="togglePassword"
      >
        <CIcon :name="passwordVisible ? 'eye-off' : 'eye'" :size="iconSize" />
      </button>

      <span v-else-if="suffixIcon" class="cinput__suffix-icon" aria-hidden="true">
        <CIcon :name="suffixIcon" :size="iconSize" />
      </span>

      <slot v-else name="suffix" />
    </span>

    <span v-if="showLimit" class="cinput__count">{{ wordCount }}/{{ maxlength }}</span>
  </div>
</template>

<script>
import CIcon from './CIcon.vue'

function slotHasContent(slotFn) {
  if (!slotFn) return false

  return slotFn().some(vnode => {
    if (typeof vnode.children === 'string') return vnode.children.trim().length > 0

    return vnode.type !== Symbol.for('v-cmt')
  })
}

export default {
  name: 'CInput',

  components: { CIcon },

  props: {
    modelValue: { type: String, default: '' },

    type: { type: String, default: 'text' },

    size: { type: String, default: 'medium' },

    placeholder: { type: String, default: '' },

    disabled: { type: Boolean, default: false },

    readonly: { type: Boolean, default: false },

    clearable: { type: Boolean, default: false },

    prefixIcon: { type: String, default: '' },

    suffixIcon: { type: String, default: '' },

    showPassword: { type: Boolean, default: false },

    maxlength: { type: Number, default: 0 },

    showWordLimit: { type: Boolean, default: false },
  },

  emits: ['update:modelValue', 'input', 'change', 'focus', 'blur', 'clear'],

  data() {
    return {
      focused: false,
      passwordVisible: false,
    }
  },

  computed: {
    hasPrefix() {
      return !!this.prefixIcon || slotHasContent(this.$slots.prefix)
    },

    hasSuffix() {
      return (
        this.showClear ||
        this.showPasswordToggle ||
        !!this.suffixIcon ||
        slotHasContent(this.$slots.suffix)
      )
    },

    showClear() {
      return this.clearable && !this.disabled && !this.readonly && !!this.modelValue
    },

    showPasswordToggle() {
      return this.showPassword && this.type === 'password' && !this.disabled && !this.readonly
    },

    inputType() {
      if (this.type === 'password' && this.showPassword && this.passwordVisible) {
        return 'text'
      }

      return this.type
    },

    showLimit() {
      return this.showWordLimit && this.maxlength > 0
    },

    wordCount() {
      return this.modelValue ? this.modelValue.length : 0
    },

    iconSize() {
      const map = { small: 14, medium: 16, large: 18 }

      return map[this.size] || 16
    },
  },

  methods: {
    focusInput() {
      if (this.disabled || this.readonly) return

      this.$refs.inputRef?.focus()
    },

    onInput(event) {
      const value = event.target.value

      this.$emit('update:modelValue', value)
      this.$emit('input', value)
    },

    onChange(event) {
      this.$emit('change', event.target.value)
    },

    onFocus(event) {
      this.focused = true
      this.$emit('focus', event)
    },

    onBlur(event) {
      this.focused = false
      this.$emit('blur', event)
    },

    clear() {
      this.$emit('update:modelValue', '')
      this.$emit('input', '')
      this.$emit('clear')
      this.$refs.inputRef?.focus()
    },

    togglePassword() {
      this.passwordVisible = !this.passwordVisible
    },
  },
}
</script>

<style scoped>
.cinput {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
  max-width: 360px;
  gap: 8px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--glass);
  color: var(--text);
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    background 0.15s ease;
}

.cinput.is-focused {
  border-color: var(--accent-border);
  box-shadow: 0 0 0 3px var(--accent-muted), var(--neon-glow);
  background: var(--surface);
}

.cinput.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cinput.is-readonly {
  background: var(--code-gutter-bg);
}

.cinput--small {
  min-height: 32px;
  padding: 0 10px;
  font-size: 13px;
}

.cinput--medium {
  min-height: 38px;
  font-size: 15px;
}

.cinput--large {
  min-height: 44px;
  padding: 0 14px;
  font-size: 17px;
}

.cinput__inner {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: 1.4;
}

.cinput__inner::placeholder {
  color: var(--muted);
}

.cinput__inner:disabled {
  cursor: not-allowed;
}

.cinput__prefix,
.cinput__suffix {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  color: var(--muted);
}

.cinput__suffix {
  gap: 4px;
}

.cinput__suffix-icon {
  display: inline-flex;
  align-items: center;
}

.cinput__action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  transition:
    color 0.15s ease,
    background 0.15s ease;
}

.cinput__action:hover {
  color: var(--accent);
  background: var(--accent-muted);
}

.cinput__count {
  position: absolute;
  right: 12px;
  bottom: -1.35rem;
  font-size: 0.72rem;
  color: var(--muted);
}

.cinput.has-prefix .cinput__inner {
  padding-left: 0;
}

.cinput.has-suffix .cinput__inner {
  padding-right: 0;
}
</style>
