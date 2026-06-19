import { useEffect, useState } from "react";
import api from "../services/api";
import {
  FaArrowUp,
  FaArrowDown,
  FaHistory,
} from "react-icons/fa";

function StockHistory() {
  const [history, setHistory] =
    useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory =
    async () => {
      try {
        const response =
          await api.get(
            "/stock-history"
          );

        setHistory(
          response.data
        );
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="min-h-screen bg-slate-950 p-6">

      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-600 p-3 rounded-xl">
          <FaHistory className="text-white text-xl" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-white">
            Stock History
          </h1>

          <p className="text-slate-400">
            Track all inventory movements
          </p>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
          <p className="text-slate-400">
            No stock history found
          </p>
        </div>
      ) : (
        <div className="space-y-4">

          {history.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-blue-500 transition-all duration-300"
            >
              <div className="flex justify-between items-center">

                <div className="flex items-center gap-4">

                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      item.action ===
                      "STOCK_IN"
                        ? "bg-green-500/20"
                        : "bg-red-500/20"
                    }`}
                  >
                    {item.action ===
                    "STOCK_IN" ? (
                      <FaArrowUp className="text-green-400" />
                    ) : (
                      <FaArrowDown className="text-red-400" />
                    )}
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {
                        item.product
                          ?.name
                      }
                    </h2>

                    <p className="text-slate-400 text-sm">
                      Product Activity
                    </p>
                  </div>

                </div>

                <div className="text-right">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.action ===
                      "STOCK_IN"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {item.action}
                  </span>

                  <p className="text-white font-bold mt-2">
                    Qty:{" "}
                    {
                      item.quantity
                    }
                  </p>

                </div>

              </div>

              <div className="mt-4 border-t border-slate-800 pt-3">
                <p className="text-slate-500 text-sm">
                  {new Date(
                    item.createdAt
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default StockHistory;