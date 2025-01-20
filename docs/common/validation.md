This document describe the common function related to validation input.


**Table of Contents**

[TOC]

### Validate input with a specified pattern

Validate input with a specified pattern. You can view detail in file ***validationRules.ts***

```js
export const isValidPattern = (value: any, pattern: RegExp) => {
  return pattern.test(value)
}

```

### Validate email input

Validate email input. You can view detail in file ***validationRules.ts***

```js
export const isValidEmail = (value: any) => {
  return emailRegex.test(value)
}

```

### Validate phone number input

Validate phone number input. You can view detail in file ***validationRules.ts***

```js
export const isValidPhoneNumberWithCharacter = (value: any) => {
  return phoneWithCharacterRegex.test(value)
}

```