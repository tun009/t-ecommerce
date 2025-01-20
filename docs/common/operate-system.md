This document describe the common function related to operate system(OS)


**Table of Contents**

[TOC]

### Get operate system

This function to get the OS name.You can view detail in file ***common.ts***

```js
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
```

### Check OS is Android

This function to know the OS is Android or not.You can view detail in file ***common.ts***

```js
export const isAndroid = getOS() === 'Android'
```

### Check OS is iOS

This function to know the OS is iOS or not.You can view detail in file ***common.ts***

```js
export const isIos = getOS() === 'iOS'
```

### Check OS run on Apple device

This function to know the OS is iOS or MacOS or not.You can view detail in file ***common.ts***

```js
export const isAppleDevice = getOS() === 'iOS' || getOS() === 'Mac OS'

```