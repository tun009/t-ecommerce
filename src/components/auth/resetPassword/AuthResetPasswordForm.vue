<script setup lang="ts">
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import { WelfareInput } from '@/components/uikit/input'
import { AuthResetPasswordFormType } from '@/models/auth/AuthModel'

interface AuthResetPasswordFormProps {
  formValues: AuthResetPasswordFormType
  formErrors?: Partial<Record<keyof AuthResetPasswordFormType, string | undefined>>
  disableSubmit?: boolean
  type?: 'default' | 'after-90-days'
}

interface AuthResetPasswordFormEmits {
  (e: 'setFieldValue', key: keyof AuthResetPasswordFormType, value: string): void
  (e: 'submit'): void
  (e: 'after90DaysClick'): void
}

withDefaults(defineProps<AuthResetPasswordFormProps>(), { type: 'default' })
defineEmits<AuthResetPasswordFormEmits>()
</script>

<template>
  <div>
    <WelfareInput
      type="password"
      :placeholder="$t('auth.changePassword.enterNewPassword')"
      :maxLength="20"
      passwordIcon
      :errorText="$props.formErrors?.password"
      :show-max-length="false"
      v-model:model-value="$props.formValues.password"
      @update:model-value="(value) => $emit('setFieldValue', 'password', value)"
    />
    <div class="wf-mt-38">
      <WelfareInput
        type="password"
        :placeholder="$t('auth.changePassword.confirmNewPassword')"
        :maxLength="20"
        passwordIcon
        :errorText="$props.formErrors?.repeatPassword"
        :show-max-length="false"
        v-model:model-value="$props.formValues.repeatPassword"
        @update:model-value="(value) => $emit('setFieldValue', 'repeatPassword', value)"
      />
    </div>
    <div class="wf-mt-38 wf-pt-10">
      <p class="wf-color--g-777 wf-font_13--reg">{{ $t('auth.changePassword.note1') }}</p>
      <p class="wf-mt-5 wf-color--g-777 wf-font_13--reg">{{ $t('auth.changePassword.note2') }}</p>
    </div>

    <div class="wf-mt-30">
      <div v-if="$props.type === 'after-90-days'" class="wf-mb-10 wf-mt--6">
        <WelfareButtonLine
          @click="$emit('after90DaysClick')"
          lg-state="black-line"
          class="wf_w-full"
          type="lg"
          :text="$t('auth.reset-password.change-after-90-button')"
        />
      </div>
      <WelfareButtonLine
        @click="$emit('submit')"
        :disabled="$props?.disableSubmit"
        lg-state="grey-line"
        class="wf_w-full"
        type="lg"
        :active="true"
        :text="$t('auth.changePassword.button')"
      />
    </div>
  </div>
</template>
