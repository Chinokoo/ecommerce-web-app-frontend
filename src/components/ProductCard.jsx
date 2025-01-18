import { ShoppingCart } from "lucide-react";
import { PropTypes } from "prop-types";
import toast from "react-hot-toast";
import { useUserStore } from "./../store/useUserStore";
import { useCartStore } from "./../store/useCartStore";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    if (!user) {
      return toast.error("please log in to add this item to cart.", {
        position: "top-right",
      });
    } else {
      addToCart(product);
    }
  };
  return (
    <div className="flex w-full sm:w-[350px] relative flex-col overflow-hidden rounded-lg border border-stone-300 shadow-lg shadow-stone-500 mb-5">
      <div className="relative w-full  flex  max-h-60 overflow-hidden group ">
        <img
          src={product.image}
          className="object-contain  transition-transform duration-500 ease-in-out group-hover:scale-125"
          alt={product.name}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </div>
      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-stone-300">
          {product.name}
        </h5>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p className="text-3xl font-bold text-stone-400">${product.price}</p>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center rounded-lg bg-stone-800 hover:bg-stone-500 px-5 py-2.5 text-center text-sm font-medium "
        >
          <ShoppingCart size={22} className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};
export default ProductCard;
