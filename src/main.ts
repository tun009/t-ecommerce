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
import piniaPersist from 'pinia-plugin-persist'

addClassAndroidChrome()
const pinia = createPinia()
const app = createApp(App).use(router).use(pinia).use(primeVue).use(i18n).directive('click-outside', directiveClickOutside)
pinia.use(piniaPersist)

app.mount('#app')
