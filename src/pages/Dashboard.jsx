import { useEffect, useState } from "react";
import api from "../services/api";

import {
  FaBox,
  FaTags,
  FaUsers,
  FaExclamationTriangle,
} from "react-icons/fa";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalUsers: 0,
    lowStockItems: 0,
  });

  const [activities, setActivities] =
    useState([]);

  useEffect(() => {
    fetchDashboardData();
    fetchActivities();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get(
        "/dashboard"
      );

      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await api.get(
        "/stock-history"
      );

      setActivities(
        response.data.slice(0, 5)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">

      {/* Hero Section */}
      <div className="mb-8 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl">
        <h2 className="text-4xl font-bold mb-2">
          Welcome Back, Milan 👋
        </h2>

        <p className="text-blue-100 text-lg">
          Monitor inventory, products,
          stock movements and users
          from one place.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <div className="bg-white/10 backdrop-blur-lg px-5 py-3 rounded-xl">
            <p className="text-sm">
              Products
            </p>

            <h3 className="text-2xl font-bold">
              {stats.totalProducts}
            </h3>
          </div>

          <div className="bg-white/10 backdrop-blur-lg px-5 py-3 rounded-xl">
            <p className="text-sm">
              Categories
            </p>

            <h3 className="text-2xl font-bold">
              {stats.totalCategories}
            </h3>
          </div>

          <div className="bg-white/10 backdrop-blur-lg px-5 py-3 rounded-xl">
            <p className="text-sm">
              Users
            </p>

            <h3 className="text-2xl font-bold">
              {stats.totalUsers}
            </h3>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg hover:scale-105 transition duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">
                Total Products
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {stats.totalProducts}
              </h2>
            </div>

            <FaBox size={40} />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-6 text-white shadow-lg hover:scale-105 transition duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">
                Total Categories
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {stats.totalCategories}
              </h2>
            </div>

            <FaTags size={40} />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-6 text-white shadow-lg hover:scale-105 transition duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">
                Total Users
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {stats.totalUsers}
              </h2>
            </div>

            <FaUsers size={40} />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-6 text-white shadow-lg hover:scale-105 transition duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">
                Low Stock Items
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {stats.lowStockItems}
              </h2>
            </div>

            <FaExclamationTriangle
              size={40}
            />
          </div>
        </div>

      </div>

      {/* Activity + Health */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Recent Activity */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Recent Activity
          </h2>

          {activities.length === 0 ? (
            <p className="text-slate-400">
              No activity found
            </p>
          ) : (
            <div className="space-y-4">
              {activities.map(
                (activity) => (
                  <div
                    key={
                      activity.id
                    }
                    className="bg-slate-800 rounded-xl p-4"
                  >
                    <p className="font-semibold text-white">
                      {
                        activity
                          .product
                          ?.name
                      }
                    </p>

                    <p className="text-cyan-400">
                      {
                        activity.action
                      }
                    </p>

                    <p className="text-slate-400 text-sm">
                      Quantity:{" "}
                      {
                        activity.quantity
                      }
                    </p>

                    <p className="text-slate-500 text-xs">
                      {new Date(
                        activity.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Inventory Health */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Inventory Health
          </h2>

          <div className="space-y-6">

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-300">
                  Inventory Capacity
                </span>

                <span className="text-green-400">
                  85%
                </span>
              </div>

              <div className="bg-slate-800 rounded-full h-4">
                <div className="bg-green-500 h-4 rounded-full w-[85%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-300">
                  Low Stock Items
                </span>

                <span className="text-red-400">
                  {
                    stats.lowStockItems
                  }
                </span>
              </div>

              <div className="bg-slate-800 rounded-full h-4">
                <div className="bg-red-500 h-4 rounded-full w-[25%]"></div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-2">
                System Status
              </h3>

              <p className="text-green-400">
                ● All Services
                Operational
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;