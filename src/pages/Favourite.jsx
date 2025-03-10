import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "../components/Books/BookCard";
import Loader from "./Loader";
import { useSelector } from "react-redux";

const Favourite = () => {
  const [FavBooks, setFavBooks] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const backendLink = useSelector((state) => state.prod.link);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${backendLink}/api/v1/get-favourite-books`, {
        headers,
      });

      setFavBooks(res.data.data);
    };
    fetch();
  });

  return (
    <>
      {!FavBooks && <Loader />}
      {FavBooks && FavBooks.length === 0 && (
        <div className="h-auto my-8 md:my-0 md:h-screen  w-full text-2xl flex flex-col gap-8 items-center justify-center font-semibold ">
          <h1 className="text-3xl font-bold text-zinc-600">
            No favourite book
          </h1>
          <img src="./star.png" alt="" className="h-[20vh]" />
        </div>
      )}
      {FavBooks && FavBooks.length > 0 && (
        <div className="">
          <h1 className="text-3xl md:text-5xl font-semibold text-sky-900 mb-8">
            Favourite books
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5  gap-8">
            {FavBooks.map((items, i) => (
              <BookCard
                bookid={items._id}
                image={items.url}
                title={items.title}
                author={items.author}
                price={items.price}
                key={i}
                fav={true}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Favourite;
