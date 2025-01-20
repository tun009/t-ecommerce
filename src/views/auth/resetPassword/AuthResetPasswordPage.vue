<!-- FO_MC_LO033011, FO_MC_LO033012, FO_MC_LO023011, FO_MC_LO023012, FO_MC_LO023013 -->

<script setup lang="ts">
import AuthResetPasswordForm from '@/components/auth/resetPassword/AuthResetPasswordForm.vue'
import AuthVerifyAccount from '@/components/auth/widgets/AuthVerifyAccount.vue'
import WelfareTitleText from '@/components/uikit/title/WelfareTitleText.vue'
import { useAuthResetPassword } from '@/composables/auth/useAuthResetPassword'

const {
  verifiedQuery,
  isVerified,
  verifyRef,
  viewStatus,
  verifyAccountValues,
  resetPasswordValues,
  resetPasswordErrors,
  resetPasswordConfirmBtnStatusComputed,
  setVerifyAccountFieldValues,
  setResetPasswordFieldValues,
  onConfirm,
  onVerify,
  onResend,
  handleResetPassword
} = useAuthResetPassword()
</script>

<template>
  <div>
    <WelfareTitleText displayBackIcon :title="$t('auth.reset-password._')" />
    <div class="wf-px-16 wf-pb-85">
      <div v-if="!isVerified && !verifiedQuery">
        <div class="wf-py-30">
          <AuthVerifyAccount
            ref="verifyRef"
            time-type="warning"
            :view-status="viewStatus"
            :form-values="verifyAccountValues"
            @set-field-value="(key, value) => setVerifyAccountFieldValues(key, value)"
            @resend="onResend"
            @confirm="onConfirm"
            @verify="onVerify"
          />
        </div>
        <div>
          <hr class="wf_break-line-2-e-7-e-7" />
          <div class="wf-mt-15">
            <div class="wf-mt--1 wf_flex wf_justify-center wf_items-center">
              <p class="wf_width-fit wf-font_13--reg wf-color--g-555 wf_text-center wf-ml--5">
                <span class="wf-mr-4">&#x2022;</span>
                <span>{{ $t('auth.reset-password.contact-when-number-be-changed') }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="wf-pt-30">
          <AuthResetPasswordForm
            :form-values="resetPasswordValues"
            :form-errors="resetPasswordErrors"
            :disable-submit="!resetPasswordConfirmBtnStatusComputed"
            @set-field-value="setResetPasswordFieldValues"
            @submit="handleResetPassword"
          />
        </div>
      </div>
    </div>
  </div>
</template>
