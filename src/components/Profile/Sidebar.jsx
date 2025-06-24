import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import clsx from "clsx"; // Optional: For cleaner class handling

const SidebarLink = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={clsx(
        "font-semibold w-full py-2 text-center rounded transition-all duration-300",
        {
          "bg-zinc-200": isActive,
          "hover:bg-zinc-200": !isActive,
        }
      )}
    >
      {label}
    </Link>
  );
};

const roleBasedLinks = {
  user: [
    { to: "/profile", label: "Favourites" },
    { to: "/profile/orderHistory", label: "Order History" },
    { to: "/profile/settings", label: "Settings" },
  ],
  admin: [
    { to: "/profile", label: "All Orders" },
    { to: "/profile/add-book", label: "Add Book" },
    { to: "/profile/events", label: "Events" },
  ],
};

const Sidebar = ({ ProfileData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(authActions.changeRole("user"));
    localStorage.clear();
    navigate("/");
  };

  const links = roleBasedLinks[role] || [];

  return (
    <div className="h-auto lg:h-full rounded md:shadow flex flex-col p-3 items-center justify-between">
      {/* Profile Info */}
      <div className="flex flex-col items-center w-full">
        <img
          src={ProfileData.avatar}
          alt="profile"
          className="h-[10vh] object-cover rounded-full"
        />
        <p className="mt-3 text-xl font-semibold">{ProfileData.username}</p>
        <p className="mt-1 text-normal text-center break-words">
          {ProfileData.email}
        </p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
      </div>

      {/* Navigation Links */}
      <div className="w-full flex-col items-center justify-center hidden lg:flex mt-4 space-y-4">
        {links.map((link) => (
          <SidebarLink key={link.to} to={link.to} label={link.label} />
        ))}
      </div>

      {/* Logout Button */}
      <button
        className="bg-sky-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-sky-800 transition-all duration-300"
        onClick={() => setIsLogoutModalOpen(true)}
      >
        Log Out <FaArrowRightFromBracket className="ms-4" />
      </button>

      {/* Logout Modal */}
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
