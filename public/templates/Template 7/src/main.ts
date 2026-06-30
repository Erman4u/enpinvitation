import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

const app = createApp(App)

app.mount('#app')

AOS.init({
  duration: 800,
  once: true, // Only animate once to prevent heavy re-rendering on scroll up
  offset: 30, // Trigger sooner
})
