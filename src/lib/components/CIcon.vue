<script>
import { h } from 'vue'
import { getIcon } from '../icons'

export default {
  name: 'CIcon',
  props: {
    name: { type: String, required: true },
    size: { type: [Number, String], default: 16 }
  },
  render() {
    const nodes = getIcon(this.name)
    if (!nodes) {
      if (import.meta.env.DEV) {
        console.warn(`[CIcon] unknown icon: "${this.name}"`)
      }
      return null
    }
    return h('svg', {
      class: 'cicon',
      width: this.size,
      height: this.size,
      viewBox: '0 0 24 24',
      fill: 'none',
      'aria-hidden': 'true'
    }, nodes.map(([tag, attrs]) => h(tag, attrs)))
  }
}
</script>

<style scoped>
.cicon { display: block; flex-shrink: 0; }
</style>
