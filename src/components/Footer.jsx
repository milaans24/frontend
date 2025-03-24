import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About Us",
      link: "/about-us",
    },
    {
      title: "Our Policy",
      link: "/our-policy",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
  ];
  return (
    <div className="px-4 lg:px-10 py-8 ">
      <div className="flex flex-col md:flex-row justify-between gap-8 ">
        <div className="flex flex-col w-full md:w-1/3 ">
          <div className="  bg-orange-500 w-full md:w-fit rounded-full px-3 py-2 text-white flex items-center gap-4">
            <img
              src="./milaanlogo.png"
              alt="milaan publication"
              className="h-8"
            />
            <h2 className="text-xl font-semibold ">Milaan Publications</h2>
          </div>
          <p className="mt-4  md:text-start text-sm text-zinc-800">
            Milaan Publication cherishes every writer’s creativity and every
            reader’s experience. We give your stories the platform they deserve,
            reaching the right audience with excellence. Whether you’re a
            budding author or experienced writer, we provide professional
            publishing, global distribution, and strong marketing support.
            Authors publish with pride, and readers discover quality literature.
            Join Milan Publication and turn your words into a lasting legacy!
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/3">
          <h1 className="text-xl font-bold ">Quick Links</h1>
          <div className="flex flex-col md:flex-row gap-4">
            {links.map((items, i) => (
              <Link
                to={items.link}
                key={i}
                className="hover:text-blue-600 text-zinc-800 transition-all duration-300"
              >
                {items.title}{" "}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <p className="text-center p-0 text-zinc-800">
        © 2025 Milaan Publications. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
