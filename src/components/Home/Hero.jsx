import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useState, useEffect } from "react";

const Hero = () => {
  // const calculateTimeLeft = () => {
  //   const deadline = new Date("2025-04-25T23:59:59");
  //   const difference = deadline - new Date();

  //   let timeLeft = {};

  //   if (difference > 0) {
  //     timeLeft = {
  //       days: Math.floor(difference / (1000 * 60 * 60 * 24)),
  //       hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
  //       minutes: Math.floor((difference / 1000 / 60) % 60),
  //       seconds: Math.floor((difference / 1000) % 60),
  //     };
  //   }

  //   return timeLeft;
  // };

  // const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimeLeft(calculateTimeLeft());
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

  //  const formatTime = (value) => String(value).padStart(2, "0");
  return (
    <div className="h-auto lg:h-screen px-8 md:px-10 py-4 md:py-12 w-full flex flex-col lg:flex-row items-center">
      {/* <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
      >
        <SwiperSlide className=""> */}
      <div className="w-full lg:w-3/6 flex items-center justify-center">
        <div className="w-full">
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
              className="my-5 lg:my-6 text-xl bg-sky-900 text-white rounded py-3 px-8 font-semibold transition-all duration-300"
            >
              Publish Your Book
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-3/6 flex items-center justify-center">
        <img
          src="https://res.cloudinary.com/dzgq7wugj/image/upload/v1743876340/hero_nfrvgh.png"
          alt="Slide 1"
          className="h-auto lg:h-[85vh]"
        />
      </div>

      {/* <SwiperSlide className="w-full flex flex-col lg:flex-row items-center">
          <div className="w-full px-6 md:px-10 py-10 bg-gradient-to-br from-sky-50 to-white rounded-3xl shadow-xl flex flex-col lg:flex-row items-center gap-10">
          
            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src="https://res.cloudinary.com/dzgq7wugj/image/upload/v1743922384/Beige_Feminine_Autumn_Floral_Aesthetic_Photo_Frame_Collage_Instagram_Post_qjnj1k.png"
                alt="Poetry Competition"
                className="rounded-2xl shadow-lg  w-full max-w-md lg:max-w-full lg:h-auto"
              />
            </div>

           
            <div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left">
              <h2 className="text-4xl font-bold text-sky-900 leading-tight">
                ✍️ Milaan Poetry Competition
              </h2>
              <hr className="w-24 border-2 border-orange-500 mx-auto lg:mx-0 my-2" />

              <p className="text-lg text-zinc-700 font-medium">
                Participate in our national-level poetry contest and let your
                words inspire the world!
              </p>

              <div className="text-zinc-700 space-y-1 text-base">
                <h4 className="font-semibold text-xl">
                  Entry Fee: <span className="text-orange-600">₹99/-</span>
                </h4>
                <p>
                  🗓️ <strong>Last Date:</strong> April 25, 2025
                </p>
                <p>
                  📄 <strong>Submission Format:</strong> PDF only (Hindi /
                  English)
                </p>
              </div>

              {Object.keys(timeLeft).length > 0 && (
                <div className="bg-white border border-orange-300 rounded-lg shadow-sm px-6 py-4 mt-4 inline-block text-center">
                  <h4 className="text-lg font-semibold text-sky-800 mb-2">
                    ⏳ Time Left to Submit:
                  </h4>
                  <div className="flex gap-4 justify-center font-mono text-lg text-zinc-800">
                    <div>
                      <span className="block text-2xl font-bold">
                        {formatTime(timeLeft.days)}
                      </span>
                      Days
                    </div>
                    <div>
                      <span className="block text-2xl font-bold">
                        {formatTime(timeLeft.hours)}
                      </span>
                      Hrs
                    </div>
                    <div>
                      <span className="block text-2xl font-bold">
                        {formatTime(timeLeft.minutes)}
                      </span>
                      Min
                    </div>
                    <div>
                      <span className="block text-2xl font-bold">
                        {formatTime(timeLeft.seconds)}
                      </span>
                      Sec
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-center lg:justify-start mt-6">
                <Link
                  to="/poetry-submission"
                  className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold py-3 px-8 rounded-xl shadow-md transition-all duration-300"
                >
                  Register Now
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide> 
      </Swiper>   */}
    </div>
  );
};

export default Hero;
