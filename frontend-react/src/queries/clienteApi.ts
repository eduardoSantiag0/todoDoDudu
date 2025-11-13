import axios from 'axios'

// const urlBaseApi = 'http://localhost:8080/api/v1'
const urlBaseApi = import.meta.env.VITE_API_URL;

export const clienteApi = axios.create({
  baseURL: urlBaseApi + '/api/v1',
})
