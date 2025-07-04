import React, { useEffect, useState } from "react";
import axiosInstance from "../extras/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { authActions } from "../store/auth";
const Cart = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const backendLink = useSelector((state) => state.prod.link);
  const [cartBooks, setCartBooks] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [Name, setName] = useState("");
  const dispatch = useDispatch();
  const [PinCode, setPinCode] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const [mobileNumber, setMobileNumber] = useState("");

  const placeOrder = async () => {
    if (!address.trim()) {
      toast.error("Please enter a shipping address");
      return;
    }
    if (!mobileNumber.trim()) {
      toast.error("Please enter a valid mobile number");
      return;
    }
    if (mobileNumber.trim().length < 10 || mobileNumber.trim().length > 10) {
      toast.error("Please enter a valid mobile number");
      return;
    }
    if (PinCode.trim().length < 6 || PinCode.trim().length > 6) {
      toast.error("Please enter a valid pin code");
      return;
    }
    try {
      const res = await axiosInstance.post(
        `${backendLink}/api/v1/place-order`,
        {
          order: cartBooks,
          address,
          mobileNumber,
          total: cartBooks.length * 50 + total,
          Name,
          PinCode,
        },
        { headers }
      );

      navigate(`/manual-payment/${res.data.orderId}`);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    } else {
      const fetchCart = async () => {
        try {
          const res = await axiosInstance.get(
            `${backendLink}/api/v1/get-user-cart`,
            {
              headers,
            }
          );
          if (res.data.status === "Success") {
            setCartBooks(res.data.data.books || []);
            setAddress(res.data.data.address || "");
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchCart();
    }
  }, []);

  useEffect(() => {
    setTotal(
      cartBooks.reduce(
        (acc, item) => acc + item.bookId.price * item.quantity,
        0
      )
    );
  }, [cartBooks]);

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await axiosInstance.put(
        `${backendLink}/api/v1/update-cart`,
        { bookId: id, quantity: newQuantity },
        { headers }
      );
      setCartBooks(
        cartBooks.map((item) =>
          item.bookId._id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const res = await axiosInstance.put(
        `${backendLink}/api/v1/remove-from-cart/${id}`,
        {},
        { headers }
      );
      setCartBooks(cartBooks.filter((item) => item.bookId._id !== id));
      dispatch(authActions.userCart(res.data.cartSize));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };
  // console.log(cartBooks);
  return (
    <div className="h-auto">
      {loading ? (
        <Loader />
      ) : cartBooks.length === 0 ? (
        <div className="h-auto my-8 md:my-0 md:h-screen  w-full text-2xl flex flex-col gap-8 items-center justify-center font-semibold ">
          <h1 className="text-3xl font-bold text-zinc-600">
            Your cart is empty
          </h1>
          <img src="./empty-cart.png" alt="empty-cart" className="h-[30vh]" />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8 px-8 md:px-0">
          <div className="w-full md:w-2/3 md:ps-8">
            <h1 className="my-8 text-3xl font-semibold">Shopping Cart</h1>
            <div className="flex items-center gap-4 mb-4 ">
              <div className="text-zinc-700 md:font-semibold w-3/6 flex items-center gap-4">
                <h2>Product</h2>
              </div>
              <div className=" text-zinc-700 md:font-semibold w-2/6 md:w-1/6 flex items-center gap-3 text-sm md:text-normal">
                <h2>Quantity</h2>
              </div>
              <div className="text-zinc-700 md:font-semibold hidden md:block md:w-1/6  text-sm md:text-normal ">
                <h2>Price</h2>
              </div>
              <div className="text-zinc-700 md:font-semibold w-1/6 font-semibold">
                <h2>Total</h2>
              </div>
              {/* Delete Button */}
              <div className="text-zinc-700 w-1/6 md:font-semibold ">
                <h2>Action</h2>
              </div>
            </div>
            <hr className="mb-8" />
            {cartBooks.map((item) => (
              <div
                key={item.bookId._id}
                className="flex items-center gap-4 mb-8 "
              >
                <div className="w-3/6 flex items-center gap-4">
                  <img
                    src={item.bookId.urls[0]}
                    alt={item.bookId.title}
                    className="h-[4vh] md:h-[10vh] object-cover"
                  />
                  <h1 className="text-sm md:text-normal md:font-semibold">
                    {item.bookId.title}
                  </h1>
                </div>
                <div className=" w-2/6 md:w-1/6 flex items-center gap-3 text-sm md:text-normal">
                  <button
                    className="md:border md:px-2"
                    onClick={() =>
                      updateQuantity(item.bookId._id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span className=" text-center">{item.quantity}</span>
                  <button
                    className="md:border md:px-2 "
                    onClick={() =>
                      updateQuantity(item.bookId._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <div className="hidden md:block md:w-1/6 md:font-semibold text-sm md:text-normal ">
                  ₹ {item.bookId.price}
                </div>
                <div className="w-1/6 font-semibold">
                  ₹ {item.bookId.price * item.quantity}
                </div>
                {/* Delete Button */}
                <div className="w-1/6">
                  <button
                    className="border p-2 text-red-600 hover:border-red-100 hover:shadow rounded-full"
                    onClick={() => deleteItem(item.bookId._id)}
                  >
                    <MdOutlineDeleteOutline className="text-xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-zinc-100 h-auto md:min-h-screen w-full md:w-1/3 px-8 pb-8">
            <h1 className="my-8 text-3xl font-semibold">Order Summary</h1>
            <hr className="my-8" />
            <div className="mt-2 flex justify-between">
              <h2>{cartBooks.length} Items</h2> <h2>₹ {total}</h2>
            </div>
            <div className="mt-2 flex justify-between ">
              <h2> Delivery Charges</h2> <h2>₹{cartBooks.length * 50}</h2>
            </div>
            <hr className="mt-2" />
            <div className="mt-2 flex justify-between ">
              <h2> Total</h2> <h2>₹{cartBooks.length * 50 + total}</h2>
            </div>
            <div className="my-8">
              <div className="my-4">
                <h2 className="text-sm">Your Full Name</h2>
                <input
                  type="text"
                  required
                  className="mt-2 border border-black rounded w-full px-4 py-2"
                  placeholder="Enter Your Full Name"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div className="my-4">
                <h2 className="text-sm">Mobile Number</h2>
                <input
                  type="number"
                  required
                  className="mt-2 border border-black rounded w-full px-4 py-2"
                  placeholder="Enter Mobile Number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                ></input>
              </div>
              <div className="my-4">
                <h2 className="text-sm">PIN Code</h2>
                <input
                  type="number"
                  required
                  className="mt-2 border border-black rounded w-full px-4 py-2"
                  placeholder="Enter PIN Code"
                  value={PinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                ></input>
              </div>
              <h2 className="text-sm">Shipping Address</h2>
              <textarea
                className="mt-2 border border-black rounded w-full px-4 py-2"
                placeholder="Enter Delivery Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>

            <button
              className="bg-sky-900 rounded px-4 py-2 w-full text-white  font-semibold hover:bg-sky-800"
              onClick={placeOrder}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
