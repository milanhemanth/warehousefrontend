import { useEffect, useState } from "react";
import api from "../services/api";
import Modal from "../components/Modal";

function Inventory() {
  const [products, setProducts] = useState([]);

  const [showStockInModal, setShowStockInModal] =
    useState(false);

  const [showStockOutModal, setShowStockOutModal] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await api.get(
        "/inventory"
      );

      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStockIn = async () => {
    try {
      await api.post(
        "/inventory/stock-in",
        {
          productId:
            selectedProduct.id,
          quantity:
            Number(quantity),
        }
      );

      setShowStockInModal(false);
      setQuantity("");

      fetchInventory();
    } catch (error) {
      console.error(error);
    }
  };

  const handleStockOut = async () => {
    try {
      await api.post(
        "/inventory/stock-out",
        {
          productId:
            selectedProduct.id,
          quantity:
            Number(quantity),
        }
      );

      setShowStockOutModal(false);
      setQuantity("");

      fetchInventory();
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Stock Out Failed"
      );
    }
  };

  const getStatus = (
    quantity
  ) => {
    if (quantity === 0)
      return "Out of Stock";

    if (quantity < 10)
      return "Low Stock";

    return "In Stock";
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Inventory
      </h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left">
                Product
              </th>

              <th className="p-4 text-left">
                Category
              </th>

              <th className="p-4 text-left">
                Stock
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map(
              (product) => (
                <tr
                  key={product.id}
                  className="border-t"
                >
                  <td className="p-4">
                    {product.name}
                  </td>

                  <td className="p-4">
                    {
                      product.category
                        ?.name
                    }
                  </td>

                  <td className="p-4">
                    {
                      product.quantity
                    }
                  </td>

                  <td className="p-4">
                    {getStatus(
                      product.quantity
                    )}
                  </td>

                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedProduct(
                          product
                        );

                        setShowStockInModal(
                          true
                        );
                      }}
                      className="bg-green-600 text-white px-3 py-2 rounded"
                    >
                      Stock In
                    </button>

                    <button
                      onClick={() => {
                        setSelectedProduct(
                          product
                        );

                        setShowStockOutModal(
                          true
                        );
                      }}
                      className="bg-red-600 text-white px-3 py-2 rounded"
                    >
                      Stock Out
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={
          showStockInModal
        }
        onClose={() =>
          setShowStockInModal(
            false
          )
        }
        title="Stock In"
      >
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) =>
            setQuantity(
              e.target.value
            )
          }
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={handleStockIn}
          className="w-full bg-green-600 text-white py-3 rounded"
        >
          Add Stock
        </button>
      </Modal>

      <Modal
        isOpen={
          showStockOutModal
        }
        onClose={() =>
          setShowStockOutModal(
            false
          )
        }
        title="Stock Out"
      >
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) =>
            setQuantity(
              e.target.value
            )
          }
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={
            handleStockOut
          }
          className="w-full bg-red-600 text-white py-3 rounded"
        >
          Remove Stock
        </button>
      </Modal>
    </div>
  );
}

export default Inventory;