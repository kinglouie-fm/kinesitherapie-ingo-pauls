import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/style.css'
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap/dist/js/bootstrap.js'

const app = createApp(App).use(router)

app.mount('#app')