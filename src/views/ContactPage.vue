<template>
  <div class="contact-page">
    <!-- Hero секция -->
    <section class="page-hero">
      <div class="forest-bg">
        <div class="fog-layer"></div>
        <div class="fireflies">
          <div class="firefly" v-for="i in 35" :key="i" :style="getFireflyStyle(i)"></div>
        </div>
      </div>
      <div class="hero-overlay"></div>

      <div class="container">
        <div class="hero-content" v-motion="fadeIn">
          <div class="rune-badge">
            <span class="rune">🔮</span>
            <span class="badge-text">{{ $t('contact.badge') }}</span>
            <span class="rune">✨</span>
          </div>
          <h1 class="hero-title">{{ $t('contact.title') }} <span class="gradient">{{ $t('contact.titleGradient') }}</span></h1>
        </div>
      </div>
    </section>

    <!-- Контакты и форма -->
    <section class="contact-section">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-magical" v-motion="slideIn">
            <div class="magical-portals">
              <div
                class="portal-card"
                v-for="contact in magicalContacts"
                :key="contact.name"
                @click="copyToClipboard(contact.value)"
              >
                <div class="portal-icon">{{ contact.icon }}</div>
                <div class="portal-info">
                  <div class="portal-name">{{ $t(`contact.contacts.${contact.key}.name`) }}</div>
                  <div class="portal-value">{{ contact.value }}</div>
                </div>
                <div class="portal-glow"></div>
              </div>
            </div>
          </div>

          <div class="contact-form" v-motion="slideInRight">
            <form @submit.prevent="sendMessage" class="magic-form">
              <div class="form-row">
                <div class="input-icon">
                  <input 
                    type="text" 
                    v-model="formData.name" 
                    :placeholder="$t('contact.form.namePlaceholder')" 
                    required 
                  />
                </div>
                <div class="input-icon">
                  <input
                    type="email"
                    v-model="formData.email"
                    :placeholder="$t('contact.form.emailPlaceholder')"
                    required
                  />
                </div>
              </div>

              <div class="input-icon full-width">
                <textarea
                  v-model="formData.message"
                  rows="5"
                  :placeholder="$t('contact.form.messagePlaceholder')"
                  required
                ></textarea>
              </div>

              <button type="submit" class="submit-btn" :disabled="isSending">
                <span>{{ isSending ? $t('contact.form.sending') : $t('contact.form.send') }}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Подвал - лес + много кода -->
    <section class="location-section">
      <div class="forest-code-bg">
        <!-- Слой с деревьями -->
        <div class="forest-layer">
          <div class="tree" v-for="i in 15" :key="i" :style="getTreeStyle(i)"></div>
        </div>

        <!-- Слой с кодом - много строк -->
        <div class="code-layer">
          <div class="code-line" v-for="i in 24" :key="i" :style="getCodeLineStyle(i)">
            <span
              class="code-symbol"
              v-for="(char, idx) in codeStrings[i % codeStrings.length]"
              :key="idx"
              >{{ char }}</span
            >
          </div>
        </div>

        <!-- Дополнительный слой с мелкими символами -->
        <div class="code-scatter">
          <span class="scatter-symbol" v-for="i in 60" :key="i" :style="getScatterStyle(i)">{{
            getScatterSymbol(i)
          }}</span>
        </div>

        <!-- Мягкое свечение снизу -->
        <div class="forest-glow"></div>
      </div>

      <div class="container">
        <div class="location-card" v-motion="fadeInUp">
          <div class="location-icon">🌲</div>
          <div class="location-info">
            <h3>{{ $t('contact.location.city') }}</h3>
            <p>{{ $t('contact.location.description') }}</p>
            <div class="timezone">{{ $t('contact.location.timezone') }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Toast уведомление -->
    <div class="toast-message" :class="{ show: showToast }">
      <span>✨</span>
      <span>{{ toastMessage }}</span>
      <span>✨</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const isSending = ref(false)
const showToast = ref(false)
const toastMessage = ref('')

const formData = ref({
  name: '',
  email: '',
  message: '',
})

const magicalContacts = [
  { name: 'Email', key: 'email', icon: '📧', value: 'whytimiracle@gmail.com' },
  { name: 'Telegram', key: 'telegram', icon: '💬', value: '@Katri_li' },
  { name: 'Phone', key: 'phone', icon: '📱', value: '+7 (913) 009-64-80' },
  { name: 'GitHub', key: 'github', icon: '🐙', value: 'github.com/KatrinKs' },
  { name: 'CodeWars', key: 'codewars', icon: '⚔️', value: 'codewars.com/users/KatrinKs' },
]

const codeStrings = [
  ['<', '/', '>', '{', '}', '(', ')', ';', '=', '&', '|', '!'],
  ['0', '1', '1', '0', '1', '0', '0', '1', '1', '0', '0', '1'],
  ['c', 'o', 'n', 's', 't', '=', '>', '(', ')', '{', '}'],
  ['f', 'u', 'n', 'c', 't', 'i', 'o', 'n', '(', ')', '{', '}'],
  ['<', 'd', 'i', 'v', '>', '<', '/', 'd', 'i', 'v', '>', '{'],
  ['t', 'y', 'p', 'e', ' ', 'T', '=', 's', 't', 'r', 'i', 'n', 'g'],
  ['{', ' ', '}', '[', ' ', ']', ':', ';', '(', ')'],
  ['i', 'm', 'p', 'o', 'r', 't', ' ', '{', '}', ' ', 'f', 'r', 'o', 'm'],
  ['r', 'e', 't', 'u', 'r', 'n', ' ', 'a', 's', 'y', 'n', 'c'],
  ['c', 'l', 'a', 's', 's', ' ', 'E', 'x', 't', 'e', 'n', 'd', 's'],
]

const scatterSymbols = [
  '{', '}', '(', ')', '<', '>', '=', ';', ':', '&', '|', '!', '?', '+', '-', '*', '/', '%', '#', '@',
]

const getFireflyStyle = (i: number) => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  animationDelay: `${Math.random() * 8}s`,
  animationDuration: `${5 + Math.random() * 6}s`,
  width: `${2 + Math.random() * 4}px`,
  height: `${2 + Math.random() * 4}px`,
})

