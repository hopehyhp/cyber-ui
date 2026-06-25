<template>
  <div class="home">
    <section class="home-hero">
      <div class="hero-content">
        <h1 class="glitch" data-text="Cyber UI">Cyber UI</h1>
        <p class="lead">A cyberpunk-inspired Vue 3 component library — 赛博朋克配色与组件预览。</p>
      </div>
    </section>

    <div class="container">
      <div class="home-grid">
        <section class="preview">
          <div class="card">
            <h2 style="margin: 0 0 0.5rem">Theme preview</h2>
            <p class="lead" style="margin-bottom: 1rem">实时预览当前主题配色。</p>

            <div class="swatches" aria-hidden="false">
              <div class="swatch s1"><span class="label">1</span></div>
              <div class="swatch s2"><span class="label">2</span></div>
              <div class="swatch s3"><span class="label">3</span></div>
              <div class="swatch s4"><span class="label">4</span></div>
            </div>

            <div style="margin-top: 1rem; display: flex; gap: 1rem; align-items: center">
              <button class="btn">Primary Action</button>
              <button class="btn ghost">Secondary</button>
            </div>
          </div>

          <div class="card" style="margin-top: 1rem">
            <h3 style="margin: 0 0 0.5rem">Component samples</h3>
            <p class="kv">Example text, tags, and small cards to demonstrate the visual system.</p>
            <div style="display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap">
              <div class="card" style="width: 200px">Small card</div>
              <div class="card" style="width: 200px">Small card</div>
              <div class="card" style="width: 200px">Small card</div>
            </div>
          </div>
        </section>

        <aside class="controls card">
          <h3 style="margin-top: 0">Appearance</h3>
          <p class="kv">切换黑白主题，配色会立即应用到上方预览。</p>

          <div style="margin-top: 1rem">
            <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem">
              <button
                class="btn ghost"
                :class="{ active: currentTheme === 'dark' }"
                @click="setTheme('dark')"
              >
                黑色
              </button>
              <button
                class="btn ghost"
                :class="{ active: currentTheme === 'light' }"
                @click="setTheme('light')"
              >
                白色
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      currentTheme:
        typeof localStorage !== 'undefined'
          ? localStorage.getItem('theme') === 'light'
            ? 'light'
            : 'dark'
          : 'dark',
    }
  },
  mounted() {
    this.applyTheme(this.currentTheme)
  },
  methods: {
    setTheme(t) {
      this.currentTheme = t
      try {
        localStorage.setItem('theme', t)
      } catch (e) {}
      this.applyTheme(t)
    },
    applyTheme(t) {
      if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.setAttribute('data-theme', t)
      }
    },
  },
}
</script>

<style scoped>
.home {
  padding-bottom: 2rem;
}
.home-hero {
  background: transparent;
  padding: 2rem 0 1rem 0;
  display: flex;
  align-items: center;
}
.hero-content {
  max-width: 900px;
}
.controls.card {
  padding: 1rem;
}
.btn.active {
  border-color: var(--accent-border);
  background: var(--accent-muted);
  color: var(--accent);
}
.kv {
  color: var(--muted);
}

.glitch {
  font-size: 5rem;
  font-weight: bold;
  position: relative;
  margin-bottom: 1rem;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg-solid);
  overflow: hidden;
}

.glitch::before {
  left: 2px;
  text-shadow: -2px 0 var(--accent);
  animation: glitch-anim-1 2s infinite linear reverse;
}

.glitch::after {
  left: -2px;
  text-shadow: -2px 0 var(--accent-2);
  animation: glitch-anim-2 2s infinite linear reverse;
}

@keyframes glitch-anim-1 {
  0% {
    clip-path: inset(5% 0 95% 0);
  }
  10% {
    clip-path: inset(8% 0 25% 0);
  }
  20% {
    clip-path: inset(20% 0 30% 0);
  }
  30% {
    clip-path: inset(40% 0 55% 0);
  }
  40% {
    clip-path: inset(50% 0 10% 0);
  }
  50% {
    clip-path: inset(70% 0 20% 0);
  }
  60% {
    clip-path: inset(90% 0 5% 0);
  }
  70% {
    clip-path: inset(30% 0 60% 0);
  }
  80% {
    clip-path: inset(55% 0 5% 0);
  }
  90% {
    clip-path: inset(10% 0 80% 0);
  }
  100% {
    clip-path: inset(85% 0 10% 0);
  }
}

@keyframes glitch-anim-2 {
  0% {
    clip-path: inset(95% 0 5% 0);
  }
  10% {
    clip-path: inset(75% 0 8% 0);
  }
  20% {
    clip-path: inset(70% 0 20% 0);
  }
  30% {
    clip-path: inset(45% 0 40% 0);
  }
  40% {
    clip-path: inset(90% 0 10% 0);
  }
  50% {
    clip-path: inset(30% 0 50% 0);
  }
  60% {
    clip-path: inset(5% 0 90% 0);
  }
  70% {
    clip-path: inset(40% 0 30% 0);
  }
  80% {
    clip-path: inset(95% 0 5% 0);
  }
  90% {
    clip-path: inset(20% 0 80% 0);
  }
  100% {
    clip-path: inset(10% 0 85% 0);
  }
}
</style>
