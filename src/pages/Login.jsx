import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaWarehouse } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
localStorage.setItem(
  "token",
  response.data.access_token
);

localStorage.setItem(
  "role",
  response.data.role
);

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid Credentials");
      console.error(error);
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-slate-900/90 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl p-8">

        <div className="flex flex-col items-center mb-8">

          <div className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold mb-4">
            INVENTORY MANAGEMENT SYSTEM
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 rounded-xl mb-4 shadow-lg">
            <FaWarehouse className="text-white text-3xl" />
          </div>

          <h1 className="text-4xl font-bold text-white">
            Warehouse IMS
          </h1>

          <p className="text-slate-400 mt-2 text-center">
            Manage Products, Inventory,
            Stock History and Users
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>
            <label className="block text-slate-300 mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] transition-all duration-300 py-3 rounded-lg text-white font-semibold shadow-lg"
          >
            Login
          </button>

        </form>

        <p className="text-center text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:text-cyan-400 font-medium"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;