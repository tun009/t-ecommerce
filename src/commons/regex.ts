export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const emailLoginRegex = /^\s*\S+@[A-Za-z]+(.[A-Za-z]+)+\s*$/
export const passwordCharacterRegex = /^[A-Za-z\d!@$%^&*]*$/
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@$%^&*])[A-Za-z\d!@$%^&*]{8,20}$/

export const phoneWithCharacterRegex = /^\d{0,4}(-\d{4})+$/
export const invalidPhoneRegex = /[^\d-]/
export const bnameRegex = /[동|로|가]$/
export const stringFormatNumber = /\D/g
export const numberRegex = /\D/g
export const charRegex = /\d/
export const spaceRegex = /\s/
export const integerRegex = /^\d+$/

export const imageRegex = /\.(jpeg|jpg|gif|png)$/

/** regex validate number [0:9] */
export const intergetNumberRegex = /^\d*$/

/** regex validate {}/?;:|)*~`!^<>@#$%&\=('“ */
export const specialCharactersRegex = /[\{\}\[\]\/?;:|)*~`!^\-<>@#$%&\\=('“']/
