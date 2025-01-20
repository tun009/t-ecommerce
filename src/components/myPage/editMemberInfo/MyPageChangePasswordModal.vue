<script setup lang="ts">
import { computed } from 'vue'
import * as yup from 'yup'
import { InvalidSubmissionContext, useForm } from 'vee-validate'

import { passwordCharacterRegex, passwordRegex } from '@/commons/regex'
import { BaseModalEmits } from '@/models/widgets/modal'
import WelfareTitleModal from '@/components/uikit/title/WelfareTitleModal.vue'
import WelfareInput from '@/components/uikit/input/WelfareInput.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'
import { useI18n } from 'vue-i18n'

interface WelfareModalContentProps {
  title: string
}

interface WelfareModalContentEmits extends BaseModalEmits {
  (e: 'onDone', { password }: ChangePasswordParams): void
}

interface ChangePasswordDatas {
  password: string
  passwordConfirm: string
}

interface ChangePasswordParams {
  password: string
}

const emit = defineEmits<WelfareModalContentEmits>()
const props = defineProps<WelfareModalContentProps>()
// const dataObj = reactive<ChangePasswordDatas>({
//   password: '',
//   passwordConfirm: ''
// })
const { openModal: showAlertModal, closeModalByPop: closeAlertModal } = useModalNotification()
const { t } = useI18n()

const isDisabled = computed(() => !(dataObj.password && dataObj.passwordConfirm && dataObj.password === dataObj.passwordConfirm))

const validationSchema = {
  password: yup
    .string()
    .matches(passwordCharacterRegex, t('myPage.editMemberInfo.editMemberInfo.changePasswordModal.error1'))
    .matches(passwordRegex, t('myPage.editMemberInfo.editMemberInfo.changePasswordModal.error1'))
}

// 벨리데이션 세팅
const {
  values: dataObj,
  setFieldValue: setDataObj,
  handleSubmit
} = useForm<ChangePasswordDatas>({
  initialValues: {
    password: '',
    passwordConfirm: ''
  },
  validationSchema: yup.object(validationSchema)
})

// Alert 노출
const handleShowAlert = (msg: string, callback?: () => void): void => {
  const action = callback || closeAlertModal

  showAlertModal?.({
    content: msg,
    buttonLabel: t('myPage.editMemberInfo.editMemberInfo.alertDone'),
    onAccept: action,
    onClose: action
  })
}

const handleValidFail = ({ errors }: InvalidSubmissionContext) => {
  const getErrorMsg = Object.values(errors)[0] || ''
  handleShowAlert(getErrorMsg)
}

const handleDone = handleSubmit(async (values) => {
  emit('onDone', { password: values.password })
}, handleValidFail)
</script>

<template>
  <form @submit.prevent="handleDone">
    <div class="wf_modal-width wf_modal-max-height wf-bg--g-fff wf_flex wf_flex-col wf-px-16 wf-pt-10 wf-pb-30 wf-space-y-20 wf-pb-20-important">
      <WelfareTitleModal class="wf-pt-10 wf-pb-15" classTitle=" wf_letter-spacing--0745 " :title="props.title" @click="$emit('onClose')" />

      <WelfareInput
        type="password"
        title="신규 비밀번호 입력"
        :errorText="''"
        :placeholder="$t('myPage.editMemberInfo.checkPassword.placeholderPw')"
        :model-value="dataObj.password"
        @update:model-value="(v) => setDataObj('password', v)"
        passwordIcon
      />

      <WelfareInput
        type="password"
        title="신규 비밀번호 확인"
        :errorText="''"
        :placeholder="$t('myPage.editMemberInfo.checkPassword.placeholderPw')"
        :model-value="dataObj.passwordConfirm"
        @update:model-value="(v) => setDataObj('passwordConfirm', v)"
        passwordIcon
      />

      <p class="wf-font_13--reg wf-color--g-777 wf_white-space--pre-line input-desc" style="line-height: 1.3">
        {{ $t('myPage.editMemberInfo.editMemberInfo.changePasswordModal.desc') }}
      </p>

      <WelfareButtonLine
        :disabled="isDisabled"
        type-action="submit"
        class="wf_w-full"
        type="lg"
        :text="$t('myPage.editMemberInfo.editMemberInfo.changePasswordModal.buttonDone')"
      />
    </div>
  </form>
</template>

<style scoped lang="scss">
// wf_ui-kit-title-17 클래스를 쓰기 위함
.input-desc {
  line-height: 1.3;
}
</style>
