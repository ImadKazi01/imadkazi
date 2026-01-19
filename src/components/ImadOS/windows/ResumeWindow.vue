<template>
  <div class="resume">
    <!-- Desktop Layout -->
    <div class="resume__desktop">
      <div class="resume__content">
        <ResumeSidebar
          :sections="sections"
          :active-section="activeSection"
          :resume-data="resumeData"
          @select-section="selectSection"
        />

        <ResumeContent
          :active-section="activeSection"
          :resume-data="resumeData"
        />
      </div>

      <ResumeHeader
        :resume-data="resumeData"
        @download="downloadResume"
        @print="printResume"
      />
    </div>

    <!-- Mobile Layout -->
    <div class="resume__mobile">
      <div class="mobile-header">
        <div class="mobile-header__title">Resume</div>
      </div>

      <div class="mobile-sections">
        <button 
          v-for="section in sections" 
          :key="section.id"
          class="mobile-section"
          :class="{ 'mobile-section--active': activeSection === section.id }"
          @click="selectSection(section.id)"
        >
          <span class="mobile-section__name">{{ section.name }}</span>
        </button>
      </div>

      <div class="mobile-content">
        <ResumeContent
          :active-section="activeSection"
          :resume-data="resumeData"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ResumeSidebar from './components/ResumeSidebar.vue'
import ResumeContent from './components/ResumeContent.vue'
import ResumeHeader from './components/ResumeHeader.vue'
import resumeDataJson from '../../../data/resume.json'

const activeSection = ref('overview')

const sections = ref([
  { id: 'overview', name: 'Overview', icon: 'UserIcon' },
  { id: 'experience', name: 'Experience', icon: 'BriefcaseIcon' },
  { id: 'education', name: 'Education', icon: 'AcademicCapIcon' },
  { id: 'skills', name: 'Skills', icon: 'CogIcon' },
  { id: 'projects', name: 'Projects', icon: 'CodeBracketIcon' },
  { id: 'contact', name: 'Contact', icon: 'EnvelopeIcon' }
])

const resumeData = ref(resumeDataJson)

function selectSection(sectionId) {
  activeSection.value = sectionId
}

function downloadResume() {
  console.log('Downloading resume...')
  // Handle resume download
}

function printResume() {
  console.log('Printing resume...')
  // Handle resume printing
}
</script>

<style scoped lang="scss">
@import '../../../scss/global.scss';

.resume {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #1a1a1a;
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow: hidden;

  &__desktop {
    display: flex;
    flex-direction: column;
    height: 100%;

    @media (max-width: $tablet) {
      display: none;
    }
  }

  &__mobile {
    display: none;
    flex-direction: column;
    height: 100%;

    @media (max-width: $tablet) {
      display: flex;
    }
  }

  &__content {
    display: flex;
    flex: 1;
    overflow: hidden;
    min-height: 0;
  }
}

.mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  @include mobile-header;

  &__title {
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
  }
}

.mobile-sections {
  display: flex;
  @include mobile-section;
  overflow-x: auto;
  border-bottom: 1px solid $glass-border-light;

  &::-webkit-scrollbar {
    display: none;
  }
}

.mobile-section {
  display: flex;
  align-items: center;
  gap: 4px;
  @include mobile-tab;
  font-size: 16px;

  &--active {
    @include active-state;
  }

  &:hover:not(&--active) {
    background: rgba(255, 255, 255, 0.15);
  }

  &__name {
    font-size: 14px;
    font-weight: 500;
  }
}

.mobile-content {
  flex: 1;
  overflow: auto;
  padding: 20px;
  padding-bottom: 120px; // Extra space for dock
}
</style>