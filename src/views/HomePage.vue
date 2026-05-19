<template>
  <div class="home-page">
    <!-- Hero секция - Магический лес -->
    <section class="hero">
      <!-- Анимированный фон с деревьями -->
      <div class="forest-bg">
        <div class="fog-layer"></div>
        <div class="trees-layer">
          <div class="tree" v-for="i in 15" :key="i" :style="{ left: `${i * 7}%`, animationDelay: `${i * 0.3}s` }"></div>
        </div>
        <div class="fireflies">
          <div class="firefly" v-for="i in 30" :key="i" :style="getFireflyStyle(i)"></div>
        </div>
        <div class="code-rain">
          <span class="code-drop" v-for="i in 20" :key="i" :style="getCodeRainStyle(i)">⚡</span>
        </div>
      </div>
      
      <div class="hero-overlay"></div>
      
      <div class="container">
        <div class="hero-content">
          <!-- Верхняя часть: руна + бейдж + заголовок -->
          <div class="hero-header">
            <div class="hero-header-top">
              <div class="rune-symbol" data-text="ᛗ">ᛗ</div>
              <div class="hero-badge">
                <span class="badge-text">{{ $t('home.badge') }}</span>
                <div class="badge-glow"></div>
              </div>
            </div>
            <h1 class="hero-title">
              <span class="title-line">
                <EditableText v-model="content.hero.title" type="input" />
              </span>
              <span class="title-cursor">✦</span>
            </h1>
          </div>
          
          <!-- Средняя часть: подзаголовок + бинарный дождь в строку -->
          <div class="hero-middle">
            <p class="hero-subtitle">
              <EditableText v-model="content.hero.subtitle" type="input" />
            </p>
            <div class="binary-rain">{{ binaryString }}</div>
          </div>
          
          <!-- Нижняя часть: консоль + руны + кнопки в один ряд -->
          <div class="hero-bottom">
            <!-- Магическая консоль -->
            <div class="magic-console">
              <div class="console-header">
                <span class="console-dot red"></span>
                <span class="console-dot yellow"></span>
                <span class="console-dot green"></span>
                <span class="console-title">~/portfolio/magic.sh</span>
              </div>
              <div class="console-content">
                <div class="console-line" v-for="(line, idx) in consoleLines" :key="idx">
                  <span class="prompt">$</span>
                  <span class="command">{{ line }}</span>
                  <span class="cursor" v-if="idx === consoleLines.length - 1"></span>
                </div>
              </div>
            </div>
            
            <!-- Правая часть: руны и кнопки -->
            <div class="hero-right">
              <!-- Технологии как руны -->
              <div class="rune-stack">
                <div class="rune-title">{{ $t('home.ancientTechRunes') }}</div>
                <div class="rune-icons">
                  <div class="rune" v-for="tech in techRunes" :key="tech.name">
                    <div class="rune-symbol">{{ tech.rune }}</div>
                    <div class="rune-name">{{ tech.name }}</div>
                  </div>
                </div>
              </div>
              
              <!-- Кнопки -->
              <div class="hero-buttons">
                <router-link to="/projects" class="btn-magic">
                  <span class="btn-text">{{ $t('home.enterForest') }}</span>
                  <span class="btn-icon">🌲</span>
                  <div class="btn-magic-glow"></div>
                </router-link>
                <router-link to="/contact" class="btn-rune">
                  <span class="btn-text">{{ $t('home.castSpell') }}</span>
                  <span class="btn-icon">✨</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Scroll индикатор как магический свиток -->
      <div class="scroll-scroll">
        <span class="scroll-rune">ᛜ</span>
        <span class="scroll-text">{{ $t('home.scroll') }}</span>
        <span class="scroll-rune">ᛜ</span>
      </div>
    </section>

    <!-- Статистика - Легенды -->
    <section class="legends">
      <div class="container">
        <div class="legends-grid">
          <div class="legend-card" v-for="(stat, index) in legends" :key="index"
               @mouseenter="startLegendCounter(stat, index)">
            <div class="legend-icon">{{ stat.icon }}</div>
            <div class="legend-number">
              <span :ref="el => setLegendRef(el, index)">0</span>
              <span class="legend-plus">+</span>
            </div>
            <div class="legend-name">{{ $t(`home.legends.${stat.key}`) }}</div>
            <div class="legend-rune">᛫</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Секция природы и кода -->
    <section class="nature-code">
      <div class="container">
        <div class="nature-grid">
          <div class="nature-text">
            <div class="nature-badge">{{ $t('home.natureBadge') }}</div>
            <h2 class="nature-title">{{ $t('home.natureTitle') }} <span class="gradient">{{ $t('home.wilderness') }}</span> {{ $t('home.meets') }} <span class="gradient">{{ $t('home.syntax') }}</span></h2>
            <div class="nature-description">
              <p>{{ $t('home.natureDesc') }}</p>
              <p class="nature-quote">"{{ $t('home.natureQuote') }}"</p>
            </div>
            <div class="code-snippet">
              <pre><code><span class="keyword">function</span> <span class="function">exploreForest</span>() {<br>  <span class="keyword">let</span> magic = <span class="string">'∞'</span>;<br>  <span class="keyword">return</span> <span class="string">'🌲✨'</span>;<br>}</code></pre>
            </div>
          </div>
          <div class="nature-visual">
            <div class="floating-tree">
              <div class="tree-canopy"></div>
              <div class="tree-trunk"></div>
              <div class="tree-code">&#123; &#125;</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Секретная комната -->
    <section class="secret-chamber">
      <div class="container">
        <div class="chamber-content">
          <div class="chamber-door" @click="revealSecret" :class="{ 'is-open': secretRevealed }">
            <div class="door-left"></div>
            <div class="door-right"></div>
            <div class="door-knob"></div>
            <div class="door-rune">ᛗ</div>
          </div>
          <div class="secret-message" v-if="secretRevealed">
            <div class="secret-glow"></div>
            <div class="secret-text">
              <span class="secret-rune">✦</span>
              <p>{{ $t('home.secretMessage') }}</p>
              <span class="secret-rune">✦</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Проекты как артефакты -->
    <section class="artifacts">
      <div class="container">
        <h2 class="artifacts-title">
          <span class="title-rune">⚔️</span>
          {{ $t('home.ancientArtifacts') }}
          <span class="title-rune">🏆</span>
        </h2>
        <div class="artifacts-grid">
          <div class="artifact-card" v-for="(project, idx) in featuredProjects" :key="project.id">
            <div class="artifact-glow"></div>
            <div class="artifact-icon">{{ getArtifactIcon(idx) }}</div>
            <ProjectCard :project="project" class="artifact-project" />
            <div class="artifact-power">{{ $t('home.powerLevel') }} {{ (idx + 1) * 33 }}% ✦</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Финальный призыв -->
    <section class="final-call">
      <div class="forest-silhouette"></div>
      <div class="call-content">
        <div class="call-rune">🌲</div>
        <h2>{{ $t('home.ready') }} <span class="gradient">{{ $t('home.forge') }}</span> {{ $t('home.yourDigitalForest') }}?</h2>
        <p>{{ $t('home.writeMagic') }}</p>
        <router-link to="/contact" class="btn-final">
          <span>{{ $t('home.beginQuest') }} →</span>
          <div class="btn-stars">✨🌙⭐</div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useContentStore } from '../stores/contentStore'
