import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

export const useLocalization = () => {
  const router = useRoute()
  const i18n = useI18n()

  watch(
    () => router.fullPath,
    () => {
      const acceptLanguages = ['en', 'ko']
      if (router.query?.lang && acceptLanguages.find((i) => i == router.query?.lang)) {
        changeLocalization(router.query?.lang as string)
      } else {
        changeToKorea()
      }
    }
  )

  const changeLocalization = (locale: string) => {
    i18n.locale.value = locale
  }

  const changeToEnglish = () => {
    changeLocalization('en')
  }

  const changeToKorea = () => {
    const defaulLanguage = 'ko'
    changeLocalization(defaulLanguage)
  }
  return { changeLocalization, changeToEnglish, changeToKorea }
}
