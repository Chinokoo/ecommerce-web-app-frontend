import { ArrowRight, CheckCircle, HandHeart, LoaderIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "./../store/useCartStore";
import { useEffect } from "react";
import Confetti from "react-confetti";

const PurchaseSuccessPage = () => {
  const { loading, paymentSuccessful, clearCart } = useCartStore();

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    paymentSuccessful(sessionId);
    clearCart();
  }, [paymentSuccessful, clearCart]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <LoaderIcon className="animate-spin" size={24} />
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center px-4">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        style={{ zIndex: 99 }}
        numberOfPieces={700}
        recycle={false}
      />
      <div className="max-w-md w-full bg-stone-500 rounded-lg shadow-xl overflow-hidden relative z-10">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <CheckCircle className="text-stone-100 w-16 h-16" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-stone-100 mb-2">
            Purchase Successful !
          </h1>
          <p className="text-stone-100 text-center mb-2">
            Thank you for your order. {"We're"} processing it now.
          </p>
          <p className="text-stone-100 text-center text-sm mb-6">
            Check your email for order details and updates.
          </p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-stone-300">Order number</span>
            <span className="text-sm font-semibold text-stone-300">#12345</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-stone-100">Estimated delivery</span>
            <span className="text-stone-100 text-semibold text-sm">
              3-5 business days
            </span>
          </div>
        </div>
        <div className="space-y-4 px-2 mb-4">
          <button className="w-full bg-stone-900 hover:bg-stone-100 text-white hover:text-slate-800 font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center ">
            <HandHeart className="mr-2" size={18} />
            Thank You for trusting us !
          </button>
          <Link
            className="w-full bg-stone-100 hover:bg-stone-700 text-stone-800 hover:text-stone-100 font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center "
            to={"/"}
          >
            Continue Shopping
            <ArrowRight className="ml-2" size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccessPage;
