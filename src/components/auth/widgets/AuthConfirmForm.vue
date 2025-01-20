<script setup lang="ts">
import { isValidPhoneNumberWithCharacter, invalidPhoneRegex } from '@/commons'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareInput from '@/components/uikit/input/WelfareInput.vue'
import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'
import { AuthConfirmFormEmits, AuthConfirmFormProps } from '@/models/auth/AuthModel'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const props = defineProps<AuthConfirmFormProps>()
const emit = defineEmits<AuthConfirmFormEmits>()

const { t } = useI18n()
const { openModal: openNotification } = useModalNotification()
const phoneRef = ref()

const handleSubmit = () => {
  if (!isValidPhoneNumberWithCharacter(props.formValues.phone)) {
    openNotification({
      content: t('auth.reset-password.invalid-phone')
    })
    return
  }
  emit('submit')
}

const handleFormatPhone = (event: any) => {
  let value = event.target.value
  if(value?.length > 0 && invalidPhoneRegex.test(value)) {
    value = value.split(invalidPhoneRegex).join('')
    phoneRef.value.setText(value)
  }
}
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
        ref="phoneRef"
        :placeholder="$t('auth.findId.form.placeholderPhone')"
        :model-value="$props.formValues.phone"
        @update:model-value="(value) => $emit('setFieldValue', 'phone', value)"
        @keyup="handleFormatPhone"
      />
    </div>
    <div class="wf-mt-30">
      <WelfareButtonLine @click="handleSubmit" class="wf_w-full" type="lg" lg-state="grey-line" active :text="$t('auth.findId.form.button')" />
    </div>
  </div>
</template>
