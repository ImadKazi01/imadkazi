<template>
  <div class="contact-form">
    <div class="contact-form__scrollable">
      <div class="contact-form__header">
        <h2 class="contact-form__title">Contact Imad</h2>
        <p class="contact-form__subtitle">Get in touch for your next project</p>
      </div>

      <div class="contact-form__fields">
        <div class="contact-form__field">
          <label class="contact-form__label">Name *</label>
          <input 
            type="text" 
            class="contact-form__input"
            :class="{ 'contact-form__input--error': errors.name }"
            placeholder="Your full name"
            :value="formData.name"
            @input="$emit('update:formData', { ...formData, name: $event.target.value })"
            @blur="handleFieldBlur('name')"
          />
          <div v-if="errors.name" class="contact-form__error">{{ errors.name }}</div>
        </div>

        <div class="contact-form__field">
          <label class="contact-form__label">Email *</label>
          <input 
            type="email" 
            class="contact-form__input"
            :class="{ 'contact-form__input--error': errors.email }"
            placeholder="your.email@example.com"
            :value="formData.email"
            @input="$emit('update:formData', { ...formData, email: $event.target.value })"
            @blur="handleFieldBlur('email')"
          />
          <div v-if="errors.email" class="contact-form__error">{{ errors.email }}</div>
        </div>

        <div class="contact-form__field">
          <label class="contact-form__label">Phone</label>
          <input 
            type="tel" 
            class="contact-form__input"
            :class="{ 'contact-form__input--error': errors.phone }"
            placeholder="+44 123 456 7890"
            :value="formData.phone"
            @input="$emit('update:formData', { ...formData, phone: $event.target.value })"
            @blur="handleFieldBlur('phone')"
          />
          <div v-if="errors.phone" class="contact-form__error">{{ errors.phone }}</div>
        </div>

        <div class="contact-form__field">
          <label class="contact-form__label">Company</label>
          <input 
            type="text" 
            class="contact-form__input"
            :class="{ 'contact-form__input--error': errors.company }"
            placeholder="Your company name"
            :value="formData.company"
            @input="$emit('update:formData', { ...formData, company: $event.target.value })"
            @blur="handleFieldBlur('company')"
          />
          <div v-if="errors.company" class="contact-form__error">{{ errors.company }}</div>
        </div>

        <div class="contact-form__field">
          <label class="contact-form__label">Project Type *</label>
          <select 
            class="contact-form__select"
            :class="{ 'contact-form__input--error': errors.projectType }"
            :value="formData.projectType"
            @change="$emit('update:formData', { ...formData, projectType: $event.target.value })"
            @blur="handleFieldBlur('projectType')"
          >
            <option value="">Select a service</option>
            <option value="branding">Branding & Identity</option>
            <option value="graphic-design">Graphic Design</option>
            <option value="print-design">Print Design</option>
            <option value="social-media-design">Social Media Design</option>
            <option value="web-design">UI/UX Design</option>
            <option value="web-development">Web Development</option>
            <option value="photography">Photography</option>
            <option value="consultation">Consultation</option>
          </select>
          <div v-if="errors.projectType" class="contact-form__error">{{ errors.projectType }}</div>
        </div>

        <div class="contact-form__field">
          <label class="contact-form__label">Message *</label>
          <textarea 
            class="contact-form__textarea"
            :class="{ 'contact-form__input--error': errors.message }"
            placeholder="Tell me about your project..."
            :value="formData.message"
            @input="$emit('update:formData', { ...formData, message: $event.target.value })"
            @blur="handleFieldBlur('message')"
            rows="4"
          ></textarea>
          <div class="contact-form__message-info">
            <div v-if="errors.message" class="contact-form__error">{{ errors.message }}</div>
            <div class="contact-form__char-count" :class="{ 'contact-form__char-count--over': isOverLimit }">
              {{ characterCount }}/500 characters
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  formData: { type: Object, required: true }
})

const emit = defineEmits(['update:formData', 'send-message'])

// Validation state
const errors = ref({})
const isSubmitting = ref(false)
const isSubmitted = ref(false)

