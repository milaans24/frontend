import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const cart = useSelector((state) => state.auth.userCart);
  //console.log(cart);
  var links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "BookStore",
      link: "/bookstore",
    },
    {
      title: "Publish Your Book",
      link: "/packages",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];
  const [Nav, setNav] = useState("hidden");
  if (isLoggedIn === false) {
    links.splice(3);
  }
  if (isLoggedIn === true && role === "user") {
    links.splice(5, 1);
  }
  if (role === "admin") {
    links.splice(3, 2);
  }

  return (
    <>
      <nav
        className="relative border-b flex w-full flex-nowrap items-center justify-between  py-2   lg:flex-wrap lg:justify-start lg:py-4"
        data-twe-navbar-ref
      >
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div className="ms-2  w-4/6 lg:w-1/6">
            <Link
              to="/"
              className="flex  font-bold items-center gap-2 text-white  px-2 py-2 bg-orange-500 rounded-full "
            >
              <img src="/milaanlogo.png" alt="logo" className="h-10 w-auto  " />{" "}
              Milaan Publication's
            </Link>
          </div>
          <div className=" w-1/6 block  lg:hidden">
            <button
              className="block border-0 bg-transparent px-2  hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0  lg:hidden"
              type="button"
              onClick={() => setNav(Nav === "hidden" ? "block" : "hidden")}
            >
              <span className="[&>svg]:w-7 [&>svg]:stroke-white ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" />
                </svg>
              </span>
            </button>
          </div>

          <div className="5/6 hidden lg:block">
            <div className="flex items-center">
              {links.map((items, i) => (
                <>
                  {items.title === "Profile" ||
                  items.title === "Admin Profile" ? (
                    <div
                      className=" rounded  hover:cursor-pointer border text-black font-semibold px-3 py-1 mx-3 bg-white hover:text-zinc-900 transition-all duration-300"
                      key={i}
                    >
                      <Link to={`${items.link}`} className="text-normal ">
                        {items.title}
                      </Link>
                    </div>
                  ) : (
                    <div
                      className="mx-3 relative font-semibold hover:text-sky-900 text-zinc-900  rounded transition-all duration-500 hover:cursor-pointer"
                      key={i}
                    >
                      <Link to={`${items.link}`} className="text-normal">
                        {items.title}{" "}
                        {items.title === "Cart" && (
                          <span className="text-white px-1  rounded-full text-sm font-normal bg-red-600">
                            {cart}
                          </span>
                        )}
                      </Link>
                    </div>
                  )}
                </>
              ))}
              {isLoggedIn === false && (
                <>
                  <Link
                    to="/login"
                    className="rounded border font-semibold text-zinc-900 border-zinc-900 px-3 py-1 mx-3 hover:bg-zinc-100 hover:border-sky-900 hover:text-sky-900 transition-all duration-500"
                  >
                    LogIn
                  </Link>
                  <Link
                    to="/signup"
                    className="rounded font-semibold  bg-sky-900 px-3 py-1.5 mx-3 text-white hover:bg-sky-800 transition-all duration-300"
                  >
                    SignUp
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/*           MOBILE NAV            */}
      <div className={`5/6 ${Nav} lg:hidden bg-zinc-100  text-zinc-900 px-12`}>
        <div className="flex flex-col items-center">
          {links.map((items, i) => (
            <>
              {items.title === "Profile" || items.title === "Admin Profile" ? (
                <div
                  className=" rounded  hover:cursor-pointer border border-blue-500 px-3 py-1 my-3 hover:bg-white hover:text-zinc-900 transition-all duration-300"
                  key={i}
                >
                  <Link
                    to={`${items.link}`}
                    className="text-normal"
                    onClick={() => setNav("hidden")}
                  >
                    {items.title}
                  </Link>
                </div>
              ) : (
                <div
                  className="mx-3 hover:text-blue-300  rounded transition-all duration-300 hover:cursor-pointer my-3"
                  key={i}
                >
                  <Link
                    to={`${items.link}`}
                    className="text-normal"
                    onClick={() => setNav("hidden")}
                  >
                    {items.title}{" "}
                    {items.title === "Cart" && (
                      <span className="text-white px-1  rounded-full text-sm font-normal bg-red-600">
                        {cart}
                      </span>
                    )}
                  </Link>
                </div>
              )}
            </>
          ))}
          {isLoggedIn === false && (
            <>
              <Link
                to="/login"
                className="rounded border border-sky-900 px-3 py-1 mx-3 hover:bg-white hover:text-zinc-900 transition-all duration-300"
              >
                LogIn
              </Link>
              <Link
                to="/signup"
                className="rounded  bg-sky-900 px-3 py-1 my-4 md:my-0 mx-3 text-white transition-all duration-300"
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