const getTreeStyle = (i: number) => ({
  left: `${3 + i * 7}%`,
  height: `${60 + Math.random() * 50}px`,
  width: `${18 + Math.random() * 15}px`,
  animationDelay: `${i * 0.25}s`,
})

const getCodeLineStyle = (i: number) => ({
  top: `${3 + i * 4}%`,
  left: `${Math.random() * 80 + 10}%`,
  animationDuration: `${12 + i * 1.5}s`,
  animationDelay: `${i * 0.8}s`,
})

const getScatterStyle = (i: number) => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  animationDuration: `${8 + Math.random() * 7}s`,
  animationDelay: `${Math.random() * 10}s`,
  opacity: `${0.1 + Math.random() * 0.3}`,
})

const getScatterSymbol = (i: number) => {
  return scatterSymbols[Math.floor(Math.random() * scatterSymbols.length)]
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
  toastMessage.value = `✨ "${text}" ${t('contact.toast.copied')} ✨`
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 2000)
}

// Отправка формы через Web3Forms
const sendMessage = async () => {
  isSending.value = true
  
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: import.meta.env.VITE_WEB3FORMS_KEY,
        name: formData.value.name,
        email: formData.value.email,
        message: formData.value.message,
        subject: `New message from ${formData.value.name}`,
        from_name: formData.value.name,
        // Дополнительные поля для красоты в email
        reply_to: formData.value.email,
      })
    })

    const result = await response.json()
    
    if (result.success) {
      toastMessage.value = `✨ ${t('contact.toast.sent')} ✨`
      showToast.value = true
      formData.value = { name: '', email: '', message: '' }
    } else {
      throw new Error('Failed to send')
    }
  } catch (error) {
    toastMessage.value = `✨ ${t('contact.toast.error')} ✨`
    showToast.value = true
  } finally {
    isSending.value = false
    setTimeout(() => {
      showToast.value = false
    }, 3000)
  }
}

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  enter: { opacity: 1, y: 0, transition: { duration: 600 } },
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  enter: { opacity: 1, y: 0, transition: { duration: 500 } },
}

