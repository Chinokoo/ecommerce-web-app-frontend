import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied, checkOutPayment, loading } =
    useCartStore();
  const savings = subtotal - total;
  const formattedTotal = total.toFixed(2);
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  const handlePayments = async () => {
    await checkOutPayment();
  };

  return (
    <motion.div
      className="space-y-4 rounded-lg py-4 border border-stone-100 bg-stone-300 px-4 shadow-sm sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-xl font-semibold text-stone-800">Order Summary</p>
      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-stone-800">
              Original Price
            </dt>
            <dd className="text-base font-medium text-stone-500">
              ${formattedSubtotal}
            </dd>
          </dl>
          {savings > 0 && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-stone-800">Savings</dt>
              <dd className="text-base font-medium text-stone-500">
                -${formattedSavings}
              </dd>
            </dl>
          )}
          {coupon && isCouponApplied && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-stone-800">
                Coupon({coupon.code})
              </dt>
              <dd className="text-base font-medium text-stone-500">
                -{coupon.discountPercentage}
              </dd>
            </dl>
          )}
          <dl className="flex items-center justify-between  border-stone-800 border-t-2 gap-4">
            <dt className="text-base font-normal text-stone-800">Total</dt>
            <dd className="text-base font-medium text-stone-500">
              ${formattedTotal}
            </dd>
          </dl>
        </div>
        <motion.button
          className="flex w-full items-center justify-center rounded-lg bg-stone-800 px-5 py-2.5 text-sm font-medium text-stone-100 hover:bg-stone-500 focus:ring-4 focus:ring-stone-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePayments}
        >
          {loading ? "Loading . . ." : "Proceed to Checkout"}
        </motion.button>
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-stone-600">or</span>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-800 underline hover:text-stone-500 hover:no-underline"
          >
            Continue Shopping
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
