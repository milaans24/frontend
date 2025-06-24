import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../extras/axiosInstance";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👈 Import React Icons

const ResetPassword = () => {
  const backendLink = useSelector((state) => state.prod.link);
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await axiosInstance.post(
        `${backendLink}/api/v1/reset-password`,
        {
          token,
          password,
        }
      );
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded shadow-xl w-96">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Reset Password
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* New Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="bg-gray-100 rounded px-4 py-2 w-full outline-none pr-10"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute top-3 right-4 cursor-pointer text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </span>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="bg-gray-100 rounded px-4 py-2 w-full outline-none pr-10"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="absolute top-3 right-4 cursor-pointer text-gray-600"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
                <FaEyeSlash size={18} />
              ) : (
                <FaEye size={18} />
              )}
            </span>
          </div>

          <button className="bg-sky-900 text-white rounded px-4 py-2 w-full">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
