import React from "react";
import { IoCall } from "react-icons/io5";
import { CgMail } from "react-icons/cg";
import { CiLocationOn } from "react-icons/ci";

const Contact = () => {
  const content = [
    {
      img: "call",
      title: "+91-8957795819",
    },
    {
      img: "email",
      title: "milaanyugampublication@gmail.com",
    },
    {
      img: "loc",
      title: "Om nagar colony, Varanasi, UP-221007",
    },
  ];
  return (
    <div className=" px-4 lg:px-10 py-4 lg:py-8 ">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold ">Contact Us</h1>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {content.map((items) => (
          <div className=" rounded w-[100%] flex flex-col items-center justify-center  hover:border-black hover:scale-105 transition-all duration-500 hover:cursor-pointer">
            <div className="text-4xl bg-orange-100 p-3 rounded-full shadow z-10">
              {" "}
              {items.img === "call" ? (
                <IoCall />
              ) : items.img === "email" ? (
                <CgMail />
              ) : (
                <CiLocationOn />
              )}
            </div>
            <h2 className="my-2 bg-white p-8 rounded -mt-4 text-center w-[100%] shadow z-0">
              {items.title}
            </h2>
          </div>
        ))}
      </div>
      <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-2">
        <div className="w-[100%] md:w-[50%]">
          <img src="./contact.png" alt="" />
        </div>
        <div className="w-[100%] md:w-[50%]">
          {" "}
          <div className="bg-white rounded p-6 shadow-xl ">
            <h1 className="text-2xl text-sky-900 font-semibold text-center">
              Consultation Form
            </h1>
            <form className="mt-6 flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4">
                <input
                  type="text"
                  className="bg-gray-100 rounded px-4 py-2 w-full outline-none"
                  placeholder="Name"
                  required
                />
                <input
                  type="text"
                  className="bg-gray-100 rounded px-4 py-2 w-full outline-none"
                  placeholder="Mobile Number"
                  required
                />
              </div>
              <div className="">
                <input
                  type="email"
                  className="bg-gray-100 rounded px-4 py-2 w-full outline-none"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="">
                <textarea
                  className="bg-gray-100 rounded px-4 py-2 w-full h-32 outline-none"
                  placeholder="About your book"
                  required
                />
              </div>
              <div>
                <button className="bg-sky-900 text-white rounded px-4 py-2 w-full">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
