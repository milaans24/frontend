import React from "react";
import { Link } from "react-router-dom";
const MarqueeAdvertisement = () => {
  return (
    <div className=" w-full bg-purple-600 overflow-hidden py-2 z-50 text-center">
      <Link to="/poetry-submission" className=" text-white text-xl font-bold">
        * Poetry Submission Is Live *
      </Link>
    </div>
  );
};

export default MarqueeAdvertisement;
