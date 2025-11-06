import axios from "axios";

const urlBaseApi = "http://localhost:8080/api/v1";

export const clienteApi = axios.create({
  baseURL: urlBaseApi,
});
