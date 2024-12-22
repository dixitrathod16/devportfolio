import axios from 'axios';

const baseUrl = process.env.API_BASEURL;

const apiClient = axios.create({
  baseURL: baseUrl,
});

export default apiClient;
