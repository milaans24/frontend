import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../extras/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
const ForgotPassword = () => {
  const backendLink = useSelector((state) => state.prod.link);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `${backendLink}/api/v1/forgot-password`,
        { email }
      );
      toast.success(response.data.message || "Password reset link sent!");
      setEmail("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send reset link!"
      );
    }
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password | Reset Your Account</title>
        <meta
          name="description"
          content="Enter your email to receive a password reset link."
        />
        <meta
          property="og:title"
          content="Forgot Password | Reset Your Account"
        />
        <meta
          property="og:description"
          content="Forgot your password? Enter your email to reset it."
        />
        <meta property="og:image" content="./milaanlogo.png" />
        <meta
          property="og:url"
          content="http://milaanpublication.in/forgot-password"
        />
      </Helmet>
      <div className="h-auto md:h-screen flex flex-col-reverse md:flex-row">
        <div className="w-full md:w-4/6 h-[100%]">
          <img
            src="./ai-register.jpeg"
            alt="Forgot Password Page"
            className="w-[100%] h-screen object-cover"
          />
        </div>
        <div className="w-full my-12 md:my-0 md:w-2/6 flex items-center justify-center h-[100%]">
          <div className="border rounded shadow px-6 py-8 w-full mx-8 hover:shadow-xl transition-all duration-300">
            <h1 className="text-2xl font-bold text-center">Forgot Password</h1>
            <form onSubmit={submit} className="mt-4">
              <div>
                <input
                  type="email"
                  className="w-full mt-2 bg-zinc-200 rounded px-4 py-2 outline-none"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full bg-sky-900 text-white font-semibold py-2 rounded hover:bg-sky-800 transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
              <p className="flex mt-4 items-center justify-center text-zinc-800 font-semibold">
                Remember your password? &nbsp;
                <Link to="/login" className="hover:text-blue-500">
                  <u>Login</u>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
