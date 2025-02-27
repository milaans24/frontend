import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
const BookCard = ({ image, title, author, price, bookid, fav }) => {
  const headers = {
    bookid: bookid,
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const backendLink = useSelector((state) => state.prod.link);
  const removeFromFavourite = async () => {
    try {
      const response = await axios.put(
        `${backendLink}/api/v1/remove-from-favourite`,
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full border shadow border-zinc-300  text-zinc-900 rounded">
      <Link to={`/view-book-details/${bookid}`} className="">
        <img src={image} alt="book" className="h-84 object-cover" />

        <div className=" px-4 py-2">
          {" "}
          <h1 className="mt-4  font-semibold">{title}</h1>
          <p className="mt-1 text-zinc-700 text-sm font-semibold">
            Author: {author}
          </p>
          <p className="mt-1 text-zinc-900 font-semibold ">₹ {price}</p>
          {fav === true && (
            <button
              className="mt-4 bg-red-100 text-sm w-full rounded text-red-600  py-2 font-semibold hover:bg-red-200 transition-all duration-300"
              onClick={removeFromFavourite}
            >
              Remove
            </button>
          )}
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
