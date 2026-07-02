<template>
  <nav class="cbreadcrumb" aria-label="面包屑导航">
    <ol class="cbreadcrumb__list">
      <template v-if="displayItems.length">
        <CBreadcrumbItem
          v-for="(item, index) in displayItems"
          :key="itemKey(item, index)"
          :label="item.label"
          :to="item.to"
          :icon="item.icon"
          :separator-icon="item.separatorIcon"
          :is-last="index === displayItems.length - 1"
          @click="handleItemClick(index, $event)"
        />
      </template>
      <slot v-else />
    </ol>
  </nav>
</template>

<script>
import CBreadcrumbItem from './CBreadcrumbItem.vue'
import BreadcrumbStore from '../breadcrumb.js'

export default {
  name: 'CBreadcrumb',

  components: { CBreadcrumbItem },

  provide() {
    return {
      breadcrumbRoot: this,
    }
  },

  props: {
    separator: { type: String, default: '/' },

    /** 外部传入数据集，优先级高于 useStore */
    items: { type: Array, default: null },

    /** 绑定 BreadcrumbStore 缓存 */
    useStore: { type: Boolean, default: false },
  },

  emits: ['itemClick'],

  data() {
    return {
      slotItems: [],
    }
  },

  computed: {
    displayItems() {
      if (Array.isArray(this.items)) {
        return this.items
      }

      if (this.useStore) {
        return BreadcrumbStore.items
      }

      return []
    },
  },

  methods: {
    registerItem(vm) {
      this.slotItems.push(vm)
    },

    unregisterItem(vm) {
      const idx = this.slotItems.indexOf(vm)

      if (idx > -1) this.slotItems.splice(idx, 1)
    },

    isLastItem(vm) {
      const list = this.displayItems.length ? this.displayItems : this.slotItems
      return list[list.length - 1] === vm
    },

    itemKey(item, index) {
      return item.key ?? `${item.label}-${index}`
    },

    handleItemClick(index, event) {
      if (this.useStore) {
        BreadcrumbStore.goto(index)
      }

      this.$emit('itemClick', {
        index,
        item: this.displayItems[index],
        event,
      })
    },
  },
}
</script>

<style scoped>
.cbreadcrumb__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0;
}
</style>
