import { useEffect, useState } from "react";
import api from "../services/api";

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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Stock History
      </h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left">
                Product
              </th>

              <th className="p-4 text-left">
                Action
              </th>

              <th className="p-4 text-left">
                Quantity
              </th>

              <th className="p-4 text-left">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {history.map(
              (item) => (
                <tr
                  key={item.id}
                  className="border-t"
                >
                  <td className="p-4">
                    {
                      item.product
                        ?.name
                    }
                  </td>

                  <td className="p-4">
                    {
                      item.action
                    }
                  </td>

                  <td className="p-4">
                    {
                      item.quantity
                    }
                  </td>

                  <td className="p-4">
                    {new Date(
                      item.createdAt
                    ).toLocaleString()}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StockHistory;