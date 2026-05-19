<template>
  <div class="work-page">
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
            <span class="rune">⚔️</span>
            <span class="badge-text">{{ $t('work.badge') }}</span>
            <span class="rune">🛡️</span>
          </div>
          <h1 class="hero-title">{{ $t('work.title') }} & <span class="gradient">{{ $t('work.titleGradient') }}</span></h1>
          <p class="hero-subtitle">{{ $t('work.subtitle') }}</p>
        </div>
      </div>
    </section>

    <!-- Два дерева: Образование (слева) и Опыт работы (справа) -->
    <section class="two-trees-section">
      <div class="container">
        <div class="two-trees">
          <!-- Левое дерево - Образование -->
          <div class="tree tree-left" v-motion="slideInLeft">
            <div class="tree-header">
              <span class="tree-icon">🎓</span>
              <h2>{{ $t('work.arcaneStudies') }}</h2>
              <span class="tree-rune">📚</span>
            </div>
            
            <div class="tree-line">
              <div class="tree-branch" v-for="(edu, index) in educationSorted" :key="'edu-' + index"
                   v-motion="{
                     initial: { opacity: 0, x: -30 },
                     enter: { opacity: 1, x: 0, transition: { duration: 500, delay: index * 100 } }
                   }">
                <div class="branch-dot">
                  <span class="dot-icon">{{ edu.icon }}</span>
                </div>
                <div class="branch-content">
                  <div class="branch-period gradient-period">{{ edu.year }}</div>
                  <h3>{{ edu.institution[currentLanguage] }}</h3>
                  <div class="branch-subtitle">{{ edu.degree[currentLanguage] }}</div>
                  <p>{{ edu.description[currentLanguage] }}</p>
                  <div class="branch-tech" v-if="edu.tech">
                    <span v-for="t in edu.tech" :key="t">{{ t }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Правое дерево - Опыт работы -->
          <div class="tree tree-right" v-motion="slideInRight">
            <div class="tree-header">
              <span class="tree-icon">⚔️</span>
              <h2>{{ $t('work.workExperience') }}</h2>
              <span class="tree-rune">🏆</span>
            </div>
            
            <div class="tree-line">
              <div class="tree-branch" v-for="(job, index) in workExperienceSorted" :key="'job-' + index"
                   v-motion="{
                     initial: { opacity: 0, x: 30 },
                     enter: { opacity: 1, x: 0, transition: { duration: 500, delay: index * 100 } }
                   }">
                <div class="branch-dot">
                  <span class="dot-icon">{{ job.icon }}</span>
                </div>
                <div class="branch-content">
                  <div class="branch-period gradient-period">{{ job.period[currentLanguage] }}</div>
                  <h3>{{ job.title[currentLanguage] }}</h3>
                  <div class="branch-subtitle">{{ job.company[currentLanguage] }}</div>
                  <p>{{ job.description[currentLanguage] }}</p>
                  <div class="branch-achievements" v-if="job.achievements">
                    <div class="achievement-title">{{ $t('work.keyAchievements') }}</div>
                    <ul>
                      <li v-for="ach in job.achievements[currentLanguage]" :key="ach">{{ ach }}</li>
                    </ul>
                  </div>
                  <div class="branch-tech">
                    <span v-for="tech in job.technologies" :key="tech">{{ tech }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Рекомендации с бинарным дождём -->
    <section class="recommendations-section">
      <!-- Анимированный фон - бинарный дождь -->
      <div class="binary-rain-bg">
        <div class="rain-container">
          <div class="rain-column" v-for="i in 25" :key="i" :style="getRainStyle(i)">
            <span class="binary-digit" v-for="j in 20" :key="j">{{ getRandomBinary() }}</span>
          </div>
        </div>
        <div class="rain-overlay"></div>
        <div class="rain-glow"></div>
      </div>
      
      <div class="container">
        <div class="recommendations-header">
          <span class="title-rune">📜</span>
          <h2 class="section-title">{{ $t('work.sacredScrolls') }}</h2>
          <span class="title-rune">✨</span>
        </div>
        <div class="recommendations-grid">
          <div class="recommendation-card" v-for="(rec, index) in recommendations" :key="index" v-motion="{
            initial: { opacity: 0, scale: 0.9 },
            enter: { opacity: 1, scale: 1, transition: { duration: 500, delay: 100 + index * 150 } }
          }">
            <div class="quote-icon">“</div>
            <p class="quote-text">{{ rec.text[currentLanguage] }}</p>
            <div class="quote-author">— {{ rec.author[currentLanguage] }}, {{ rec.year }}</div>
            <div class="card-glow"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useLanguageStore } from '../stores/languageStore'
