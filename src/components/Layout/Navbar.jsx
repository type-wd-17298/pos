// components/Layout/Navbar.tsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 shadow m-0">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div className="fle grow"></div>

        <ul className="flex space-x-6 text-gray-700 dark:text-gray-200">
          <li>
            <Link
              to="/"
              className="hover:text-blue-500 transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/menu"
              className="hover:text-blue-500 transition-colors duration-200"
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className="hover:text-blue-500 transition-colors duration-200"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/pricing"
              className="hover:text-blue-500 transition-colors duration-200"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-blue-500 transition-colors duration-200"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
