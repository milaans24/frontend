import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import ViewBookDetails from "./pages/ViewBookDetails";
import { authActions } from "./store/auth";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Favourite from "./pages/Favourite";
import OrderHistory from "./pages/OrderHistory";
import Settings from "./pages/Settings";
import AllOrders from "./components/AdminPages/AllOrders";
import AddBook from "./components/AdminPages/AddBook";
import UpdateBooks from "./components/AdminPages/UpdateBooks";
import Books from "./pages/Books";
import Packages from "./pages/Packages";
import SearchResult from "./pages/SearchResult";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ManualPayments from "./pages/ManualPayments";
import AboutUs from "./pages/AboutUs";
import OurPolicy from "./pages/OurPolicy";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import axios from "axios";
const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const backendLink = useSelector((state) => state.prod.link);
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
      const fetch = async () => {
        const response = await axios.get(`${backendLink}/api/v1/getUserData`, {
          headers,
        });
        dispatch(authActions.userCart(response.data.cart.books.length));
      };
      fetch();
    }
  }, []);
  return (
    <div className="">
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/our-policy" element={<OurPolicy />} />
        <Route path="/all-books" element={<Books />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/manual-payment/:id" element={<ManualPayments />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />}>
          {role !== "admin" ? (
            <Route index element={<Favourite />} />
          ) : (
            <Route index element={<AllOrders />} />
          )}
          {role === "admin" && (
            <Route path="/profile/add-book" element={<AddBook />} />
          )}
          <Route path="/profile/OrderHistory" element={<OrderHistory />} />
          <Route path="/profile/settings" element={<Settings />} />
        </Route>
        {role === "admin" && (
          <Route path="/update-book/:id" element={<UpdateBooks />} />
        )}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
