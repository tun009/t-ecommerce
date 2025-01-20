This document describe the common function related to localization.

**Table of Contents**

[TOC]

### Setup localization

The website support two languages: Korean and English.
You can view detail in folder **/locales**

### Build redirect url

The compose to build redirect url based on current localization on query params.
You can view detail in file **useBuildLink.ts\_**

```js
export const useBuildLink = () => {
  const router = useRoute()

  /**
   * The function build link base on current localization on query params
   * @param link : the link want to redirect
   * @returns : the new link include localization on query params if need attach
   */
  const processLink = (link: string) => {
    const langQuery = 'lang='
    const lang = router?.query?.lang
    if (!link.includes(`?${langQuery}`) && !link.includes(`&${langQuery}`) && lang) {
      return `${link}${link.includes('?') ? '&' : '?'}${langQuery}${lang}`
    } else {
      return link
    }
  }
  return { processLink }
}


```

### Effect change localization

The compose to get localization config in query params.Default language is Korean.
You can view detail in file **useLocalization.ts\_**

```js
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

```
