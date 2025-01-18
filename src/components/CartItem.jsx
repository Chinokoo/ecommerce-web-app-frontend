import { Minus, Plus, Trash } from "lucide-react";
import PropTypes from "prop-types";
import { useCartStore } from "../store/useCartStore";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCartStore();
  return (
    <div className="rounded-lg border p-4 shadow-sm border-stone-200 bg-stone-700 md:p-6">
      <div className="space-y-6 md:flex md:flex-row md:items-center md:justify-between md:gap-6 md:space-y-0">
        <div className="shrink-0 md:order-1">
          <img
            src={item.image}
            alt={item.name}
            className="h-32 w-32 md:h-44 rounded object-cover"
          />
        </div>
        <label className="sr-only">Choose Quantity</label>
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-stone-500 bg-stone-800 hover:bg-stone-500 focus:outline-none focus:ring-2 focus-stone-500 "
            >
              <Minus className="text-stone-300" />
            </button>
            <p>{item.quantity}</p>
            <button
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-stone-500 bg-stone-800 hover:bg-stone-500 focus:outline-none focus:ring-2 focus-stone-500 "
            >
              <Plus className="text-stone-300" />
            </button>
          </div>
          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-stone-300">${item.price}</p>
          </div>
        </div>

        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md ">
          <p className="text-base font-medium text-white hover:text-stone-300 hover:underline">
            {item.name}
          </p>
          <p className="text-sm text-stone-300">{item.description}</p>
          <div className="flex items-center gap-4">
            <button className="inline-flex items-center text-sm font-medium text-red-800 hover:text-red-500 hover:underline">
              <Trash onClick={() => removeFromCart(item._id)} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CartItem.propsType = {
  item: PropTypes.object.isRequired,
};
export default CartItem;
