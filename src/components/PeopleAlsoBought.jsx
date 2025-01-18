import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import ProductCard from "./ProductCard";

const PeopleAlsoBought = () => {
  const { recommendations, getRecommendedProducts } = useProductStore();

  useEffect(() => {
    getRecommendedProducts();
  }, [getRecommendedProducts]);

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-stone-300 ">
        People also bought
      </h3>
      <div className="mt-6 grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-2">
        {recommendations.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PeopleAlsoBought;
