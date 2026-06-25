<template>
  <div class="collapsible" :style="wrapperStyle" ref="wrap">
    <div class="content" ref="content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Collapsible',
  props: {
    modelValue: { type: Boolean, default: false },
    duration: { type: Number, default: 260 },
  },
  data() {
    return {
      animTimeout: null,
      wrapperStyle: {
        maxHeight: this.modelValue ? 'none' : '0px',
        overflow: 'hidden',
        opacity: this.modelValue ? 1 : 0,
        transition: `max-height ${this.duration}ms cubic-bezier(.2,.9,.2,1), opacity ${this.duration}ms, transform ${this.duration}ms`,
        willChange: 'max-height, opacity, transform',
      },
    }
  },
  mounted() {
    if (this.modelValue) this.afterOpen()
    // listen for transition end to finalize state
    this.$refs.wrap && this.$refs.wrap.addEventListener('transitionend', this.onTransitionEnd)
  },
  beforeUnmount() {
    this.$refs.wrap && this.$refs.wrap.removeEventListener('transitionend', this.onTransitionEnd)
    if (this.animTimeout) clearTimeout(this.animTimeout)
  },
  watch: {
    modelValue(newVal) {
      if (newVal) this.show()
      else this.hide()
    },
  },
  methods: {
    onTransitionEnd(e) {
      // only handle max-height/opacity transitions originating from wrapper
      if (e.target !== this.$refs.wrap) return
      if (this.modelValue) {
        // opened
        this.wrapperStyle.maxHeight = 'none'
      }
    },
    show() {
      const el = this.$refs.content
      if (!el) return
      if (this.animTimeout) clearTimeout(this.animTimeout)
      const height = el.scrollHeight
      // set from 0 to measured height to animate
      this.wrapperStyle.maxHeight = '0px'
      this.wrapperStyle.opacity = 0
      // force reflow
      void this.$refs.wrap.offsetHeight
      this.wrapperStyle.maxHeight = height + 'px'
      this.wrapperStyle.opacity = 1
      // after duration we'll emit update if needed (but actual finalization handled in transitionend)
      this.animTimeout = setTimeout(() => {
        this.animTimeout = null
      }, this.duration + 50)
    },
    hide() {
      const el = this.$refs.content
      if (!el) return
      if (this.animTimeout) clearTimeout(this.animTimeout)
      const height = el.scrollHeight
      // animate from current height to 0
      this.wrapperStyle.maxHeight = height + 'px'
      this.wrapperStyle.opacity = 1
      void this.$refs.wrap.offsetHeight
      this.wrapperStyle.maxHeight = '0px'
      this.wrapperStyle.opacity = 0
      this.animTimeout = setTimeout(() => {
        this.animTimeout = null
      }, this.duration + 50)
    },
    afterOpen() {
      this.wrapperStyle.maxHeight = 'none'
      this.wrapperStyle.opacity = 1
    },
  },
}
</script>

<style scoped>
.collapsible {
  overflow: hidden;
}
.content {
  padding-top: 0.5rem;
}
</style>
