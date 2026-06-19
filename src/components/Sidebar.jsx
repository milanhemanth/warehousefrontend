import {
  FaTachometerAlt,
  FaBoxOpen,
  FaTags,
  FaWarehouse,
  FaHistory,
  FaUsers,
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const role = localStorage.getItem("role");

  let menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt />,
    },
  ];

  if (role === "Admin") {
    menuItems = [
      ...menuItems,
      {
        name: "Products",
        path: "/products",
        icon: <FaBoxOpen />,
      },
      {
        name: "Categories",
        path: "/categories",
        icon: <FaTags />,
      },
      {
        name: "Inventory",
        path: "/inventory",
        icon: <FaWarehouse />,
      },
      {
        name: "Stock History",
        path: "/stock-history",
        icon: <FaHistory />,
      },
      {
        name: "Users",
        path: "/users",
        icon: <FaUsers />,
      },
    ];
  }

  if (role === "Manager") {
    menuItems = [
      ...menuItems,
      {
        name: "Products",
        path: "/products",
        icon: <FaBoxOpen />,
      },
      {
        name: "Inventory",
        path: "/inventory",
        icon: <FaWarehouse />,
      },
      {
        name: "Stock History",
        path: "/stock-history",
        icon: <FaHistory />,
      },
    ];
  }

  if (role === "Staff") {
    menuItems = [
      ...menuItems,
      {
        name: "Inventory",
        path: "/inventory",
        icon: <FaWarehouse />,
      },
      {
        name: "Stock History",
        path: "/stock-history",
        icon: <FaHistory />,
      },
    ];
  }

  return (
    <div className="w-72 min-h-screen bg-slate-900 border-r border-slate-800">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white">
          Warehouse IMS
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          Inventory Management
        </p>

        <div className="mt-3 px-3 py-2 bg-slate-800 rounded-lg">
          <p className="text-xs text-slate-400">
            Logged in as
          </p>

          <p className="text-sm font-semibold text-cyan-400">
            {role}
          </p>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
            ${
              location.pathname === item.path
                ? "bg-blue-600 text-white shadow-lg"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {item.icon}

            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;