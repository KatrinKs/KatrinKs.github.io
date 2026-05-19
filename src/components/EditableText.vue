<template>
  <div class="editable-text" :class="{ 'is-editing': isEditing }">
    <div v-if="!isEditing" class="text-display" @dblclick="startEditing">
      {{ displayValue }}
      <button class="edit-btn" @click="startEditing" title="Редактировать (двойной клик)">
        ✎
      </button>
    </div>
    
    <div v-else class="text-editor">
      <input
        v-if="type === 'input'"
        v-model="editValue"
        @keyup.enter="save"
        @keyup.esc="cancel"
        :placeholder="placeholder"
      />
      <textarea
        v-else
        v-model="editValue"
        @keyup.esc="cancel"
        :placeholder="placeholder"
        rows="4"
      ></textarea>
      <div class="editor-actions">
        <button @click="save" class="save-btn">✓ Сохранить</button>
        <button @click="cancel" class="cancel-btn">✗ Отмена</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  modelValue: string
  type?: 'input' | 'textarea'
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'save', value: string): void
}>()

const isEditing = ref(false)
const editValue = ref('')

const displayValue = computed(() => props.modelValue || '✎ Дважды кликните для редактирования')

const startEditing = () => {
  editValue.value = props.modelValue
  isEditing.value = true
}

const save = () => {
  emit('update:modelValue', editValue.value)
  emit('save', editValue.value)
  isEditing.value = false
}

const cancel = () => {
  isEditing.value = false
}
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

.editable-text {
  position: relative;
}

.text-display {
  position: relative;
  cursor: text;
  transition: $transition-base;
  padding: $spacing-sm;
  border-radius: $radius-sm;
  
  &:hover {
    background: rgba($accent, 0.1);
  }
  
  &:hover .edit-btn {
    opacity: 1;
  }
}

.edit-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  opacity: 0;
  background: $bg-card;
  border: 2px solid $accent;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  cursor: pointer;
  font-size: 14px;
  transition: $transition-base;
  box-shadow: $shadow;
  color: $accent;
  
  &:hover {
    background: $accent;
    color: $bg-dark;
    transform: scale(1.1);
  }
}

.text-editor {
  input, textarea {
    width: 100%;
    padding: $spacing-sm;
    border: 2px solid $accent;
    border-radius: $radius-sm;
    font-family: inherit;
    font-size: inherit;
    outline: none;
    background: $bg-card;
    color: $text;
    
    &:focus {
      box-shadow: $shadow-glow;
      border-color: $primary;
    }
  }
  
  .editor-actions {
    display: flex;
    gap: $spacing-sm;
    margin-top: $spacing-sm;
    
    button {
      padding: $spacing-xs $spacing-md;
      border: none;
      border-radius: $radius-sm;
      cursor: pointer;
      font-size: 14px;
      transition: $transition-base;
      font-weight: 500;
    }
    
    .save-btn {
      background: $accent;
      color: $text;
      
      &:hover {
        background: $accent-dark;
        transform: translateY(-2px);
      }
    }
    
    .cancel-btn {
      background: $primary;
      color: $bg-dark;
      
      &:hover {
        background: $primary-dark;
        transform: translateY(-2px);
      }
    }
  }
}
</style>