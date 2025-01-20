import { createI18n } from 'vue-i18n'
import { enLocales } from './en'
import { koLocales } from './ko'

const messages = {
  en: enLocales,
  ko: koLocales
}

export const i18n = createI18n({
  locale: localStorage.getItem('lang') ?? 'ko',
  legacy: false,
  messages,
  fallbackLocale: 'ko',
  warnHtmlMessage: false
})