import { storeToRefs } from 'pinia'

const languageStore = useLanguageStore()
const { currentLanguage } = storeToRefs(languageStore)

const getFireflyStyle = (i: number) => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  animationDelay: `${Math.random() * 8}s`,
  animationDuration: `${5 + Math.random() * 6}s`,
  width: `${2 + Math.random() * 4}px`,
  height: `${2 + Math.random() * 4}px`
})

const getRainStyle = (i: number) => ({
  left: `${(i - 1) * 4}%`,
  animationDelay: `${Math.random() * 5}s`,
  animationDuration: `${3 + Math.random() * 4}s`
})

const getRandomBinary = () => {
  return Math.random() > 0.5 ? '1' : '0'
}

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  enter: { opacity: 1, y: 0, transition: { duration: 800 } }
}

const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  enter: { opacity: 1, x: 0, transition: { duration: 600 } }
}

const slideInRight = {
  initial: { opacity: 0, x: 50 },
  enter: { opacity: 1, x: 0, transition: { duration: 600 } }
}

// Опыт работы (от новых к старым - убывание)
const workExperienceSorted = [
  {
    period: {
      ru: 'Июль 2025 – Апрель 2026',
      en: 'July 2025 – April 2026'
    },
    title: {
      ru: 'Frontend Developer',
      en: 'Frontend Developer'
    },
    company: {
      ru: 'Дата Ист',
      en: 'Data East'
    },
    icon: '🏢',
    description: {
      ru: 'Разработка и поддержка крупных веб-приложений в команде профессионалов.',
      en: 'Development and support of large web applications in a professional team.'
    },
    achievements: {
      ru: [
        'Доработала функциональные веб-компоненты ГИС-сервера CoGIS',
        'Провела рефакторинг легаси-компонентов, уменьшив дублирование кода на 10%',
        'Разработала интерфейс портала доступа к технической документации',
        'Реализовала авторизацию и подсказки (autocomplete) для выбора папок и сервисов'
      ],
      en: [
        'Enhanced functional web components for the CoGIS GIS server',
        'Refactored legacy components, reducing code duplication by 10%',
        'Developed interface for technical documentation portal',
        'Implemented authorization and autocomplete for folder/service selection'
      ]
    },
    technologies: ['React', 'Redux', 'JavaScript', 'HTML5', 'CSS3', 'REST API']
  },
  {
    period: {
      ru: 'Октябрь 2024 – Июнь 2025',
      en: 'October 2024 – June 2025'
    },
    title: {
      ru: 'Инженер-программист (Frontend)',
      en: 'Software Engineer (Frontend)'
    },
    company: {
      ru: 'ИНГГ СО РАН',
      en: 'INGG SB RAS'
    },
    icon: '🔬',
    description: {
      ru: 'Разработка системы сейсмомониторинга в реальном времени.',
      en: 'Development of a real-time seismic monitoring system.'
    },
    achievements: {
      ru: [
        'Разработала с нуля Dash-приложение для визуализации сейсмических данных, сократив время анализа на 30%',
        'Создала 5+ переиспользуемых UI-компонентов, ускорив разработку новых фич на 15%',
        'Изучила сетевые протоколы (PTP, TCP, UDP, NTP/SNTP) и настроила взаимодействие'
      ],
      en: [
        'Built a Dash application for seismic data visualization from scratch, reducing analysis time by 30%',
        'Created 5+ reusable UI components, speeding up new feature development by 15%',
        'Studied network protocols (PTP, TCP, UDP, NTP/SNTP) and configured communication'
      ]
    },
    technologies: ['Dash', 'Python', 'Docker', 'RabbitMQ', 'VS Code']
  },
  {
    period: {
      ru: 'Март – Май 2022',
      en: 'March – May 2022'
    },
    title: {
      ru: 'Стажёр',
      en: 'Intern'
    },
    company: {
      ru: 'Itransition',
      en: 'Itransition'
    },
    icon: '🌱',
    description: {
      ru: 'Начало пути в коммерческой разработке.',
      en: 'The beginning of the journey in commercial development.'
    },
    achievements: {
      ru: [
        'Изучила основы React и JavaScript в командной среде',
        'Выполнила проверочное задание'
      ],
      en: [
        'Learned React and JavaScript fundamentals in a team environment',
        'Completed a test assignment'
      ]
    },
    technologies: ['React', 'JavaScript', 'HTML', 'CSS']
  }
]

