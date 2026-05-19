<template>
  <div class="about-page">
    <!-- Hero секция с магическим лесом -->
    <section class="page-hero">
      <div class="forest-bg">
        <div class="fog-layer"></div>
        <div class="fireflies">
          <div class="firefly" v-for="i in 25" :key="i" :style="getFireflyStyle(i)"></div>
        </div>
      </div>
      <div class="hero-overlay"></div>

      <div class="container">
        <div class="hero-content" v-motion="fadeIn">
          <div class="rune-badge">
            <span class="rune">ᛗ</span>
            <span class="badge-text">{{ $t('about.badge') }}</span>
            <span class="rune">ᛗ</span>
          </div>
          <h1 class="hero-title">
            <EditableText v-model="content.about.title" type="input" />
          </h1>
          <div class="hero-quote">
            <span class="quote-mark">"</span>
            <EditableText v-model="content.about.quote" type="textarea" />
            <span class="quote-mark">"</span>
          </div>
        </div>
      </div>

      <div class="scroll-hint">{{ $t('about.scroll') }}</div>
    </section>

    <!-- Основная информация -->
    <section class="about-section">
      <div class="container">
        <div class="about-grid">
          <!-- Левая колонка - фото -->
          <div class="about-left" v-motion="slideIn">
            <div class="photo-frame">
              <div class="photo-glow"></div>
              <div class="photo-placeholder">
                <img 
                    src="/avatar.jpg" 
                    alt="Avatar" 
                    class="avatar-img" 
                    @error="handleImageError"
                    v-show="imageLoaded"
                />
                <div class="photo-icon" v-show="!imageLoaded">🧙‍♀️</div>
              </div>
              <div class="photo-runes">
                <span>ᚠ</span><span>ᚢ</span><span>ᚦ</span><span>ᚨ</span><span>ᚱ</span><span>ᚲ</span>
              </div>
            </div>
          </div>

          <!-- Правая колонка - текст о себе -->
          <div class="about-right" v-motion="slideInRight">
            <div class="about-header">
              <span class="header-rune">✦</span>
              <h2>{{ $t('about.theJourney') }}</h2>
              <span class="header-rune">✦</span>
            </div>

            <div class="about-text">
              <EditableText v-model="content.about.text" type="textarea" />
            </div>

            <div class="code-wisdom">
              <div class="wisdom-header">
                <span class="wisdom-icon">💡</span>
                <span>{{ $t('about.codingWisdom') }}</span>
              </div>
              <div class="wisdom-text">
                <p>{{ $t('about.wisdom1') }}</p>
                <p>{{ $t('about.wisdom2') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Принципы работы -->
    <section class="principles-section">
      <div class="container">
        <div class="principles-header">
          <span class="title-rune">📜</span>
          <h2 class="section-title">{{ $t('about.codeCreed') }}</h2>
          <span class="title-rune">✨</span>
        </div>

        <div class="principles-grid">
          <div
            class="principle-card"
            v-for="(principle, index) in principles"
            :key="index" 
            v-motion="{
              initial: { opacity: 0, scale: 0.9 },
              enter: { opacity: 1, scale: 1, transition: { duration: 500, delay: index * 100 } },
            }"
          >
            <div class="principle-icon">{{ principle.icon }}</div>
            <h3>{{ $t(`about.principles.${index}.title`) }}</h3>
            <p>{{ $t(`about.principles.${index}.description`) }}</p>
            <div class="principle-rune">᛫</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Интересы - Beyond the Code -->
    <section class="interests-section">
      <div class="container">
        <div class="interests-header">
          <span class="title-rune">🎨</span>
          <h2 class="section-title">{{ $t('about.beyondCode') }}</h2>
          <span class="title-rune">🌙</span>
        </div>

        <div class="interests-grid">
          <div
            class="interest-card"
            v-for="(interest, index) in interests"
            :key="index" 
            v-motion="{
              initial: { opacity: 0, scale: 0.9 },
              enter: { opacity: 1, scale: 1, transition: { duration: 500, delay: index * 100 } },
            }"
          >
            <div class="interest-icon">{{ interest.icon }}</div>
            <h3>{{ $t(`about.interests.${index}.name`) }}</h3>
            <p>{{ $t(`about.interests.${index}.description`) }}</p>
            <div class="interest-glow"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Достижения -->
    <section class="achievements-section">
      <div class="container">
        <div class="achievements-header">
          <span class="title-rune">🏆</span>
          <h2 class="section-title">{{ $t('about.achievements') }}</h2>
          <span class="title-rune">✨</span>
        </div>

        <div class="achievements-grid">
          <div
            class="achievement-card"
            v-for="(achievement, index) in achievements"
            :key="index" 
            v-motion="{
              initial: { opacity: 0, x: -30 },
              enter: { opacity: 1, x: 0, transition: { duration: 500, delay: index * 100 } },
            }"
          >
            <div class="achievement-icon">{{ achievement.icon }}</div>
            <div class="achievement-content">
              <h3>{{ $t(`about.achievementsList.${index}.title`) }}</h3>
              <p>{{ $t(`about.achievementsList.${index}.description`) }}</p>
              <span class="achievement-date">{{ $t(`about.achievementsList.${index}.date`) }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useContentStore } from '../stores/contentStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import EditableText from '../components/EditableText.vue'
