import React, { useEffect, useState } from "react";
import Loader from "../../pages/Loader";
import { FaUserLarge, FaCheck } from "react-icons/fa6";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from "./SeeUserData";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllOrders = () => {
  const [OrderHistory, setOrderHistory] = useState();
  const [userDiv, setuserDiv] = useState("hidden");
  const [userDivData, setuserDivData] = useState();
  const [EditableDiv, setEditableDiv] = useState(-1);
  const [EditablePaymentDiv, setEditablePaymentDiv] = useState(-1);
  const [Values, setValues] = useState({ status: "" });
  const [PaymentValues, setPaymentValues] = useState({ paymentStatus: "" });
  const [PaymentData, setPaymentData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const backendLink = useSelector((state) => state.prod.link);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${backendLink}/api/v1/get-all-orders`, {
          headers,
        });
        setOrderHistory(res.data.data);
      } catch (error) {
        console.error("Failed to fetch order history:", error);
      }
    };
    fetchOrders();
  }, []);

  const changeOrderStatus = (e) => {
    setValues({ status: e.target.value });
  };

  const changePaymentStatus = (e) => {
    setPaymentValues({ paymentStatus: e.target.value });
  };

  const updateOrderStatus = async (i) => {
    const order = OrderHistory[i];
    if (order) {
      const id = order._id;
      try {
        const response = await axios.put(
          `${backendLink}/api/v1/update-status/${id}`,
          { status: Values.status },
          { headers }
        );
        toast.success(response.data.message);
        setOrderHistory((prevOrders) =>
          prevOrders.map((o) =>
            o._id === id ? { ...o, orderStatus: Values.status } : o
          )
        );
      } catch (error) {
        console.error("Failed to update status:", error);
        toast.error("Failed to update order status");
      }
    }
  };

  const updatePaymentStatus = async (i) => {
    const order = OrderHistory[i];
    if (order) {
      const id = order._id;
      try {
        const response = await axios.put(
          `${backendLink}/api/v1/update-payment-status/${id}`,
          { paymentStatus: PaymentValues.paymentStatus },
          { headers }
        );
        toast.success(response.data.message);
        setOrderHistory((prevOrders) =>
          prevOrders.map((o) =>
            o._id === id
              ? { ...o, paymentStatus: PaymentValues.paymentStatus }
              : o
          )
        );
      } catch (error) {
        console.error("Failed to update payment status:", error);
        toast.error("Failed to update payment status");
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
        <div className="h-[80vh] overflow-y-auto text-zinc-100 text-sm border bg-gray-100 rounded-md">
          <div className="sticky top-0 bg-sky-900 w-full rounded py-2 px-4 flex gap-2 text-white">
            <div className="w-1/6 ">Sr.</div>
            <div className="w-1/6 ">Books</div>
            <div className="w-1/6 text-center">Quantity</div>
            <div className="w-1/6 text-center">Price</div>
            <div className="w-1/6 text-center">Order Status</div>
            <div className="w-1/6 text-center">Payment Status</div>
            <div className="w-1/6 flex items-center justify-center">
              <FaUserLarge />
            </div>
          </div>
          {OrderHistory.map((items, i) => (
            <div
              key={i}
              className="border bg-white m-2 text-black mb-2 w-full rounded py-2 px-4 flex hover:shadow hover:cursor-pointer transition-all duration-300"
            >
              <div className="w-4/6">
                {items.books.map((book, index) => (
                  <div
                    key={index}
                    className={`flex ${index > 0 ? "mt-3" : ""}`}
                  >
                    <div className="w-1/4">{index + 1}</div>
                    <div className="w-1/4">
                      <Link
                        to={`/view-book-details/${book.book._id}`}
                        className="hover:text-sky-900 text-center"
                      >
                        {book.book.title}
                      </Link>
                    </div>
                    <div className="w-1/4 text-center">X {book.quantity}</div>
                    <div className="w-1/4 text-center">₹ {book.book.price}</div>
                  </div>
                ))}
              </div>

              {/* Order Status */}
              <div className="w-1/6 flex flex-col gap-2 items-center">
                <button
                  className="border px-2 py-1 rounded text-sm hover:scale-105"
                  onClick={() => setEditableDiv(i)}
                >
                  {items.orderStatus}
                </button>
                {EditableDiv === i && (
                  <div className="flex items-center justify-center mt-2">
                    <select
                      className="bg-gray-100"
                      onChange={changeOrderStatus}
                    >
                      {[
                        "In progress",
                        "Order placed",
                        "Out for delivery",
                        "Delivered",
                        "Canceled",
                      ].map((status, index) => (
                        <option value={status} key={index}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <button
                      className="text-green-500 hover:text-pink-600 mx-2"
                      onClick={() => {
                        setEditableDiv(-1);
                        updateOrderStatus(i);
                      }}
                    >
                      <FaCheck />
                    </button>
                  </div>
                )}
              </div>

              {/* Payment Status */}
              <div className="w-1/6 flex flex-col gap-2 items-center">
                <button
                  className="border px-2 py-1 rounded text-sm hover:scale-105"
                  onClick={() => setEditablePaymentDiv(i)}
                >
                  {items.paymentStatus}
                </button>
                {EditablePaymentDiv === i && (
                  <div className="flex items-center justify-center mt-2">
                    <select
                      className="bg-gray-100"
                      onChange={changePaymentStatus}
                    >
                      {["Not done", "In progress", "Failed", "Success"].map(
                        (status, index) => (
                          <option value={status} key={index}>
                            {status}
                          </option>
                        )
                      )}
                    </select>
                    <button
                      className="text-green-500 hover:text-pink-600 mx-2"
                      onClick={() => {
                        setEditablePaymentDiv(-1);
                        updatePaymentStatus(i);
                      }}
                    >
                      <FaCheck />
                    </button>
                  </div>
                )}
              </div>
              <div className="w-1/6 text-center">
                <button
                  className="text-xl hover:text-orange-500"
                  onClick={() => {
                    setuserDiv("fixed");
                    setuserDivData({ ...items.user, address: items.address });
                    setPaymentData({
                      tId: items.transactionId,
                      total: items.total,
                    });
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
          PaymentData={PaymentData}
        />
      )}
    </>
  );
};

export default AllOrders;
