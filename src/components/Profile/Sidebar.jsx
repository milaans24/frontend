import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const Sidebar = ({ ProfileData }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state) => state.auth.role);
  const location = useLocation();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Function to handle logout
  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(authActions.changeRole("user"));
    localStorage.clear();
    history("/");
  };

  // Function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-auto rounded md:shadow lg:h-[100%] flex flex-col p-3 items-center justify-between">
      <div className="flex flex-col items-center w-full">
        <img src={ProfileData.avatar} alt="profile" className="h-[10vh]" />
        <p className="mt-3 text-xl font-semibold">{ProfileData.username}</p>
        <p className="mt-1 text-normal">{ProfileData.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
      </div>

      {role !== "admin" && (
        <div className="w-full flex-col items-center justify-center hidden lg:flex">
          <Link
            to="/profile"
            className={`font-semibold w-full py-2 text-center rounded transition-all duration-300 ${
              isActive("/profile") ? "bg-zinc-200 " : "hover:bg-zinc-200"
            }`}
          >
            Favourites
          </Link>
          <Link
            to="/profile/orderHistory"
            className={`font-semibold w-full py-2 mt-4 text-center rounded transition-all duration-300 ${
              isActive("/profile/orderHistory")
                ? "bg-zinc-200"
                : "hover:bg-zinc-200"
            }`}
          >
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className={`font-semibold w-full py-2 mt-4 text-center rounded transition-all duration-300 ${
              isActive("/profile/settings")
                ? "bg-zinc-200"
                : "hover:bg-zinc-200"
            }`}
          >
            Settings
          </Link>
        </div>
      )}

      {role === "admin" && (
        <div className="w-full flex-col items-center justify-center hidden lg:flex">
          <Link
            to="/profile"
            className={`font-semibold w-full py-2 text-center rounded transition-all duration-300 ${
              isActive("/profile") ? "bg-zinc-200" : "hover:bg-zinc-200"
            }`}
          >
            All Orders
          </Link>
          <Link
            to="/profile/add-book"
            className={`font-semibold w-full py-2 mt-4 text-center rounded transition-all duration-300 ${
              isActive("/profile/add-book")
                ? "bg-zinc-200"
                : "hover:bg-zinc-200"
            }`}
          >
            Add Book
          </Link>
        </div>
      )}

      <button
        className="bg-sky-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-sky-800 transition-all duration-300"
        onClick={() => setIsLogoutModalOpen(true)}
      >
        Log Out <FaArrowRightFromBracket className="ms-4" />
      </button>

      {/* Logout Confirmation Modal (Custom) */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-semibold">Confirm Logout</h2>
            <p className="mt-2 text-gray-600">
              Are you sure you want to log out?
            </p>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setIsLogoutModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
