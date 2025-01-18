import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  sessionId: null,
  totalAmount: 0,
  loading: false,
  total: 0,
  subtotal: 0,
  isCouponApplied: false,

  getCartItems: async () => {
    try {
      const res = await axiosInstance.get("/cart");
      set({ cart: res.data.cartItems });
      get().calculateTotals();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  addToCart: async (product) => {
    try {
      await axiosInstance.post("/cart", { productId: product._id });
      toast.success("Product added to cart");
      set((state) => {
        const existingItem = state.cart.find(
          (item) => item._id === product._id
        );
        const newCart = existingItem
          ? state.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...state.cart, { ...product, quantity: 1 }];
        return { cart: newCart };
      });
      get().calculateTotals();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  updateQuantity: async (productId, quantity) => {
    try {
      if (quantity === 0) {
        get().removeFromCart(productId);
        return;
      }
      await axiosInstance.put("/cart/" + productId, { quantity });
      set((state) => ({
        cart: state.cart.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        ),
      }));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  removeFromCart: async (productId) => {
    try {
      await axiosInstance.delete("/cart", { data: { productId } });
      toast.success("item removed successfully !");
      set((state) => ({
        cart: state.cart.filter((item) => item._id !== productId),
      }));
      get().calculateTotals();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  checkOutPayment: async () => {
    const { cart, coupon } = get();
    set({ loading: true });
    try {
      const res = await axiosInstance.post(
        "/payments/create-checkout-session",
        { products: cart, coupon: coupon ? coupon.code : null }
      );
      set({ sessionId: res.data.id, totalAmount: res.data.totalAmount });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ loading: false });
    }
  },
  calculateTotals: () => {
    const { cart, coupon } = get();
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    let total = subtotal;
    if (coupon) {
      const discount = subtotal * (coupon.discountPercentage / 100);
      total = subtotal - discount;
    }
    set({ subtotal, total });
  },
}));
