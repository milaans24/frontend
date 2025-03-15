import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { GoHeartFill } from "react-icons/go";
import { GrLanguage } from "react-icons/gr";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const ViewBookDetails = () => {
  const { id } = useParams();
  const role = useSelector((state) => state.auth.role);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const history = useNavigate();
  const [Book, setBook] = useState();
  const [showConfirm, setShowConfirm] = useState(false);
  const backendLink = useSelector((state) => state.prod.link);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      try {
        const res = await axios.get(
          `${backendLink}/api/v1/get-book-by-id/${id}`
        );
        setBook(res.data.data);
      } catch (error) {
        toast.error("Failed to fetch book details");
      }
    };
    fetch();
  }, [id, backendLink]);

  const headers = {
    bookid: id,
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const addToFavourite = async () => {
    try {
      const response = await axios.put(
        `${backendLink}/api/v1/add-to-favourite`,
        {},
        { headers }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Failed to add to favourites");
    }
  };

  const addToCart = async () => {
    try {
      const response = await axios.put(
        `${backendLink}/api/v1/add-to-cart`,
        {},
        { headers }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Failed to add to cart");
    }
  };

  const deleteBook = async () => {
    try {
      const response = await axios.delete(`${backendLink}/api/v1/delete-book`, {
        headers,
      });
      toast.success(response.data.message);
      history("/all-books");
    } catch (error) {
      toast.error("Failed to delete book");
    }
  };

  return (
    <>
      {Book && (
        <Helmet>
          <title>{Book.title} - Book Details</title>
          <meta name="description" content={Book.desc} />
        </Helmet>
      )}
      {!Book && <Loader />}
      {Book && (
        <div className="flex-col md:flex-row flex px-4 md:px-6 lg:px-10 my-12 gap-8">
          <div className={`w-full md:w-1/5 flex items-start justify-center`}>
            {/* Swiper Carousel for Book Images */}
            <Swiper
              navigation
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination]}
              className="w-full h-full md:h-auto"
            >
              {Book.urls.map((imgUrl, index) => (
                <SwiperSlide key={index} className="flex justify-center">
                  <img
                    src={imgUrl}
                    alt={Book.title}
                    className="h-full md:h-auto rounded"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className={`w-full ${isLoggedIn ? "md:w-3/5" : "md:w-4/5"}`}>
            <h1 className="text-4xl font-semibold">{Book.title}</h1>
            <p className="text-zinc-400 mt-2">by {Book.author}</p>
            <p className="text-red-600 font-semibold mt-8">Book cost</p>
            <p className="bg-zinc-900 px-4 py-2 rounded mt-2 mb-8 text-zinc-100 text-2xl font-bold w-fit">
              ₹ {Book.price}
            </p>
            <p className="text-zinc-700 font-semibold mt-8">
              Short Description
            </p>
            <p className="mt-2 mb-8 font-semibold">{Book.desc}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-400">
              <GrLanguage className="me-3" /> {Book.language}
            </p>
          </div>
          {isLoggedIn && (
            <div className="rounded w-full md:w-1/5 border shadow h-fit p-6 flex flex-col items-center justify-center">
              {role === "admin" && (
                <div className="flex flex-row gap-8 md:gap-0 md:flex-col">
                  <Link
                    to={`/update-book/${id}`}
                    className="bg-zinc-100 p-3 rounded font-semibold hover:bg-zinc-200 transition-all duration-300 flex items-center"
                  >
                    <FaRegEdit className="me-4" /> Edit book
                  </Link>
                  <button
                    className="mt-0 md:mt-8 bg-red-500 text-white p-3 rounded font-semibold flex items-center hover:bg-red-600 transition-all duration-300"
                    onClick={() => setShowConfirm(true)}
                  >
                    <MdDelete className="me-4" /> Delete book
                  </button>
                </div>
              )}
              {role === "user" && (
                <div className="flex flex-row gap-8 md:gap-0 md:flex-col">
                  <button
                    className="bg-blue-700 text-white py-3 px-6 rounded md:rounded-full font-semibold flex items-center hover:bg-blue-600 transition-all duration-300"
                    onClick={addToCart}
                  >
                    <FaCartShopping className="me-1 md:me-4" /> Add to cart
                  </button>
                  <button
                    className="mt-0 md:mt-4 bg-zinc-100 py-3 px-6 rounded md:rounded-full font-semibold hover:bg-zinc-200 transition-all duration-300 flex items-center"
                    onClick={addToFavourite}
                  >
                    <GoHeartFill className="me-1 md:me-4" /> Favourites
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-xl font-semibold">
              Are you sure you want to delete this book?
            </h2>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={deleteBook}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