import { storeToRefs } from 'pinia'
import EditableText from '../components/EditableText.vue'
import ProjectCard from '../components/ProjectCard.vue'

const contentStore = useContentStore()
const { content } = storeToRefs(contentStore)

const secretRevealed = ref(false)
const binaryString = ref('')
const legendRefs: { [key: number]: HTMLElement | null } = {}

const setLegendRef = (el: any, index: number) => {
  if (el) legendRefs[index] = el
}

const techRunes = [
  { name: 'Vue.js', rune: 'ᚡ' },
  { name: 'TypeScript', rune: 'ᛏ' },
  { name: 'Node.js', rune: 'ᚾ' },
  { name: 'Three.js', rune: 'ᛉ' },
  { name: 'WebGL', rune: 'ᚹ' }
]

const legends = [
  { number: 1.5, key: 'years', icon: '🌙', counted: false },
  { number: 30, key: 'spells', icon: '✨', counted: false },
  { number: 100, key: 'bugs', icon: '🐛', counted: false },
  { number: 100, key: 'tea', icon: '🍵', counted: false }
]

const consoleLines = ref([
  'ls -la forest/',
  'drwxr-xr-x  magic  code  4096  .',
  'drwxr-xr-x  magic  code  4096  ..',
  '-rw-r--r--  magic  code  1337  spell.js',
  '-rw-r--r--  magic  code   666  magic.css',
  'cat spell.js && echo "✨ Magic initialized ✨"'
])

