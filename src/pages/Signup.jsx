import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Signup = () => {
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    history("/");
  }
  const backendLink = useSelector((state) => state.prod.link);
  const [Data, setData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submit = async () => {
    try {
      if (
        Data.username === "" ||
        Data.email === "" ||
        Data.password === "" ||
        Data.address === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          `${backendLink}/api/v1/sign-up`,
          Data
        );
        setData({ username: "", email: "", password: "", address: "" });
        alert(response.data.message);
        history("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="h-auto bg-white px-12 py-8 flex items-center justify-center">
      <div className="border rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6 shadow-xl">
        <p className=" text-xl">Sign Up</p>
        <div className="mt-4">
          <div>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-200  rounded p-2 outline-none"
              placeholder="Username"
              name="username"
              required
              value={Data.username}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <input
              type="text"
              className="w-full mt-2 bg-zinc-200 rounded p-2 outline-none"
              placeholder="xyz@example.com"
              name="email"
              required
              value={Data.email}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <input
              type="password"
              className="w-full mt-2 bg-zinc-200 rounded p-2 outline-none "
              placeholder="Password"
              name="password"
              required
              value={Data.password}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <textarea
              className="w-full mt-2 bg-zinc-200 rounded p-2 outline-none "
              rows="5"
              placeholder="Address"
              name="address"
              required
              value={Data.address}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <button
              className="w-full bg-sky-900 text-white font-semibold py-2 rounded hover:bg-sky-800 transition-all duration-300"
              onClick={submit}
            >
              SignUp
            </button>
          </div>
          <p className="flex mt-4 items-center justify-center font-semibold">
            Or
          </p>
          <p className="flex mt-4 items-center justify-center text-zinc-900 font-semibold">
            Already have an account? &nbsp;
            <Link to="/login" className="hover:text-blue-500">
              <u>LogIn</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
