import React from "react";
const EditCategoryModal = ({
  category,
  onClose,
  onUpdate,
  onDelete,
  onChange,
  onImageChange,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative animate-fadeInUp">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          X
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Edit Category
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="title"
            value={category.title}
            onChange={onChange}
            placeholder="Title"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="description"
            value={category.description}
            onChange={onChange}
            placeholder="Description"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="w-full text-sm"
          />
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={onUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Update
          </button>
          <button
            onClick={onDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;
