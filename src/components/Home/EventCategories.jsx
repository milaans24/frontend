import React, { useEffect, useState } from "react";
import axiosInstance from "../../extras/axiosInstance";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const EventCategories = () => {
  const backendLink = useSelector((state) => state.prod.link);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const [categories, setCategories] = useState([]);

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 mb-16">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
        🎉 Explore Event Categories
      </h2>

      {categories.length === 0 ? (
        <div className="text-center text-gray-500 text-sm mt-10">
          No categories available. Please check back later.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              to={`/event/${cat._id}`}
              key={cat._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 p-5 border border-gray-100 cursor-pointer"
            >
              {cat.image && (
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-20 h-20 object-cover rounded-lg mb-4 mx-auto"
                />
              )}

              <h3 className="text-lg font-semibold text-center text-gray-800 mb-1">
                {cat.title}
              </h3>
              <p className="text-sm text-gray-600 text-center line-clamp-2">
                {cat.description || "No description available."}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventCategories;
