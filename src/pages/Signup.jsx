import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
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
      const response = await axios.post(`${backendLink}/api/v1/sign-up`, Data);
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
            <input
              type="password"
              className="w-full mt-4 bg-zinc-200 rounded p-2 outline-none"
              placeholder="Password"
              name="password"
              value={Data.password}
              onChange={change}
              required
            />
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
