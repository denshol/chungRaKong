// src/api/axios.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api'; // 개발용 URL

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// 요청 인터셉터
api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default api;
