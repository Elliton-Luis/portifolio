import { createApp } from 'vue'
import './style.css'
import './assets/main.css'
import App from './App.vue'
import router from '../src/routes/index'

const app = createApp(App)

app.use(router)

app.mount('#app')