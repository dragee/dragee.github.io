import { createApp } from 'vue'
import App from './App.vue'
import { vHighlight } from './highlight.js'

import './assets/main.css'

createApp(App)
  .directive('highlight', vHighlight)
  .mount('#app')
