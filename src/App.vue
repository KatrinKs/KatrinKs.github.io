<template>
  <div class="app">
    <Navigation />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import Navigation from './components/Navigation.vue'
import { useLanguageStore } from './stores/languageStore'
import { useContentStore } from './stores/contentStore'
import { storeToRefs } from 'pinia'

const router = useRouter()
const languageStore = useLanguageStore()
const contentStore = useContentStore()
const { currentLanguage } = storeToRefs(languageStore)
const { content } = storeToRefs(contentStore)

onMounted(() => {
  languageStore.initLanguage()
  contentStore.loadContent(currentLanguage.value)
})

router.afterEach(() => {
  contentStore.setLanguageContent(currentLanguage.value)
})

watch(currentLanguage, (newLang) => {
  contentStore.setLanguageContent(newLang)
})

// 👇 ДОБАВЬТЕ ЭТО - автосохранение при любом изменении контента
watch(content, (newContent) => {
  if (newContent && currentLanguage.value) {
    localStorage.setItem(`portfolio-content-${currentLanguage.value}`, JSON.stringify(newContent))
    console.log('💾 Saved content for', currentLanguage.value)
  }
}, { deep: true })
</script>

<style lang="scss">
@use './styles/variables' as *;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  overflow-x: hidden;
  background: $bg-dark;
  color: $text;
}

.app {
  min-height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>