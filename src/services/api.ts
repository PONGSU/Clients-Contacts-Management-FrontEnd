import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://clients-contacts-manager.onrender.com/api',
  timeout: 32000,
});
