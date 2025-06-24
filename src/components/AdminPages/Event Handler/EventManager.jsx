import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../../../extras/axiosInstance";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const EventManager = () => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const backendLink = useSelector((state) => state.prod.link);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get(
          `${backendLink}/api/v1/get-event-categories`
        );
        setCategories(res.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !selectedCategory ||
      !title ||
      !description ||
      !image ||
      !startDate ||
      !endDate
    ) {
      toast.error("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", selectedCategory);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("image", image);

    try {
      const res = await axiosInstance.post(
        `${backendLink}/api/v1/create-event`,
        formData,
        {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      toast.success("Event created successfully!");

      // Reset form
      setTitle("");
      setDescription("");
      setImage(null);
      setStartDate("");
      setEndDate("");
      setSelectedCategory("");
    } catch (err) {
      console.error("Error creating event:", err);
      toast.error(err?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Create New Event
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Event Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
            placeholder="Enter event title"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
            required
          >
            <option value="" disabled>
              -- Select a category --
            </option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Event Rules / Description
          </label>
          <ReactQuill
            value={description}
            onChange={setDescription}
            theme="snow"
            className="mt-1"
            placeholder="Define event rules or description here..."
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Event Banner Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1"
          />
        </div>

        {/* Start and End Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
              required
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventManager;
