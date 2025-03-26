import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authActions } from "../../store/auth";
const BookCard = ({ image, title, author, price, bookid, fav }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const headers = {
    bookid: bookid,
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const backendLink = useSelector((state) => state.prod.link);
  const addToCart = async () => {
    try {
      const response = await axios.put(
        `${backendLink}/api/v1/add-to-cart`,
        {},
        { headers }
      );
      dispatch(authActions.userCart(response.data.cartSize));
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Failed to add to cart");
    }
  };
  const removeFromFavourite = async () => {
    try {
      const response = await axios.put(
        `${backendLink}/api/v1/remove-from-favourite`,
        {},
        { headers }
      );
      toast.success(response.data.message);
    } catch (error) {
      //console.log(error);
    }
  };
  return (
    <div className="w-full border shadow border-zinc-300  text-zinc-900 rounded flex flex-col justify-between">
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
      {isLoggedIn && (
        <div>
          <button
            className="bg-sky-900 w-full text-center text-white py-2 rounded hover:bg-sky-800 transition-all duration-300"
            onClick={addToCart}
          >
            Buy Book
          </button>
        </div>
      )}
    </div>
  );
};

export default BookCard;
