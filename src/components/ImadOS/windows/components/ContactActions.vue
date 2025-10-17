<template>
  <div class="contact-actions">
    <div class="contact-actions__buttons">
      <button 
        class="contact-actions__btn contact-actions__btn--secondary"
        @click="handleSaveDraft"
        :disabled="isSubmitting"
      >
        Save Draft
      </button>
      <button 
        class="contact-actions__btn contact-actions__btn--primary" 
        :class="{ 'contact-actions__btn--loading': isSubmitting }"
        @click="handleSendMessage"
        :disabled="isSubmitting"
      >
        <span v-if="isSubmitting">Sending...</span>
        <span v-else-if="isSubmitted">Sent!</span>
        <span v-else>Send Message</span>
      </button>
    </div>
    <div class="contact-actions__status">
      <span class="contact-actions__status-text" :class="{ 'contact-actions__status-text--over': isOverLimit }">
        {{ characterCount }}/500 characters
      </span>
      <div v-if="!isFormValid && hasAttemptedSubmit" class="contact-actions__validation">
        Please fix the errors above
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  formData: { type: Object, required: true },
  isFormValid: { type: Boolean, default: false },
  isSubmitting: { type: Boolean, default: false },
  isSubmitted: { type: Boolean, default: false }
})

const emit = defineEmits(['send-message', 'save-draft', 'validate-form', 'check-validation'])

const hasAttemptedSubmit = ref(false)

const characterCount = computed(() => {
  return props.formData.message?.length || 0
})

const isOverLimit = computed(() => {
  return characterCount.value > 500
})

function handleSendMessage() {
  hasAttemptedSubmit.value = true
  
  // Always trigger validation first
  emit('validate-form')
  
  // Check validation result
  emit('check-validation', (isValid) => {
    if (isValid) {
      emit('send-message', props.formData)
    }
    // If invalid, just show the errors (already handled by validation)
  })
}

function handleSaveDraft() {
  emit('save-draft', props.formData)
}
</script>

<style scoped lang="scss">
@import '../../../../scss/global.scss';

.contact-actions {
  border-top: 1px solid #404040;
  background: #2a2a2a;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;

  &__buttons {
    display: flex;
    gap: 12px;
  }

  &__btn {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &--primary {
      background: #007aff;
      color: white;

      &:hover:not(:disabled) {
        background: #0056b3;
      }

      &--loading {
        background: #0056b3;
        cursor: not-allowed;
      }
    }

    &--secondary {
      background: #404040;
      color: #ffffff;
      border: 1px solid #555;

      &:hover:not(:disabled) {
        background: #555;
      }
    }
  }

  &__status {
    display: flex;
    flex-direction: column;
    gap: 4px;

    &-text {
      font-size: 12px;
      color: #999;

      &--over {
        color: #ff3b30;
      }
    }
  }

  &__validation {
    font-size: 12px;
    color: #ff3b30;
  }
}
</style>
