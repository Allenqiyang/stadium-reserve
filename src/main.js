import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import useIcons from './plugin'
import "./assets/style/reset.less"

const pinia = createPinia()
const app = createApp(App)

useIcons(app)
app.use(pinia)
app.use(router)
app.mount('#app')
