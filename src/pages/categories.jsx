import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import Modal from "../components/Modal";

function Categories() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [deleteId, setDeleteId] =
    useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(
          `/categories/${editingId}`,
          {
            name,
          }
        );
      } else {
        await api.post("/categories", {
          name,
        });
      }

      setName("");
      setEditingId(null);

      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(
        `/categories/${id}`
      );

      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (category) => {
    setName(category.name);
    setEditingId(category.id);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filteredCategories =
    categories.filter((category) =>
      category.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">
          Categories
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-semibold"
        >
          Logout
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search Category..."
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
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg text-white font-semibold"
        >
          Add Category
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-800">
              <th className="text-left text-white p-4">
                Category Name
              </th>

              <th className="text-left text-white p-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredCategories.map(
              (category) => (
                <tr
                  key={category.id}
                  className="border-t border-slate-700"
                >
                  <td className="text-slate-300 p-4">
                    {category.name}
                  </td>

                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => {
                        handleEdit(
                          category
                        );
                        setShowAddModal(
                          true
                        );
                      }}
                      className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg text-white"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setDeleteId(
                          category.id
                        );
                        setShowDeleteModal(
                          true
                        );
                      }}
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
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
        }}
        title={
          editingId
            ? "Edit Category"
            : "Add Category"
        }
      >
        <form
          onSubmit={async (e) => {
            await handleSubmit(e);

            setShowAddModal(false);
          }}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-700"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg text-white"
          >
            {editingId
              ? "Update Category"
              : "Add Category"}
          </button>
        </form>
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteId(null);
        }}
        title="Delete Category"
      >
        <div className="space-y-4">
          <p className="text-slate-300">
            Are you sure you want to
            delete this category?
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

                setDeleteId(null);
              }}
              className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-lg text-white"
            >
              Delete
            </button>

            <button
              onClick={() => {
                setShowDeleteModal(
                  false
                );

                setDeleteId(null);
              }}
              className="flex-1 bg-slate-700 hover:bg-slate-600 py-3 rounded-lg text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Categories;