import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Categories() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/categories/${editingId}`, {
          name,
        });
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
      await api.delete(`/categories/${id}`);
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

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 mb-6">
        <form
          onSubmit={handleSubmit}
          className="flex gap-4"
        >
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="flex-1 bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-700"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-semibold"
          >
            {editingId
              ? "Update Category"
              : "Add Category"}
          </button>
        </form>
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
            {categories.map((category) => (
              <tr
                key={category.id}
                className="border-t border-slate-700"
              >
                <td className="text-slate-300 p-4">
                  {category.name}
                </td>

                <td className="p-4 flex gap-2">
                  <button
                    onClick={() =>
                      handleEdit(category)
                    }
                    className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg text-white"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(category.id)
                    }
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Categories;