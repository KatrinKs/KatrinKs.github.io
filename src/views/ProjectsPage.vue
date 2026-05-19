<template>
  <div class="projects-page">
    <!-- Hero секция -->
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
            <span class="rune">📜</span>
            <span class="badge-text">{{ $t('projects.badge') }}</span>
            <span class="rune">⚡</span>
          </div>
          <h1 class="hero-title">{{ $t('projects.title') }} <span class="gradient">{{ $t('projects.titleGradient') }}</span></h1>
          <p class="hero-subtitle">{{ $t('projects.subtitle') }}</p>
        </div>
      </div>
    </section>

    <!-- Фильтр проектов -->
    <section class="projects-section">
      <div class="container">
        <div class="projects-filter">
          <button 
            v-for="category in categories" 
            :key="category.key"
            @click="activeCategory = category.key"
            :class="{ active: activeCategory === category.key }"
            class="filter-btn"
          >
            {{ $t(`projects.categories.${category.key}`) }}
          </button>
        </div>
        
        <div class="projects-grid">
          <div class="project-card-enhanced" v-for="(project, index) in filteredProjects" :key="project.id"
               v-motion="{
                 initial: { opacity: 0, y: 50, scale: 0.9 },
                 enter: { opacity: 1, y: 0, scale: 1, transition: { duration: 600, delay: index * 100 } }
               }">
            <div class="card-glow"></div>
            <div class="card-icon">{{ project.icon }}</div>
            <h3>{{ project.title[currentLanguage] }}</h3>
            <p>{{ project.description[currentLanguage] }}</p>
            <div class="project-tech">
              <span v-for="tech in project.technologies" :key="tech">{{ tech }}</span>
            </div>
            <div class="project-links">
              <a :href="project.github" target="_blank" class="github-link" v-if="project.github">
                <span>🐙</span> GitHub
                <span class="link-glow"></span>
              </a>
              <a :href="project.demo" target="_blank" class="demo-link" v-if="project.demo">
                <span>✨</span> Demo
                <span class="link-glow"></span>
              </a>
            </div>
            <div class="card-rune">✦</div>
            
            <!-- Магические частицы -->
            <div class="magic-particles">
              <span class="particle" v-for="i in 6" :key="i"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguageStore } from '../stores/languageStore'
import { storeToRefs } from 'pinia'

const languageStore = useLanguageStore()
const { currentLanguage } = storeToRefs(languageStore)

const activeCategory = ref('all')

const categories = [
  { key: 'all', nameRu: 'Все', nameEn: 'All' },
  { key: 'react', nameRu: 'React', nameEn: 'React' },
  { key: 'vue', nameRu: 'Vue', nameEn: 'Vue' },
  { key: 'pureJs', nameRu: 'Pure JS', nameEn: 'Pure JS' },
  { key: 'ts', nameRu: 'TS', nameEn: 'TS' },
  { key: 'htmlCss', nameRu: 'HTML/CSS', nameEn: 'HTML/CSS' }
]

const getFireflyStyle = (i: number) => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  animationDelay: `${Math.random() * 8}s`,
  animationDuration: `${5 + Math.random() * 6}s`,
  width: `${2 + Math.random() * 4}px`,
  height: `${2 + Math.random() * 4}px`
})

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  enter: { opacity: 1, y: 0, transition: { duration: 800 } }
}

