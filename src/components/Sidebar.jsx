import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 min-h-screen text-white p-5">
      <h2 className="text-2xl font-bold mb-8">
        Warehouse IMS
      </h2>

      <div className="flex flex-col gap-4">
        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/products">
          Products
        </Link>

        <Link to="/categories">
          Categories
        </Link>

        <Link to="/inventory">
          Inventory
        </Link>

        <Link to="/users">
          Users
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;