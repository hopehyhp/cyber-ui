<template>
  <div class="palette-demo card">
    <h2>Palette demo</h2>
    <p class="kv">A simple demo of palette variables.</p>
    <div class="swatches" style="margin-top: 1rem">
      <div class="swatch s1">1</div>
      <div class="swatch s2">2</div>
      <div class="swatch s3">3</div>
      <div class="swatch s4">4</div>
    </div>
  </div>
</template>

<script>
export default { name: 'PaletteDemo' }
</script>

<style scoped>
.swatches {
  display: flex;
  gap: 0.75rem;
}
.swatch {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #fff;
}
.swatch.s1 {
  background: var(--swatch-1, #00f0ff);
}
.swatch.s2 {
  background: var(--swatch-2, #ff00b3);
}
.swatch.s3 {
  background: var(--swatch-3, #7c3cff);
}
.swatch.s4 {
  background: var(--swatch-4, #00ffa3);
}
.card {
  padding: 1rem;
}
.kv {
  color: var(--muted);
}
</style>
