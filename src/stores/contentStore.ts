import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLanguageStore } from './languageStore'
import { storeToRefs } from 'pinia'

export interface ContentData {
  hero: {
    title: string
    subtitle: string
    description: string
  }
  about: {
    title: string
    text: string
    name: string
    location: string
    experience: string
    quote: string
  }
  projects: Array<{
    id: number
    title: string
    description: string
    tech: string
  }>
  contact: {
    title: string
    email: string
    telegram: string
    github: string
    phone: string
    linkedin: string
  }
}

// Базовый контент - Русский
const defaultContentRu: ContentData = {
  hero: {
    title: 'Привет, я Александр',
    subtitle: 'Frontend-разработчик',
    description: 'Создаю современные веб-приложения с душой'
  },
  about: {
    title: 'Обо мне',
    text: 'Я фронтенд-разработчик с 5-летним опытом. Специализируюсь на Vue 3 и TypeScript. Люблю создавать красивые и функциональные интерфейсы.',
    name: 'Александр',
    location: 'Москва, Россия',
    experience: '5+ лет',
    quote: 'Code is poetry written for machines, but felt by humans'
  },
  projects: [
    { id: 1, title: 'E-commerce платформа', description: 'Полноценный интернет-магазин с корзиной и оплатой', tech: 'Vue 3, Pinia, TS' },
    { id: 2, title: 'Аналитическая панель', description: 'Дашборд с графиками и аналитикой в реальном времени', tech: 'Vue 3, D3.js, WebSocket' },
    { id: 3, title: 'Мобильное приложение', description: 'Кроссплатформенное PWA приложение', tech: 'Vue 3, Vite, PWA' }
  ],
  contact: {
    title: 'Свяжитесь со мной',
    email: 'alex@example.com',
    telegram: '@alex_dev',
    github: 'alex-dev',
    phone: '+7 (999) 123-45-67',
    linkedin: 'linkedin.com/in/alexander'
  }
}

// Базовый контент - Английский (ПОЛНОСТЬЮ ЗАПОЛНЕН)
const defaultContentEn: ContentData = {
  hero: {
    title: "Hi, I'm Alexander",
    subtitle: 'Frontend Developer',
    description: 'Creating modern web applications with soul'
  },
  about: {
    title: 'About Me',
    text: "I'm a frontend developer with 5 years of experience. I specialize in Vue 3 and TypeScript. I love creating beautiful and functional interfaces.",
    name: 'Alexander',
    location: 'Moscow, Russia',
    experience: '5+ years',
    quote: 'Code is poetry written for machines, but felt by humans'
  },
  projects: [
    { id: 1, title: 'E-commerce Platform', description: 'Full-featured online store with cart and payment', tech: 'Vue 3, Pinia, TS' },
    { id: 2, title: 'Analytics Dashboard', description: 'Dashboard with charts and real-time analytics', tech: 'Vue 3, D3.js, WebSocket' },
    { id: 3, title: 'Mobile App', description: 'Cross-platform PWA application', tech: 'Vue 3, Vite, PWA' }
  ],
  contact: {
    title: 'Contact Me',
    email: 'alex@example.com',
    telegram: '@alex_dev',
    github: 'alex-dev',
    phone: '+7 (999) 123-45-67',
    linkedin: 'linkedin.com/in/alexander'
  }
}

export const useContentStore = defineStore('content', () => {
  const content = ref<ContentData>(defaultContentRu)

  const updateContent = (newContent: Partial<ContentData>, language: string) => {
    if (language === 'ru') {
      Object.assign(defaultContentRu, newContent)
      localStorage.setItem('portfolio-content-ru', JSON.stringify(defaultContentRu))
      
      const languageStore = useLanguageStore()
      const { currentLanguage } = storeToRefs(languageStore)
      if (currentLanguage.value === 'ru') {
        content.value = { ...defaultContentRu }
      }
    } else {
      Object.assign(defaultContentEn, newContent)
      localStorage.setItem('portfolio-content-en', JSON.stringify(defaultContentEn))
      
      const languageStore = useLanguageStore()
      const { currentLanguage } = storeToRefs(languageStore)
      if (currentLanguage.value === 'en') {
        content.value = { ...defaultContentEn }
      }
    }
  }

  const loadContent = (language: string) => {
    const savedRu = localStorage.getItem('portfolio-content-ru')
    const savedEn = localStorage.getItem('portfolio-content-en')
    
    if (savedRu) {
      Object.assign(defaultContentRu, JSON.parse(savedRu))
    }
    if (savedEn) {
      Object.assign(defaultContentEn, JSON.parse(savedEn))
    }
    
    content.value = language === 'ru' ? { ...defaultContentRu } : { ...defaultContentEn }
  }

  const setLanguageContent = (language: string) => {
    content.value = language === 'ru' ? { ...defaultContentRu } : { ...defaultContentEn }
  }

  return { content, updateContent, loadContent, setLanguageContent }
})