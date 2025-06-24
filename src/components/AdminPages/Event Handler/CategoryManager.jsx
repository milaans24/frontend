import React, { useState, useEffect } from "react";
import axiosInstance from "../../../extras/axiosInstance";
import { useSelector } from "react-redux";
import EditCategoryModal from "./modals/EditCategoryModal";
const CategoryManager = () => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const backendLink = useSelector((state) => state.prod.link);

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [editingCategory, setEditingCategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get(
        `${backendLink}/api/v1/get-event-categories`,
        {
          headers,
        }
      );
      setCategories(res.data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setNewCategory({ ...newCategory, image: e.target.files[0] });
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.title.trim() || !newCategory.image) return;

    const formData = new FormData();
    formData.append("title", newCategory.title);
    formData.append("description", newCategory.description);
    formData.append("avatar", newCategory.image);

    try {
      await axiosInstance.post(
        `${backendLink}/api/v1/create-event-category`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...headers,
          },
        }
      );
      setNewCategory({ title: "", description: "", image: null });
      fetchCategories();
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const openEditModal = (category) => {
    setEditingCategory({ ...category });
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    setEditingCategory({ ...editingCategory, [e.target.name]: e.target.value });
  };

  const handleEditImageChange = (e) => {
    setEditingCategory({ ...editingCategory, image: e.target.files[0] });
  };

  const updateCategory = async () => {
    const formData = new FormData();
    formData.append("title", editingCategory.title);
    formData.append("description", editingCategory.description);
    if (editingCategory.image instanceof File) {
      formData.append("avatar", editingCategory.image);
    }

    try {
      await axiosInstance.put(
        `${backendLink}/api/v1/update-event-category/${editingCategory._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...headers,
          },
        }
      );
      setShowEditModal(false);
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const deleteCategory = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirm) return;

    try {
      await axiosInstance.delete(
        `${backendLink}/api/v1/delete-event-category/${id}`,
        {
          headers,
        }
      );
      setShowEditModal(false);
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Event Categories
      </h2>

      <form
        onSubmit={handleCreateCategory}
        className="flex flex-col md:flex-row items-center gap-3 bg-gray-50 border border-gray-200 rounded-md p-4 shadow-sm mb-6"
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="title"
          value={newCategory.title}
          onChange={handleInputChange}
          placeholder="Category Title"
          className="px-3 py-2 text-sm border rounded w-full md:w-40"
          required
        />
        <input
          type="text"
          name="description"
          value={newCategory.description}
          onChange={handleInputChange}
          placeholder="Short Description"
          className="px-3 py-2 text-sm border rounded w-full md:w-60"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="text-sm w-full md:w-48"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      {categories.length === 0 ? (
        <div className="text-center text-gray-500">
          No categories found. Please add a new category.
        </div>
      ) : (
        <ul className="space-y-4">
          {categories.map((cat) => (
            <li
              key={cat._id}
              className="flex justify-between items-center bg-white border rounded p-4 shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                {cat.image && (
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                )}
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {cat.title}
                  </p>
                  <p className="text-xs text-gray-500">{cat.description}</p>
                </div>
              </div>
              <button
                className="text-xs bg-gray-100 px-3 py-1 rounded hover:bg-yellow-400 hover:text-white transition"
                onClick={() => openEditModal(cat)}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}

      {showEditModal && editingCategory && (
        <EditCategoryModal
          category={editingCategory}
          onClose={() => setShowEditModal(false)}
          onUpdate={updateCategory}
          onDelete={() => deleteCategory(editingCategory._id)}
          onChange={handleEditInputChange}
          onImageChange={handleEditImageChange}
        />
      )}
    </div>
  );
};

export default CategoryManager;
