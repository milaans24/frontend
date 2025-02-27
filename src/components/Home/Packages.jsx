import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const Packages = () => {
  const packages = [
    {
      title: "Beginner",
      price: "₹6,499",
      points: [
        "Legal Services",
        "Basic Editing Services",
        "Selling Services",
        "100% Royality",
      ],
    },
    {
      title: "Intermediate",
      price: "₹13,999",
      points: [
        "Legal Services",
        "Extensive Editing Services",
        "Selling Services Nationally & Globally",
        "100% Royality",
      ],
    },
    {
      title: "Advanced",
      price: "₹32,999",
      points: [
        "Legal Services",
        "Extensive Editing Services",
        "Selling Services Nationally & Globally",
        "Basic Marketing Plan",
      ],
    },
    {
      title: "Pro",
      price: "₹59,999",
      points: [
        "Legal Services",
        "Pro Editing Services",
        "Selling Services Nationally & Globally",
        "Marketing Plan & Execution Plan",
      ],
    },
  ];
  return (
    <div className=" px-4  lg:px-10 py-4 lg:py-8 ">
      <div className="text-center mb-8 lg:mb-20">
        <h1 className="text-3xl font-semibold">Packages Designed For You</h1>
        <h5 className="mt-3 text-zinc-600">
          Our packages are fully customizable
        </h5>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
        {packages.map((items) => (
          <div
            className={` ${
              items.title === "Intermediate"
                ? "bg-gradient-to-t from-orange-500 to-orange-600 text-white lg:-mt-16"
                : " bg-white  text-sky-900"
            }  p-6 rounded w-[100%] flex flex-col items-center justify-center shadow-[0px_3px_26px_0px_rgba(0,_0,_0,_0.1)] hover:border-black hover:scale-105 transition-all duration-500 hover:cursor-pointer`}
          >
            <h2 className="text-4xl font-bold mt-4">{items.title}</h2>
            <p className=" mb-4 mt-2 text-xl font-bold text-center ">Package</p>

            <h2 className="text-4xl font-bold mt-4">{items.price}</h2>
            <p className=" mb-8 mt-2 text-xl font-bold text-center ">
              One Time
            </p>
            {items.points.map((p) => (
              <p className="text-sm my-2">{p}</p>
            ))}
            <Link
              to="/packages"
              className={`text-xl  ${
                items.title === "Intermediate"
                  ? "bg-white text-orange-500"
                  : " bg-sky-900 text-white"
              }   px-4 py-2 mt-6 rounded-full text-center flex items-center justify-centers gap-2`}
            >
              Know More <FaLongArrowAltRight />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
