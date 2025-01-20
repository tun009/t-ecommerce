<!-- FO_MC_LO033013 -->

<script setup lang="ts">
import AuthResetPasswordForm from '@/components/auth/resetPassword/AuthResetPasswordForm.vue'
import WelfareTitleModal from '@/components/uikit/title/WelfareTitleModal.vue'
import { useAuthChangePasswordAfter90Days } from '@/composables/auth/useAuthChangePasswordAfter90Days'

const { values, errors, setFieldValue, resetPasswordConfirmBtnStatusComputed, handleChangePassword, onSkip, onClose } =
  useAuthChangePasswordAfter90Days()
</script>

<template>
  <div class="wf-px-16 wf-py-30">
    <WelfareTitleModal :title="$t('auth.reset-password.change-after-90-title')" class="wf-pb-20" @close="onClose" />
    <div
      class="wf-mt-24 wf-font_15--mid wf-color--g-333 wf_flex wf_flex-col wf-space-y-7"
      v-html="$t('auth.reset-password.change-after-90-desc')"
    ></div>
    <div class="wf-mt-20">
      <AuthResetPasswordForm
        :form-values="values"
        type="after-90-days"
        :form-errors="errors"
        :disable-submit="!resetPasswordConfirmBtnStatusComputed"
        @set-field-value="setFieldValue"
        @submit="handleChangePassword"
        @after90-days-click="onSkip"
      />
    </div>
  </div>
</template>
