import { LoaderCircle } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-t from-stone-600 to-stone-900 text-white flex items-center justify-center">
      <LoaderCircle className="animate-spin" size={60} />
    </div>
  );
};

export default LoadingSpinner;
