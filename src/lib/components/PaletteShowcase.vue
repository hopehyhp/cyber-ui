<template>
  <div class="palette-showcase card">
    <h2>Palette showcase</h2>
    <p class="kv">This page demonstrates the currently active palette set.</p>
    <div class="swatches" style="margin-top:1rem">
      <div class="swatch s1">swatch-1</div>
      <div class="swatch s2">swatch-2</div>
      <div class="swatch s3">swatch-3</div>
      <div class="swatch s4">swatch-4</div>
    </div>
  </div>
</template>

<script>
export default { name: 'PaletteShowcase' }
</script>

<style scoped>
.swatches { display:flex; gap:0.75rem; }
.swatch { width:96px; height:96px; border-radius:12px; display:flex; align-items:center; justify-content:center; color:rgba(255,255,255,0.95); box-shadow:0 8px 26px rgba(0,0,0,0.45); }
.swatch.s1 { background:var(--swatch-1, #00f0ff) }
.swatch.s2 { background:var(--swatch-2, #ff00b3) }
.swatch.s3 { background:var(--swatch-3, #7c3cff) }
.swatch.s4 { background:var(--swatch-4, #00ffa3) }
.kv { color:var(--muted) }
.card { padding:1rem }
</style>
