import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import Header from './components/header.vue'

createApp(App).use(store).use(router).mount('#app')
createApp(Header).mount('#header')
