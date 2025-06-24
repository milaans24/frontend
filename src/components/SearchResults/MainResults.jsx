import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../pages/Loader";
import BookCard from "../Books/BookCard";
import axiosInstance from "../../extras/axiosInstance";

const MainResults = ({ value }) => {
  const [Books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ Loader state
  const backendLink = useSelector((state) => state.prod.link);

  useEffect(() => {
    const fetchAllBooks = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `${backendLink}/api/v1/search?book=${value}`
        );
        setBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching books", error);
      }
      setLoading(false);
    };

    fetchAllBooks();
  }, [value]);

  return (
    <div className="mb-4 md:mb-6 lg:mb-12">
      <h1 className="text-3xl md:text-4xl lg:text-5xl text-center font-bold text-sky-900">
        Search Results
      </h1>

      {loading ? (
        <Loader />
      ) : Books.length === 0 ? (
        <h3 className="text-center my-12 text-3xl font-bold text-zinc-400">
          No Result Found
        </h3>
      ) : (
        <div className="h-auto md:px-12 mt-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
            {Books.map((items, i) => (
              <BookCard
                bookid={items._id}
                image={items.url}
                title={items.title}
                author={items.author}
                price={items.price}
                key={i}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainResults;
