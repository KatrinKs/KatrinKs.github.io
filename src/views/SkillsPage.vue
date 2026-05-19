<template>
  <div class="skills-page">
    <section class="page-hero">
      <div class="forest-bg">
        <div class="fireflies">
          <div class="firefly" v-for="i in 12" :key="i" :style="getFireflyStyle(i)"></div>
        </div>
      </div>
      <div class="hero-overlay"></div>
      <div class="container">
        <div class="hero-content">
          <div class="rune-badge">
            <span class="rune">ᚡ</span>
            <span class="badge-text">✦ MAGICAL ABILITIES ✦</span>
            <span class="rune">ᛏ</span>
          </div>
          <h1 class="hero-title">Skills & <span class="gradient">Tools</span></h1>
          <p class="hero-subtitle">The spells I've mastered on my journey</p>
        </div>
      </div>
    </section>

    <section class="skills-loupe-section" @mouseenter="showLoupe = true" @mouseleave="showLoupe = false">
      <div class="container">
        <div class="section-header">
          <span class="title-rune">🔍</span>
          <h2 class="section-title">Technical Mastery</h2>
          <span class="title-rune">✨</span>
        </div>
        <div class="loupe-hint">
          <span class="hint-icon">🔍</span>
          <span>Move the magnifying glass over runes to reveal hidden skills • Click to keep visible</span>
        </div>

        <div class="skills-grid">
          <div 
            v-for="skill in allSkills" 
            :key="skill.name" 
            class="skill-cell"
            :ref="el => setSkillRef(el, skill.name)"
            @click="pinSkill(skill.name)"
          >
            <div class="skill-rune">{{ getRuneForSkill(skill.name) }}</div>
            <div 
              class="skill-card"
              :class="{ 
                'visible': activeSkill === skill.name || pinnedSkills.includes(skill.name)
              }"
            >
              <div class="skill-icon">{{ skill.icon }}</div>
              <div class="skill-name">{{ skill.name }}</div>
              <div class="skill-level">
                <div class="level-bar" :style="{ width: `${skill.level}%` }"></div>
              </div>
              <div class="skill-percent">{{ skill.level }}%</div>
            </div>
          </div>
        </div>

        <div class="custom-loupe" v-if="showLoupe" :style="{ left: loupeX + 'px', top: loupeY + 'px' }">
          <div class="loupe-ring"></div>
          <div class="loupe-glow"></div>
          <div class="loupe-center"></div>
        </div>
      </div>
    </section>

    <section class="tools-section">
      <div class="container">
        <div class="tools-header">
          <span class="title-rune">🔧</span>
          <h2 class="section-title">Arcane Tools</h2>
          <span class="title-rune">⚙️</span>
        </div>
        <div class="tools-grid">
          <div class="tool-card" v-for="(tool, index) in tools" :key="tool.name" :style="{ animationDelay: `${index * 0.1}s` }">
            <div class="tool-icon">{{ tool.icon }}</div>
            <div class="tool-name">{{ tool.name }}</div>
            <div class="tool-desc">{{ tool.desc }}</div>
            <div class="tool-glow"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="soft-section">
      <div class="container">
        <div class="soft-header">
          <span class="title-rune">✨</span>
          <h2 class="section-title">Mystic Arts</h2>
          <span class="title-rune">💫</span>
        </div>
        <div class="soft-grid">
          <div class="soft-card" v-for="(skill, index) in softSkills" :key="skill.name" :style="{ animationDelay: `${index * 0.05}s` }">
            <div class="soft-icon">{{ skill.icon }}</div>
            <div class="soft-info">
              <h4>{{ skill.name }}</h4>
              <p>{{ skill.desc }}</p>
            </div>
            <div class="soft-wave"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="languages-section">
      <div class="binary-rain-bg">
        <div class="rain-container">
          <div class="rain-column" v-for="i in 10" :key="i" :style="getRainStyle(i)">
            <span class="binary-digit" v-for="j in 8" :key="j">{{ getRandomBinary() }}</span>
          </div>
        </div>
        <div class="rain-overlay"></div>
      </div>
      <div class="container">
        <div class="languages-header">
          <span class="title-rune">🌐</span>
          <h2 class="section-title">Languages</h2>
          <span class="title-rune">🗣️</span>
        </div>
        <div class="languages-grid">
          <div class="language-card" v-for="(lang, index) in languages" :key="lang.name" :style="{ animationDelay: `${index * 0.2}s` }">
            <div class="lang-flag">{{ lang.flag }}</div>
            <div class="lang-info">
              <div class="lang-name">{{ lang.name }}</div>
              <div class="lang-level">{{ lang.level }}</div>
              <div class="lang-desc">{{ lang.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const allSkills = [
  { name: 'HTML5/CSS3', icon: '🌐', level: 80 },
  { name: 'JavaScript', icon: '⚡', level: 80 },
  { name: 'TypeScript', icon: '📘', level: 60 },
  { name: 'React', icon: '⚛️', level: 85 },
  { name: 'Redux', icon: '🔄', level: 80 },
  { name: 'Vue.js', icon: '🍃', level: 60 },
  { name: 'SCSS/SASS', icon: '🎨', level: 65 },
  { name: 'Tailwind', icon: '🌬️', level: 70 },
  { name: 'Webpack', icon: '📦', level: 80 },
  { name: 'Vite', icon: '⚡', level: 75 },
  { name: 'Figma', icon: '🎨', level: 90 },
  { name: 'Python', icon: '🐍', level: 70 },
  { name: 'Docker', icon: '🐳', level: 75 },
  { name: 'REST API', icon: '🔌', level: 80 },
  { name: 'RabbitMQ', icon: '🐇', level: 65 },
  { name: 'Git', icon: '📊', level: 87 },
  { name: 'PTP/TCP/UDP', icon: '📡', level: 74 },
  { name: 'MySQL', icon: '🐬', level: 60 }
]

const tools = [
  { name: 'VS Code', icon: '📝', desc: 'Primary spellbook' },
  { name: 'Git', icon: '📊', desc: 'Version magic' },
  { name: 'Figma', icon: '🎨', desc: 'Design scrolls' },
  { name: 'Docker', icon: '🐳', desc: 'Container runes' },
  { name: 'Jest', icon: '🧪', desc: 'Testing charms' },
  { name: 'Cypress', icon: '🎯', desc: 'E2E spells' }
]

const softSkills = [
  { icon: '🤝', name: 'Teamwork', desc: 'Creating magic together' },
  { icon: '⏰', name: 'Time Management', desc: 'Master of deadlines' },
  { icon: '🧠', name: 'Critical Thinking', desc: 'Problem solver' },
  { icon: '💬', name: 'Communication', desc: 'Clear and effective' },
  { icon: '⚡', name: 'Fast Learning', desc: 'Quick adaptation' },
  { icon: '🎨', name: 'Creativity', desc: 'Unique solutions' }
]

const languages = [
  { name: 'Русский', flag: '🇷🇺', level: 'Native', desc: 'Родной язык' },
  { name: 'English', flag: '🇬🇧', level: 'B1 (Intermediate)', desc: 'Documentation, communication' }
]

const loupeX = ref(-200)
const loupeY = ref(-200)
const activeSkill = ref('')
const pinnedSkills = ref<string[]>([])
const skillRefs = ref<Map<string, HTMLElement>>(new Map())
const showLoupe = ref(false)

const runesMap = new Map([
  ['HTML5/CSS3', 'ᚠ'], ['JavaScript', 'ᚢ'], ['TypeScript', 'ᚦ'], ['React', 'ᚨ'],
  ['Redux', 'ᚱ'], ['Vue.js', 'ᚲ'], ['SCSS/SASS', 'ᚷ'], ['Tailwind', 'ᚹ'],
  ['Webpack', 'ᚺ'], ['Vite', 'ᚾ'], ['Figma', 'ᛁ'], ['Python', 'ᛃ'],
  ['Docker', 'ᛈ'], ['REST API', 'ᛇ'], ['RabbitMQ', 'ᛉ'], ['Git', 'ᛊ'],
  ['PTP/TCP/UDP', 'ᛏ'], ['MySQL', 'ᛒ']
])

const getRuneForSkill = (skillName: string) => {
  return runesMap.get(skillName) || 'ᛟ'
}

const setSkillRef = (el: any, name: string) => {
  if (el) {
    skillRefs.value.set(name, el)
  }
}

const pinSkill = (skillName: string) => {
  if (!pinnedSkills.value.includes(skillName)) {
    pinnedSkills.value.push(skillName)
    setTimeout(() => {
      pinnedSkills.value = pinnedSkills.value.filter(s => s !== skillName)
    }, 3000)
  }
}

let checkInterval: number | null = null

const checkLoupeIntersection = () => {
  if (!showLoupe.value || loupeX.value === -200 || loupeY.value === -200) {
    if (!pinnedSkills.value.length) {
      activeSkill.value = ''
    }
    return
  }
  
  const loupeCenterX = loupeX.value + 60
  const loupeCenterY = loupeY.value + 60
  
  let foundSkill = ''
  
  for (const [skillName, element] of skillRefs.value.entries()) {
    const rect = element.getBoundingClientRect()
    if (loupeCenterX >= rect.left && loupeCenterX <= rect.right &&
        loupeCenterY >= rect.top && loupeCenterY <= rect.bottom) {
      foundSkill = skillName
      break
    }
  }
  
  if (foundSkill) {
    activeSkill.value = foundSkill
  } else if (!pinnedSkills.value.length) {
    activeSkill.value = ''
  }
}

const handleMouseMove = (e: MouseEvent) => {
  if (showLoupe.value) {
    loupeX.value = e.clientX - 60
    loupeY.value = e.clientY - 60
    checkLoupeIntersection()
  }
}

const getFireflyStyle = (i: number) => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  animationDelay: `${Math.random() * 5}s`,
  width: `${2 + Math.random() * 3}px`,
  height: `${2 + Math.random() * 3}px`
})

