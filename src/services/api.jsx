import axios from 'axios';

export const BASE_URL = '/api';

const service = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default service;
