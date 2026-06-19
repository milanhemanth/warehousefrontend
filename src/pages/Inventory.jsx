
import { useEffect, useState } from "react";
import api from "../services/api";
import Modal from "../components/Modal";
import { toast } from "react-toastify";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

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
      toast.error(
        "Failed to load inventory"
      );
    }
  };

  const handleStockIn = async () => {
    try {
      await api.post(
        "/inventory/stock-in",
        {
          productId: selectedProduct.id,
          quantity: Number(quantity),
        }
      );

      toast.success(
        "Stock added successfully"
      );

      setShowStockInModal(false);
      setQuantity("");

      fetchInventory();
    } catch (error) {
      toast.error(
        "Failed to add stock"
      );
    }
  };

  const handleStockOut = async () => {
    try {
      await api.post(
        "/inventory/stock-out",
        {
          productId: selectedProduct.id,
          quantity: Number(quantity),
        }
      );

      toast.success(
        "Stock removed successfully"
      );

      setShowStockOutModal(false);
      setQuantity("");

      fetchInventory();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Stock Out Failed"
      );
    }
  };

  const filteredProducts =
    products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const totalProducts =
    products.length;

  const inStock =
    products.filter(
      (p) => p.quantity >= 10
    ).length;

  const lowStock =
    products.filter(
      (p) =>
        p.quantity > 0 &&
        p.quantity < 10
    ).length;

  const outOfStock =
    products.filter(
      (p) => p.quantity === 0
    ).length;

  return (
    <div className="min-h-screen bg-slate-950 p-6">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Inventory Management
        </h1>

        <p className="text-slate-400 mt-1">
          Track and manage warehouse stock
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

        <div className="bg-blue-600 rounded-2xl p-5 text-white">
          <p className="text-sm opacity-80">
            Total Products
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {totalProducts}
          </h2>
        </div>

        <div className="bg-green-600 rounded-2xl p-5 text-white">
          <p className="text-sm opacity-80">
            In Stock
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {inStock}
          </h2>
        </div>

        <div className="bg-yellow-600 rounded-2xl p-5 text-white">
          <p className="text-sm opacity-80">
            Low Stock
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {lowStock}
          </h2>
        </div>

        <div className="bg-red-600 rounded-2xl p-5 text-white">
          <p className="text-sm opacity-80">
            Out Of Stock
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {outOfStock}
          </h2>
        </div>

      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full md:w-96 bg-slate-800 text-white px-4 py-3 rounded-xl border border-slate-700"
        />
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">

        <table className="w-full">

          <thead>
            <tr className="bg-slate-800">

              <th className="p-4 text-left text-white">
                Product
              </th>

              <th className="p-4 text-left text-white">
                Category
              </th>

              <th className="p-4 text-left text-white">
                Stock
              </th>

              <th className="p-4 text-left text-white">
                Status
              </th>

              <th className="p-4 text-left text-white">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>

            {filteredProducts.map(
              (product) => (
                <tr
                  key={product.id}
                  className="border-t border-slate-700 hover:bg-slate-800/40 transition"
                >

                  <td className="p-4">

                    <div className="flex items-center gap-3">

                      <img
                        src={
                          product.imageUrl ||
                          "https://via.placeholder.com/60"
                        }
                        alt={product.name}
                        className="w-14 h-14 rounded-xl object-cover"
                      />

                      <div>
                        <p className="text-white font-semibold">
                          {product.name}
                        </p>

                        <p className="text-slate-400 text-sm">
                          {
                            product.description
                          }
                        </p>
                      </div>

                    </div>

                  </td>

                  <td className="p-4 text-slate-300">
                    {
                      product.category
                        ?.name
                    }
                  </td>

                  <td className="p-4 text-slate-300 font-semibold">
                    {
                      product.quantity
                    }
                  </td>

                  <td className="p-4">

                    {product.quantity ===
                    0 ? (
                      <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm">
                        Out of Stock
                      </span>
                    ) : product.quantity <
                      10 ? (
                      <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm">
                        Low Stock
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
                        In Stock
                      </span>
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
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
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
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
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
        isOpen={showStockInModal}
        onClose={() =>
          setShowStockInModal(false)
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
          className="w-full bg-slate-800 text-white border border-slate-700 p-3 rounded mb-4"
        />

        <button
          onClick={handleStockIn}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
        >
          Add Stock
        </button>
      </Modal>

      <Modal
        isOpen={showStockOutModal}
        onClose={() =>
          setShowStockOutModal(false)
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
          className="w-full bg-slate-800 text-white border border-slate-700 p-3 rounded mb-4"
        />

        <button
          onClick={handleStockOut}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
        >
          Remove Stock
        </button>
      </Modal>

    </div>
  );
}

export default Inventory;

