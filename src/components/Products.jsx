import { motion } from "framer-motion";
import { useProductStore } from "../store/useProductStore";
import { Star, Trash2 } from "lucide-react";

const Products = () => {
  const { products, toggleProduct, deleteProduct } = useProductStore();

  if (products.length === 0) {
    return (
      <div className="flex h-screen w-full  justify-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-bold text-3xl"
        >
          No Products Available !
        </motion.h1>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-stone-800 shadow-lg shadow-stone-500 rounded-lg overflow-y-auto max-2-4xl mx-auto"
    >
      <table className="min-w-full divide-y divide-stone-300">
        <thead className="bg-stone-500">
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-stone-300 uppercase tracking-wider "
          >
            Product
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-stone-300 uppercase tracking-wider "
          >
            Price
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-stone-300 uppercase tracking-wider "
          >
            Category
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-stone-300 uppercase tracking-wider "
          >
            In Stock
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-stone-300 uppercase tracking-wider "
          >
            Recommended
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-stone-300 uppercase tracking-wider "
          >
            Actions
          </th>
        </thead>
        <tbody className="bg-stone-600 divide-y divide-stone-300">
          {products.map((product) => (
            <tr
              key={product._id}
              className="hover:bg-stone-800 hover:text-stone-300"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      src={product.image}
                      alt="product.name"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <span className="text-sm font-medium text-stone-300 ">
                      {product.name}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  {product.price.toFixed(2)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">{product.category}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">7</div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  <button
                    onClick={() => {
                      toggleProduct(product._id);
                    }}
                    className={`p-1 rounded-full ${
                      product.isFeatured
                        ? "bg-stone-300 text-orange-500"
                        : "bg-stone-900 text-stone-300"
                    } hover:bg-stone-500`}
                  >
                    <Star className="h-5 w-5" />
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="text-white hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default Products;