const slideIn = {
  initial: { opacity: 0, x: -40 },
  enter: { opacity: 1, x: 0, transition: { duration: 500 } },
}

const slideInRight = {
  initial: { opacity: 0, x: 40 },
  enter: { opacity: 1, x: 0, transition: { duration: 500 } },
}
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

.contact-page {
  overflow-x: hidden;
}

// Hero секция
.page-hero {
  position: relative;
  min-height: 40vh;
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
    min-height: 40vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero-content {
    text-align: center;
  }

  .rune-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-md;
    margin-bottom: $spacing-md;
    .rune {
      font-size: 1.2rem;
      color: $accent;
      opacity: 0.7;
    }
    .badge-text {
      font-size: 0.6rem;
      letter-spacing: 3px;
      color: $accent;
    }
  }

  .hero-title {
    font-size: 2.5rem;
    font-weight: 800;
    .gradient {
      @include gradient-text;
    }
  }
}

// Contact Section
.contact-section {
  padding: 2rem 0;
  background: $bg-dark;

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-xl;
    align-items: stretch;

    @include mobile {
      grid-template-columns: 1fr;
      gap: $spacing-lg;
    }
  }

  .contact-magical {
    display: flex;
    flex-direction: column;
    height: 100%;

    .magical-portals {
      display: flex;
      flex-direction: column;
      gap: $spacing-md;
      height: 100%;

      .portal-card {
        position: relative;
        display: flex;
        align-items: center;
        gap: $spacing-md;
        padding: $spacing-sm $spacing-md;
        background: $bg-card;
        border-radius: $radius-md;
        border: 1px solid $border;
        cursor: pointer;
        transition: $transition-base;
        overflow: hidden;

        &:hover {
          transform: translateX(5px);
          border-color: $accent;
          .portal-glow {
            left: 100%;
          }
        }

        .portal-icon {
          font-size: 1.3rem;
        }
        .portal-info {
          flex: 1;
          .portal-name {
            font-size: 0.55rem;
            color: $accent;
            letter-spacing: 1px;
          }
          .portal-value {
            font-size: 0.8rem;
            color: $text;
            font-weight: 500;
          }
        }

        .portal-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba($accent, 0.08), transparent);
          transition: left 0.5s;
          pointer-events: none;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .contact-form {
    background: $bg-card;
    border-radius: $radius-lg;
    padding: $spacing-xl;
    border: 1px solid $border;
    display: flex;
    flex-direction: column;
    height: 100%;

    .magic-form {
      display: flex;
      flex-direction: column;
      gap: $spacing-lg;
      height: 100%;

      .form-row {
        display: flex;
        gap: $spacing-lg;

        @include mobile {
          flex-direction: column;
          gap: $spacing-lg;
        }
      }

      .input-icon {
        position: relative;
        flex: 1;

        &.full-width {
          width: 100%;
        }

        .input-emoji {
          position: absolute;
          left: $spacing-md;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1rem;
          pointer-events: none;
          z-index: 1;
        }

        textarea ~ .input-emoji {
          top: $spacing-md;
          transform: none;
        }

        input,
        textarea {
          width: 100%;
          padding: 0.9rem $spacing-md 0.9rem 2.8rem;
          background: $bg-dark;
          border: 1px solid $border;
          border-radius: $radius-md;
          font-family: inherit;
          font-size: 0.9rem;
          color: $text;
          transition: $transition-base;

          &:focus {
            outline: none;
            border-color: $accent;
            box-shadow: 0 0 0 3px rgba($accent, 0.1);
          }

          &::placeholder {
            color: rgba($text-muted, 0.5);
          }
        }

        textarea {
          resize: vertical;
          min-height: 120px;
          padding-top: $spacing-md;
          padding-bottom: $spacing-md;
        }
      }

      .submit-btn {
        width: 100%;
        padding: $spacing-md;
        background: $bg-gradient;
        border: none;
        border-radius: $radius-md;
        font-size: 0.9rem;
        font-weight: 600;
        color: $bg-dark;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: $spacing-sm;
        transition: $transition-base;
        margin-top: auto;

        &:hover {
          transform: translateY(-2px);
          box-shadow: $shadow-glow;
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
    }
  }
}

// Подвал - лес + много кода
.location-section {
  position: relative;
  background: $bg-card;
  padding: 4rem 0;
  overflow: hidden;

  .forest-code-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;

    .forest-layer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;

      .tree {
        position: absolute;
        bottom: 0;
        background: linear-gradient(180deg, rgba(26, 58, 42, 0.35), rgba(10, 26, 16, 0.6));
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        animation: treeSway 4s ease-in-out infinite;
        transform-origin: bottom center;

        &::before {
          content: '';
          position: absolute;
          bottom: -8px;
          left: -10px;
          width: 40px;
          height: 16px;
          background: rgba(10, 26, 16, 0.3);
          border-radius: 50%;
        }
      }
    }

    .code-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      .code-line {
        position: absolute;
        display: flex;
        gap: 3px;
        font-family: 'Courier New', monospace;
        font-size: 10px;
        white-space: nowrap;
        animation: codeFlow linear infinite;

        .code-symbol {
          color: rgba($accent, 0.2);
          transition: all 0.3s;
        }

        &:hover .code-symbol {
          color: rgba($accent, 0.5);
          text-shadow: 0 0 4px $accent;
        }
      }
    }

    .code-scatter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      .scatter-symbol {
        position: absolute;
        font-family: 'Courier New', monospace;
        font-size: 8px;
        color: rgba($accent, 0.15);
        animation: floatSymbol 10s ease-in-out infinite;
      }
    }

    .forest-glow {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100px;
      background: linear-gradient(180deg, transparent, rgba($accent, 0.12));
      filter: blur(25px);
      animation: glowPulse 4s ease-in-out infinite;
    }
  }

  .container {
    position: relative;
    z-index: 1;
  }

  .location-card {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-lg;
    padding: $spacing-lg $spacing-xl;
    background: rgba($bg-dark, 0.7);
    backdrop-filter: blur(8px);
    border-radius: $radius-lg;
    border: 1px solid $border;
    max-width: 500px;
    margin: 0 auto;
    transition: $transition-base;

    &:hover {
      transform: translateY(-5px);
      border-color: $accent;
      background: rgba($bg-dark, 0.85);
    }

    .location-icon {
      font-size: 2rem;
      filter: drop-shadow(0 0 4px $accent);
    }
    .location-info {
      text-align: center;
      h3 {
        font-size: 1.1rem;
        color: $primary;
        margin-bottom: $spacing-xs;
      }
      p {
        font-size: 0.8rem;
        color: $text-muted;
        margin-bottom: $spacing-xs;
      }
      .timezone {
        font-size: 0.7rem;
        color: $accent;
      }
    }
  }
}

// Toast
.toast-message {
  position: fixed;
  bottom: -100px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-sm $spacing-lg;
  background: rgba($bg-card, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid $accent;
  border-radius: $radius-round;
  z-index: 1000;
  transition: bottom 0.3s ease;
  font-size: 0.8rem;

  &.show {
    bottom: $spacing-xl;
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
  0%,
  100% {
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
    transform: translateY(-25px) translateX(12px);
    opacity: 0;
  }
}

@keyframes treeSway {
  0%,
  100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(2deg);
  }
}

@keyframes codeFlow {
  0% {
    transform: translateX(-30px);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateX(70px);
    opacity: 0;
  }
}

@keyframes floatSymbol {
  0%,
  100% {
    transform: translateY(0) translateX(0);
    opacity: 0.1;
  }
  50% {
    transform: translateY(-15px) translateX(8px);
    opacity: 0.3;
  }
}

@keyframes glowPulse {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}
</style>