<template>
  <label
    :class="[
      'ccheckbox',
      `ccheckbox--${size}`,
      {
        'is-checked': isChecked,
        'is-indeterminate': indeterminate,
        'is-disabled': disabled,
      },
    ]"
  >
    <input
      class="ccheckbox__input"
      type="checkbox"
      :checked="isChecked"
      :disabled="disabled"
      :value="value"
      @change="onChange"
    />
    <span class="ccheckbox__box" aria-hidden="true">
      <svg
        v-if="indeterminate"
        class="ccheckbox__icon ccheckbox__icon--indeterminate"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path d="M4 8h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
      <svg v-else class="ccheckbox__icon ccheckbox__icon--check" viewBox="0 0 16 16" fill="none">
        <path
          d="M3.5 8.5L6.5 11.5L12.5 4.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <span v-if="label || $slots.default" class="ccheckbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'CCheckbox',

  props: {
    modelValue: { type: [Boolean, Array], default: false },

    value: { type: [String, Number, Boolean], default: undefined },

    label: { type: String, default: '' },

    disabled: { type: Boolean, default: false },

    indeterminate: { type: Boolean, default: false },

    size: { type: String, default: 'medium' },
  },

  emits: ['update:modelValue', 'change'],

  computed: {
    isChecked() {
      if (Array.isArray(this.modelValue)) {
        return this.modelValue.includes(this.value)
      }

      return Boolean(this.modelValue)
    },
  },

  methods: {
    onChange(event) {
      if (this.disabled) return

      const checked = event.target.checked

      if (Array.isArray(this.modelValue)) {
        const next = checked
          ? [...this.modelValue, this.value]
          : this.modelValue.filter((v) => v !== this.value)

        this.$emit('update:modelValue', next)
        this.$emit('change', next)
        return
      }

      this.$emit('update:modelValue', checked)
      this.$emit('change', checked)
    },
  },
}
</script>

<style scoped>
.ccheckbox {
  display: inline-flex;
  align-items: flex-start;
  gap: 8px;
  cursor: pointer;
  color: var(--text);
  line-height: 1.4;
  user-select: none;
}

.ccheckbox.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ccheckbox__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.ccheckbox__box {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--code-gutter-bg);
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.ccheckbox--small .ccheckbox__box {
  width: 14px;
  height: 14px;
}

.ccheckbox--medium .ccheckbox__box {
  width: 16px;
  height: 16px;
}

.ccheckbox--large .ccheckbox__box {
  width: 18px;
  height: 18px;
}

.ccheckbox:not(.is-disabled):hover .ccheckbox__box {
  border-color: var(--accent-border);
}

.ccheckbox.is-checked .ccheckbox__box,
.ccheckbox.is-indeterminate .ccheckbox__box {
  background: var(--accent-muted);
  border-color: var(--accent-border);
  box-shadow: var(--neon-glow);
}

.ccheckbox__icon {
  width: 100%;
  height: 100%;
  padding: 1px;
  color: var(--accent);
  opacity: 0;
  transform: scale(0.6);
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.ccheckbox.is-checked .ccheckbox__icon--check,
.ccheckbox.is-indeterminate .ccheckbox__icon--indeterminate {
  opacity: 1;
  transform: scale(1);
}

.ccheckbox__label {
  font-size: var(--font-size-base);
}

.ccheckbox--small .ccheckbox__label {
  font-size: var(--font-size-sm);
}

.ccheckbox--large .ccheckbox__label {
  font-size: var(--font-size-lg);
}
</style>
