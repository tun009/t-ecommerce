This document describe the common component and directive that using in project.

The common config will be stay in file **main.ts**.

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import primeVue from 'primevue/config'
import '@/assets/styles/styles.scss'
// import '@/js/script.js'
import App from './App.vue'
import router from './router'
import { i18n } from '@/locales'
import { addClassAndroidChrome } from '@/commons'
import { directiveClickOutside } from './commons/directive'

addClassAndroidChrome()
const pinia = createPinia()

const app = createApp(App).use(router).use(pinia).use(primeVue).use(i18n).directive('click-outside', directiveClickOutside)

app.mount('#app')
```

Below the explain detail each component using

**Table of Contents**

[TOC]

### createApp

Function create new app instance from Vue framework.

```js
import { createApp } from 'vue'
```

### createPinia

Function create new piana instance. Piana is state management allow share object through app.

```js
import { createPinia } from 'pinia'
```

### PrimeVue styles

Import style of PrimeVue UIkit library that we are using to base UIkit

```js
import primeVue from 'primevue/config'
```

### Project styles

Import global styles in this project

```js
import '@/assets/styles/styles.scss'
```

### Router

Import the config router root in this project

```js
import router from './router'
```

### Localization text(i18n)

Import the config localization in this project. Porject support define two language, include: Korean(default) and English.

```js
import router from './router'
```

### Fix bug text font scale in Android device

Function to fix font boosting scale in Android.

```js
import { addClassAndroidChrome } from '@/commons'
```

### Directive to handle click outside

An directive to handle click outside of a element

```js
import { addClassAndroidChrome } from '@/commons'
```

