import React, { useState, useEffect } from "react";
import BookCard from "../components/Books/BookCard";
import axios from "axios";
const CategoryBooks = () => {
  // Get the current URL path
  const path = window.location.pathname;
  // Extract the category string after '/all-books/'
  const category = path.substring(path.lastIndexOf("/") + 1);
  const [Books, setBooks] = useState([]);
  console.log(category);
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:1000/api/v1/books-by-category/${category}`
      );
      setBooks(response.data.data);
    };
    fetch();
  }, [category]);

  return (
    <div className="px-12 py-8">
      {Books.length === 0 && (
        <div className="h-[80vh] text-zinc-500 px-12 flex items-center justify-center font-bold text-3xl">
          No such book found
        </div>
      )}
      {Books.length > 0 && (
        <div className="h-auto px-12 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
      )}{" "}
    </div>
  );
};

export default CategoryBooks;
