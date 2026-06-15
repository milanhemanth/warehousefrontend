import { useEffect, useState } from "react";
import api from "../services/api";
import Modal from "../components/Modal";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [deleteId, setDeleteId] =
    useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");
  const [quantity, setQuantity] =
    useState("");
  const [price, setPrice] =
    useState("");
  const [categoryId, setCategoryId] =
    useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get(
        "/products"
      );

      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get(
        "/categories"
      );

      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(
        `/products/${id}`
      );

      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredProducts =
    products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">
          Products
        </h1>
      </div>

      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-1/2 bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-700"
        />

        <button
          onClick={() =>
            setShowAddModal(true)
          }
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg text-white"
        >
          Add Product
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-800">
              <th className="text-left p-4 text-white">
                Name
              </th>

              <th className="text-left p-4 text-white">
                Description
              </th>

              <th className="text-left p-4 text-white">
                Quantity
              </th>

              <th className="text-left p-4 text-white">
                Price
              </th>

              <th className="text-left p-4 text-white">
                Category
              </th>

              <th className="text-left p-4 text-white">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map(
              (product) => (
                <tr
                  key={product.id}
                  className="border-t border-slate-700"
                >
                  <td className="p-4 text-slate-300">
                    {product.name}
                  </td>

                  <td className="p-4 text-slate-300">
                    {
                      product.description
                    }
                  </td>

                  <td className="p-4 text-slate-300">
                    {product.quantity}
                  </td>

                  <td className="p-4 text-slate-300">
                    ₹{product.price}
                  </td>

                  <td className="p-4 text-slate-300">
                    {
                      product.category
                        ?.name
                    }
                  </td>

                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(
                          product.id
                        );

                        setName(
                          product.name
                        );

                        setDescription(
                          product.description
                        );

                        setQuantity(
                          product.quantity
                        );

                        setPrice(
                          product.price
                        );

                        setCategoryId(
                          product
                            .category
                            .id
                        );

                        setShowAddModal(
                          true
                        );
                      }}
                      className="bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded text-white"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setDeleteId(
                          product.id
                        );

                        setShowDeleteModal(
                          true
                        );
                      }}
                      className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);

          setEditingId(null);

          setName("");
          setDescription("");
          setQuantity("");
          setPrice("");
          setCategoryId("");
        }}
        title={
          editingId
            ? "Edit Product"
            : "Add Product"
        }
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const payload = {
              name,
              description,
              quantity:
                Number(quantity),
              price:
                Number(price),
              categoryId,
            };

            try {
              if (editingId) {
                await api.patch(
                  `/products/${editingId}`,
                  payload
                );
              } else {
                await api.post(
                  "/products",
                  payload
                );
              }

              fetchProducts();

              setShowAddModal(
                false
              );

              setEditingId(null);

              setName("");
              setDescription("");
              setQuantity("");
              setPrice("");
              setCategoryId("");
            } catch (error) {
              console.error(error);
            }
          }}
          className="space-y-4"
        >
          <input
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            placeholder="Name"
            className="w-full bg-slate-800 text-white p-3 rounded"
          />

          <input
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            placeholder="Description"
            className="w-full bg-slate-800 text-white p-3 rounded"
          />

          <input
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(
                e.target.value
              )
            }
            placeholder="Quantity"
            className="w-full bg-slate-800 text-white p-3 rounded"
          />

          <input
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(
                e.target.value
              )
            }
            placeholder="Price"
            className="w-full bg-slate-800 text-white p-3 rounded"
          />

          <select
            value={categoryId}
            onChange={(e) =>
              setCategoryId(
                e.target.value
              )
            }
            className="w-full bg-slate-800 text-white p-3 rounded"
          >
            <option value="">
              Select Category
            </option>

            {categories.map(
              (category) => (
                <option
                  key={
                    category.id
                  }
                  value={
                    category.id
                  }
                >
                  {category.name}
                </option>
              )
            )}
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded text-white"
          >
            {editingId
              ? "Update Product"
              : "Add Product"}
          </button>
        </form>
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onClose={() =>
          setShowDeleteModal(false)
        }
        title="Delete Product"
      >
        <div className="space-y-4">
          <p className="text-white">
            Are you sure you want to
            delete this product?
          </p>

          <div className="flex gap-3">
            <button
              onClick={async () => {
                await handleDelete(
                  deleteId
                );

                setShowDeleteModal(
                  false
                );
              }}
              className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded text-white"
            >
              Delete
            </button>

            <button
              onClick={() =>
                setShowDeleteModal(
                  false
                )
              }
              className="flex-1 bg-slate-700 hover:bg-slate-600 py-3 rounded text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Products;