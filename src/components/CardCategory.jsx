import PropTypes from "prop-types";

const CardCategory = ({ icon, categoryName, count }) => {
  return (
    <div className="-z-0 p-6 hover:shadow-lg hover:border-gray-500 bg-white border border-gray-200 rounded-2xl shadow-md dark:bg-gray-800 dark:border-gray-700 transform transition-transform duration-300 hover:scale-105">
      <div className="pb-4">{icon}</div>
      <p className="text-sm font-semibold">{categoryName}</p>
      <p>{count} items</p>
    </div>
  );
};

CardCategory.propTypes = {
  icon: PropTypes.node,
  categoryName: PropTypes.string,
  count: PropTypes.number,
};

export default CardCategory;
