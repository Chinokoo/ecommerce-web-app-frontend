import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const UseAnalyticsStore = create((set) => ({
  users: 0,
  products: 0,
  totalSales: 0,
  totalRevenue: 0,
  loading: false,
  dailySalesData: {},

  getAnalyticsData: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/analytics");
      set({
        users: res.data.analyticsData.users,
        products: res.data.analyticsData.products,
        totalSales: res.data.analyticsData.totalSales,
        totalRevenue: res.data.analyticsData.totalRevenue,
        dailySalesData: res.data.dailySalesData,
      });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ loading: false });
    }
  },
}));
