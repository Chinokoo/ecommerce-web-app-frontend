import { useState } from "react";
import { motion } from "framer-motion";
import { Loader, PlusSquare, Upload } from "lucide-react";
import { useProductStore } from "../store/useProductStore";

const categories = [
  "Bags",
  "Briefs",
  "Glasses",
  "Jeans",
  "Shirts",
  "Shoes",
  "Socks",
  "Suits",
  "Sweaters",
  "Trousers",
  "Watches",
];

const CreateProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const { createProduct, loading } = useProductStore();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file); //base 64 encoding.
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission here
    createProduct(newProduct);
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      category: "",
      image: "",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-stone-800 shadow-lg rounded-lg p-8 max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-6 text-stone-300">
        Create New Product
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={newProduct.name}
          required
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="bg-stone-300 text-stone-800 rounded-md my-2 p-2 focus:border focus:border-stone-50 outline-none"
        />
        <label htmlFor="description" className="mt-4">
          Description
        </label>
        <textarea
          type="text"
          id="description"
          name="description"
          rows="4"
          value={newProduct.description}
          required
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          className="bg-stone-300 text-stone-800 rounded-md my-2 p-2 focus:border focus:border-stone-50 outline-none"
        />
        <label htmlFor="price" className="mt-4">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={newProduct.price}
          required
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          className="bg-stone-300 text-stone-800 rounded-md my-2 p-2 focus:border focus:border-stone-50 outline-none"
        />
        <select
          id="category"
          name="category"
          value={newProduct.category}
          required
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
          className="mt-4 bg-stone-300 text-stone-800 rounded-md my-2 p-2 focus:border focus:border-stone-50 outline-none"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category} className="">
              {category}
            </option>
          ))}
        </select>
        <div className="mt-4 flex gap-3 items-center">
          <input
            type="file"
            id="image"
            className="sr-only"
            onChange={handleImage}
            accept="image/*"
          />
          <label
            htmlFor="image"
            className="cursor-pointer bg-stone-900 py-2 px-4 border border-stone-300 rounded-md shadow-sm shadow-stone-300 text-leading-4 font-medium text-stone-300 hover:bg-stone-600 focus:outline-none"
          >
            <Upload className="h-5 w-5 inline-block mr-2" /> Upload Image
          </label>
          {newProduct.image && (
            <span className="w-[200px] overflow-hidden overflow-ellipsis">
              {newProduct.image}
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`flex items-center justify-center gap-2 mt-5 py-2 rounded-md text-stone-900 bg-stone-300 hover:bg-stone-500 hover:text-stone-200 ${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          } `}
        >
          {loading ? (
            <>
              <Loader className="h-5 w-5 animate-spin" />
              <p>Loading . . .</p>
            </>
          ) : (
            <>
              <PlusSquare className="h-5 w-5" />
              <span>Create Product</span>
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProduct;
