import { createApp } from 'vue';
import i18n from '@/locales'; // 引入 i18n 配置
import router from '@/router';
import App from './App.vue';
import axios from '@/utils/axios';
import store from '@/store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'normalize.css';
import 'virtual:uno.css';
import '@/styles/main.scss';

const app = createApp(App);
app.provide('$axios', axios);

app.use(router);
app.use(ElementPlus);
app.use(store);
app.use(i18n);

app.mount('#app');
