This document describe the common function related to datetime


**Table of Contents**

[TOC]

### Format datetime

Format string datetime or Date object to new string date with specified valid format .You can view detail in file ***common.ts***

```js
export const formatTime = (date: string | Date, format: string) => {
  return dayjs(date).format(format)
}
```

### Format datetime with format YYYY.MM.DD

Format string datetime or Date object to new string date with YYYY.MM.DD format .You can view detail in file ***common.ts***

```js
export const formatTimeWithDot = (date: string | Date) => {
  return formatTime(date, DEFAULT_DATE_FORMAT_DOT)
}
```

### Format seconds time to mm:ss format

Format seconds time to mm:ss format.You can view detail in file ***common.ts***

```js
export const formatSecondsToTime = (seconds: number) => {
  const _minutes = Math.floor(seconds / 60)
  const _seconds = seconds % 60
  const formattedTime = dayjs().minute(_minutes).second(_seconds).format(MINUTES_SECONDS_TIME_FORMAT)
  return formattedTime
}
```

### Format video time

Format video time.You can view detail in file ***common.ts***

```js
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
```

