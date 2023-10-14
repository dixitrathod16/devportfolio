import axios from 'axios';

const baseUrl = 'https://api.dixitjain.dev';

const apiClient = axios.create({
  baseURL: baseUrl,
});

export default apiClient;
