<template>
  <div
    :class="[
      'cprogress',
      `cprogress--${size}`,
      type === 'circle' ? 'cprogress--circle' : 'cprogress--line',
      {
        'is-indeterminate': indeterminate,
        'is-text-inside': textInside && type === 'line',
      },
    ]"
    role="progressbar"
    :aria-valuenow="indeterminate ? undefined : normalizedPercent"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <template v-if="type === 'line'">
      <div class="cprogress__outer">
        <div class="cprogress__inner" :style="barStyle" />
        <span v-if="showText && textInside" class="cprogress__text cprogress__text--inside">
          {{ displayText }}
        </span>
      </div>
      <span v-if="showText && !textInside" class="cprogress__text">{{ displayText }}</span>
    </template>

    <template v-else>
      <div class="cprogress__circle-wrap">
        <svg class="cprogress__svg" :width="circleSize" :height="circleSize" :viewBox="viewBox">
          <circle
            class="cprogress__track"
            :cx="center"
            :cy="center"
            :r="radius"
            fill="none"
            :stroke-width="resolvedStrokeWidth"
          />
          <circle
            class="cprogress__bar"
            :cx="center"
            :cy="center"
            :r="radius"
            fill="none"
            :stroke-width="resolvedStrokeWidth"
            :stroke="barColor"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="dashOffset"
            stroke-linecap="round"
          />
        </svg>
        <span v-if="showText" class="cprogress__circle-text">{{ displayText }}</span>
      </div>
    </template>
  </div>
</template>

<script>
const STATUS_COLORS = {
  success: 'var(--swatch-4)',
  warning: 'var(--hl-num)',
  exception: '#f87171',
}

export default {
  name: 'CProgress',

  props: {
    percentage: { type: Number, default: 0 },

    type: {
      type: String,
      default: 'line',
      validator: (v) => ['line', 'circle'].includes(v),
    },

    status: {
      type: String,
      default: '',
      validator: (v) => ['', 'success', 'warning', 'exception'].includes(v),
    },

    size: {
      type: String,
      default: 'medium',
      validator: (v) => ['small', 'medium', 'large'].includes(v),
    },

    strokeWidth: { type: Number, default: 0 },

    showText: { type: Boolean, default: true },

    textInside: { type: Boolean, default: false },

    color: { type: String, default: '' },

    indeterminate: { type: Boolean, default: false },

    format: { type: Function, default: null },
  },

  computed: {
    normalizedPercent() {
      if (this.indeterminate) return 0

      return Math.min(100, Math.max(0, this.percentage))
    },

    displayText() {
      if (this.format) return this.format(this.normalizedPercent)

      return `${this.normalizedPercent}%`
    },

    barColor() {
      if (this.color) return this.color

      if (this.status && STATUS_COLORS[this.status]) return STATUS_COLORS[this.status]

      return 'var(--accent)'
    },

    barStyle() {
      if (this.indeterminate) {
        return { width: '40%', background: this.barColor }
      }

      return {
        width: `${this.normalizedPercent}%`,
        background: this.barColor,
      }
    },

    resolvedStrokeWidth() {
      if (this.strokeWidth > 0) return this.strokeWidth

      const map = { small: 4, medium: 6, large: 8 }

      return map[this.size] || 6
    },

    circleSize() {
      const map = { small: 80, medium: 120, large: 160 }

      return map[this.size] || 120
    },

    center() {
      return this.circleSize / 2
    },

    radius() {
      return (this.circleSize - this.resolvedStrokeWidth) / 2
    },

    circumference() {
      return 2 * Math.PI * this.radius
    },

    dashOffset() {
      return this.circumference * (1 - this.normalizedPercent / 100)
    },

    viewBox() {
      return `0 0 ${this.circleSize} ${this.circleSize}`
    },
  },
}
</script>

<style scoped>
.cprogress {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 100%;
  color: var(--text);
}

.cprogress--line {
  flex-direction: row;
}

.cprogress--circle {
  width: auto;
}

.cprogress__outer {
  position: relative;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  border-radius: var(--radius-full);
  background: var(--code-gutter-bg);
  border: 1px solid var(--border-subtle);
}

.cprogress--small .cprogress__outer {
  height: 6px;
}

.cprogress--medium .cprogress__outer {
  height: 8px;
}

.cprogress--large .cprogress__outer {
  height: 12px;
}

.cprogress.is-text-inside.cprogress--small .cprogress__outer {
  height: 18px;
}

.cprogress.is-text-inside.cprogress--medium .cprogress__outer {
  height: 22px;
}

.cprogress.is-text-inside.cprogress--large .cprogress__outer {
  height: 26px;
}

.cprogress__inner {
  position: absolute;
  inset: 0 auto 0 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  min-width: 0;
  border-radius: inherit;
  background: var(--accent);
  box-shadow: 0 0 12px var(--glow-color);
  transition: width 0.3s ease;
}

.cprogress:not(.is-text-inside) .cprogress__inner {
  position: relative;
  inset: auto;
}

.cprogress.is-indeterminate .cprogress__inner {
  animation: cprogress-indeterminate 1.4s ease-in-out infinite;
}

@keyframes cprogress-indeterminate {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(350%);
  }
}

.cprogress__text {
  flex-shrink: 0;
  min-width: 2.5rem;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--muted);
  text-align: right;
}

.cprogress__text--inside {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  padding: 0 8px;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  line-height: 1;
  color: var(--text);
  text-align: center;
  white-space: nowrap;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
  pointer-events: none;
}

.cprogress.is-text-inside.cprogress--large .cprogress__text--inside {
  font-size: var(--font-size-sm);
}

.cprogress__circle-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.cprogress__svg {
  transform: rotate(-90deg);
}

.cprogress__track {
  stroke: var(--code-gutter-bg);
}

.cprogress__bar {
  transition: stroke-dashoffset 0.3s ease;
}

.cprogress__circle-text {
  position: absolute;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--text);
}

.cprogress--large .cprogress__circle-text {
  font-size: var(--font-size-base);
}
</style>
