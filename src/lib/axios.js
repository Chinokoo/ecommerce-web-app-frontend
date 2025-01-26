import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://ecommerce-web-app-y0xh.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//development
//http://localhost:3001/api