const projects = [
  {
    id: 1,
    icon: '🍔',
    title: {
      ru: 'Stellar Burgers',
      en: 'Stellar Burgers'
    },
    description: {
      ru: 'Космическая бургерная с конструктором заказов. Полноценное React-приложение с авторизацией и Drag-and-Drop.',
      en: 'Space burger joint with order constructor. Full-featured React application with authorization and Drag-and-Drop.'
    },
    technologies: ['React', 'TypeScript', 'Redux', 'Jest', 'Cypress'],
    github: 'https://github.com/KatrinKs/stellar-burgers',
    demo: null,
    category: 'react'
  },
  {
    id: 2,
    icon: '📸',
    title: {
      ru: 'Mesto',
      en: 'Mesto'
    },
    description: {
      ru: 'Социальная сеть для путешественников. Возможность делиться фотографиями и ставить лайки.',
      en: 'Social network for travelers. Share photos and like posts.'
    },
    technologies: ['JavaScript', 'CSS', 'HTML', 'API'],
    github: 'https://github.com/KatrinKs/mesto-project-ff',
    demo: null,
    category: 'pureJs'
  },
  {
    id: 3,
    icon: '🛒',
    title: {
      ru: 'Web-ларек',
      en: 'Web Market'
    },
    description: {
      ru: 'Интернет-магазин с корзиной и оформлением заказа. ООП подход.',
      en: 'Online store with cart and checkout. OOP approach.'
    },
    technologies: ['TypeScript', 'CSS', 'HTML', 'OOP'],
    github: 'https://github.com/KatrinKs/web-larek-frontend',
    demo: null,
    category: 'ts'
  },
  {
    id: 4,
    icon: '📝',
    title: {
      ru: 'Blog Customizer',
      en: 'Blog Customizer'
    },
    description: {
      ru: 'Конструктор блога с возможностью настройки темы и стилей.',
      en: 'Blog constructor with theme and style customization.'
    },
    technologies: ['React', 'TypeScript', 'CSS', 'HTML', 'OOP'],
    github: 'https://github.com/KatrinKs/blog-customizer',
    demo: null,
    category: 'react'
  },
  {
    id: 5,
    icon: '🏷️',
    title: {
      ru: 'Закрывающий тег',
      en: 'Closing Tag'
    },
    description: {
      ru: 'Креативный проект с анимациями и интерактивными элементами.',
      en: 'Creative project with animations and interactive elements.'
    },
    technologies: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/KatrinKs/zakrivayuschiy-teg-f',
    demo: null,
    category: 'htmlCss'
  },
  {
    id: 6,
    icon: '🪟',
    title: {
      ru: 'Посмотри в окно',
      en: 'Look Out the Window'
    },
    description: {
      ru: 'Проект с красивыми анимациями и эффектами окон.',
      en: 'Project with beautiful window animations and effects.'
    },
    technologies: ['CSS', 'HTML'],
    github: 'https://github.com/KatrinKs/posmotri-v-okno-fd',
    demo: null,
    category: 'htmlCss'
  },
  {
    id: 7,
    icon: '✨',
    title: {
      ru: 'Сайт-визитка',
      en: 'Business Card Site'
    },
    description: {
      ru: 'Персональный сайт-портфолио (текущая версия).',
      en: 'Personal portfolio website (current version).'
    },
    technologies: ['Vue 3', 'TypeScript', 'SCSS', 'Pinia'],
    github: 'https://katrinks.github.io/',
    demo: 'https://katrinks.github.io/',
    category: 'vue'
  }
]

const filteredProjects = computed(() => {
  if (activeCategory.value === 'all') {
    return projects
  }
  return projects.filter(p => p.category === activeCategory.value)
})
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

.projects-page {
  overflow-x: hidden;
}

// Hero секция
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
    .fog-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 200%;
      height: 100%;
      background: repeating-linear-gradient(90deg, transparent, rgba($accent, 0.03) 80px, transparent 160px);
      animation: fogMove 25s linear infinite;
    }
    .fireflies .firefly {
      position: absolute;
      background: $accent;
      border-radius: 50%;
      box-shadow: 0 0 8px $accent;
      animation: fireflyFloat 8s ease-in-out infinite;
      opacity: 0;
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
    min-height: 50vh;
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
    .rune { font-size: 1.5rem; color: $accent; opacity: 0.7; }
    .badge-text { font-size: 0.7rem; letter-spacing: 4px; color: $accent; }
  }
  
  .hero-title { 
    font-size: 3rem; 
    font-weight: 800; 
    margin-bottom: $spacing-md; 
    .gradient { @include gradient-text; } 
  }
  .hero-subtitle { font-size: 1.1rem; color: $text-muted; }
}

