import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../store/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import { HiEye, HiEyeOff } from "react-icons/hi"; // Import eye icons

const Login = () => {
  const [Data, setData] = useState({ usernameOrEmail: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const backendLink = useSelector((state) => state.prod.link);
  const dispatch = useDispatch();

  // Redirect if already logged in
  if (isLoggedIn) {
    navigate("/");
  }

  // Handle input changes
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  // Handle form submission
  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendLink}/api/v1/login`, Data);

      setData({ usernameOrEmail: "", password: "" });

      // Dispatch login actions
      dispatch(authActions.login());
      dispatch(authActions.changeRole(response.data.role));

      // Save to localStorage
      localStorage.setItem("id", response.data._id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      toast.success("Login successful!");
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - Access Your Account | Milaan Publication</title>
        <meta
          name="description"
          content="Securely log in to your account and access exclusive features."
        />
        <meta
          property="og:title"
          content="Login | Access Your Account | Milaan Publication"
        />
        <meta
          property="og:description"
          content="Log in to your account securely and explore premium features."
        />
        <meta property="og:image" content="./milaanlogo.png" />
        <meta property="og:url" content="http://milaanpublication.in/login" />
      </Helmet>
      <div className="h-auto md:h-screen flex flex-col-reverse md:flex-row">
        <div className="w-full md:w-4/6 h-[100%]">
          <img
            src="./ai-register.jpeg"
            alt="Login Page"
            className="w-[100%] h-screen object-cover"
          />
        </div>
        <div className="w-full my-12 md:my-0 md:w-2/6 flex items-center justify-center h-[100%]">
          <div className="border rounded shadow px-6 py-8 w-full mx-8 hover:shadow-xl transition-all duration-300">
            <h1 className="text-2xl font-bold text-center">
              Login to Your Account
            </h1>
            <form onSubmit={submit} className="mt-4">
              {/* Username or Email */}
              <div>
                <input
                  type="text"
                  className="w-full mt-2 bg-zinc-200 rounded px-4 py-2 outline-none"
                  placeholder="Username / Email"
                  name="usernameOrEmail"
                  value={Data.usernameOrEmail}
                  onChange={change}
                  required
                />
              </div>

              {/* Password */}
              <div className="mt-4 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full mt-2 bg-zinc-200 rounded px-4 py-2 outline-none pr-10"
                  placeholder="Password"
                  name="password"
                  value={Data.password}
                  onChange={change}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-[60%] transform -translate-y-1/2 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>
              </div>

              {/* Submit Button */}
              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full bg-sky-900 text-white font-semibold py-2 rounded hover:bg-sky-800 transition-all duration-300"
                >
                  LogIn
                </button>
              </div>

              <p className="flex mt-4 items-center justify-center font-semibold">
                Or
              </p>
              <p className="flex mt-4 items-center justify-center text-zinc-800 font-semibold">
                Don't have an account? &nbsp;
                <Link to="/signup" className="hover:text-blue-500">
                  <u>Sign Up</u>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
