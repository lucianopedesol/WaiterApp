import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://172.16.10.10:5000/'
});
