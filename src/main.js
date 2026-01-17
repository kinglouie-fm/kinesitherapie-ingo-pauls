import { createApp } from "vue";
import { createHead } from "@vueuse/head";
import App from './App.vue'
import router from './router'
// import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/style.css'
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import 'bootstrap/dist/js/bootstrap.js'

const app = createApp(App);
app.use(router);
app.use(createHead());
app.mount("#app");