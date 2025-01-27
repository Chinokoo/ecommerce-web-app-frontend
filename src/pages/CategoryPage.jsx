import { useParams } from "react-router-dom";
import { useProductStore } from "./../store/useProductStore";
import { useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "./../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";

const CategoryPage = () => {
  const { getProductsByCategory, products, loading } = useProductStore();

  const { category } = useParams();

  useEffect(() => {
    getProductsByCategory(category);
  }, [getProductsByCategory, category]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col min-h-screen w-full justify-center items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-bold text-3xl text-stone-300"
        >
          Products are not available for this category !
        </motion.h1>
        <p className="text-stone-300 text-lg">Please come back later !</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <div className="relative z-10 max-w-screen-xl mb-5 mx-auto px-4 sm:px-6 lg:py-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-4xl sm:text-5xl font-bold text-stone-300 mb-5"
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </motion.h1>
        <div className="flex flex-col md:flex-row flex-wrap gap-5">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