// Образование (от новых к старым - убывание)
const educationSorted = [
  {
    year: 'Сентябрь 2024 – Июнь 2027',
    institution: {
      ru: 'НГУ, Физический факультет',
      en: 'NSU, Faculty of Physics'
    },
    degree: {
      ru: 'Магистратура',
      en: "Master's Degree"
    },
    description: {
      ru: 'ML, Python, Dash, JavaScript',
      en: 'ML, Python, Dash, JavaScript'
    },
    icon: '🎓',
    tech: ['Machine Learning', 'Python', 'Data Visualization']
  },
  {
    year: 'Январь 2025 – Март 2026',
    institution: {
      ru: 'Яндекс Практикум',
      en: 'Yandex Practicum'
    },
    degree: {
      ru: 'Фронтенд-разработчик. Расширенный',
      en: 'Frontend Developer. Extended'
    },
    description: {
      ru: 'Освоила современный стек фронтенд-разработки, работа с ИИ',
      en: 'Mastered modern frontend stack, AI integration'
    },
    icon: '💻',
    tech: ['React', 'TypeScript', 'Redux', 'Jest', 'Cypress', 'Webpack']
  },
  {
    year: 'Сентябрь 2019 – Июнь 2024',
    institution: {
      ru: 'НГУ, Физический факультет',
      en: 'NSU, Faculty of Physics'
    },
    degree: {
      ru: 'Бакалавриат',
      en: "Bachelor's Degree"
    },
    description: {
      ru: 'C/C++, Python, ООП, Qt, SOLID',
      en: 'C/C++, Python, OOP, Qt, SOLID'
    },
    icon: '📖',
    tech: ['C++', 'Python', 'Qt', 'OOP']
  },
  {
    year: 'Январь 2022',
    institution: {
      ru: 'Stepik',
      en: 'Stepik'
    },
    degree: {
      ru: 'JavaScript для начинающих',
      en: 'JavaScript for Beginners'
    },
    description: {
      ru: 'Основы JavaScript, работа с DOM, события, асинхронность',
      en: 'JavaScript basics, DOM manipulation, events, async'
    },
    icon: '📜',
    tech: ['JavaScript', 'DOM', 'Events']
  }
]

// Рекомендации
const recommendations = [
  {
    text: {
      ru: 'Превосходит большинство стажеров, готова закрывать задачи уровня Junior+ и Middle- без постоянного контроля',
      en: 'Exceeds most interns, ready for Junior+ / Middle- tasks without constant supervision'
    },
    author: {
      ru: 'Дата Ист',
      en: 'Data East'
    },
    year: '2026'
  },
  {
    text: {
      ru: 'Полное рекомендательное письмо — по запросу',
      en: 'Full recommendation letter — available upon request'
    },
    author: {
      ru: 'Дата Ист',
      en: 'Data East'
    },
    year: ''
  }
]
</script>

<style scoped lang="scss">
@use 'sass:math';
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

.work-page {
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
  
  .hero-title { font-size: 3rem; font-weight: 800; margin-bottom: $spacing-md; .gradient { @include gradient-text; } }
  .hero-subtitle { font-size: 1.1rem; color: $text-muted; }
}

