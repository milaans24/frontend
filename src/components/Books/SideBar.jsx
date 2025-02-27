import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div
      className="px-8 py-8 w-full sticky top-0 flex flex-col gap-2 text-zinc-900 transition-all duration-300"
      style={{ borderRight: "1px solid #27272A", height: "100vh" }}
    >
      <h1 className="font-bold text-zinc-600 text-xl">Categories</h1>
      <Link to="/all-books" className="hover:bg-zinc-100">
        All
      </Link>
      <Link
        to="/all-books/fiction"
        className="hover:bg-zinc-200  px-4 py-2 rounded"
      >
        Fiction
      </Link>
      <Link
        to="/all-books/non-fiction"
        className="hover:bg-zinc-200  px-4 py-2 rounded"
      >
        Non-Fiction
      </Link>
      <Link
        to="/all-books/novels"
        className="hover:bg-zinc-200  px-4 py-2 rounded"
      >
        Novels
      </Link>
      <Link
        to="/all-books/poetry"
        className="hover:bg-zinc-200  px-4 py-2 rounded"
      >
        Poetry
      </Link>
    </div>
  );
};

export default SideBar;