const featuredProjects = computed(() => content.value.projects.slice(0, 3))

const getFireflyStyle = (i: number) => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  animationDelay: `${Math.random() * 5}s`,
  animationDuration: `${3 + Math.random() * 4}s`
})

const getCodeRainStyle = (i: number) => ({
  left: `${Math.random() * 100}%`,
  animationDelay: `${Math.random() * 3}s`,
  animationDuration: `${2 + Math.random() * 3}s`
})

const getArtifactIcon = (idx: number) => {
  const icons = ['⚔️', '🏺', '🔮', '📜', '💎', '👑']
  return icons[idx % icons.length]
}

const startLegendCounter = (legend: any, index: number) => {
  if (legend.counted) return
  legend.counted = true
  
  let current = 0
  const target = legend.number
  const increment = target / 50
  const element = legendRefs[index]
  
  const interval = setInterval(() => {
    current += increment
    if (current >= target) {
      if (element) element.textContent = target.toString()
      clearInterval(interval)
    } else {
      if (element) element.textContent = Math.floor(current).toString()
    }
  }, 30)
}

const revealSecret = () => {
  secretRevealed.value = true
}

// Генерация бинарного дождя
const generateBinary = () => {
  const chars = ['0', '1', ' ', ' ', ' ']
  let str = ''
  for (let i = 0; i < 50; i++) {
    str += chars[Math.floor(Math.random() * chars.length)]
  }
  binaryString.value = str
}

onMounted(() => {
  generateBinary()
  setInterval(generateBinary, 100)
})
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

.home-page {
  overflow-x: hidden;
}

