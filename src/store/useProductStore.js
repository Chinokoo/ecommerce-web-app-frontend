import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useProductStore = create((set) => ({
  loading: false,
  products: [],
  recommendations: [],
  setProducts: (products) => set({ products }),

  createProduct: async (product) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/products/create", product);
      set((prevState) => ({
        products: [...prevState.products, res.data.product],
      }));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ loading: false });
    }
  },

  getProducts: async () => {
    try {
      const res = await axiosInstance.get("/products");
      set({ products: res.data.products });
    } catch (error) {
      toast.error(
        error.response.data.message || "Error while fetching products!"
      );
    } finally {
      set({ loading: false });
    }
  },
  getProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/products/category/" + category);
      set({ products: res.data.products });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ loading: false });
    }
  },
  getRecommendedProducts: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/products/recommendations");
      set({ recommendations: res.data.products });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.delete("/products/" + id);
      set((prevState) => ({
        products: prevState.products.filter((product) => product._id !== id),
      }));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ loading: false });
    }
  },
  toggleProduct: async (id) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.patch("/products/" + id);
      //update the state of the toggled product
      set((prevProducts) => ({
        products: prevProducts.products.map((product) =>
          product._id === id
            ? { ...product, isFeatured: res.data.isFeatured }
            : product
        ),
      }));
      toast.success("toggled successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ loading: false });
    }
  },
}));
