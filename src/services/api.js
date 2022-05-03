import axios from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'Production' ? null : 'http://localhost:3080/app';
const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
