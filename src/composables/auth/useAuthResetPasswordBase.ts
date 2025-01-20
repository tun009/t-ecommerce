import { passwordCharacterRegex, passwordRegex } from '@/commons/regex'
import { AuthResetPasswordFormType } from '@/models/auth/AuthModel'
import { useForm } from 'vee-validate'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import * as yup from 'yup'

export const useAuthResetPasswordBase = () => {
  const { t } = useI18n()
  const validationSchema = yup.object({
    password: yup.string()
      .required(t('auth.changePassword.errorNullPass'))
      .matches(passwordCharacterRegex, t('auth.reset-password.invalid-password-character'))
      .matches(passwordRegex, t('auth.reset-password.invalid-password')),
    repeatPassword: yup.string()
      .required(t('auth.changePassword.errorNullPass'))
      .matches(passwordCharacterRegex, t('auth.reset-password.invalid-password-character'))
      .matches(passwordRegex, t('auth.reset-password.invalid-password'))
      .oneOf([yup.ref('password')], t('auth.reset-password.invalid-password-repeat'))
  })

  const { values, errors, setFieldValue, handleSubmit, defineField }
    = useForm<AuthResetPasswordFormType>({ validationSchema })
  defineField('password')
  defineField('repeatPassword')

  const resetPasswordConfirmBtnStatusComputed = computed(() => {
    return values.password?.length > 0 && values.repeatPassword?.length > 0 && Object.keys(errors.value).length === 0
  })

  return {
    values, errors, setFieldValue, handleSubmit, resetPasswordConfirmBtnStatusComputed
  }
}