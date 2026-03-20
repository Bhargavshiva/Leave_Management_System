import axios from "axios";

const API = axios.create({
  //  baseURL: "http://localhost:5000/api"
  baseURL:import.meta.env.VITE_API_BASE_URL,
   withCredentials: true,
  // baseURL: "https://leave-management-system-acqu.onrender.com/api"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = token;
  return req;
});

export default API;