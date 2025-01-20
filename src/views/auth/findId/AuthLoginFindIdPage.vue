<!-- 
  FO_MC_LO022010
  FO_MC_LO011012
  FO_MC_LO022020
  FO_MC_LO022021
  FO_MC_LO022022
  FO_MC_LO022023
-->
<script setup lang="ts">
import AuthLoginNoteBottom from '@/components/auth/login/AuthLoginNoteBottom.vue'
import AuthVerifyAccount from '@/components/auth/widgets/AuthVerifyAccount.vue'
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import { useAuthFindIdForm } from '@/composables/auth/useAuthFindIdForm'
import { useRouter } from 'vue-router'

const router = useRouter()
const { verifyRef, viewStatus, values, setFieldValue, onConfirm, onVerify, onResend } = useAuthFindIdForm()

const handleBackAction = () => {
  if (viewStatus.value === 'verify-account') viewStatus.value = 'confirm-account'
  else router.back()
}
</script>

<template>
  <WelfareTitleTextStickyTop displayBackIcon :title="$t('auth.findId.title')" @onClickBack="handleBackAction" />
  <div class="wf-px-16 wf-mb-85">
    <div class="wf-py-30">
      <AuthVerifyAccount ref="verifyRef" time-type="default" :view-status="viewStatus" :form-values="values"
        @set-field-value="setFieldValue" @resend="onResend" @confirm="onConfirm" @verify="onVerify" />
    </div>
    <AuthLoginNoteBottom :note="$t('auth.findId.note')" />
  </div>
</template>
