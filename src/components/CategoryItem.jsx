import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <div className="relative overflow-hidden h-96 w-full rounded-lg group">
      <Link to={"/category" + category.href}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-stone-800 opacity-50 z-10">
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute bottom-0 right-0 p-4 z-20 text-teal-300">
            <h3 className=" text-2xl font-bold mb-2">{category.name}</h3>
            <p className="font-bold">Explore {category.name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

CategoryItem.propTypes = {
  category: PropTypes.object.isRequired,
};

export default CategoryItem;
