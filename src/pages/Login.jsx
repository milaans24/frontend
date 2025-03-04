import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../store/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [Data, setData] = useState({ username: "", password: "" });
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const backendLink = useSelector((state) => state.prod.link);
  const dispatch = useDispatch();

  // Redirect if already logged in
  if (isLoggedIn) {
    history("/");
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
      if (Data.username.trim() === "" || Data.password.trim() === "") {
        toast.error("All fields are required!");
      } else {
        const response = await axios.post(`${backendLink}/api/v1/login`, Data);
        setData({ username: "", password: "" });
        dispatch(authActions.login());
        history("/profile");
        dispatch(authActions.changeRole(response.data.role));

        // Save to localStorage
        localStorage.setItem("id", response.data._id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        toast.success("Login successful!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div>
      <div className="h-auto md:h-screen flex flex-col-reverse md:flex-row">
        <div className="w-full md:w-4/6 h-[100%]">
          <img
            src="./ai-register.jpeg"
            alt="register"
            className="w-[100%] h-screen object-cover"
          />
        </div>
        <div className="w-full my-12 md:my-0 md:w-2/6 flex items-center justify-center h-[100%]">
          <div className="border rounded shadow px-6 py-4 w-full mx-8">
            <p className="text-xl">Login</p>
            <div className="mt-4">
              {/* Username */}
              <div>
                <input
                  type="text"
                  className="w-full mt-2 bg-zinc-200 rounded px-4 py-2 outline-none"
                  placeholder="Username / Email"
                  name="username"
                  value={Data.username}
                  onChange={change}
                />
              </div>

              {/* Password */}
              <div className="mt-4">
                <input
                  type="password"
                  className="w-full mt-2 bg-zinc-200 rounded px-4 py-2 outline-none"
                  placeholder="Password"
                  name="password"
                  value={Data.password}
                  onChange={change}
                />
              </div>

              {/* Submit Button */}
              <div className="mt-4">
                <button
                  className="w-full bg-sky-900 text-white font-semibold py-2 rounded hover:bg-sky-800 transition-all duration-300"
                  onClick={submit}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
