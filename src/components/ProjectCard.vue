<template>
  <div class="project-card">
    <div class="project-header">
      <EditableText v-model="project.title" type="input" placeholder="Название проекта" />
      <span class="project-id">#{{ project.id }}</span>
    </div>
    
    <EditableText v-model="project.description" type="textarea" placeholder="Описание проекта" />
    
    <div class="project-tech">
      <span class="tech-label">Технологии:</span>
      <EditableText v-model="project.tech" type="input" placeholder="Vue 3, TS, SCSS" />
    </div>
  </div>
</template>

<script setup lang="ts">
import EditableText from './EditableText.vue'

defineProps<{
  project: {
    id: number
    title: string
    description: string
    tech: string
  }
}>()
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

.project-card {
  @include card;
  
  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-md;
    
    .project-id {
      color: $accent;
      font-size: 0.875rem;
      font-weight: 600;
    }
  }
  
  .project-tech {
    margin-top: $spacing-md;
    padding-top: $spacing-md;
    border-top: 1px solid $border;
    
    .tech-label {
      font-size: 0.75rem;
      color: $text-muted;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-right: $spacing-sm;
    }
  }
}
</style>