const getRainStyle = (i: number) => ({
  left: `${(i - 1) * 10}%`,
  animationDelay: `${Math.random() * 6}s`
})

const getRandomBinary = () => Math.random() > 0.5 ? '1' : '0'

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  checkInterval = window.setInterval(checkLoupeIntersection, 50)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  if (checkInterval) clearInterval(checkInterval)
})
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

.skills-page {
  overflow-x: hidden;
}

.page-hero {
  position: relative;
  min-height: 50vh;
  overflow: hidden;
  .forest-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 50%, rgba(13, 28, 32, 0.5), $bg-dark);
    z-index: 1;
  }
  .container {
    position: relative;
    z-index: 2;
    min-height: 50vh;
    display: flex;
    align-items: center;
  }
  .hero-content {
    text-align: center;
    width: 100%;
    animation: heroFadeIn 0.8s ease-out;
  }
  .rune-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-lg;
    margin-bottom: $spacing-xl;
    .rune { font-size: 1.5rem; color: $accent; opacity: 0.7; }
    .badge-text { font-size: 0.7rem; letter-spacing: 4px; color: $accent; }
  }
  .hero-title {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: $spacing-md;
    .gradient { @include gradient-text; }
  }
  .hero-subtitle {
    font-size: 1.1rem;
    color: $text-muted;
  }
}

