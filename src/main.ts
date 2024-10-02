import './assets/css/satoshi.css'
import './assets/css/style.css'
// import 'jsvectormap/dist/css/jsvectormap.min.css'
import 'flatpickr/dist/flatpickr.min.css'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from 'vue3-apexcharts'
// @ts-ignore
import NProgress from 'nprogress';

import 'nprogress/nprogress.css'; // Import NProgress styles
import App from './App.vue'
import router from './router'


// Set up router hooks for starting and stopping NProgress
router.beforeEach((to, from, next) => {
    NProgress.start(); // Start the progress bar before navigating to a new route
    next();
  });
  
  router.afterEach(() => {
    NProgress.done(); // Finish the progress bar when the navigation is complete
  });

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueApexCharts)

app.use(Toast);
app.mount('#app')
