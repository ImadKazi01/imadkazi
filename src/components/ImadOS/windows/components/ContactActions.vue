<template>
  <div class="contact-actions">
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
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  formData: { type: Object, required: true },
  isFormValid: { type: Boolean, default: false },
  isSubmitting: { type: Boolean, default: false },
  isSubmitted: { type: Boolean, default: false }
})

const emit = defineEmits(['send-message', 'validate-form', 'check-validation'])

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

</script>

<style scoped lang="scss">
@import '../../../../scss/global.scss';

.contact-actions {
  border-top: 1px solid #404040;
  background: #2a2a2a;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: $tablet) {
    background: transparent;
  }

  &__btn {
    padding: 10px 0;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    @media (max-width: $tablet) {
      width: 100%;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &--primary {
      @include primary-button;

      &--loading {
        @include loading-state;
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
