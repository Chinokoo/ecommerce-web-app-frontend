import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCartStore } from "../store/useCartStore";

const GiftCouponCard = () => {
  const [userInputCode, setUserInputCode] = useState("");
  const { isCouponApplied, coupon, applyCoupon, getCoupon, removeCoupon } =
    useCartStore();

  useEffect(() => {
    getCoupon();
  }, [getCoupon]);

  useEffect(() => {
    if (coupon) setUserInputCode(coupon.code);
  }, [coupon]);

  const handleApplyCoupon = async () => {
    if (!userInputCode) return;
    await applyCoupon(userInputCode);
  };
  const handleRemoveCoupon = async () => {
    await removeCoupon();
    setUserInputCode("");
  };
  return (
    <motion.div
      className="space-y-4   py-4 rounded-lg border border-stone-100 bg-stone-300 px-4 shadow-sm sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="space-y-4">
        <div>
          <label
            htmlFor="voucher"
            className="mb-2 block text-sm font-medium text-stone-800"
          >
            Do you have a voucher ?
          </label>
          <input
            type="text"
            id="voucher"
            className="block w-full rounded-lg border border-stone-800 bg-stone-600 p-2.5 text-sm text-white placeholder-stone-100 focus:border-stone-500 focus:ring-stone-500"
            value={userInputCode}
            onChange={(e) => setUserInputCode(e.target.value)}
            required
          />
        </div>
        <motion.button
          type="button"
          className="flex w-full items-center justify-center rounded-lg bg-stone-800 px-5 py-2.5 text-sm  font-medium text-white hover:bg-stone-500 focus:outline-none focus:ring-4 focus:ring-stone-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleApplyCoupon}
        >
          Apply Code
        </motion.button>
      </div>
      {isCouponApplied && coupon && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-stone-800">Applied Coupon</h3>
          <p className="mt-2 text-sm text-stone-500">
            {coupon.code} - {coupon.discountPercentage}% off
          </p>
          <motion.button
            type="button"
            className="flex w-full items-center justify-center rounded-lg bg-stone-800 px-5 py-2.5 text-sm  font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-stone-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRemoveCoupon}
          >
            Remove Coupon
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default GiftCouponCard;
