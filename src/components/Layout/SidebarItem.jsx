import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Add missing Link import
import { SidebarContext } from './SidebarContext'; // Ensure you import SidebarContext
import PropTypes from "prop-types";

// eslint-disable-next-line react/display-name
const SidebarItem = React.forwardRef(
  ({ icon, text, active, alert, to, onClick, className }, ref) => {
    const { expanded } = useContext(SidebarContext);

    return (
      <li
        ref={ref}
        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        } ${className}`}
      >
        <Link to={to} onClick={onClick} className="flex items-center w-full">
          {icon}
          <span
            className={`overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
            style={{ whiteSpace: "nowrap" }}
          >
            {text}
          </span>
        </Link>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}

        {!expanded && (
          <div
            className="absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
            style={{ whiteSpace: "nowrap" }}
          >
            {text}
          </div>
        )}
      </li>
    );
  }
);


SidebarItem.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.string,
  active: PropTypes.any,
  alert: PropTypes?.bool,
  to: PropTypes.string,
  onClick: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.node,
};


export default SidebarItem;
