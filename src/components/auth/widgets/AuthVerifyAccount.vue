<script setup lang="ts">
import { AuthVerificationFormType } from '@/models/auth/AuthModel'
import AuthConfirmForm from './AuthConfirmForm.vue'
import AuthVerificationForm from './AuthVerificationForm.vue'
import { ref } from 'vue'

interface AuthVerifyAccountProps {
  formValues: AuthVerificationFormType
  viewStatus: 'confirm-account' | 'verify-account'
  timeType?: 'warning' | 'default'
}

interface AuthVerifyAccountEmits {
  (e: 'setFieldValue', key: keyof AuthVerificationFormType, value: any): void
  (e: 'submit'): void
  (e: 'resend'): void
  (e: 'confirm'): void
  (e: 'verify'): void
}

withDefaults(defineProps<AuthVerifyAccountProps>(), {})
defineEmits<AuthVerifyAccountEmits>()
const verifyRef = ref()

defineExpose({
  timerStart: () => {
    verifyRef?.value?.timerStart()
  }
})
</script>

<template>
  <AuthConfirmForm
    v-show="viewStatus === 'confirm-account'"
    :form-values="$props.formValues"
    @setFieldValue="(key, value) => $emit('setFieldValue', key, value)"
    @submit="$emit('confirm')"
  />
  <AuthVerificationForm
    v-show="viewStatus === 'verify-account'"
    ref="verifyRef"
    :time-type="$props.timeType"
    :form-values="$props.formValues"
    @setFieldValue="(key, value) => $emit('setFieldValue', key, value)"
    @resend="$emit('resend')"
    @submit="$emit('verify')"
  />
</template>
