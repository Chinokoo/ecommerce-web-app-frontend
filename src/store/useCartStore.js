import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const useCartStore = create((set, get) => ({
  //states
  cart: [],
  coupon: null,
  sessionId: null,
  totalAmount: 0,
  loading: false,
  total: 0,
  subtotal: 0,
  isCouponApplied: false,

  //actions

  //get coupon
  getCoupon: async () => {
    try {
      const res = await axiosInstance.get("/coupon");
      set({ coupon: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  //applying coupon
  applyCoupon: async (code) => {
    try {
      const res = await axiosInstance.post("/coupon/validate-coupon", { code });
      set({ coupon: res.data, isCouponApplied: true });
      get().calculateTotals();
      toast.success("Coupon applied successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "failed to apply coupon");
    }
  },
  // remove coupon
  removeCoupon: () => {
    set({ coupon: null, isCouponApplied: false });
    get().calculateTotals();
    toast.success("Coupon removed successfully");
  },

  //get cart items
  getCartItems: async () => {
    try {
      const res = await axiosInstance.get("/cart");
      set({ cart: res.data.cartItems });
      get().calculateTotals();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  //adding items to cart.
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
  //clearing the cart
  clearCart: async () => {
    try {
      set({
        cart: [],
        coupon: null,
        isCouponApplied: false,
        sessionId: null,
        totalAmount: 0,
        total: 0,
        subtotal: 0,
      });
    } catch (error) {
      toast.error(error.message);
    }
  },

  //updating the carts
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

  //removing the carts
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

  //checkout
  checkOutPayment: async () => {
    const stripe = await stripePromise;
    const { cart, coupon } = get();
    set({ loading: true });
    try {
      const res = await axiosInstance.post(
        "/payments/create-checkout-session",
        { products: cart, couponCode: coupon ? coupon.code : null }
      );
      set({ sessionId: res.data.id, totalAmount: res.data.totalAmount });
      await stripe.redirectToCheckout({
        sessionId: res.data.id,
      });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ loading: false });
    }
  },
  paymentSuccessful: async (session_id) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/payments/checkout-success", {
        session_id: session_id,
      });
      set({
        cart: [],
        coupon: null,
        sessionId: null,
        totalAmount: 0,
        total: 0,
        subtotal: 0,
        isCouponApplied: false,
      });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ loading: false });
    }
  },
  //calculating the total
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
