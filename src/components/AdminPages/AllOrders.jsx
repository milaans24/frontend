import React, { useEffect, useState } from "react";
import Loader from "../../pages/Loader";
import { FaUserLarge } from "react-icons/fa6";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoOpenOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import SeeUserData from "./SeeUserData";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllOrders = () => {
  const [OrderHistory, setOrderHistory] = useState();
  const [userDiv, setuserDiv] = useState("hidden");
  const [userDivData, setuserDivData] = useState();
  const [Options, setOptions] = useState("hidden");
  const [EditableDiv, setEditableDiv] = useState(-1);
  const [Values, setValues] = useState({ status: "" });
  console.log(OrderHistory);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const backendLink = useSelector((state) => state.prod.link);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${backendLink}/api/v1/get-all-orders`, {
          headers,
        });
        setOrderHistory(res.data.data);
      } catch (error) {
        console.error("Failed to fetch order history:", error);
      }
    };
    fetch();
  }, []); // Removed OrderHistory from dependencies

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    const order = OrderHistory[i];
    if (order) {
      const id = order._id;
      try {
        const response = await axios.put(
          `${backendLink}/api/v1/update-status/${id}`,
          { status: Values.status }, // Ensure status is sent
          { headers }
        );
        toast.success(response.data.message);

        // ✅ Update local state to reflect the change without a full refresh
        setOrderHistory((prevOrders) =>
          prevOrders.map((o) =>
            o._id === id ? { ...o, status: Values.status } : o
          )
        );
      } catch (error) {
        console.error("Failed to update status:", error);
        toast.error("Failed to update order status");
      }
    }
  };

  return (
    <>
      {!OrderHistory && <Loader />}
      {OrderHistory && OrderHistory.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100 ">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
              No Order History
            </h1>
            <img
              src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
              alt=""
              className="h-[20vh] mb-8"
            />
          </div>
        </div>
      )}
      {OrderHistory && OrderHistory.length > 0 && (
        <div className="h-[100%]  text-zinc-100">
          <div className="mb-4 bg-sky-900 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-1/6 ">
              <h1 className="">Sr.</h1>
            </div>
            <div className="w-1/6 ">
              <h1 className="">Books</h1>
            </div>
            <div className="w-1/6 text-center">
              <h1 className="">Quantity</h1>
            </div>
            <div className="w-1/6 text-center">
              <h1 className="">Price</h1>
            </div>
            <div className="w-1/6 text-center">
              <h1 className="">Status</h1>
            </div>
            <div className="w-1/6 flex items-center justify-center ">
              <h1 className="">
                <FaUserLarge />
              </h1>
            </div>
          </div>
          {OrderHistory.map((items, i) => (
            <div
              key={i}
              className=" border text-black mb-8 w-full rounded py-2 px-4 flex hover:shadow hover:cursor-pointer transition-all duration-300 "
            >
              <div className="w-4/6">
                {items &&
                  items.books.map((book, i) => (
                    <>
                      <div className="flex ">
                        <div className="w-1/4">
                          <h1 className="">{i + 1}</h1>
                        </div>
                        <div className="w-1/4">
                          <Link
                            to={`/view-book-details/${book.book._id}`}
                            className="hover:text-sky-900 text-center"
                          >
                            {book.book.title}
                          </Link>
                        </div>
                        <div className="w-1/4">
                          <h1 className="text-center">X {book.quantity}</h1>
                        </div>
                        <div className="w-1/4">
                          <h1 className="text-center">₹ {book?.book.price}</h1>
                        </div>
                      </div>
                      <hr className="my-4" />
                    </>
                  ))}
              </div>

              <div className="w-1/6 flex  justify-center">
                <h1 className="font-semibold ">
                  <button
                    className={`${
                      Options === "hidden" ? "block" : "hidden"
                    } hover:scale-105 text-center  `}
                    onClick={() => setEditableDiv(i)}
                  >
                    {items?.status === "Order placed" ? (
                      <div className="text-yellow-500">{items?.status}</div>
                    ) : items?.status === "Canceled" ? (
                      <div className="text-red-500">{items?.status}</div>
                    ) : (
                      <div className="text-green-500">{items?.status}</div>
                    )}
                  </button>
                  <div
                    className={` ${
                      EditableDiv === i ? "block" : "hidden"
                    } flex mt-4  items-center justify-center`}
                  >
                    <select
                      name="status"
                      id=""
                      className=" bg-gray-100"
                      onChange={change}
                    >
                      {[
                        "Order placed",
                        "Out for delivery",
                        "Delivered",
                        "Canceled",
                      ].map((items, i) => (
                        <option value={items} key={i}>
                          {items}
                        </option>
                      ))}
                    </select>
                    <button
                      className="text-green-500 hover:text-pink-600 mx-2"
                      onClick={() => {
                        setEditableDiv(-1);
                        submitChanges(i);
                      }}
                    >
                      <FaCheck />
                    </button>
                  </div>
                </h1>
              </div>
              <div className="w-1/6 text-center ">
                <button
                  className=" text-xl hover:text-orange-500"
                  onClick={() => {
                    setuserDiv("fixed");
                    setuserDivData((prevData) => ({
                      ...items.user, // Spread existing user data
                      address: items.address, // Add or update the address
                    }));
                  }}
                >
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {userDivData && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setuserDiv={setuserDiv}
        />
      )}
    </>
  );
};

export default AllOrders;
