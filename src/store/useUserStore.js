import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: false,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match!");
    }
    try {
      const res = await axiosInstance.post("/auth/signup", {
        name,
        email,
        password,
      });
      set({ user: res.data.user, loading: false });
      toast.success(res.data.message);
    } catch (error) {
      set({ loading: false, user: null });
      toast.error(
        error?.response?.data?.message || "An error occurred, try again!"
      );
    }
  },
  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/auth/signin", { email, password });
      set({ user: res.data.user, loading: false });
      toast.success(res.data.message);
    } catch (error) {
      set({ loading: false, user: null });
      toast.error(error.response.data.message);
    }
  },
  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/signout");
      set({ user: null });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/profile");
      set({ user: res.data, checkingAuth: false });
    } catch (error) {
      set({ checkingAuth: false, user: null });
      toast.error(error?.response?.data?.message);
    }
  },
  // refreshToken: async () => {
  //   // Prevent multiple simultaneous refresh attempts
  //   if (get().checkingAuth) return;

  //   set({ checkingAuth: true });
  //   try {
  //     const response = await axiosInstance.post("/auth/refresh-token");
  //     set({ checkingAuth: false });
  //     return response.data;
  //   } catch (error) {
  //     set({ user: null, checkingAuth: false });
  //     throw error;
  //   }
  // },
}));

// Axios interceptor for token refresh
// let refreshPromise = null;

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // If a refresh is already in progress, wait for it to complete
//         if (refreshPromise) {
//           await refreshPromise;
//           return axiosInstance(originalRequest);
//         }

//         // Start a new refresh process
//         refreshPromise = useUserStore.getState().refreshToken();
//         await refreshPromise;
//         refreshPromise = null;

//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         // If refresh fails, redirect to login or handle as needed
//         useUserStore.getState().logout();
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );
