import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../extras/axiosInstance";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { HiEye, HiEyeOff } from "react-icons/hi";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const backendLink = useSelector((state) => state.prod.link);
  const [Data, setData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  if (isLoggedIn) {
    navigate("/");
  }

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `${backendLink}/api/v1/sign-up`,
        Data
      );
      setData({ username: "", email: "", password: "", address: "" });
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="h-auto bg-white flex flex-col-reverse md:flex-row">
      <Helmet>
        <title>Sign Up - Create Your Account</title>
        <meta
          name="description"
          content="Create an account to access exclusive features. Sign up today!"
        />
        <meta property="og:title" content="Sign Up - Create Your Account" />
        <meta
          property="og:description"
          content="Join us today by signing up and accessing exclusive features."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="w-full md:w-4/6 h-[100%]">
        <img
          src="./ai-register.jpeg"
          alt="Signup Page Illustration"
          className="w-full h-screen object-cover"
        />
      </div>
      <div className="w-full md:w-2/6 flex items-center justify-center h-[100%] px-8">
        <div className="border bg-white p-6 rounded my-12 w-full">
          <h1 className="text-2xl font-bold text-center mb-4">
            Create Your Account
          </h1>
          <form onSubmit={submit} className="mt-4">
            <input
              type="text"
              className="w-full mt-2 bg-zinc-200 rounded p-2 outline-none"
              placeholder="Username"
              name="username"
              value={Data.username}
              onChange={change}
              required
            />
            <input
              type="email"
              className="w-full mt-4 bg-zinc-200 rounded p-2 outline-none"
              placeholder="xyz@example.com"
              name="email"
              value={Data.email}
              onChange={change}
              required
            />
            <div className="relative mt-4">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-zinc-200 rounded p-2 outline-none pr-10"
                placeholder="Password"
                name="password"
                value={Data.password}
                onChange={change}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-[50%] transform -translate-y-1/2 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>
            <textarea
              className="w-full mt-4 bg-zinc-200 rounded p-2 outline-none"
              rows="5"
              placeholder="Address"
              name="address"
              value={Data.address}
              onChange={change}
              required
            />
            <button
              type="submit"
              className="w-full bg-sky-900 text-white font-semibold py-2 rounded hover:bg-sky-800 transition-all duration-300 mt-4"
            >
              Sign Up
            </button>
          </form>
          <p className="flex mt-4 items-center justify-center font-semibold">
            Or
          </p>
          <p className="flex mt-4 items-center justify-center text-zinc-900 font-semibold">
            Already have an account? &nbsp;
            <Link to="/login" className="hover:text-blue-500">
              <u>Log In</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
