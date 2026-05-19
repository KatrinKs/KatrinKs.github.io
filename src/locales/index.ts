import { createI18n } from 'vue-i18n'
import ru from './ru.json'
import en from './en.json'

const messages = {
  ru,
  en
}

// Функция для получения языка из localStorage
const getSavedLanguage = () => {
  const saved = localStorage.getItem('preferred-language')
  if (saved && (saved === 'ru' || saved === 'en')) {
    return saved
  }
  const browserLang = navigator.language.slice(0, 2)
  return browserLang === 'ru' ? 'ru' : 'en'
}

const i18n = createI18n({
  legacy: false,
  locale: getSavedLanguage(),
  fallbackLocale: 'en',
  messages
})

export default i18n