// Два дерева
.two-trees-section {
  @include section-padding;
  background: $bg-dark;
  
  .two-trees {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-xxl;
    
    @include mobile {
      grid-template-columns: 1fr;
      gap: $spacing-xl;
    }
  }
  
  .tree {
    .tree-header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: $spacing-md;
      margin-bottom: $spacing-xxl;
      padding-bottom: $spacing-md;
      border-bottom: 1px solid $border;
      
      .tree-icon { font-size: 1.8rem; }
      h2 { font-size: 1.5rem; @include gradient-text; }
      .tree-rune { font-size: 1.2rem; color: $accent; opacity: 0.7; }
    }
    
    .tree-line {
      position: relative;
      padding-left: 40px;
      
      &::before {
        content: '';
        position: absolute;
        left: 16px;
        top: 0;
        bottom: 0;
        width: 2px;
        background: $bg-gradient;
        border-radius: 2px;
      }
    }
    
    .tree-branch {
      position: relative;
      margin-bottom: $spacing-xl;
      
      .branch-dot {
        position: absolute;
        left: -40px;
        top: 0;
        width: 48px;
        height: 48px;
        background: $bg-card;
        border: 2px solid $accent;
        border-radius: 50%;
        @include flex-center;
        z-index: 2;
        transition: $transition-base;
        
        &:hover {
          transform: scale(1.1);
          border-color: $primary;
          box-shadow: $shadow-glow;
        }
        
        .dot-icon { font-size: 1.3rem; }
      }
      
      .branch-content {
        padding: $spacing-lg;
        background: $bg-card;
        border-radius: $radius-lg;
        border: 1px solid $border;
        transition: $transition-base;
        
        &:hover {
          transform: translateY(-5px);
          border-color: $accent;
        }
        
        .gradient-period {
          display: inline-block;
          padding: $spacing-xs $spacing-md;
          background: linear-gradient(135deg, $primary 0%, $secondary 100%);
          background-size: 200% 200%;
          border-radius: $radius-round;
          font-size: 0.7rem;
          color: $bg-dark;
          font-weight: 600;
          margin-bottom: $spacing-md;
          animation: gradientShift 3s ease infinite;
        }
        
        h3 {
          font-size: 1.1rem;
          margin-bottom: $spacing-xs;
          color: $primary;
        }
        
        .branch-subtitle {
          font-size: 0.85rem;
          color: $accent;
          margin-bottom: $spacing-md;
        }
        
        p {
          color: $text-muted;
          margin-bottom: $spacing-md;
          line-height: 1.6;
          font-size: 0.85rem;
        }
        
        .branch-achievements {
          margin: $spacing-md 0;
          padding: $spacing-md;
          background: rgba($accent, 0.05);
          border-radius: $radius-md;
          
          .achievement-title {
            font-size: 0.75rem;
            color: $accent;
            margin-bottom: $spacing-sm;
            font-weight: 600;
          }
          
          ul {
            margin-left: $spacing-lg;
            
            li {
              color: $text-muted;
              font-size: 0.75rem;
              margin-bottom: $spacing-xs;
            }
          }
        }
        
        .branch-tech {
          display: flex;
          flex-wrap: wrap;
          gap: $spacing-sm;
          margin-top: $spacing-md;
          
          span {
            padding: $spacing-xs $spacing-md;
            background: rgba($accent, 0.1);
            border-radius: $radius-round;
            font-size: 0.65rem;
            color: $accent;
          }
        }
      }
    }
  }
  
  .tree-left .tree-branch .branch-dot {
    left: -40px;
  }
  
  .tree-right .tree-line {
    padding-left: 40px;
    
    @include mobile {
      padding-left: 40px;
    }
  }
  
  .tree-right .tree-branch .branch-dot {
    left: -40px;
  }
}

// Recommendations с бинарным дождём
.recommendations-section {
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
    overflow: hidden;
    
    .rain-container {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
    }
    
    .rain-column {
      display: flex;
      flex-direction: column;
      align-items: center;
      animation: binaryRain linear infinite;
      
      .binary-digit {
        font-family: 'Courier New', monospace;
        font-size: 12px;
        color: rgba($accent, 0.15);
        line-height: 1.2;
        user-select: none;
        
        @for $i from 1 through 20 {
          &:nth-child(#{$i}) {
            opacity: 0.1 + ($i * 0.03);
          }
        }
      }
    }
    
    .rain-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, 
        rgba($bg-card, 0.9) 0%,
        transparent 20%,
        transparent 80%,
        rgba($bg-card, 0.9) 100%
      );
      pointer-events: none;
    }
    
    .rain-glow {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 150px;
      background: linear-gradient(180deg, transparent, rgba($accent, 0.1));
      pointer-events: none;
    }
  }
  
  .recommendations-header {
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
  
  .recommendations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: $spacing-xl;
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }
  
  .recommendation-card {
    position: relative;
    padding: $spacing-xl;
    background: rgba($bg-dark, 0.7);
    backdrop-filter: blur(8px);
    border-radius: $radius-lg;
    border: 1px solid $border;
    text-align: center;
    transition: $transition-base;
    overflow: hidden;
    
    &:hover {
      transform: translateY(-5px);
      border-color: $accent;
      
      .card-glow {
        opacity: 1;
      }
    }
    
    .quote-icon { font-size: 3rem; color: $accent; opacity: 0.5; font-family: serif; }
    .quote-text { font-size: 0.9rem; line-height: 1.6; color: $text-muted; margin: $spacing-md 0; font-style: italic; }
    .quote-author { font-size: 0.8rem; color: $accent; font-weight: 600; }
    
    .card-glow {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 50% 50%, rgba($accent, 0.15), transparent);
      opacity: 0;
      transition: $transition-base;
      pointer-events: none;
    }
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

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes binaryRain {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}
</style>