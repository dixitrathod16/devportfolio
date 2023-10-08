import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:4200' : 'https://api.dixitjain.dev';

const apiClient = axios.create({
  baseURL: baseUrl,
});

export default apiClient;
