import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../store/auth";

const Login = () => {
  const [Data, setData] = useState({ username: "", password: "" });
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const backendLink = useSelector((state) => state.prod.link);
  if (isLoggedIn === true) {
    history("/");
  }

  const dispatch = useDispatch();
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      if (Data.username === "" || Data.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(`${backendLink}/api/v1/login`, Data);
        setData({ username: "", password: "" });
        dispatch(authActions.login());
        history("/profile");
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data._id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="bg-white h-screen px-12 py-8 flex items-center justify-center">
      <div className=" border shadow-xl rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className=" text-xl">Login</p>
        <div className="mt-4">
          <div>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-200 rounded   px-4 py-2 outline-none"
              placeholder="Username / Email"
              name="username"
              required
              value={Data.username}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <input
              type="password"
              className="w-full mt-2 bg-zinc-200 rounded   px-4 py-2 outline-none "
              placeholder="Password"
              name="password"
              required
              value={Data.password}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <button
              className="w-full bg-sky-900 text-white font-semibold py-2 rounded hover:bg-sky-800 transition-all duration-300"
              onClick={submit}
            >
              LogIn
            </button>
          </div>
          <p className="flex mt-4 items-center justify-center  font-semibold">
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
  );
};

export default Login;
