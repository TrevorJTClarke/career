import { createApp } from 'vue'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)

import App from '@/App.vue'
import router from '@/router'

import 'sticksy'
import './index.css'

// Create our application
const app = createApp(App)

// Use plugins
app.use(router)
app.config.productionTip = false

app.mount('#app')
