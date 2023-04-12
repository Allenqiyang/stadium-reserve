import { createApp } from 'vue'

import App from './App.vue'
import pinia from './store'
import router from './router'
import useIcons from './plugin'
import "./assets/style/reset.less"

import { setupStore } from './store'

const app = createApp(App)

useIcons(app)
app.use(pinia)
app.use(router)
setupStore()
app.mount('#app')
