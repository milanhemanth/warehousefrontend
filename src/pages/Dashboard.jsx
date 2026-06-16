import { useEffect, useState } from "react";
import api from "../services/api";

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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500 text-sm">
            Total Products
          </h2>

          <p className="text-4xl font-bold mt-2">
            {stats.totalProducts}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500 text-sm">
            Total Categories
          </h2>

          <p className="text-4xl font-bold mt-2">
            {stats.totalCategories}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500 text-sm">
            Total Users
          </h2>

          <p className="text-4xl font-bold mt-2">
            {stats.totalUsers}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500 text-sm">
            Low Stock Items
          </h2>

          <p className="text-4xl font-bold mt-2 text-red-600">
            {stats.lowStockItems}
          </p>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4">
          Recent Activity
        </h2>

        {activities.length === 0 ? (
          <p>No activity found</p>
        ) : (
          <div className="space-y-3">
            {activities.map(
              (activity) => (
                <div
                  key={activity.id}
                  className="border-b pb-3"
                >
                  <p className="font-medium">
                    {
                      activity.product
                        ?.name
                    }
                  </p>

                  <p className="text-sm text-gray-600">
                    {
                      activity.action
                    }{" "}
                    (
                    {
                      activity.quantity
                    }
                    )
                  </p>

                  <p className="text-xs text-gray-400">
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
    </div>
  );
}

export default Dashboard;