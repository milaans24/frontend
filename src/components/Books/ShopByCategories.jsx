import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
const ShopByCategories = () => {
  const [cat, setCategories] = useState();
  const [SearchValue, setSearchValue] = useState("");
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const backendLink = useSelector((state) => state.prod.link);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCat = async () => {
      const response = await axios.get(`${backendLink}/api/v1/categories`, {
        headers,
      });
      setCategories(response.data.categories);
    };
    fetchCat();
  }, []);

  const searchHandler = (e) => {
    e.preventDefault();
    navigate(`/search?book=${SearchValue}`);
    setSearchValue("");
  };
  return (
    <div className="flex flex-col my-4 md:my-6 lg:my-12 md:h-auto">
      {/*<h1 className="text-3xl md:text-4xl lg:text-5xl text-center font-semibold">
        Shop by Categories
      </h1>*/}

      <div className="flex items-center justify-center mt-4">
        <form className="w-full md:w-4/6 bg-sky-900  h-12 rounded flex gap-8 px-8 text-zinc-200">
          <input
            type="input"
            className="bg-transparent w-full h-full outline-none font-semibold "
            placeholder="search by book name"
            required
            value={SearchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button onClick={searchHandler}>
            <IoSearch className="text-xl" />
          </button>
        </form>
      </div>

      {/* <hr className=" h-1  my-6 lg:my-12" /> <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-10">
        {cat &&
          cat.map((items) => (
            <Link
              to={`/bookstore`}
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

              <p className="font-bold text-sky-900 text-sm md:text-normal mt-4 text-center">
                {items.title}
              </p>
            </Link>
          ))}
        <Link
          to={`/all-books`}
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
      </div>*/}
    </div>
  );
};

export default ShopByCategories;
