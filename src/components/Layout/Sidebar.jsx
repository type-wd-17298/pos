import {
  BookMarkedIcon,
  ChevronDown,
  // ChevronDown,
  ChevronLeft,
  ChevronRight,
  MenuIcon,
  SettingsIcon,
  UserIcon
} from "lucide-react";
import PropTypes from "prop-types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SidebarContext = createContext({ expanded: true });

const userInfo = {
  FirstName: "John",
  LastName: "Doe",
  EmailAddr: "john.doe@example.com",
  Admin: true,
};

const Sidebar = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleSidebar = () => setExpanded((prev) => !prev);

  const handleResize = () => {
    if (window.innerWidth <= 1500) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  };

  const handleMenuClick = (menuId) => {
    setOpenSubMenu(openSubMenu === menuId ? null : menuId); // เปิด/ปิดเมนูย่อย
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <SidebarContext.Provider value={{ expanded }}>
      <aside className="h-screen">
        <nav className="h-full flex flex-col bg-white shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <div
              className={`flex flex-row justify-center items-center pl-6${
                expanded ? "w-36" : "w-0 max-w-0 opacity-0"
              } `}
            >
              <img
                className="h-10 pr-2 transition-all duration-500"
                src={"/logo.png"}
                alt="Logo"
                onClick={toggleSidebar}
              />
              <div className="flex flex-col">
                <p
                  className="text-left cursor-pointer transition-all duration-500 inline-block"
                  onClick={toggleSidebar}
                >
                  System POS
                </p>
                <p
                  className="text-xs text-left cursor-pointer transition-all duration-500 inline-block whitespace-nowrap"
                  onClick={toggleSidebar}
                >
                  Type Café & Restaurant
                </p>
              </div>
            </div>
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <ChevronLeft /> : <MenuIcon />}
            </button>
          </div>

          <ul className="flex-1 px-3">
            {React.Children.map(children, (child) => {
              if (child.props.hasSubMenu) {
                return React.cloneElement(child, {
                  openSubMenu,
                  handleMenuClick,
                });
              }
              return child;
            })}
          </ul>

          <div className="pl-2 mt-auto mb-4 flex items-center">
            <div className="w-10 h-10 rounded-full flex justify-center items-center bg-indigo-300 text-white font-semibold">
              {userInfo?.FirstName?.[0]}
              {userInfo?.LastName?.[0]}
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out flex flex-row items-center ${
                expanded
                  ? "w-52 ml-3 opacity-100 scale-100"
                  : "w-0 ml-0 opacity-0 scale-95"
              }`}
            >
              <div className="grow">
                <h4 className="font-semibold">
                  {userInfo?.FirstName} {userInfo?.LastName}
                </h4>
                <span className="text-xs text-gray-600">
                  {userInfo?.EmailAddr}
                </span>
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </SidebarContext.Provider>
  );
};

// eslint-disable-next-line react/display-name
const SidebarItem = React.forwardRef(
  ({ icon, text, active, alert, to, onClick, className, subMenu }, ref) => {
    const { expanded } = useContext(SidebarContext);
    const [isSubMenuOpen, setSubMenuOpen] = useState(false);

    const toggleSubMenu = () => setSubMenuOpen((prev) => !prev);

    const handleMainMenuClick = (e) => {
      onClick && onClick(e); // เรียกฟังก์ชัน onClick ของเมนูหลัก (ถ้ามี)
      if (subMenu) {
        if (isSubMenuOpen) {
          setSubMenuOpen(false);
        } else {
          setSubMenuOpen(true);
        }
        // เปิดเมนูย่อยโดยอัตโนมัติ
      } else {
        setSubMenuOpen(false);
      }
    };

    return (
      <li ref={ref} className={`relative`}>
        <div
          className={`flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
            active
              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
              : "hover:bg-indigo-50 text-gray-600"
          } ${className}`}
        >
          <Link
            to={to}
            onClick={handleMainMenuClick}
            className="flex items-center w-full"
          >
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
            <div className="absolute right-2 w-2 h-2 rounded bg-indigo-400 z-50" />
          )}

          {subMenu && expanded && (
            <button
              onClick={toggleSubMenu}
              className="ml-auto text-gray-500 hover:text-indigo-600 transition-all"
            >
              {isSubMenuOpen ? <ChevronDown /> : <ChevronRight />}
            </button>
          )}
        </div>

        {subMenu && isSubMenuOpen && expanded && (
          <ul className="ml-4 border-l border-gray-300 pl-4 mt-1 space-y-1">
            {subMenu.map((item, index) => (
              <SidebarItem
                key={index}
                to={item.to}
                text={item.text}
                active={active}
                onClick={item.onClick}
                expanded={expanded}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }
);

export default function SidebarContainer() {
  const [activeMenu, setActiveMenu] = useState("");
  const { expanded } = useContext(SidebarContext);

  const listMenuAdmin = [
    <SidebarItem
      key="Menu"
      to="/menu"
      icon={<BookMarkedIcon className="h-5 w-5" />}
      text="Menu"
      active={activeMenu === "menu"}
      alert={false}
      onClick={() => setActiveMenu("menu")}
    />,
    <SidebarItem
      key="Configuration"
      icon={<SettingsIcon className="h-5 w-5" />}
      text="Configuration"
      active={activeMenu === "configuration"}
      onClick={() => setActiveMenu("configuration")}
      subMenu={[
        {
          text: "Product",
          to: "/configuration/product",
          onClick: () => setActiveMenu("product"),
        },
        {
          text: "Category",
          to: "/configuration/category",
          onClick: () => setActiveMenu("category"),
        },
      ]}
    />,
    <SidebarItem
      key="users"
      to="/users"
      icon={<UserIcon className="h-5 w-5" />}
      text="Users"
      active={activeMenu === "users"}
      alert={false}
      onClick={() => setActiveMenu("users")}
    />,
  ];

  const listMenuBasic = [
    <SidebarItem
      key="all-license"
      to="/all license"
      icon={<BookMarkedIcon className="h-5 w-5" />}
      text="Application"
      active={activeMenu === "all-license"}
      alert={false}
      onClick={() => setActiveMenu("all-license")}
    />,
  ];

  return (
    <Sidebar>
      <div className="divide-y-2 divide-gray-300 flex h-[calc(100vh-220px)]">
        <nav>
          <div className="flex-grow ">
            <ul className="space-y-2">
              {userInfo?.Admin === true ? listMenuAdmin : listMenuBasic}
            </ul>
          </div>
        </nav>
      </div>

    </Sidebar>
  );
}

SidebarItem.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.string,
  active: PropTypes.any,
  alert: PropTypes?.bool,
  to: PropTypes.string,
  onClick: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.node,
  subMenu: PropTypes.array,
};

Sidebar.propTypes = {
  children: PropTypes.node,
};
