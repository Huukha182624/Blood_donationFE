import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5249/api/', // Cổng 5249 và tiền tố /api/
});

// Thêm một interceptor để tự động đính kèm token vào header
// nếu token tồn tại trong localStorage.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Giả sử bạn lưu token với key 'authToken'
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;