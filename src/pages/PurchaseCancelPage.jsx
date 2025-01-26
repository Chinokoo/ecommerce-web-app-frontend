import { ArrowLeft, Headset, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
  return (
    <div className="flex flex-col items-center  p-6 sm:p-8 w-full min-h-screen">
      <div className="flex justify-center ">
        <XCircle className="text-red-500 w-16 h-16 mb-4" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-red-500 mb-2">
        Purchase Canceled
      </h1>
      <p className="text-stone-200 text-center mb-6">
        Your Order has been cancelled. No charges have been made.
      </p>

      <div className="bg-stone-500 w-full md:max-w-lg rounded-lg p-4 mb-6">
        <p className="text-sm text-center mb-6">
          if you encountered any issues during the checkout process, please
          don&apos;t hesitate to contact our support team.
        </p>
        <div>
          <div className="flex  justify-center rounded-lg bg-stone-800 py-4">
            <h2 className="hidden md:block">Customer Service</h2>
            <Headset />
            <p> : +27 62 419 0143</p>
          </div>
        </div>
      </div>
      <div className="space-y-4 w-full md:max-w-sm">
        <Link
          className=" bg-stone-500 hover:bg-stone-700 text-white font-bold px-4 py-4 rounded-lg transition duration-300 flex items-center justify-center  "
          to={"/"}
        >
          <ArrowLeft
            className="mr-1 transition duration-500 hover:mr-6 "
            size={18}
          />
          go to homePage
        </Link>
      </div>
    </div>
  );
};

export default PurchaseCancelPage;
