<template>

  <button

    :class="['cbtn', `cbtn--${type}`, `cbtn--${size}`, { disabled, 'is-plain': plain, 'is-round': round, 'is-icon-only': isIconOnly }]"

    :disabled="disabled || loading"

    @click="$emit('click', $event)"

  >

    <span v-if="hasIcon" class="icon" aria-hidden="true">

      <CIcon v-if="icon" :name="icon" :size="iconSize" />

      <slot v-else name="icon" />

    </span>

    <span v-if="loading" class="spinner" aria-hidden="true"></span>

    <span v-if="!isIconOnly" class="content"><slot>{{ label }}</slot></span>

  </button>

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

  name: 'CButton',

  components: { CIcon },

  props: {

    label: { type: String, default: '' },

    icon: { type: String, default: '' },

    type: { type: String, default: 'primary' },

    size: { type: String, default: 'medium' },

    disabled: { type: Boolean, default: false },

    loading: { type: Boolean, default: false },

    plain: { type: Boolean, default: false },

    round: { type: Boolean, default: false },

    iconOnly: { type: Boolean, default: false }

  },

  computed: {

    hasIcon() {

      return !!this.icon || slotHasContent(this.$slots.icon)

    },

    hasDefaultContent() {

      if (this.label) return true

      return slotHasContent(this.$slots.default)

    },

    isIconOnly() {

      return this.iconOnly || (this.hasIcon && !this.hasDefaultContent)

    },

    iconSize() {

      const map = { small: 14, medium: 16, large: 18 }

      return map[this.size] || 16

    }

  }

}

</script>



<style scoped>

.cbtn {

  display:inline-flex;

  align-items:center;

  gap:8px;

  padding:8px 14px;

  border-radius:8px;

  border:1px solid transparent;

  background: var(--accent);

  color: var(--text-on-accent);

  cursor:pointer;

  font-weight:600;

  transition:transform .12s ease, box-shadow .12s ease, opacity .12s ease;

  box-shadow: var(--neon-glow);

}

.cbtn:active { transform: translateY(1px) }

.cbtn.disabled, .cbtn[disabled] { opacity:0.5; cursor:not-allowed; box-shadow:none }



.cbtn .icon { display:inline-flex; align-items:center; justify-content:center; line-height:0; }

.cbtn.is-icon-only { gap:0; padding:8px; }

.cbtn.is-icon-only.cbtn--small { padding:6px; }

.cbtn.is-icon-only.cbtn--large { padding:10px; }

.cbtn.is-icon-only.is-round { padding:8px; border-radius:999px; }



.cbtn--primary { background:var(--accent); color:var(--text-on-accent); border-color:var(--border-subtle) }

.cbtn--secondary { background:transparent; color:var(--accent-2); border-color:var(--accent-2); box-shadow:none }

.cbtn--ghost { background:transparent; color:var(--text); border-color:transparent; box-shadow:none }



.cbtn.is-plain { background: transparent; color: var(--accent); border-color: var(--accent); box-shadow:none }



.cbtn.is-round { border-radius: 999px; padding-left:12px; padding-right:12px }



.cbtn--small { padding:6px 10px; font-size:13px }

.cbtn--medium { padding:8px 14px; font-size:15px }

.cbtn--large { padding:12px 18px; font-size:17px }



.spinner {

  width:14px; height:14px; border-radius:50%;

  border:2px solid rgba(255,255,255,0.14);

  border-top-color:rgba(255,255,255,0.6);

  animation: spin 0.9s linear infinite;

}

@keyframes spin { to { transform: rotate(360deg) } }



.content { display:inline-block }

</style>