// Hero - Магический лес
.hero {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  
  .forest-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    
    .fog-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 200%;
      height: 100%;
      background: repeating-linear-gradient(
        90deg,
        transparent,
        rgba($accent, 0.03) 50px,
        transparent 100px
      );
      animation: fogMove 20s linear infinite;
    }
    
    .trees-layer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 60%;
      
      .tree {
        position: absolute;
        bottom: 0;
        width: 30px;
        height: 80px;
        background: linear-gradient(180deg, #1a3a2a, #0a1a10);
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        
        &::before {
          content: '';
          position: absolute;
          bottom: -10px;
          left: -10px;
          width: 50px;
          height: 20px;
          background: #0a1a10;
          border-radius: 50%;
        }
      }
    }
    
    .fireflies {
      .firefly {
        position: absolute;
        width: 4px;
        height: 4px;
        background: $accent;
        border-radius: 50%;
        box-shadow: 0 0 10px $accent;
        animation: floatFirefly 4s ease-in-out infinite;
      }
    }
    
    .code-rain {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      
      .code-drop {
        position: absolute;
        color: rgba($accent, 0.3);
        font-size: 14px;
        animation: codeFall 3s linear infinite;
      }
    }
  }
  
  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 50%, rgba(13, 28, 32, 0.4), $bg-dark);
    z-index: 1;
  }
  
  .hero-content {
    position: relative;
    z-index: 2;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0px 0 90px 0;
    
    @include mobile {
      padding: 40px 0 20px 0;
      justify-content: center;
      gap: $spacing-xl;
    }
  }
  
  .hero-header-top {
    display: flex;
    align-items: center;
    gap: $spacing-lg;
    margin-bottom: $spacing-md;
    
    @include mobile {
      flex-direction: column;
      align-items: flex-start;
      gap: $spacing-md;
    }
  }
  
  .rune-symbol {
    font-size: 5rem;
    font-family: monospace;
    color: $accent;
    text-shadow: 0 0 20px $accent;
    animation: pulse-glow 2s infinite;
    display: inline-block;
    width: fit-content;
  }
  
  .hero-badge {
    display: inline-block;
    
    .badge-text {
      display: inline-block;
      padding: $spacing-xs $spacing-xl;
      background: rgba($accent, 0.1);
      border: 1px solid rgba($accent, 0.3);
      border-radius: $radius-round;
      font-size: 0.6rem;
      letter-spacing: 3px;
      color: $accent;
      backdrop-filter: blur(10px);
    }
  }
  
  .hero-title {
    font-size: 5rem;
    font-weight: 800;
    margin-bottom: $spacing-lg;
    display: flex;
    gap: $spacing-sm;
    
    .title-cursor {
      animation: blink 1s infinite;
      color: $accent;
    }
    
    @include mobile {
      font-size: 2.5rem;
      flex-direction: column;
    }
  }
  
  .hero-middle {
    display: flex;
    align-items: baseline;
    gap: $spacing-xl;
    margin-bottom: $spacing-xl;
    flex-wrap: wrap;
    
    @include mobile {
      flex-direction: column;
      gap: $spacing-sm;
    }
  }
  
  .hero-subtitle {
    font-size: 1.3rem;
    color: $text-muted;
    margin-bottom: 0;
  }
  
  .binary-rain {
    font-family: monospace;
    font-size: 0.7rem;
    color: rgba($accent, 0.4);
    letter-spacing: 2px;
  }
  
  .hero-bottom {
    display: flex;
    gap: $spacing-xl;
    align-items: flex-end;
    flex-wrap: wrap;
    
    @include mobile {
      flex-direction: column;
      gap: $spacing-lg;
    }
  }
  
  .hero-right {
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;
    align-items: flex-end;
    
    @include mobile {
      align-items: center;
    }
  }
  
  .magic-console {
    background: rgba(0, 0, 0, 0.6);
    border-radius: $radius-md;
    border: 1px solid rgba($accent, 0.3);
    flex: 1;
    min-width: 280px;
    
    @include mobile {
      width: 100%;
    }
    
    .console-header {
      padding: $spacing-xs $spacing-md;
      background: rgba(0, 0, 0, 0.4);
      border-radius: $radius-md $radius-md 0 0;
      display: flex;
      align-items: center;
      gap: $spacing-xs;
      
      .console-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        
        &.red { background: #ff5f56; }
        &.yellow { background: #ffbd2e; }
        &.green { background: #27c93f; }
      }
      
      .console-title {
        font-size: 0.7rem;
        color: $text-muted;
        margin-left: $spacing-sm;
      }
    }
    
    .console-content {
      padding: $spacing-md;
      font-family: monospace;
      font-size: 0.75rem;
      
      .console-line {
        display: flex;
        gap: $spacing-sm;
        margin-bottom: $spacing-xs;
        
        .prompt {
          color: $accent;
        }
        
        .command {
          color: $text;
        }
        
        .cursor {
          display: inline-block;
          width: 8px;
          height: 1rem;
          background: $accent;
          animation: blink 1s infinite;
          margin-left: 4px;
        }
      }
    }
  }
  
  .hero-buttons {
    display: flex;
    gap: $spacing-md;
    flex-wrap: wrap;
    margin-bottom: 0;
    
    .btn-magic, .btn-rune {
      padding: $spacing-sm $spacing-xl;
      border-radius: $radius-round;
      text-decoration: none;
      font-weight: 600;
      transition: $transition-base;
      display: inline-flex;
      align-items: center;
      gap: $spacing-sm;
      position: relative;
      overflow: hidden;
    }
    
    .btn-magic {
      background: $bg-gradient;
      color: $bg-dark;
      
      .btn-magic-glow {
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        transition: left 0.5s;
      }
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: $shadow-glow;
        
        .btn-magic-glow {
          left: 100%;
        }
      }
    }
    
    .btn-rune {
      background: transparent;
      border: 2px solid $accent;
      color: $accent;
      
      &:hover {
        background: $accent;
        color: $bg-dark;
        transform: translateY(-2px);
      }
    }
  }
  
  .rune-stack {
    margin-bottom: 0;
    text-align: right;
    
    @include mobile {
      text-align: center;
    }
    
    .rune-title {
      font-size: 0.65rem;
      color: $text-muted;
      letter-spacing: 2px;
      margin-bottom: $spacing-sm;
    }
    
    .rune-icons {
      display: flex;
      gap: $spacing-lg;
      
      @include mobile {
        justify-content: center;
      }
      
      .rune {
        text-align: center;
        
        .rune-symbol {
          font-size: 1.5rem;
          font-family: monospace;
          color: $accent;
        }
        
        .rune-name {
          font-size: 0.65rem;
          color: $text-muted;
          margin-top: $spacing-xs;
        }
      }
    }
  }
  
  .scroll-scroll {
    position: absolute;
    bottom: $spacing-md;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    z-index: 2;
    
    .scroll-rune {
      font-size: 0.7rem;
      color: $accent;
      animation: pulse 2s infinite;
    }
    
    .scroll-text {
      font-size: 0.55rem;
      letter-spacing: 2px;
      color: $text-muted;
    }
  }
}

