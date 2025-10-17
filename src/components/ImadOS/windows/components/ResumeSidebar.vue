<template>
  <div class="resume-sidebar">
    <div class="resume-sidebar__header">
      <h3 class="resume-sidebar__title">Resume</h3>
      <p class="resume-sidebar__subtitle">Navigate sections</p>
    </div>

    <nav class="resume-sidebar__nav">
      <ul class="resume-sidebar__list">
        <li
          v-for="section in sections"
          :key="section.id"
          class="resume-sidebar__item"
          :class="{ 'resume-sidebar__item--active': activeSection === section.id }"
          @click="selectSection(section.id)"
        >
          <component :is="getSectionIcon(section.icon)" class="resume-sidebar__icon" />
          <span class="resume-sidebar__name">{{ section.name }}</span>
        </li>
      </ul>
    </nav>

    <div class="resume-sidebar__info">
      <h4 class="resume-sidebar__info-title">Quick Info</h4>
      <div class="resume-sidebar__info-item">
        <span class="resume-sidebar__info-label">Location:</span>
        <span class="resume-sidebar__info-value">London, UK</span>
      </div>
      <div class="resume-sidebar__info-item">
        <span class="resume-sidebar__info-label">Experience:</span>
        <span class="resume-sidebar__info-value">5+ years</span>
      </div>
      <div class="resume-sidebar__info-item">
        <span class="resume-sidebar__info-label">Availability:</span>
        <span class="resume-sidebar__info-value">Open to work</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  UserIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  CogIcon,
  CodeBracketIcon,
  EnvelopeIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  sections: { type: Array, required: true },
  activeSection: { type: String, required: true }
})

const emit = defineEmits(['select-section'])

const iconMap = {
  UserIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  CogIcon,
  CodeBracketIcon,
  EnvelopeIcon
}

function getSectionIcon(iconName) {
  return iconMap[iconName]
}

function selectSection(sectionId) {
  emit('select-section', sectionId)
}
</script>

<style scoped lang="scss">
@import '../../../../scss/global.scss';

.resume-sidebar {
  width: 280px;
  min-width: 280px;
  background: #2a2a2a;
  border-right: 1px solid #404040;
  padding: 24px;
  overflow-y: auto;
  flex-shrink: 0;

  &__header {
    margin-bottom: 32px;
  }

  &__title {
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 4px 0;
    color: #ffffff;
  }

  &__subtitle {
    font-size: 12px;
    color: #999;
    margin: 0;
  }

  &__nav {
    margin-bottom: 32px;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 4px;

    &:hover {
      background: #404040;
    }

    &--active {
      background: #007aff;
      color: #ffffff;

      .resume-sidebar__icon {
        color: #ffffff;
      }
    }
  }

  &__icon {
    width: 18px;
    height: 18px;
    color: #999;
    flex-shrink: 0;
  }

  &__name {
    font-size: 14px;
    font-weight: 500;
  }

  &__info {
    &-title {
      font-size: 14px;
      font-weight: 600;
      margin: 0 0 16px 0;
      color: #ffffff;
    }

    &-item {
      display: flex;
      flex-direction: column;
      margin-bottom: 12px;
    }

    &-label {
      font-size: 12px;
      color: #999;
      margin-bottom: 2px;
    }

    &-value {
      font-size: 13px;
      color: #ffffff;
    }
  }
}
</style>
