import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyCartUI = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" flex flex-col items-center justify-center space-y-4 py-10"
    >
      <ShoppingCart className="h-24 w-24 text-stone-300" />
      <h3 className="text-2xl font-semibold">Your Cart is Empty</h3>
      <p className="text-stone-300">
        Looks like you {"haven't"} add any products to your cart.{" "}
      </p>
      <Link
        className="mt-4 rounded-md bg-stone-800 px-6 py-2 text-stone-100 transition-colors hover:bg-stone-500"
        to={"/"}
      >
        Explore Our Products
      </Link>
    </motion.div>
  );
};

export default EmptyCartUI;
