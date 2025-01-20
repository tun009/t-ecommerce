import { bnameRegex, emailRegex, phoneWithCharacterRegex } from '@/commons/regex'
import { boolean, number, string } from 'yup'

export const isEmail = string().email()
export const isString = string()
export const isEmpty = string().required()
export const isNumber = number()
export const isBoolean = boolean()

export const isValidPattern = (value: any, pattern: RegExp) => {
  return pattern.test(value)
}

export const isValidEmail = (value: any) => {
  return emailRegex.test(value)
}

export const isValidPhoneNumberWithCharacter = (value: any) => {
  return phoneWithCharacterRegex.test(value)
}