<!-- 
  FO_MC_LO011001P
  FO_MC_LO011002P
  FO_MC_LO011003P
  FO_MC_LO011004P
  FO_MC_LO011005P
  FO_MC_LO011008 
  FO_MC_LO011000
-->

<script setup lang="ts">
import AuthLoginRedirect from '@/components/auth/login/AuthLoginRedirect.vue'
import MainWrapper from '@/components/layout/MainWrapper.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareCheckbox from '@/components/uikit/input/WelfareCheckbox.vue'
import WelfareInput from '@/components/uikit/input/WelfareInput.vue'
import { useAuthLoginForm } from '@/composables/auth/useAuthLoginForm'

const { values, setFieldValue, handleShowError, saveId, setSaveId } = useAuthLoginForm()
</script>

<template>
  <MainWrapper hasFooter showSubTitle showWidgetMobile logoPlay class="wf-mb-43 wf-mt-20">
    <template #main>
      <form
        @submit.prevent="handleShowError"
        :autocomplete="saveId ? 'on' : 'new-password'"
        class="wf_flex wf_flex-col wf-space-y-10 wf_width-full wf_items-center wf-mb-20"
      >
        <div class="wf_flex wf_flex-col wf-space-y-30 wf_width-full">
          <div class="wf_flex wf_flex-col wf-space-y-16">
            <div class="wf_flex wf_flex-col wf-space-y-10">
              <span class="wf-color--g-333 wf-font_15--bold wf_letter-spacing--1-1">{{ $t('auth.login.form.title') }}</span>
              <WelfareInput
                :autofocus="true"
                :placeholder="$t('auth.login.form.placeholderId')"
                class="wf_flex-1 wf_letter-spacing-0"
                :model-value="values.memberId"
                @update:model-value="(value) => setFieldValue('memberId', value)"
              />
              <WelfareInput
                type="password"
                id="welfare-password"
                class="wf_flex-1 wf_letter-spacing-0"
                :placeholder="$t('auth.login.form.placeholderPassword')"
                :model-value="values.password"
                @update:model-value="(value) => setFieldValue('password', value)"
                passwordIcon
              />
            </div>
            <div class="wf_flex wf-space-x-6 wf_items-center">
              <WelfareCheckbox :model-value="saveId" @update:modelValue="setSaveId" />
              <span class="wf-color--g-333 wf-font_15--mid">{{ $t('auth.login.form.saveId') }}</span>
            </div>
          </div>
          <WelfareButtonLine
            type="lg"
            lg-state="grey-line"
            class="wf_height-50"
            type-action="submit"
            :active="true"
            :text="$t('auth.login.form.button')"
          />
        </div>
        <AuthLoginRedirect />
      </form>
    </template>
  </MainWrapper>
</template>
