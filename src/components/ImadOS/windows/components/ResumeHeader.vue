<template>
  <div class="resume-header">
    <div class="resume-header__info">
      <h2 class="resume-header__title">{{ resumeData.name }} - Resume</h2>
      <span class="resume-header__subtitle">Creative Designer & Developer</span>
    </div>

    <div class="resume-header__actions">
      <button class="resume-header__btn resume-header__btn--secondary" @click="downloadResume">
        <svg class="resume-header__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Download PDF
      </button>
      <button class="resume-header__btn resume-header__btn--primary" @click="printResume">
        <svg class="resume-header__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        Print
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  resumeData: { type: Object, required: true }
})

const emit = defineEmits(['download', 'print'])

function downloadResume() {
  emit('download')
}

function printResume() {
  emit('print')
}
</script>

<style scoped lang="scss">
@import '../../../../scss/global.scss';

.resume-header {
  border-top: 1px solid #404040;
  background: #2a2a2a;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;

  &__info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__title {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    color: #ffffff;
  }

  &__subtitle {
    font-size: 12px;
    color: #999;
  }

  &__actions {
    display: flex;
    gap: 12px;
  }

  &__btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &--primary {
      background: #007aff;
      color: white;

      &:hover {
        background: #0056b3;
      }
    }

    &--secondary {
      background: #404040;
      color: #ffffff;
      border: 1px solid #555;

      &:hover {
        background: #555;
      }
    }
  }

  &__icon {
    width: 16px;
    height: 16px;
  }
}
</style>
