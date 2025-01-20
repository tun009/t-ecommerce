This document describe the common function related to storage.

```js

export const WELFARE_SAVE_ID = 'SAVE_ID'
export const ACCESS_TOKEN = 'ACCESS_TOKEN'
export const REFRESH_TOKEN = 'REFRESH_TOKEN'
export const PROFILE_WELFARE_FO = 'PROFILE_WELFARE_FO'

export const storage = {
  get(key: string, type = 'local') {
    const storage = this.getStorage(type)
    return this.getItem(key, storage)
  },

  set(key: string, value: string, type = 'local') {
    const storage = this.getStorage(type)
    storage?.setItem(key, JSON.stringify(value))
  },

  remove(key: string, type = 'local') {
    const storage = this.getStorage(type)
    storage?.removeItem(key)
  },

  getItem(key: string, storage: any) {
    if (!key || !storage) return null
    const value = storage.getItem(key)
    if (!value) {
      return null
    }
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  },

  getStorage(type = 'local') {
    switch (type) {
      case 'session':
        return sessionStorage
      case 'local':
        return localStorage
      default:
        return null
    }
  }
}

```
You can using  ***useStorage*** if want to create new reactive state with specified key in storage.

**Table of Contents**

[TOC]

### Get storage instance by type

Validate input with a specified pattern. You can view detail in file ***storage.ts***

```js
  getStorage(type = 'local') {
    switch (type) {
      case 'session':
        return sessionStorage
      case 'local':
        return localStorage
      default:
        return null
    }
  }

```

### Get value in storage by key

You can view detail in file ***storage.ts***

```js
  getItem(key: string, storage: any) {
    if (!key || !storage) return null
    const value = storage.getItem(key)
    if (!value) {
      return null
    }
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  }

```

### Remove item in storage by key

You can view detail in file ***storage.ts***

```js
remove(key: string, type = 'local') {
    const storage = this.getStorage(type)
    storage?.removeItem(key)
  }

```

### Get item in storage by key

You can view detail in file ***storage.ts***

```js
  get(key: string, type = 'local') {
    const storage = this.getStorage(type)
    return this.getItem(key, storage)
  }

```

### Set item in storage by key

You can view detail in file ***storage.ts***

```js
  set(key: string, value: string, type = 'local') {
    const storage = this.getStorage(type)
    storage?.setItem(key, JSON.stringify(value))
  }

```