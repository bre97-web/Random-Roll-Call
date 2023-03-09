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

// Import Google's Material Design 3 Web Components
// Import Google's formatted js
// IMPORTANT: in html
/**
 * Please run:
 * npx rollup -p @rollup/plugin-node-resolve ./src/material-design.js > ./src/bundle.js
 */
// import './bundle'

import Router from './router/index'

const app = createApp(App)
app.use(Router).mount('#app')
