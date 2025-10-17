<template>
  <div class="contact">
    <div class="contact__content">
      <ContactForm
        v-model:form-data="formData"
        @send-message="sendMessage"
        ref="contactFormRef"
      />

      <ContactSidebar />
    </div>

    <ContactActions
      :form-data="formData"
      :is-form-valid="isFormValid"
      :is-submitting="isSubmitting"
      :is-submitted="isSubmitted"
      @send-message="sendMessage"
      @save-draft="saveDraft"
      @validate-form="validateForm"
      @check-validation="handleValidationCheck"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ContactForm from './components/ContactForm.vue'
import ContactSidebar from './components/ContactSidebar.vue'
import ContactActions from './components/ContactActions.vue'

const formData = ref({
  name: '',
  email: '',
  phone: '',
  company: '',
  projectType: '',
  message: ''
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const contactFormRef = ref(null)

const isFormValid = computed(() => {
  const hasRequiredFields = formData.value.name && 
                           formData.value.email && 
                           formData.value.projectType && 
                           formData.value.message &&
                           formData.value.message.length >= 10 &&
                           formData.value.message.length <= 500
  
  return hasRequiredFields && !hasValidationErrors.value
})

// Track validation state from ContactForm
const hasValidationErrors = ref(false)

function sendMessage() {
  isSubmitting.value = true
  
  // Simulate API call
  setTimeout(() => {
    isSubmitting.value = false
    isSubmitted.value = true
    
    // Reset after success
    setTimeout(() => {
      isSubmitted.value = false
      formData.value = {
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        message: ''
      }
    }, 2000)
  }, 1000)
}

function saveDraft() {
  console.log('Saving draft:', formData.value)
  // Handle draft saving here
}

function validateForm() {
  if (contactFormRef.value) {
    const isValid = contactFormRef.value.forceValidation()
    // Update validation state
    hasValidationErrors.value = Object.keys(contactFormRef.value.errors).length > 0
    return isValid
  }
  return false
}

function handleValidationCheck(callback) {
  const isValid = validateForm()
  // Force reactivity update
  setTimeout(() => {
    callback(isValid)
  }, 0)
}
</script>

<style scoped lang="scss">
@import '../../../scss/global.scss';

.contact {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #1a1a1a;
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow: hidden;

  &__content {
    display: flex;
    flex: 1;
    overflow: hidden;
    min-height: 0;
  }
}
</style>