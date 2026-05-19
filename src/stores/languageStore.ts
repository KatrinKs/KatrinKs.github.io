import { defineStore } from 'pinia'
import { ref } from 'vue'
import i18n from '../locales'

export type Language = 'ru' | 'en'

export const useLanguageStore = defineStore('language', () => {
  const currentLanguage = ref<Language>(i18n.global.locale.value as Language)

  const setLanguage = (lang: Language) => {
    currentLanguage.value = lang
    i18n.global.locale.value = lang
    localStorage.setItem('preferred-language', lang)
  }

  const initLanguage = () => {
    const saved = localStorage.getItem('preferred-language') as Language
    if (saved && (saved === 'ru' || saved === 'en')) {
      currentLanguage.value = saved
      i18n.global.locale.value = saved
    } else {
      const browserLang = navigator.language.slice(0, 2)
      const lang = browserLang === 'ru' ? 'ru' : 'en'
      currentLanguage.value = lang
      i18n.global.locale.value = lang
    }
  }

  return { currentLanguage, setLanguage, initLanguage }
})