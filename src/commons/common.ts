import dayjs from 'dayjs'
import { DEFAULT_DATE_FORMAT_DOT, HOURS_MINUTES_SECONDS_TIME_FORMAT, MINUTES_SECONDS_TIME_FORMAT, myPageMaxCountNumberItem } from './constants'
import { imageRegex, integerRegex, numberRegex, stringFormatNumber } from './regex'
import { AppConfig } from './configs'
import { WelfareSelectDataModel } from '@/models/uikits/WelfareSelectTypes'

export function formatNumberDot(num: number | string = 0) {
  if (num !== undefined) {
    // const money = Math.round(Number(num))
    return `${num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
  }
  return '0'
}

export function exitFullscreen() {
  if (document.exitFullscreen) document.exitFullscreen()
}

export const elementFullscreen = () => {
  const doc = window.document as any
  const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen
  if (cancelFullScreen) {
    cancelFullScreen.call(doc)
  }
}

export function openFullscreen(elem: any) {
  const requestFullScreen = elem.requestFullscreen || elem.mozRequestFullScreen || elem.webkitRequestFullScreen || elem.msRequestFullscreen
  if (requestFullScreen) {
    requestFullScreen.call(elem)
  }
}

export function getNumber(number: number) {
  if (number.toString().length > 1) return number
  return `00${number}`.slice(-2)
}

export function getOS() {
  const userAgent = window.navigator.userAgent,
    platform = window.navigator.platform
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
  const iosPlatforms = ['iPhone', 'iPad', 'iPod']
  let os = null

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS'
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS'
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows'
  } else if (/Android/.test(userAgent)) {
    os = 'Android'
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux'
  }

  return os
}

export const isAndroid = getOS() === 'Android'
export const isIos = getOS() === 'iOS'
export const isAppleDevice = getOS() === 'iOS' || getOS() === 'Mac OS'

export const formatTime = (date: string | Date, format: string) => {
  return dayjs(date).format(format)
}

export const formatTimeWithDot = (date: string | Date) => {
  return formatTime(date, DEFAULT_DATE_FORMAT_DOT)
}

export const formatSecondsToTime = (seconds: number) => {
  const _minutes = Math.floor(seconds / 60)
  const _seconds = seconds % 60
  const formattedTime = dayjs().minute(_minutes).second(_seconds).format(MINUTES_SECONDS_TIME_FORMAT)
  return formattedTime
}

const getNumberPrefixZero = (number: number) => {
  return `00${number}`.slice(-2)
}

export const formatSecondsToTimeHHMMSS = (seconds: number) => {
  const _hour = Math.floor(seconds / 3600000)
  const _minutes = Math.floor((seconds / 60000) % 60)
  const _seconds = Math.floor((seconds / 1000) % 60)
  return `${getNumberPrefixZero(_hour)}:${getNumberPrefixZero(_minutes)}:${getNumberPrefixZero(_seconds)}`
}

export const convertTimeProduct = (date: string) => {
  const timeParts = date.split(':').reverse()
  const times = [1000, 60000, 3600000]
  const timeNumber = timeParts.reduce((currentCount: number, item, index) => {
    return currentCount + +item * times[index]
  }, 0)

  return timeNumber
}

export function getForwardDate(forwardNumber = 1) {
  const tomorrow = new Date()
  tomorrow.setHours(0, 0, 0, 0) // set to first time
  tomorrow.setDate(tomorrow.getDate() + forwardNumber)
  return tomorrow
}

export const addClassAndroidChrome = () => {
  const ua = navigator.userAgent ?? ''
  if (RegExp(/chrome|chromium|crios/i).exec(ua) && RegExp(/android/i).exec(ua)) {
    document.body.classList.add('android-chrome')
  }
}

export const getNumberMoney = (number: any) => {
  if (typeof number !== 'number') return 0

  if (Number.isNaN(number)) return 0
  return number
}

export const isSupportedContactApi = 'contacts' in navigator && 'ContactsManager' in window

export const openContactDevice = async (multiple = false) => {
  try {
    if (isSupportedContactApi) {
      //@ts-ignore
      const contact = await navigator.contacts.select(['name', 'tel', 'icon'], { multiple })
      return contact
    }
  } catch (ex) {
    return ex
  }
}

export const hideKeyboard = (event: KeyboardEvent) => {
  try {
    const inputField = event?.target as HTMLInputElement
    inputField.blur()
    // eslint-disable-next-line no-empty
  } catch {}
}

export const listSplitContact = (value: string) => {
  return value.split('-')
}

export const convertValueInputMarkToString = (value: string) => {
  return listSplitContact(value).join('')
}

export const isImageLink = (url: string) => {
  return RegExp(imageRegex).exec(url) != null
}
export const splitPhoneNumber = (phoneNumber: string) => {
  if (phoneNumber === null || phoneNumber === undefined) return ''
  const cleanedNumber = phoneNumber.replace(numberRegex, '')
  return `${cleanedNumber.slice(0, 3)}-${cleanedNumber.slice(3, 7)}-${cleanedNumber.slice(7)}`
}

export const formatTimeOfVideo = (time: number) => {
  if (!time) time = 0
  const h = Math.floor(time / 3600)
  const m = Math.floor((time % 3600) / 60)
  const s = Math.floor((time % 3600) % 60)
  if (h > 0) {
    return dayjs().hour(h).minute(m).second(s).format(HOURS_MINUTES_SECONDS_TIME_FORMAT)
  }
  return dayjs().minute(m).second(s).format(MINUTES_SECONDS_TIME_FORMAT)
}

export const getImageProduct = (path: string, fileName: string) => {
  return AppConfig.hostImage + '/' + path + '/' + fileName
}

export const getImageOrderFullPath = (fullPath: string) => {
  return AppConfig.hostImageOrderService + '/' + fullPath
}

export const getVideoOrderFullPathWithPoster = (fullPath: string) => {
  return AppConfig.hostImageOrderService + '/' + fullPath + '#t=0.1'
}

export const getSearchParamUrl = (data: { [key: string]: any }) => {
  const params = new URLSearchParams(data)
  return params.toString()
}

export const formatKoreanPhoneNumber = (phoneNumber?: string) => {
  if (!phoneNumber) return ''

  const cleanedNumber = phoneNumber.replace(stringFormatNumber, '')
  return `0${cleanedNumber.slice(1, 3)}-${cleanedNumber.slice(3, 7)}-${cleanedNumber.slice(7)}`
}

export const openWindowWithNewTab = (path: string) => {
  window.open(path, '_blank')
}

export const renderLabelEnum = (options: WelfareSelectDataModel[], value: string) => {
  if (!options?.length) return value
  return options?.find((option) => option.value === value)?.label ?? ''
}

export const lengthInUtf8Bytes = (str: string | number) => {
  // const content = String(str)
  // let byteLen = 0
  // for (let i = 0; i < content.length; i++) {
  //   const c = content.charCodeAt(i)
  //   byteLen += c < 1 << 7 ? 1 : 2
  // }
  // return byteLen
  return str ? `${str}`.length : 0
}

export const formatTextLength = (text: number | string | undefined, maxLength: number | string = 200, hiddenLablelTextBytes?: boolean) => {
  return `${lengthInUtf8Bytes(text ?? '')}/${maxLength} ${hiddenLablelTextBytes ? '' : 'bytes'}`
}

export const getStringWithLimitBytes = (str: string, maxBytes: number): string => {
  let byteLen = 0
  let result = ''

  for (const element of str) {
    // const c = str.charCodeAt(i)
    // byteLen += c < 1 << 7 ? 1 : 2
    byteLen += 1
    if (byteLen > maxBytes) {
      // If adding the current character exceeds the desired byte length,
      // break out of the loop to avoid exceeding the specified limit.
      break
    }

    result += element
  }

  return result
}
export const isInteger = (value: any) => {
  return integerRegex.test(value)
}

export const blurElement = () => {
  ;(document.activeElement as HTMLButtonElement)?.blur()
}

export const getBaseUri = () => {
  const { protocol, hostname, port } = window.location
  return `${protocol}//${hostname}${port ? `:${port}` : ''}`
}

export const buildUriFromBaseUri = (path: string) => {
  const baseUrl = getBaseUri()
  return `${baseUrl}${path}`
}

export const isValidDate = (date: string | Date | undefined) => {
  if (!date) return false
  return dayjs(date).isValid()
}

export const convertTextMaxCount = (count: number | string) => {
  if (count && Number(count) > myPageMaxCountNumberItem) {
    return `${myPageMaxCountNumberItem} +`
  }
  return count
}

export const convertLinkYoutube = (link: string) => {
  return link.split("&")[0].replace("watch?v=", "embed/") + "?autoplay=1";
};