// Projects Section
.projects-section {
  @include section-padding;
  background: $bg-dark;
  
  .projects-filter {
    display: flex;
    justify-content: center;
    gap: $spacing-md;
    margin-bottom: $spacing-xxl;
    flex-wrap: wrap;
    
    .filter-btn {
      padding: $spacing-sm $spacing-xl;
      background: transparent;
      border: 2px solid $accent;
      border-radius: $radius-round;
      cursor: pointer;
      font-weight: 600;
      transition: $transition-base;
      color: $accent;
      &:hover { transform: translateY(-2px); box-shadow: $shadow-glow; background: rgba($accent, 0.1); }
      &.active { background: $bg-gradient; color: $bg-dark; border-color: transparent; }
    }
  }
  
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: $spacing-xl;
  }
  
  .project-card-enhanced {
    position: relative;
    padding: $spacing-xl;
    background: $bg-card;
    border-radius: $radius-lg;
    border: 1px solid $border;
    transition: $transition-base;
    overflow: hidden;
    
    // ✨ ЛЁГКАЯ АНИМАЦИЯ ДЛЯ НЕ НАВЕДЁННЫХ КАРТОЧЕК
    animation: subtleFloat 4s ease-in-out infinite;
    
    &:nth-child(odd) {
      animation-delay: 0s;
    }
    &:nth-child(even) {
      animation-delay: 1s;
    }
    
    // При наведении — возвращаем исходную анимацию
    &:hover {
      animation: none;
      transform: translateY(-8px);
      border-color: $accent;
      
      .card-glow { opacity: 1; }
      .card-rune { animation: pulse-glow 2s infinite; }
    }
    
    .card-glow {
      position: absolute;
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
      background: radial-gradient(circle, rgba($accent, 0.15), transparent);
      border-radius: $radius-xl;
      opacity: 0;
      transition: $transition-base;
      pointer-events: none;
    }
    
    .card-icon { 
      font-size: 2.5rem; 
      margin-bottom: $spacing-md;
      transition: $transition-base;
    }
    
    h3 { 
      font-size: 1.2rem; 
      color: $primary; 
      margin-bottom: $spacing-md;
      transition: $transition-base;
    }
    
    p { 
      font-size: 0.85rem; 
      color: $text-muted; 
      line-height: 1.6; 
      margin-bottom: $spacing-lg; 
    }
    
    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: $spacing-sm;
      margin-bottom: $spacing-lg;
      
      span {
        padding: $spacing-xs $spacing-md;
        background: rgba($accent, 0.1);
        border-radius: $radius-round;
        font-size: 0.7rem;
        color: $accent;
        transition: $transition-base;
      }
    }
    
    .project-links {
      display: flex;
      gap: $spacing-md;
      
      a {
        display: inline-flex;
        align-items: center;
        gap: $spacing-xs;
        padding: $spacing-xs $spacing-md;
        border-radius: $radius-round;
        text-decoration: none;
        font-size: 0.75rem;
        font-weight: 500;
        transition: $transition-base;
        position: relative;
        overflow: hidden;
        
        .link-glow {
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
          
          .link-glow {
            left: 100%;
          }
        }
        
        &.github-link {
          background: rgba(255, 255, 255, 0.1);
          color: $text;
          &:hover { background: $accent; color: $bg-dark; }
        }
        &.demo-link {
          background: $bg-gradient;
          color: $bg-dark;
          &:hover { box-shadow: $shadow-glow; }
        }
      }
    }
    
    .card-rune {
      position: absolute;
      bottom: $spacing-md;
      right: $spacing-md;
      font-size: 0.8rem;
      color: rgba($accent, 0.3);
      transition: $transition-base;
    }
    
    .magic-particles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      
      .particle {
        position: absolute;
        width: 3px;
        height: 3px;
        background: $accent;
        border-radius: 50%;
        opacity: 0;
        
        @for $i from 1 through 6 {
          &:nth-child(#{$i}) {
            top: random(100) + '%';
            left: random(100) + '%';
          }
        }
      }
    }
  }
}

// ✨ ЛЁГКАЯ АНИМАЦИЯ ПАРЕНИЯ
@keyframes subtleFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes fogMove {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes fireflyFloat {
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
  20% { opacity: 0.8; }
  80% { opacity: 0.8; }
  100% { transform: translateY(-30px) translateX(15px); opacity: 0; }
}
</style>