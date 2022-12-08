import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store';
import './assets/css/tooltip.css';
import './assets/css/third-party.css';
import './assets/css/style.css';
import './registerServiceWorker';
const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');