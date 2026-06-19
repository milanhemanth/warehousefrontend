import { useEffect, useState } from "react";
import api from "../services/api";
import {
  FaUsers,
  FaUserShield,
  FaUserTie,
  FaUser,
} from "react-icons/fa";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getRoleIcon = (role) => {
    if (role === "Admin")
      return (
        <FaUserShield className="text-red-400 text-lg" />
      );

    if (role === "Manager")
      return (
        <FaUserTie className="text-blue-400 text-lg" />
      );

    return (
      <FaUser className="text-green-400 text-lg" />
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Users
          </h1>

          <p className="text-slate-400 mt-1">
            Manage warehouse staff and roles
          </p>
        </div>

        <div className="bg-blue-600 px-4 py-3 rounded-xl flex items-center gap-2 text-white">
          <FaUsers />
          <span>
            Total Users: {users.length}
          </span>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">

        <table className="w-full">
          <thead>
            <tr className="bg-slate-800">

              <th className="text-left p-4 text-white">
                User
              </th>

              <th className="text-left p-4 text-white">
                Email
              </th>

              <th className="text-left p-4 text-white">
                Role
              </th>

            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-slate-700 hover:bg-slate-800/50 transition"
              >

                <td className="p-4">
                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      {user.name?.charAt(0)}
                    </div>

                    <span className="text-slate-300">
                      {user.name}
                    </span>

                  </div>
                </td>

                <td className="p-4 text-slate-300">
                  {user.email}
                </td>

                <td className="p-4">

                  <div className="flex items-center gap-2">

                    {getRoleIcon(
                      user.role?.name
                    )}

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.role?.name ===
                        "Admin"
                          ? "bg-red-500/20 text-red-400"
                          : user.role?.name ===
                            "Manager"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {user.role?.name}
                    </span>

                  </div>

                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default Users;