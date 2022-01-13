import axios from 'axios';

const instance = axios.create({
  // Api base url
  baseURL: process.env.NODE_ENV === 'development' ? '/data' : process.env.VUE_APP_DEMO_API_ROOT,
  timeout: 15000,
  withCredentials: true,
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    // config.headers.common['Authorization'] =
    //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTQ1MwMDEyMDE3MDUwMjEwMDAyOCIsIm5hbWUiOiLnjovogIDlvrciLCJqdGkiOiI2NTJmMDFjMS0xZjJiLTQ4OWEtYWViZi04ZWIwOTdkMjJiODMiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE2NDA3NTUxNDUsImV4cCI6MTY0MDg0MTU0NSwiaWF0IjoxNjQwNzU1MTQ1fQ.1JQmT6HdzlGdFrHSumLRA6iBtJBxL9KQjRtMCjIrb9o';
    // config.headers.common['Authorization'] = `Bearer ${store.state.authToken}`;
    return config;
  },
  // Handle error
  (err) => {
    return Promise.reject(err);
  }
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
    return Promise.reject(err);
  }
);

export default instance;
