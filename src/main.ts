import './assets/css/satoshi.css';
import './assets/css/style.css';
import 'flatpickr/dist/flatpickr.min.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueApexCharts from 'vue3-apexcharts';
// @ts-ignore
import NProgress from 'nprogress';
import Antd from 'ant-design-vue';
import 'nprogress/nprogress.css'; // Import NProgress styles
import App from './App.vue';
import router from './router';
import 'ant-design-vue/dist/reset.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import '@vuepic/vue-datepicker/dist/main.css';


// Set up router hooks for starting and stopping NProgress
router.beforeEach((to, from, next) => {
  NProgress.start(); // Start the progress bar before navigating to a new route
  next();
});

router.afterEach(() => {
  NProgress.done(); // Finish the progress bar when the navigation is complete
});

const app = createApp(App);

app.use(Antd);
app.use(createPinia());
app.use(router);
app.use(VueApexCharts);
app.component('VueDatePicker', VueDatePicker);
app.use(Toast);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});



app.mount('#app');
