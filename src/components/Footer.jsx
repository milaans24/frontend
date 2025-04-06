import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [openSubtitles, setOpenSubtitles] = useState(false);

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
      title: "BookStore",
      link: "/bookstore",
    },
    {
      title: "Publish Your Book",
      link: "/packages",
    },
    {
      title: "Know More",
      subtitles: [
        {
          title: "Terms & Conditions",
          link: "/our-policy",
        },
        {
          title: "Privacy Policy",
          link: "/our-policy",
        },
        {
          title: "Refund Policy",
          link: "/our-policy",
        },
      ],
    },
  ];

  const handleToggle = () => {
    setOpenSubtitles(!openSubtitles);
  };

  return (
    <div className="px-4 lg:px-10 py-8">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <div className="flex flex-col w-full md:w-1/3">
          <div className="bg-orange-500 w-full md:w-fit rounded-full px-3 py-2 text-white flex items-center gap-4">
            <img
              src="./milaanlogo.png"
              alt="milaan publication"
              className="h-8"
            />
            <h2 className="text-xl font-semibold">Milaan Publications</h2>
          </div>
          <p className="mt-4 text-sm text-zinc-800 text-start">
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
          <h1 className="text-xl font-bold">Quick Links</h1>
          <div className="grid grid-cols-4 gap-4">
            {links.map((item, i) =>
              item.title === "Know More" ? (
                <div key={i} className="col-span-4">
                  <p
                    className="cursor-pointer hover:text-blue-600 text-zinc-800 transition-all duration-300 "
                    onClick={handleToggle}
                  >
                    {item.title}
                  </p>
                  {openSubtitles && (
                    <div className="ml-4 mt-2 flex flex-col gap-1">
                      {item.subtitles.map((sub, j) => (
                        <Link
                          to={sub.link}
                          key={j}
                          className="text-sm text-zinc-700 hover:text-blue-500"
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.link}
                  key={i}
                  className="hover:text-blue-600 text-zinc-800 transition-all duration-300 whitespace-nowrap"
                >
                  {item.title}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <p className="text-center text-zinc-800">
        © 2025 Milaan Publications. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