import { useLanguageStore } from '../stores/languageStore'

const contentStore = useContentStore()
const { content } = storeToRefs(contentStore)
const languageStore = useLanguageStore()
const { currentLanguage } = storeToRefs(languageStore)

const imageLoaded = ref(true)

const handleImageError = () => {
  imageLoaded.value = false
}

// Добавляем quote в contentStore если его нет
if (!content.value.about.quote) {
  content.value.about.quote = 'Code is poetry written for machines, but felt by humans'
}

// Принципы работы (только иконки, текст в локализации)
const principles = [
  { icon: '🧹' },
  { icon: '⚡' },
  { icon: '🔄' },
  { icon: '🤝' },
]

// Интересы (только иконки, текст в локализации)
const interests = [
  { icon: '⚔️' },
  { icon: '🔬' },
  { icon: '🌲' },
  { icon: '📚' },
  { icon: '⚡' },
  { icon: '🎨' },
  { icon: '🐉' },
  { icon: '📸' },
]

// Достижения (только иконки, текст в локализации)
const achievements = [
  { icon: '⚔️' },
  { icon: '📜' },
  { icon: '🎓' },
  { icon: '🏆' },
]

// Анимации
const fadeIn = {
  initial: { opacity: 0, y: 30 },
  enter: { opacity: 1, y: 0, transition: { duration: 800 } },
}

const slideIn = {
  initial: { opacity: 0, x: -50 },
  enter: { opacity: 1, x: 0, transition: { duration: 600 } },
}

const slideInRight = {
  initial: { opacity: 0, x: 50 },
  enter: { opacity: 1, x: 0, transition: { duration: 600 } },
}

// Светлячки для фона
const getFireflyStyle = (i: number) => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  animationDelay: `${Math.random() * 8}s`,
  animationDuration: `${5 + Math.random() * 6}s`,
  width: `${2 + Math.random() * 4}px`,
  height: `${2 + Math.random() * 4}px`,
})
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

.about-page {
  overflow-x: hidden;
}

