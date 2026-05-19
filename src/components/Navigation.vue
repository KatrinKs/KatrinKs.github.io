<template>
  <nav 
    class="navigation" 
    :class="{ 
      'is-visible': isNavVisible, 
      'is-expanded': isExpanded
    }"
    @mouseenter="expandMenu"
    @mouseleave="collapseMenu"
  >
    <div class="nav-content">
      <!-- Логотип с текстом при наведении (абсолютное позиционирование) -->
      <div class="logo-area" @click="goToHome">
        <div class="logo-wrapper" @mouseenter="showLogoText = true" @mouseleave="showLogoText = false">
          <img :src="logoImage" alt="Logo" class="logo-img" />
          <span class="logo-text" :class="{ 'is-visible': showLogoText }">Kalneus</span>
        </div>
      </div>
      
      <!-- Основное меню -->
      <div class="nav-links" v-show="isExpanded">
        <router-link 
          v-for="link in links" 
          :key="link.path"
          :to="link.path"
          class="nav-link"
          :class="{ active: $route.path === link.path }"
          @click="closeMenu"
        >
          <span class="link-icon">{{ link.icon }}</span>
          <span class="link-name">{{ link.name }}</span>
        </router-link>
      </div>
      
      <!-- Переключатель языка -->
      <div class="language-area" v-show="isExpanded">
        <button 
          @click="setLanguage('ru')"
          :class="{ active: currentLanguage === 'ru' }"
        >
          RU
        </button>
        <span class="divider">|</span>
        <button 
          @click="setLanguage('en')"
          :class="{ active: currentLanguage === 'en' }"
        >
          EN
        </button>
      </div>
      
      <!-- Свернутое состояние - показывает текущую страницу -->
      <div class="current-page" v-show="!isExpanded">
        <span class="current-page-name">{{ currentPageName }}</span>
        <span class="current-page-indicator">✦</span>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLanguageStore } from '../stores/languageStore'
import { useContentStore } from '../stores/contentStore'
import { storeToRefs } from 'pinia'
import logoImage from '/logo.svg'

const route = useRoute()
const router = useRouter()
const isNavVisible = ref(false)
const isExpanded = ref(false)
const showLogoText = ref(false)
const languageStore = useLanguageStore()
const contentStore = useContentStore()
const { currentLanguage } = storeToRefs(languageStore)

const links = [
  { path: '/', name: 'Главная', icon: '🏠' },
  { path: '/about', name: 'Обо мне', icon: '🧙‍♀️' },
  { path: '/skills', name: 'Навыки', icon: '💡' },
  { path: '/work', name: 'Опыт', icon: '💼' },
  { path: '/projects', name: 'Проекты', icon: '🚀' },
  { path: '/contact', name: 'Контакты', icon: '📧' }
]

const currentPageName = computed(() => {
  const currentLink = links.find(link => link.path === route.path)
  return currentLink ? currentLink.name : 'Главная'
})

const setLanguage = (lang: 'ru' | 'en') => {
  languageStore.setLanguage(lang)
  contentStore.setLanguageContent(lang)
}

