<template>
  <div
    ref="rootRef"
    :class="[
      'cselect',
      `cselect--${size}`,
      {
        'is-disabled': disabled,
        'is-open': open,
        'is-focused': open,
        'is-empty': !hasValue,
      },
    ]"
  >
    <div
      class="cselect__trigger"
      :class="{ 'is-disabled': disabled }"
      role="combobox"
      :aria-expanded="open"
      aria-haspopup="listbox"
      :tabindex="disabled ? -1 : 0"
      @click="toggle"
      @keydown.enter.prevent="toggle"
      @keydown.space.prevent="toggle"
    >
      <span class="cselect__value">
        <span v-if="hasValue" class="cselect__label">{{ selectedLabel }}</span>
        <span v-else class="cselect__placeholder">{{ placeholder }}</span>
      </span>

      <span class="cselect__suffix">
        <button
          v-if="showClear"
          type="button"
          class="cselect__action"
          aria-label="Clear"
          @mousedown.prevent
          @click.stop="clear"
        >
          <CIcon name="close" :size="iconSize" />
        </button>
        <CIcon
          v-else
          name="chevron-down"
          :size="iconSize"
          :class="['cselect__arrow', { 'is-open': open }]"
        />
      </span>
    </div>

    <Transition name="cselect-drop">
      <ul v-if="open" class="cselect__dropdown" role="listbox">
        <li
          v-for="option in normalizedOptions"
          :key="option.value"
          role="option"
          :class="[
            'cselect__option',
            {
              'is-selected': isSelected(option),
              'is-disabled': option.disabled,
            },
          ]"
          :aria-selected="isSelected(option)"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </li>
        <li v-if="!normalizedOptions.length" class="cselect__empty">暂无选项</li>
      </ul>
    </Transition>
  </div>
</template>

<script>
import CIcon from './CIcon.vue'

export default {
  name: 'CSelect',

  components: { CIcon },

  props: {
    modelValue: { type: [String, Number], default: '' },

    options: { type: Array, default: () => [] },

    placeholder: { type: String, default: '请选择' },

    disabled: { type: Boolean, default: false },

    clearable: { type: Boolean, default: false },

    size: { type: String, default: 'medium' },
  },

  emits: ['update:modelValue', 'change', 'clear'],

  data() {
    return {
      open: false,
    }
  },

  computed: {
    normalizedOptions() {
      return this.options.map((item) => {
        if (typeof item === 'object' && item !== null) {
          return {
            label: item.label ?? item.value,
            value: item.value,
            disabled: !!item.disabled,
          }
        }

        return { label: String(item), value: item, disabled: false }
      })
    },

    selectedOption() {
      return this.normalizedOptions.find((item) => item.value === this.modelValue) || null
    },

    selectedLabel() {
      return this.selectedOption?.label ?? ''
    },

    hasValue() {
      return this.modelValue !== '' && this.modelValue !== null && this.modelValue !== undefined
    },

    showClear() {
      return this.clearable && !this.disabled && this.hasValue
    },

    iconSize() {
      const map = { small: 14, medium: 16, large: 18 }

      return map[this.size] || 16
    },
  },

  mounted() {
    document.addEventListener('click', this.onClickOutside)
  },

  beforeUnmount() {
    document.removeEventListener('click', this.onClickOutside)
  },

  methods: {
    toggle() {
      if (this.disabled) return

      this.open = !this.open
    },

    close() {
      this.open = false
    },

    onClickOutside(event) {
      if (!this.$refs.rootRef?.contains(event.target)) {
        this.close()
      }
    },

    isSelected(option) {
      return option.value === this.modelValue
    },

    selectOption(option) {
      if (option.disabled) return

      this.$emit('update:modelValue', option.value)
      this.$emit('change', option.value)
      this.close()
    },

    clear() {
      this.$emit('update:modelValue', '')
      this.$emit('change', '')
      this.$emit('clear')
    },
  },
}
</script>

<style scoped>
.cselect {
  position: relative;
  display: inline-flex;
  width: 100%;
  max-width: 360px;
}

.cselect__trigger {
  display: inline-flex;
  align-items: center;
  width: 100%;
  gap: 8px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--glass);
  color: var(--text);
  cursor: pointer;
  font: inherit;
  text-align: left;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    background 0.15s ease;
}

.cselect__trigger.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.cselect.is-focused .cselect__trigger {
  border-color: var(--accent-border);
  box-shadow: 0 0 0 3px var(--accent-muted), var(--neon-glow);
  background: var(--surface);
}

.cselect--small .cselect__trigger {
  min-height: 32px;
  padding: 0 10px;
  font-size: 13px;
}

.cselect--medium .cselect__trigger {
  min-height: 38px;
  font-size: 15px;
}

.cselect--large .cselect__trigger {
  min-height: 44px;
  padding: 0 14px;
  font-size: 17px;
}

.cselect__value {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cselect__placeholder {
  color: var(--muted);
}

.cselect__suffix {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  color: var(--muted);
}

.cselect__arrow {
  transition: transform 0.2s ease;
}

.cselect__arrow.is-open {
  transform: rotate(180deg);
  color: var(--accent);
}

.cselect__action {
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

.cselect__action:hover {
  color: var(--accent);
  background: var(--accent-muted);
}

.cselect__dropdown {
  position: absolute;
  z-index: 20;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  margin: 0;
  padding: 6px;
  list-style: none;
  border-radius: 8px;
  border: 1px solid var(--accent-border);
  background: var(--surface-elevated);
  box-shadow: var(--shadow-lg), var(--neon-glow);
  max-height: 240px;
  overflow-y: auto;
}

.cselect__option {
  padding: 8px 10px;
  border-radius: 6px;
  color: var(--text);
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease;
}

.cselect__option:hover:not(.is-disabled) {
  background: var(--accent-muted);
  color: var(--accent);
}

.cselect__option.is-selected {
  background: var(--accent-muted);
  color: var(--accent);
  font-weight: 600;
}

.cselect__option.is-disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.cselect__empty {
  padding: 8px 10px;
  color: var(--muted);
  font-size: 0.875rem;
  text-align: center;
}

.cselect-drop-enter-active,
.cselect-drop-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.cselect-drop-enter-from,
.cselect-drop-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
