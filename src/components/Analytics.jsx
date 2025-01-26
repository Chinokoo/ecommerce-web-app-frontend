import { useEffect } from "react";
import { UseAnalyticsStore } from "../store/useAnalyticsStore";
import {
  Loader2,
  Users2,
  Package,
  ShoppingCartIcon,
  DollarSign,
} from "lucide-react";
import AnalyticsCard from "./AnalyticsCard";
import { motion } from "framer-motion";
import {
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

const Analytics = () => {
  const {
    users,
    products,
    totalSales,
    totalRevenue,
    loading,
    dailySalesData,
    getAnalyticsData,
  } = UseAnalyticsStore();

  useEffect(() => {
    getAnalyticsData();
  }, [getAnalyticsData]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <Loader2 className="h-32 w-32 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticsCard
          title="Total Users"
          value={users}
          icon={Users2}
          color="from-stone-500"
        />
        <AnalyticsCard
          title="Total Products"
          value={products}
          icon={Package}
          color="from-stone-500"
        />
        <AnalyticsCard
          title="Total Sales"
          value={totalSales}
          icon={ShoppingCartIcon}
          color="from-stone-100"
        />
        <AnalyticsCard
          title="Total Revenue"
          value={totalRevenue}
          icon={DollarSign}
          color="from-stone-100"
        />
      </div>
      <motion.div
        className="bg-stone-800 rounded-lg p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <ResponsiveContainer width={"100%"} height={400}>
          <LineChart data={dailySalesData}>
            <CartesianGrid strokeDasharray={"3 3"} />
            <XAxis dataKey="name" stroke="#D1D5DB" />
            <YAxis yAxisId={"left"} stroke="#D1D5DB" />
            <YAxis yAxisId={"right"} orientation="right" stroke="#D1D5DB" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="sales"
              stroke="#10B981"
              activeDot={{ r: 8 }}
              name="sales"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              activeDot={{ r: 8 }}
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default Analytics;