// Validation rules
const validationRules = {
  name: {
    required: true,
    minLength: 2,
    message: 'Name must be at least 2 characters'
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  phone: {
    required: false,
    pattern: /^[\+]?[1-9][\d]{0,15}$/,
    message: 'Please enter a valid phone number'
  },
  company: {
    required: false,
    minLength: 2,
    message: 'Company name must be at least 2 characters'
  },
  projectType: {
    required: true,
    message: 'Please select a project type'
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 500,
    message: 'Message must be between 10 and 500 characters'
  }
}

// Computed properties
const isFormValid = computed(() => {
  return props.formData.name && 
         props.formData.email && 
         props.formData.projectType && 
         props.formData.message &&
         props.formData.message.length >= 10 &&
         props.formData.message.length <= 500 &&
         Object.keys(errors.value).length === 0
})

const characterCount = computed(() => {
  return props.formData.message?.length || 0
})

const isOverLimit = computed(() => {
  return characterCount.value > 500
})

// Validation functions
function validateField(fieldName, value) {
  const rule = validationRules[fieldName]
  if (!rule) return true

  // Required validation
  if (rule.required && (!value || value.trim() === '')) {
    return rule.message
  }

  // Skip other validations if field is empty and not required
  if (!value || value.trim() === '') return true

  // Min length validation
  if (rule.minLength && value.length < rule.minLength) {
    return rule.message
  }

  // Max length validation
  if (rule.maxLength && value.length > rule.maxLength) {
    return rule.message
  }

  // Pattern validation
  if (rule.pattern && !rule.pattern.test(value)) {
    return rule.message
  }

  return true
}

function validateForm() {
  const newErrors = {}
  
  Object.keys(validationRules).forEach(field => {
    const error = validateField(field, props.formData[field])
    if (error !== true) {
      newErrors[field] = error
    }
  })

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

// Force validation of all fields
function forceValidation() {
  const newErrors = {}
  
  Object.keys(validationRules).forEach(field => {
    const error = validateField(field, props.formData[field])
    if (error !== true) {
      newErrors[field] = error
    }
  })

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

// Watch for form data changes to clear errors
watch(() => props.formData, () => {
  // Clear errors for fields that are now valid
  Object.keys(errors.value).forEach(field => {
    if (validateField(field, props.formData[field]) === true) {
      delete errors.value[field]
    }
  })
}, { deep: true })

// Handle field blur validation
function handleFieldBlur(fieldName) {
  const error = validateField(fieldName, props.formData[fieldName])
  if (error !== true) {
    errors.value[fieldName] = error
  } else {
    delete errors.value[fieldName]
  }
}

// Handle form submission
async function handleSubmit() {
  // Validate all fields first
  validateForm()
  
  if (!isFormValid.value) {
    return
  }

  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    emit('send-message', props.formData)
    isSubmitted.value = true
    
    // Reset form after successful submission
    setTimeout(() => {
      isSubmitted.value = false
      emit('update:formData', {
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        message: ''
      })
    }, 2000)
    
  } catch (error) {
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}

// Expose validation state to parent
defineExpose({
  isFormValid,
  validateForm,
  forceValidation,
  errors
})
</script>

<style scoped lang="scss">
@import '../../../../scss/global.scss';

.contact-form {
  flex: 1;
  background: #1a1a1a;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;

  &__scrollable {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0;
    box-sizing: border-box;
    margin-bottom: 20px;
  }

  &__header {
    margin-bottom: 32px;
    padding: 24px 24px 0 24px;
  }

  &__title {
    font-size: 24px;
    font-weight: 600;
    margin: 0 0 8px 0;
    color: #ffffff;
  }

  &__subtitle {
    font-size: 16px;
    color: #999;
    margin: 0;
  }

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 24px;
  }

  &__field {
    display: flex;
    flex-direction: column;
  }

  &__label {
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    margin-bottom: 8px;
  }

  &__input,
  &__select,
  &__textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #404040;
    border-radius: 8px;
    font-size: 16px;
    font-family: inherit;
    background: #2a2a2a;
    color: #ffffff;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: #fb923c;
      box-shadow: 0 0 0 3px rgba(251, 146, 60, 0.1);
    }

    &::placeholder {
      color: #666;
    }

    &--error {
      border-color: #ff3b30;
      box-shadow: 0 0 0 3px rgba(255, 59, 48, 0.1);
    }
  }

  &__textarea {
    resize: vertical;
    min-height: 100px;
  }

  &__select {
    cursor: pointer;
  }

  &__error {
    color: #ff3b30;
    font-size: 12px;
    margin-top: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__message-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4px;
  }

  &__char-count {
    font-size: 12px;
    color: #999;

    &--over {
      color: #ff3b30;
    }
  }
}
</style>
