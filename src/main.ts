import { createApp } from 'vue';
import router from '/@/router';
import App from './App.vue';
import axios from '/@/utils/axios';
import store from '/@/store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'normalize.css';

const app = createApp(App);
app.provide('$axios', axios);

app.use(router);
app.use(ElementPlus);
app.use(store);

app.mount('#app');
