import axios from 'axios';
import { ElMessage } from 'element-plus';

const instance = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? '/api' : import.meta.env.VITE_API_DOMAIN,
  timeout: 5000,
  withCredentials: true,
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    // 更改header
    // config.headers.common['Authorization'] = ``;
    return config;
  },
  // Handle error
  (err) => {
    return Promise.reject(err);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  // Handle error
  (err) => {
    // if (err.response.status === 401) {
    //   router.replace({ name: 'Login' });
    // }
    if (err.code === 'ECONNABORTED') {
      ElMessage({
        type: 'error',
        message: 'API請求超時,請確認是否有"npm run json-server"啟動API服務。',
      });
    }
    return Promise.reject(err);
  },
);

export default instance;
