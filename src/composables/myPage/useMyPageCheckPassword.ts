import { ref, reactive, computed } from 'vue'
import { storeToRefs } from 'pinia'
import * as yup from 'yup'
import { InvalidSubmissionContext, useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'

// import { passwordCharacterRegex, passwordRegex } from '@/commons/regex'

import { InputObjModel, CheckPasswordResponseModel, UseMyPageCheckPasswordModel } from '@/models/views/myPage/MyPageEditMemberInfo'

import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'
import { useLoading } from '@/composables/common/useLoading'
import { useAccountStore } from '@/stores/account'
import { myPageEditMemberInfoApi } from '@/services/api/myPage/MyPageEditMemberInfo'

// TODO: validation

export const useMyPageCheckPassword = (): UseMyPageCheckPasswordModel => {
  const accountStore = useAccountStore()
  const { account } = storeToRefs(accountStore)
  const { t } = useI18n()
  const { setLoading } = useLoading()
  const { openModal: showAlertModal, closeModalByPop: closeAlertModal } = useModalNotification()

  // 벨리데이션 스키마
  const validationSchema = {
    // password: yup
    //   .string()
    //   .matches(passwordCharacterRegex, '비밀번호 형식이 유효하지 않습니다.')
    //   .matches(passwordRegex, '비밀번호 형식이 유효하지 않습니다.')
  }

  // 벨리데이션 세팅
  const {
    values: inputObj,
    setFieldValue: setInputObj,
    handleSubmit
  } = useForm<InputObjModel>({
    initialValues: {
      id: account?.value?.memberId || '',
      password: ''
    },
    validationSchema: yup.object(validationSchema)
  })

  const checkPasswordObj = reactive<CheckPasswordResponseModel>({
    success: false,
    csrfToken: null
  })

  const failMsg = ref<string>('')

  const isCheckPassword = computed<boolean>(() => checkPasswordObj.success)

  // Alert 노출
  const handleShowAlert = (msg: string, callback?: () => void): void => {
    const action = callback || closeAlertModal

    showAlertModal?.({
      content: msg,
      buttonLabel: t('myPage.editMemberInfo.checkPassword.alertDone'),
      onAccept: action,
      onClose: action
    })
  }

  const handleValidFail = ({ errors }: InvalidSubmissionContext) => {
    const getErrorMsg = Object.values(errors)[0] || ''
    handleShowAlert(getErrorMsg)
  }

  const checkPassword = handleSubmit(async (values, { resetForm }) => {
    try {
      setLoading?.(true)

      const { data } = await myPageEditMemberInfoApi.postCheckPassword({ password: values.password })
      const { success, csrfToken } = data

      failMsg.value = success ? '' : t('myPage.editMemberInfo.checkPassword.error1')
      checkPasswordObj.success = success
      checkPasswordObj.csrfToken = csrfToken || null

      if (success) resetForm()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading?.(false)
    }
  }, handleValidFail)

  return {
    failMsg,
    inputObj, // input data
    setInputObj, // set input data
    isCheckPassword, // 패스워드 검증 여부
    checkPasswordObj, // response
    checkPassword // do check
  }
}
