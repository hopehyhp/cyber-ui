<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <p>This is a minimal Vue 3 + Vite starter.</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: 'Hello'
    }
  }
}
</script>

<style scoped>
.hello { color: #2c3e50; }
</style>

