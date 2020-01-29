import axios from 'axios';
const BASE_URL = 'http://localhost:3005/api/v1';
const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(config => config);

instance.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);

export default instance;