// Legends Section
.legends {
  @include section-padding;
  background: $bg-dark;
  
  .legends-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: $spacing-xl;
  }
  
  .legend-card {
    text-align: center;
    padding: $spacing-xl;
    background: $bg-card;
    border-radius: $radius-lg;
    border: 1px solid $border;
    transition: $transition-base;
    position: relative;
    
    &:hover {
      transform: translateY(-10px);
      border-color: $accent;
      
      .legend-rune {
        animation: pulse-glow 2s infinite;
      }
    }
    
    .legend-icon {
      font-size: 2.5rem;
      margin-bottom: $spacing-md;
    }
    
    .legend-number {
      font-size: 3rem;
      font-weight: 800;
      color: $accent;
      margin-bottom: $spacing-sm;
    }
    
    .legend-name {
      color: $text-muted;
      font-size: 0.8rem;
      letter-spacing: 1px;
    }
    
    .legend-rune {
      position: absolute;
      bottom: $spacing-md;
      right: $spacing-md;
      font-size: 1.2rem;
      color: rgba($accent, 0.3);
    }
  }
}

// Nature + Code Section
.nature-code {
  @include section-padding;
  background: $bg-card;
  
  .nature-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-xxl;
    align-items: center;
    
    @include mobile {
      grid-template-columns: 1fr;
    }
  }
  
  .nature-badge {
    display: inline-block;
    padding: $spacing-xs $spacing-lg;
    background: rgba($accent, 0.1);
    border-radius: $radius-round;
    font-size: 0.7rem;
    letter-spacing: 2px;
    color: $accent;
    margin-bottom: $spacing-md;
  }
  
  .nature-title {
    font-size: 2.5rem;
    margin-bottom: $spacing-lg;
    
    .gradient {
      @include gradient-text;
    }
  }
  
  .nature-description {
    p {
      color: $text-muted;
      line-height: 1.8;
      margin-bottom: $spacing-lg;
    }
    
    .nature-quote {
      font-style: italic;
      padding-left: $spacing-lg;
      border-left: 3px solid $accent;
    }
  }
  
  .code-snippet {
    background: rgba(0, 0, 0, 0.4);
    border-radius: $radius-md;
    padding: $spacing-lg;
    margin-top: $spacing-lg;
    
    pre {
      font-family: monospace;
      font-size: 0.8rem;
      color: $text;
      
      .keyword { color: $accent; }
      .function { color: $primary; }
      .string { color: $secondary; }
    }
  }
  
  .floating-tree {
    position: relative;
    width: 200px;
    height: 300px;
    margin: 0 auto;
    
    .tree-canopy {
      width: 200px;
      height: 180px;
      background: radial-gradient(circle, #1a5a3a, #0a3a1a);
      border-radius: 50% 50% 40% 40%;
      animation: float 4s ease-in-out infinite;
    }
    
    .tree-trunk {
      width: 40px;
      height: 120px;
      background: #3a2a1a;
      margin: -10px auto 0;
      border-radius: 5px;
    }
    
    .tree-code {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2rem;
      font-family: monospace;
      color: rgba($accent, 0.6);
      animation: pulse-glow 2s infinite;
    }
  }
}

