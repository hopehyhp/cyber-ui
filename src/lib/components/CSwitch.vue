<template>
  <button
    type="button"
    role="switch"
    :class="[
      'cswitch',
      `cswitch--${size}`,
      {
        'is-checked': modelValue,
        'is-disabled': disabled,
      },
    ]"
    :aria-checked="modelValue"
    :disabled="disabled"
    @click="toggle"
  >
    <span v-if="inactiveText && size !== 'small'" class="cswitch__label cswitch__label--off">
      {{ inactiveText }}
    </span>
    <span class="cswitch__core">
      <span class="cswitch__thumb" aria-hidden="true" />
    </span>
    <span v-if="activeText && size !== 'small'" class="cswitch__label cswitch__label--on">
      {{ activeText }}
    </span>
  </button>
</template>

<script>
export default {
  name: 'CSwitch',

  props: {
    modelValue: { type: Boolean, default: false },

    disabled: { type: Boolean, default: false },

    size: { type: String, default: 'medium' },

    activeText: { type: String, default: '' },

    inactiveText: { type: String, default: '' },
  },

  emits: ['update:modelValue', 'change'],

  methods: {
    toggle() {
      if (this.disabled) return

      const next = !this.modelValue

      this.$emit('update:modelValue', next)
      this.$emit('change', next)
    },
  },
}
</script>

<style scoped>
.cswitch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--text);
  cursor: pointer;
  font: inherit;
  line-height: 1;
}

.cswitch.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cswitch__core {
  position: relative;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--code-gutter-bg);
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.cswitch--small .cswitch__core {
  width: 36px;
  height: 20px;
}

.cswitch--medium .cswitch__core {
  width: 44px;
  height: 24px;
}

.cswitch--large .cswitch__core {
  width: 52px;
  height: 28px;
}

.cswitch.is-checked .cswitch__core {
  background: var(--accent-muted);
  border-color: var(--accent-border);
  box-shadow: var(--neon-glow);
}

.cswitch__thumb {
  position: absolute;
  left: 2px;
  border-radius: 50%;
  background: var(--muted);
  transition:
    transform 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
}

.cswitch--small .cswitch__thumb {
  width: 14px;
  height: 14px;
}

.cswitch--medium .cswitch__thumb {
  width: 18px;
  height: 18px;
}

.cswitch--large .cswitch__thumb {
  width: 22px;
  height: 22px;
}

.cswitch.is-checked .cswitch__thumb {
  background: var(--accent);
  box-shadow: 0 0 8px var(--glow-color);
}

.cswitch--small.is-checked .cswitch__thumb {
  transform: translateX(16px);
}

.cswitch--medium.is-checked .cswitch__thumb {
  transform: translateX(20px);
}

.cswitch--large.is-checked .cswitch__thumb {
  transform: translateX(24px);
}

.cswitch__label {
  font-size: 0.875rem;
  color: var(--muted);
  transition: color 0.2s ease;
}

.cswitch__label--on {
  color: var(--accent);
}

.cswitch:not(.is-checked) .cswitch__label--off {
  color: var(--text);
}

.cswitch.is-checked .cswitch__label--off {
  color: var(--muted);
}

.cswitch:not(.is-checked) .cswitch__label--on {
  color: var(--muted);
}
</style>
