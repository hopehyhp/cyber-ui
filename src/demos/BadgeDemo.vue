<template>
  <div class="badge-placeholder container">
    <div class="card">
      <h1>Badge 徽章</h1>
      <p class="kv">🚧 开发中，敬请期待。</p>
    </div>
  </div>
</template>

<script>
export default { name: 'BadgeDemo' }
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 1rem auto;
}
.card {
  padding: 1rem;
  border-radius: var(--radius-md);
  background: var(--card-bg);
  border: 1px solid var(--border-subtle);
}
.kv {
  color: var(--muted);
}
</style>