.fireflies .firefly {
  position: absolute;
  background: $accent;
  border-radius: 50%;
  box-shadow: 0 0 5px $accent;
  animation: fireflyFloat 5s ease-in-out infinite;
  opacity: 0;
}

.skills-loupe-section {
  @include section-padding;
  background: $bg-dark;
  position: relative;
  min-height: 100vh;
  
  .section-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-lg;
    margin-bottom: $spacing-md;
    .title-rune { font-size: 1.8rem; }
    .section-title { font-size: 2rem; margin-bottom: 0; @include gradient-text; }
  }
  
  .loupe-hint {
    text-align: center;
    color: $accent;
    font-size: 0.9rem;
    margin-bottom: $spacing-xxl;
    animation: pulseHint 2s ease-in-out infinite;
    .hint-icon {
      display: inline-block;
      margin-right: $spacing-xs;
      font-size: 1.2rem;
    }
  }
  
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: $spacing-lg;
    position: relative;
    z-index: 2;
  }
  
  .skill-cell {
    position: relative;
    aspect-ratio: 1 / 0.9;
    cursor: pointer;
    
    .skill-rune {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 4rem;
      color: rgba($accent, 0.4);
      text-shadow: 0 0 10px rgba($accent, 0.3);
      animation: runePulse 2s ease-in-out infinite;
      transition: all 0.3s ease;
      z-index: 1;
      pointer-events: none;
    }
    
    .skill-card {
      position: absolute;
      inset: 0;
      background: rgba($bg-card, 0.95);
      backdrop-filter: blur(10px);
      border-radius: $radius-lg;
      padding: $spacing-md;
      text-align: center;
      border: 2px solid rgba($accent, 0.5);
      transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
      cursor: pointer;
      z-index: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      
      opacity: 0;
      visibility: hidden;
      transform: scale(0.8);
      
      &.visible {
        opacity: 1;
        visibility: visible;
        transform: scale(1);
        box-shadow: 0 0 30px rgba($accent, 0.6);
        border-color: $accent;
        animation: cardReveal 0.3s ease-out;
        
        .skill-level .level-bar {
          background: $bg-gradient;
          box-shadow: 0 0 8px $accent;
        }
      }
      
      .skill-icon {
        font-size: 2rem;
        margin-bottom: $spacing-xs;
      }
      
      .skill-name {
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: $spacing-xs;
        color: $primary;
        line-height: 1.2;
      }
      
      .skill-level {
        height: 5px;
        background: rgba($text, 0.2);
        border-radius: 3px;
        overflow: hidden;
        margin-bottom: $spacing-xs;
        
        .level-bar {
          height: 100%;
          background: $accent;
          border-radius: 3px;
          transition: width 0.3s ease;
        }
      }
      
      .skill-percent {
        font-size: 0.65rem;
        font-family: monospace;
        color: $accent;
      }
    }
  }
  
  .custom-loupe {
    position: fixed;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 1000;
    transform: translate(0, 0);
    
    .loupe-ring {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 3px solid rgba($accent, 0.8);
      box-shadow: 0 0 30px rgba($accent, 0.5);
      animation: loupePulse 1.5s ease-in-out infinite;
    }
    
    .loupe-glow {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: radial-gradient(circle, rgba($accent, 0.2), transparent 70%);
      animation: loupeGlow 2s ease-in-out infinite;
    }
    
    .loupe-center {
      position: absolute;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: $accent;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 10px $accent;
    }
    
    &::before {
      content: '🔍';
      position: absolute;
      font-size: 2.5rem;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0.6;
      filter: drop-shadow(0 0 5px $accent);
      pointer-events: none;
    }
  }
}

