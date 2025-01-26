import { motion } from "framer-motion";
import { PropTypes } from "prop-types";

const AnalyticsCard = ({ title, value, icon: Icon, color }) => {
  return (
    <motion.div
      className={`bg-stone-500 rounded-lg p-6 shadow-lg overflow-hidden relative ${color}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <div className="z-10">
          <p className="text-stone-200 text-sm mb-1 font-bold">{title}</p>
          <h3 className="text-white text-3xl font-bold">{value}</h3>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-stone-500 to-stone-800 opacity-30" />
      <div className="absolute -bottom-4 -right-4 text-tone-800">
        <Icon className="h-32 w-32 text-stone-400" />
      </div>
    </motion.div>
  );
};

AnalyticsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default AnalyticsCard;