// Hero секция
.page-hero {
  position: relative;
  min-height: 60vh;
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
        rgba($accent, 0.03) 80px,
        transparent 160px
      );
      animation: fogMove 25s linear infinite;
    }

    .fireflies {
      .firefly {
        position: absolute;
        background: $accent;
        border-radius: 50%;
        box-shadow: 0 0 8px $accent;
        animation: fireflyFloat 8s ease-in-out infinite;
        opacity: 0;
      }
    }
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
    min-height: 60vh;
    display: flex;
    align-items: center;
  }

  .hero-content {
    text-align: center;
    width: 100%;
  }

  .rune-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-lg;
    margin-bottom: $spacing-xl;

    .rune {
      font-size: 1.5rem;
      color: $accent;
      opacity: 0.7;
    }

    .badge-text {
      font-size: 0.7rem;
      letter-spacing: 4px;
      color: $accent;
    }
  }

  .hero-title {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: $spacing-sm;
    background: $bg-gradient;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @include mobile {
      font-size: 2rem;
    }
  }

  .hero-quote {
    max-width: 700px;
    margin: 0 auto 20px auto;
    font-size: 1.2rem;
    font-style: italic;
    color: $text-muted;
    position: relative;

    .quote-mark {
      font-size: 2rem;
      color: $accent;
      opacity: 0.5;
      display: inline-block;
    }
  }

  .scroll-hint {
    position: absolute;
    bottom: $spacing-xl;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.6rem;
    letter-spacing: 3px;
    color: $text-muted;
    z-index: 2;
    animation: pulse 2s infinite;
  }
}

// Основная секция
.about-section {
  @include section-padding;
  background: $bg-dark;

  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: $spacing-xxl;

    @include mobile {
      grid-template-columns: 1fr;
      gap: $spacing-xl;
    }
  }
}

// Левая колонка
.about-left {
  .photo-frame {
    position: relative;
    margin-bottom: $spacing-xl;

    .photo-glow {
      position: absolute;
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
      background: radial-gradient(circle, rgba($accent, 0.2), transparent);
      border-radius: $radius-xl;
      animation: pulse-glow 3s infinite;
    }

    .photo-placeholder {
      position: relative;
      width: 100%;
      aspect-ratio: 1;
      background: $bg-gradient;
      border-radius: $radius-xl;
      @include flex-center;
      z-index: 2;
      overflow: hidden;

      .avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(60%);
      }

      .photo-icon {
        font-size: 8rem;
      }
    }

    .photo-runes {
      position: absolute;
      bottom: -$spacing-md;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: $spacing-sm;
      background: rgba($bg-card, 0.8);
      backdrop-filter: blur(10px);
      padding: $spacing-xs $spacing-md;
      border-radius: $radius-round;
      z-index: 3;

      span {
        font-family: monospace;
        color: $accent;
        font-size: 0.8rem;
      }
    }
  }
}

// Правая колонка
.about-right {
  .about-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-md;
    margin-bottom: $spacing-xl;

    .header-rune {
      font-size: 1.2rem;
      color: $accent;
      opacity: 0.7;
    }

    h2 {
      font-size: 1.8rem;
      font-weight: 600;
      @include gradient-text;
    }
  }

  .about-text {
    color: $text-muted;
    line-height: 1.9;
    margin-bottom: $spacing-xl;
  }

  .code-wisdom {
    background: rgba(0, 0, 0, 0.3);
    border-radius: $radius-md;
    padding: $spacing-lg;
    border: 1px solid rgba($accent, 0.2);

    .wisdom-header {
      display: flex;
      align-items: center;
      gap: $spacing-sm;
      margin-bottom: $spacing-md;
      font-size: 0.8rem;
      color: $accent;

      .wisdom-icon {
        font-size: 1rem;
      }
    }

    .wisdom-text {
      p {
        color: $text-muted;
        font-style: italic;
        margin-bottom: $spacing-sm;
        padding-left: $spacing-md;
        border-left: 2px solid $accent;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}

// Principles Section
.principles-section {
  @include section-padding;
  background: $bg-card;

  .principles-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-lg;
    margin-bottom: $spacing-xxl;

    .title-rune {
      font-size: 1.5rem;
    }

    .section-title {
      font-size: 2rem;
      margin-bottom: 0;
      @include gradient-text;

      @include mobile {
        font-size: 1.5rem;
      }
    }
  }

  .principles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: $spacing-xl;
  }

  .principle-card {
    position: relative;
    padding: $spacing-xl;
    background: $bg-dark;
    border-radius: $radius-lg;
    text-align: center;
    transition: $transition-base;
    border: 1px solid $border;
    overflow: hidden;

    &:hover {
      transform: translateY(-8px);
      border-color: $accent;

      .principle-rune {
        animation: pulse-glow 2s infinite;
      }
    }

    .principle-icon {
      font-size: 3rem;
      margin-bottom: $spacing-md;
    }

    h3 {
      font-size: 1.2rem;
      margin-bottom: $spacing-md;
      color: $primary;
    }

    p {
      color: $text-muted;
      line-height: 1.6;
      font-size: 0.85rem;
    }

    .principle-rune {
      position: absolute;
      bottom: $spacing-md;
      right: $spacing-md;
      font-size: 0.8rem;
      color: rgba($accent, 0.3);
    }
  }
}