.tools-section {
  @include section-padding;
  background: $bg-card;
  .tools-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-lg;
    margin-bottom: $spacing-xxl;
    .title-rune { font-size: 1.5rem; }
    .section-title { font-size: 2rem; margin-bottom: 0; @include gradient-text; }
  }
  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: $spacing-lg;
  }
  .tool-card {
    position: relative;
    text-align: center;
    padding: $spacing-lg;
    background: $bg-dark;
    border-radius: $radius-md;
    border: 1px solid $border;
    transition: $transition-base;
    animation: floatCard 3s ease-in-out infinite;
    &:hover {
      transform: translateY(-10px) scale(1.05);
      border-color: $accent;
      animation: none;
      .tool-glow { opacity: 1; }
    }
    .tool-icon { font-size: 2.5rem; margin-bottom: $spacing-md; }
    .tool-name { font-size: 1rem; font-weight: 600; color: $primary; margin-bottom: $spacing-xs; }
    .tool-desc { font-size: 0.7rem; color: $text-muted; }
    .tool-glow {
      position: absolute;
      top: -5px;
      left: -5px;
      right: -5px;
      bottom: -5px;
      background: radial-gradient(circle, rgba($accent, 0.2), transparent);
      border-radius: $radius-md;
      opacity: 0;
      transition: $transition-base;
      pointer-events: none;
    }
  }
}

