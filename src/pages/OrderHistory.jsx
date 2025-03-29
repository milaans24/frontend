import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const backendLink = useSelector((state) => state.prod.link);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${backendLink}/api/v1/get-order-history`, {
          headers,
        });
        setOrderHistory(res.data.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };
    fetchOrders();
  }, [backendLink]);
  return (
    <>
      {!orderHistory && <Loader />}
      {orderHistory && orderHistory.length === 0 && (
        <div className="h-auto my-8 md:my-0 md:h-screen  w-full text-2xl flex flex-col gap-8 items-center justify-center font-semibold ">
          <h1 className="text-3xl font-bold text-zinc-600">No order history</h1>
          <img
            src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
            alt="No Order"
            className="h-[30vh]"
          />
        </div>
      )}
      {orderHistory && orderHistory.length > 0 && (
        <div className="h-full p-0 md:px-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Your Order History
          </h1>
          {orderHistory.map((order, index) => (
            <div
              key={order._id}
              className="mb-6  p-6 rounded-lg border shadow text-black"
            >
              <h2 className="text-lg font-bold ">Order #{index + 1}</h2>
              <p className="text-sm ">Address: {order.address}</p>
              <p className="text-sm ">
                Status: &nbsp;
                <span
                  className={`font-semibold ${
                    order.orderStatus === "Order placed" ||
                    order.orderStatus === "In progress"
                      ? "text-yellow-500"
                      : order.orderStatus === "Canceled" ||
                        order.orderStatus === "Order not placed"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </p>
              <p className="text-sm ">
                Payment: &nbsp;
                <span
                  className={`font-semibold ${
                    order.paymentStatus === "In progress"
                      ? "text-yellow-500"
                      : order.paymentStatus === "Failed" ||
                        order.paymentStatus === "Not done"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </p>
              <div className="mt-4 bg-sky-900 text-white w-full rounded py-2 px-4 flex gap-2">
                <div className="w-1/6 text-center">Sr.</div>
                <div className="w-3/6">Book</div>
                <div className="w-1/6 text-center">Quantity</div>
                <div className="w-1/6 text-center">Price (per book)</div>
              </div>
              {order.books.map((item, i) => (
                <div
                  key={item.book._id}
                  className="bg-zinc-200 w-full rounded py-2 px-4 flex gap-4 text-black hover:bg-zinc-300 cursor-pointer transition-all duration-300"
                >
                  <div className="w-1/6 text-center">{i + 1}</div>
                  <div className="w-3/6">
                    <Link
                      to={`/view-book-details/${item.book._id}`}
                      className="hover:text-blue-500"
                    >
                      {item.book.title}
                    </Link>
                  </div>
                  <div className="w-1/6  text-center">{item.quantity}</div>
                  <div className="w-1/6 text-center">₹{item.book.price}</div>
                </div>
              ))}
              <hr />
              <div className="mt-4 flex justify-end">
                Total : ₹{order.total} (including delivery charges)
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default OrderHistory;