// Interests Section - Beyond the Code
.interests-section {
  @include section-padding;
  background: $bg-dark;

  .interests-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-lg;
    margin-bottom: $spacing-xxl;

    .title-rune {
      font-size: 1.5rem;
    }

    .section-title {
      font-size: 2rem;
      margin-bottom: 0;
      @include gradient-text;

      @include mobile {
        font-size: 1.5rem;
      }
    }
  }

  .interests-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: $spacing-xl;
  }

  .interest-card {
    position: relative;
    padding: $spacing-xl;
    background: $bg-card;
    border-radius: $radius-lg;
    text-align: center;
    transition: $transition-base;
    border: 1px solid $border;
    overflow: hidden;

    animation: subtleSway 4s ease-in-out infinite;
    transform-origin: center center;

    &:nth-child(odd) {
      animation-delay: 0s;
    }
    &:nth-child(even) {
      animation-delay: 0.5s;
    }

    &:hover {
      animation: none;
      transform: translateY(-8px);
      border-color: $accent;

      .interest-glow {
        opacity: 1;
      }
    }

    .interest-icon {
      font-size: 2.5rem;
      margin-bottom: $spacing-md;
      transition: $transition-base;
    }

    h3 {
      font-size: 1.1rem;
      margin-bottom: $spacing-sm;
      color: $primary;
    }

    p {
      color: $text-muted;
      line-height: 1.6;
      font-size: 0.85rem;
    }

    .interest-glow {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 50% 50%, rgba($accent, 0.1), transparent);
      opacity: 0;
      transition: $transition-base;
      pointer-events: none;
    }
  }
}

// Achievements Section
.achievements-section {
  @include section-padding;
  background: $bg-card;

  .achievements-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-lg;
    margin-bottom: $spacing-xxl;

    .title-rune {
      font-size: 1.5rem;
    }

    .section-title {
      font-size: 2rem;
      margin-bottom: 0;
      @include gradient-text;

      @include mobile {
        font-size: 1.5rem;
      }
    }
  }

  .achievements-grid {
    max-width: 800px;
    margin: 0 auto;
  }

  .achievement-card {
    display: flex;
    gap: $spacing-lg;
    padding: $spacing-lg;
    background: $bg-dark;
    border-radius: $radius-lg;
    margin-bottom: $spacing-lg;
    transition: $transition-base;
    border: 1px solid $border;

    &:hover {
      transform: translateX(10px);
      border-color: $accent;
    }

    .achievement-icon {
      font-size: 2rem;
    }

    .achievement-content {
      flex: 1;

      h3 {
        font-size: 1rem;
        margin-bottom: $spacing-xs;
        color: $primary;
      }

      p {
        color: $text-muted;
        margin-bottom: $spacing-xs;
        font-size: 0.85rem;
      }

      .achievement-date {
        display: inline-block;
        padding: $spacing-xs $spacing-md;
        background: rgba($accent, 0.1);
        border-radius: $radius-round;
        font-size: 0.65rem;
        color: $accent;
      }
    }
  }
}

// Animations
@keyframes fogMove {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes fireflyFloat {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  20% {
    opacity: 0.8;
  }
  80% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-30px) translateX(15px);
    opacity: 0;
  }
}

@keyframes subtleSway {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-3px) rotate(0.5deg);
  }
  75% {
    transform: translateY(2px) rotate(-0.3deg);
  }
}
</style>