<script setup lang="ts">
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareInput from '@/components/uikit/input/WelfareInput.vue'
import { useAuthVerificationForm } from '@/composables/auth/useAuthVerificationForm'
import { AuthVerificationFormEmits, AuthVerificationFormProps } from '@/models/auth/AuthModel'

const props = withDefaults(defineProps<AuthVerificationFormProps>(), { timeType: 'default' })
const emit = defineEmits<AuthVerificationFormEmits>()

const { timerComputed, timerStart, handleResend, handleSubmit } = useAuthVerificationForm(props, emit)

defineExpose({
  timerStart
})
</script>

<template>
  <div>
    <div class="wf_flex wf_flex-col wf-space-y-10">
      <WelfareInput
        :placeholder="$t('auth.findId.form.placeholderName')"
        :model-value="$props.formValues.name"
        @update:model-value="(value) => $emit('setFieldValue', 'name', value)"
      />
      <WelfareInput
        :placeholder="$t('auth.findId.form.placeholderPhone')"
        :model-value="$props.formValues.phone"
        @update:model-value="(value) => $emit('setFieldValue', 'phone', value)"
      />
      <div class="wf_flex wf-space-x-10">
        <div class="wf_flex-1">
          <WelfareInput
            :placeholder="$t('auth.reset-password.verification-number-placeholder')"
            :model-value="$props.formValues.code"
            @update:model-value="(value) => $emit('setFieldValue', 'code', value)"
          >
            <template #last-content>
              <p
                class="wf-font_15--reg"
                :class="[{ 'wf-color--mb-1-f-1-f-1-f': $props.timeType === 'default', 'wf-color--red-ff-3-b-4-f': $props.timeType === 'warning' }]"
              >
                {{ timerComputed }}
              </p>
            </template>
          </WelfareInput>
        </div>
        <WelfareButtonLine
          class="wf_width-113 wf-px-0"
          :text="$t('auth.reset-password.verification-number-resend')"
          type="md"
          active
          md-state="line"
          @click="handleResend"
        />
      </div>
    </div>
    <p class="wf-mt-15 wf-font_13--reg wf-color--g-555 wf-ml--2">
      <span>&#x2022;</span> <span>{{ $t('auth.reset-password.verification-number-be-sent') }}</span>
    </p>
    <div class="wf-mt-30">
      <WelfareButtonLine class="wf_w-full" :text="$t('auth.auth-number-request')" type="lg" lg-state="black-line" active @click="handleSubmit" />
    </div>
  </div>
</template>
