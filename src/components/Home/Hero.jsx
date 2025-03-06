import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className=" h-screen w-full  flex flex-col lg:flex-row px-8 md:px-10 py-4 md:py-12 ">
      <div className="w-full lg:w-3/6 h-[100%]  flex items-center justify-center ">
        <div className="w-full ">
          <h1 className="text-sky-900 text-3xl md:text-4xl lg:text-5xl font-bold text-center lg:text-left">
            Write. Publish. Inspire. –{" "}
            <span className="text-orange-500">
              The Future of Literature Begins Here!
            </span>
          </h1>
          <p className="text-normal text-zinc-600 mt-5 text-center lg:text-left">
            Milaan Publication cherishes every writer’s creativity and every
            reader’s experience. We give your stories the platform they deserve,
            reaching the right audience with excellence. Whether you’re a
            budding author or experienced writer, we provide professional
            publishing, global distribution, and strong marketing support.
            Authors publish with pride, and readers discover quality literature.
            Join Milan Publication and turn your words into a lasting legacy!
          </p>
          <div className="flex justify-center lg:justify-start">
            <Link
              to="/packages"
              className=" my-5 lg:my-6 text-xl bg-sky-900 text-white  rounded py-3 px-8 flex items-center justify-center  font-semibold transition-all duration-300"
            >
              Publish Your Book
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center  ">
        <img
          src="/hero.jpeg"
          alt="hero"
          className=" h-auto lg:h-[100%] object-cover "
        />
      </div>
    </div>
  );
};

export default Hero;
