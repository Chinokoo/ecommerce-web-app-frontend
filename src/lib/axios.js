import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: [
    "https://ecommerce-web-app-y0xh.onrender.com/api",
    "http://localhost:3001/api",
  ],
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//development
//