.soft-section {
  @include section-padding;
  background: $bg-dark;
  .soft-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-lg;
    margin-bottom: $spacing-xxl;
    .title-rune { font-size: 1.5rem; }
    .section-title { font-size: 2rem; margin-bottom: 0; @include gradient-text; }
  }
  .soft-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: $spacing-md;
  }
  .soft-card {
    position: relative;
    display: flex;
    align-items: center;
    gap: $spacing-md;
    padding: $spacing-md;
    background: $bg-card;
    border-radius: $radius-md;
    border: 1px solid $border;
    transition: $transition-base;
    overflow: hidden;
    animation: waveIn 0.5s ease-out backwards;
    &:hover {
      transform: translateX(8px);
      border-color: $accent;
      .soft-wave { left: 100%; }
    }
    .soft-icon { font-size: 2rem; }
    .soft-info {
      flex: 1;
      h4 { font-size: 1rem; color: $primary; margin-bottom: $spacing-xs; }
      p { font-size: 0.8rem; color: $text-muted; }
    }
    .soft-wave {
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba($accent, 0.1), transparent);
      transition: left 0.5s;
      pointer-events: none;
    }
  }
}

.languages-section {
  @include section-padding;
  background: $bg-card;
  position: relative;
  overflow: hidden;
  .binary-rain-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    .rain-container {
      display: flex;
      justify-content: space-between;
      height: 100%;
    }
    .rain-column {
      display: flex;
      flex-direction: column;
      align-items: center;
      animation: binaryRain 7s linear infinite;
      .binary-digit {
        font-family: 'Courier New', monospace;
        font-size: 10px;
        color: rgba($accent, 0.1);
        line-height: 1.2;
      }
    }
    .rain-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, rgba($bg-card, 0.9) 0%, transparent 15%, transparent 85%, rgba($bg-card, 0.9) 100%);
      pointer-events: none;
    }
  }
  .languages-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-lg;
    margin-bottom: $spacing-xxl;
    position: relative;
    z-index: 1;
    .title-rune { font-size: 1.5rem; }
    .section-title { font-size: 2rem; margin-bottom: 0; @include gradient-text; }
  }
  .languages-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: $spacing-lg;
    max-width: 700px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }
  .language-card {
    display: flex;
    align-items: center;
    gap: $spacing-lg;
    padding: $spacing-xl;
    background: rgba($bg-dark, 0.7);
    backdrop-filter: blur(8px);
    border-radius: $radius-lg;
    border: 1px solid $border;
    transition: $transition-base;
    animation: languagesFadeIn 0.5s ease-out backwards;
    &:hover {
      transform: translateY(-5px);
      border-color: $accent;
    }
    .lang-flag { font-size: 3rem; }
    .lang-info {
      flex: 1;
      .lang-name { font-size: 1.2rem; font-weight: 600; color: $primary; }
      .lang-level { font-size: 0.8rem; color: $accent; margin: $spacing-xs 0; }
      .lang-desc { font-size: 0.75rem; color: $text-muted; }
    }
  }
}

@keyframes heroFadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes languagesFadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes waveIn {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes floatCard {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

@keyframes binaryRain {
  0% { transform: translateY(-100%); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(100%); opacity: 0; }
}

@keyframes fireflyFloat {
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
  20% { opacity: 0.8; }
  80% { opacity: 0.8; }
  100% { transform: translateY(-30px) translateX(15px); opacity: 0; }
}

@keyframes pulseHint {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.05); opacity: 1; text-shadow: 0 0 5px $accent; }
}

@keyframes cardReveal {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes loupePulse {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.05); opacity: 1; }
}

@keyframes loupeGlow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}

@keyframes runePulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); text-shadow: 0 0 15px $accent; }
}
</style>