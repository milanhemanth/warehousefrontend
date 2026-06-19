import { useNavigate } from "react-router-dom";
import {
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-slate-900 border-b border-slate-800 px-8 py-4 flex justify-between items-center">

      <div>
        <h1 className="text-2xl font-bold text-white">
          Warehouse Management System
        </h1>

        <p className="text-slate-400 text-sm">
          Inventory Dashboard
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-xl border border-slate-700">

          <FaUserCircle className="text-blue-400 text-3xl" />

          <div>
            <p className="text-white font-medium">
              Milan
            </p>

            <p className="text-slate-400 text-xs">
              Warehouse Admin
            </p>
          </div>

        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl text-white transition duration-300"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>
    </div>
  );
}

export default Navbar;