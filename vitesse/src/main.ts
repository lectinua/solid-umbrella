import { createApp } from 'vue'
import App from './App.vue'
import pinia from '~/modules/pinia'
import i18n from '~/modules/i18n'
import router from '~/modules/router'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import 'element-plus/theme-chalk/src/message.scss'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(i18n)
app.mount('#app')
