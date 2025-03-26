import axios from "axios";
import { baseUrl } from "./apiConfig.js";

const apiInstance = axios.create({
  baseURL: baseUrl,
});

const privateApiInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export { apiInstance, privateApiInstance };