// Secret Chamber
.secret-chamber {
  @include section-padding;
  background: $bg-dark;
  
  .chamber-content {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
  }
  
  .chamber-door {
    position: relative;
    width: 200px;
    height: 300px;
    cursor: pointer;
    transition: $transition-base;
    
    &:hover .door-left,
    &:hover .door-right {
      transform: scaleX(0.9);
    }
    
    .door-left, .door-right {
      position: absolute;
      width: 50%;
      height: 100%;
      background: #2a1a0a;
      transition: $transition-base;
    }
    
    .door-left {
      left: 0;
      border-right: 1px solid #5a3a1a;
    }
    
    .door-right {
      right: 0;
      border-left: 1px solid #5a3a1a;
    }
    
    .door-knob {
      position: absolute;
      right: 25%;
      top: 50%;
      width: 10px;
      height: 10px;
      background: $accent;
      border-radius: 50%;
    }
    
    .door-rune {
      position: absolute;
      top: 20%;
      left: 50%;
      transform: translateX(-50%);
      font-size: 3rem;
      color: $accent;
      opacity: 0.5;
    }
    
    &.is-open .door-left,
    &.is-open .door-right {
      transform: scaleX(0);
    }
  }
  
  .secret-message {
    position: relative;
    max-width: 500px;
    margin-left: $spacing-xl;
    
    .secret-glow {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, rgba($accent, 0.2), transparent);
      animation: pulse 2s infinite;
    }
    
    .secret-text {
      position: relative;
      padding: $spacing-xl;
      background: rgba($bg-card, 0.8);
      border-radius: $radius-lg;
      text-align: center;
      backdrop-filter: blur(10px);
      
      .secret-rune {
        font-size: 1.5rem;
        color: $accent;
        display: inline-block;
        margin: 0 $spacing-sm;
      }
      
      p {
        color: $text;
        line-height: 1.8;
      }
    }
  }
}

// Artifacts Section
.artifacts {
  @include section-padding;
  background: $bg-card;
  
  .artifacts-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: $spacing-xxl;
    @include gradient-text;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-lg;
    
    .title-rune {
      font-size: 2rem;
    }
  }
  
  .artifacts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: $spacing-xl;
  }
  
  .artifact-card {
    position: relative;
    transition: $transition-base;
    
    &:hover {
      transform: translateY(-10px);
      
      .artifact-glow {
        opacity: 1;
      }
    }
    
    .artifact-glow {
      position: absolute;
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
      background: radial-gradient(circle, rgba($accent, 0.2), transparent);
      border-radius: $radius-xl;
      opacity: 0;
      transition: $transition-base;
      pointer-events: none;
    }
    
    .artifact-icon {
      position: absolute;
      top: -20px;
      left: -20px;
      font-size: 2rem;
      z-index: 2;
    }
    
    .artifact-power {
      text-align: center;
      margin-top: $spacing-md;
      font-size: 0.7rem;
      color: $accent;
      letter-spacing: 2px;
    }
  }
}

// Final Call
.final-call {
  position: relative;
  padding: 6rem 0;
  background: linear-gradient(180deg, $bg-card 0%, $bg-dark 100%);
  text-align: center;
  overflow: hidden;
  
  .forest-silhouette {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: repeating-linear-gradient(
      90deg,
      transparent,
      transparent 30px,
      rgba($accent, 0.05) 30px,
      rgba($accent, 0.05) 60px
    );
  }
  
  .call-rune {
    font-size: 2rem;
    letter-spacing: 10px;
    color: $accent;
    margin-bottom: $spacing-xl;
    font-family: monospace;
  }
  
  h2 {
    font-size: 2.5rem;
    margin-bottom: $spacing-md;
    
    .gradient {
      @include gradient-text;
    }
  }
  
  p {
    color: $text-muted;
    margin-bottom: $spacing-xl;
  }
  
  .btn-final {
    display: inline-block;
    padding: $spacing-md $spacing-xxl;
    background: transparent;
    border: 2px solid $accent;
    color: $accent;
    text-decoration: none;
    border-radius: $radius-round;
    font-weight: 600;
    transition: $transition-base;
    position: relative;
    overflow: hidden;
    
    .btn-stars {
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba($accent, 0.2), transparent);
      transition: left 0.5s;
    }
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: $shadow-glow;
      
      .btn-stars {
        left: 100%;
      }
    }
  }
}

// Animations
@keyframes floatFirefly {
  0%, 100% {
    transform: translateY(0) translateX(0);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-20px) translateX(10px);
    opacity: 1;
  }
}

@keyframes codeFall {
  from {
    transform: translateY(-100%);
    opacity: 1;
  }
  to {
    transform: translateY(100vh);
    opacity: 0;
  }
}

@keyframes fogMove {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
</style>