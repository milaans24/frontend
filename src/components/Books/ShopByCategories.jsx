import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
const ShopByCategories = () => {
  const [cat, setCategories] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const backendLink = useSelector((state) => state.prod.link);
  useEffect(() => {
    const fetchCat = async () => {
      const response = await axios.get(`${backendLink}/api/v1/categories`, {
        headers,
      });
      setCategories(response.data.categories);
    };
    fetchCat();
  }, []);

  return (
    <div className="flex flex-col pb-8">
      <h1 className="text-5xl text-center font-semibold">Shop by Categories</h1>

      <div className="flex items-center justify-center mt-8">
        <div className="w-4/6 bg-sky-900  h-12 rounded flex gap-8 px-8 text-zinc-200">
          <input
            type="input"
            className="bg-transparent w-full h-full outline-none font-semibold "
            placeholder="search by book name"
          />
          <button>
            <IoSearch className="text-xl" />
          </button>
        </div>
      </div>
      <hr className=" h-1 my-12" />
      <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-10">
        {cat &&
          cat.map((items) => (
            <Link
              to={`/books/${items.title}`}
              className="flex flex-col gap-2 items-center justify-center"
            >
              <div className="relative flex items-center justify-center">
                <img
                  src="https://m.media-amazon.com/images/I/41ZeaEn3V4L._SY445_SX342_.jpg"
                  alt={items.title}
                  className="h-24 w-fit z-10"
                />
                <div className="absolute top-6 h-24 w-24  bg-orange-100 -z-20 rounded-full"></div>
              </div>

              <p className="font-bold text-sky-900 mt-4">{items.title}</p>
            </Link>
          ))}
        <Link
          to={`/books/discount`}
          className="flex flex-col gap-2 items-center justify-center"
        >
          <div className="relative flex items-center justify-center">
            <img
              src="./discount.png"
              alt="dsicounts"
              className="h-24 w-fit z-10"
            />
          </div>

          <p className="font-bold text-sky-900 mt-4">Discounts</p>
        </Link>
      </div>
    </div>
  );
};

export default ShopByCategories;
