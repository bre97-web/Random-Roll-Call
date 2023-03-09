import { createApp } from 'vue'
import App from './App.vue'

/**
 * Tailwindcss
 */
import './assets/index.css'

/**
 * Google's Material Design Icons
 */
import 'material-icons/iconfont/material-icons.css'

import Router from './router/index'

const app = createApp(App)
app.use(Router).mount('#app')
