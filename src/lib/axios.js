import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD
    ? "https://ecommerce-web-app-y0xh.onrender.com/api"
    : "http://localhost:3001/api",
  withCredentials: true,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});
//development
//"https://ecommerce-web-app-y0xh.onrender.com/api"
