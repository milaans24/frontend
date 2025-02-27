import React, { useEffect, useState } from "react";
import BookCard from "../components/Books/BookCard";
import axios from "axios";
import Loader from "./Loader";
import { useSelector } from "react-redux";
const AllBooks = () => {
  const [Books, setBooks] = useState([]);
  const backendLink = useSelector((state) => state.prod.link);
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get(`${backendLink}/api/v1/get-all-books`);
        setBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching all books", error);
      }
    };
    fetchAllBooks();
  }, []);

  return (
    <div className="my-12">
      {!Books.length && <Loader />}
      <h1 className="text-center text-3xl font-semibold ">Available Books</h1>
      {Books.length > 0 && (
        <div className="h-auto px-12 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
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

export default AllBooks;
