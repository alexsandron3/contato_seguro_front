import axios from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'Production'
    ? null
    : 'http://localhost/contato_seguro_backend/src/app';
const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
