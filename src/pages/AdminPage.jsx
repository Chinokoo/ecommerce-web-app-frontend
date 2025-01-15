import { motion } from "framer-motion";
import { BarChart4, PlusSquare, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import CreateProduct from "./../components/CreateProduct";
import Products from "./../components/Products";
import Analytics from "./../components/Analytics";
import { useProductStore } from "../store/useProductStore";

const tabs = [
  { id: "create", label: "Create Product", icon: PlusSquare },
  { id: "products", label: "Products", icon: ShoppingBasket },
  { id: "analytics", label: "Analytics", icon: BarChart4 },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");

  const { getProducts, products } = useProductStore();

  useEffect(() => {
    getProducts();
    products;
  }, [getProducts, products]);

  return (
    <div className="min-h-screen flex justify-center relative overflow-hidden">
      <div className="w-full md:w-3/5 min-h-screen rounded-md   text-white">
        <div className="relative z-10  container mx-auto px-4 py-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-4xl font-bold mb-8 text-stone-300"
          >
            Admin Dashboard
          </motion.h1>
          <div className="flex gap-3 justify-center mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "bg-stone-600 text-white"
                    : "bg-stone-300 text-stone-700"
                }`}
              >
                <tab.icon className="mr-2 h-5 w-5" />
                {tab.label}
              </button>
            ))}
          </div>
          {activeTab === "create" && <CreateProduct />}
          {activeTab === "products" && <Products />}
          {activeTab === "analytics" && <Analytics />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