const goToHome = () => {
  router.push('/')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const expandMenu = () => {
  if (isNavVisible.value) {
    isExpanded.value = true
  }
}

const collapseMenu = () => {
  isExpanded.value = false
}

const closeMenu = () => {
  if (window.innerWidth <= 768) {
    collapseMenu()
  }
}

const handleScroll = () => {
  const scrollPosition = window.scrollY
  
  if (scrollPosition > 100) {
    isNavVisible.value = true
  } else {
    isNavVisible.value = false
    isExpanded.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

.navigation {
  position: fixed;
  top: $nav-top;
  left: $nav-left;
  z-index: 1000;
  transition: $transition-base;
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  
  opacity: 0;
  transform: translateX(-$nav-left);
  pointer-events: none;
  
  &.is-visible {
    opacity: 1;
    transform: translateX(0);
    pointer-events: auto;
  }
}

.nav-content {
  background: rgba($bg-card, 0.95);
  backdrop-filter: blur(10px);
  border-radius: $radius-round;
  padding: $nav-collapsed-padding;
  display: flex;
  align-items: center;
  gap: $nav-collapsed-gap;
  border: 1px solid $border;
  transition: $transition-base;
  cursor: pointer;
  
  .navigation.is-expanded & {
    background: rgba($bg-dark, 0.98);
    backdrop-filter: blur(20px);
    border-radius: $radius-lg;
    padding: $nav-expanded-padding;
    gap: $nav-expanded-gap;
    min-width: $nav-expanded-min-width;
  }
}

.logo-area {
  cursor: pointer;
  
  .logo-wrapper {
    position: relative;
    display: inline-flex;
    align-items: center;
    
    .logo-img {
      width: 40px;
      height: 40px;
      object-fit: contain;
      transition: $transition-fast;
    }
    
    .logo-text {
      position: absolute;
      left: calc(100% + 8px);
      font-size: 1rem;
      font-weight: 600;
      @include gradient-text;
      white-space: nowrap;
      opacity: 0;
      transform: translateX(-5px);
      transition: $transition-base;
      pointer-events: none;
      
      &.is-visible {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    &:hover .logo-img {
      transform: scale(1.05);
    }
  }
}

.nav-links {
  display: flex;
  gap: $spacing-xs;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: $spacing-xs;
  text-decoration: none;
  padding: $spacing-xs $spacing-md;
  border-radius: $radius-round;
  transition: $transition-fast;
  white-space: nowrap;
  
  .link-icon {
    font-size: 1.1rem;
    opacity: 0.7;
    transition: $transition-fast;
  }
  
  .link-name {
    font-size: 0.9rem;
    font-weight: 500;
    color: $text-muted;
    transition: $transition-fast;
  }
  
  &:hover {
    background: rgba($primary, 0.1);
    transform: translateY(-2px);
    
    .link-icon {
      opacity: 1;
    }
    
    .link-name {
      color: $primary;
    }
  }
  
  &.active {
    .link-name {
      color: $primary;
      font-weight: 600;
    }
    
    .link-icon {
      opacity: 1;
    }
  }
}

.language-area {
  display: flex;
  align-items: center;
  gap: $spacing-xs;
  padding-left: $spacing-lg;
  border-left: 1px solid $border;
  
  button {
    background: none;
    border: none;
    color: $text-muted;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: 500;
    padding: $spacing-xs $spacing-sm;
    border-radius: $radius-round;
    transition: $transition-fast;
    
    &:hover {
      color: $primary;
    }
    
    &.active {
      color: $primary;
      background: rgba($primary, 0.1);
    }
  }
  
  .divider {
    color: $text-muted;
    font-size: 0.8rem;
  }
}

.current-page {
  display: flex;
  align-items: center;
  gap: $spacing-xs;
  white-space: nowrap;
  
  .current-page-name {
    font-size: 0.9rem;
    font-weight: 500;
    color: $primary;
    letter-spacing: 1px;
  }
  
  .current-page-indicator {
    font-size: 0.8rem;
    color: $accent;
    animation: pulse 2s infinite;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}

@include mobile {
  .navigation {
    top: $spacing-sm;
    left: $spacing-sm;
    right: $spacing-sm;
  }
  
  .navigation.is-expanded .nav-content {
    flex-direction: column;
    align-items: flex-start;
    min-width: auto;
    width: calc(100% - #{2 * $spacing-md});
  }
  
  .nav-links {
    flex-direction: column;
    width: 100%;
  }
  
  .nav-link {
    justify-content: center;
  }
  
  .language-area {
    padding-left: 0;
    border-left: none;
    justify-content: center;
    width: 100%;
  }
  
  .current-page {
    width: 100%;
    justify-content: center;
  }
}
</style>