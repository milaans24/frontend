import React from "react";

const SellingPartner = () => {
  return (
    <div className="bg-zinc-100 px-4 lg:px-10 py-4 lg:py-10">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold ">Our Selling Partners</h1>
      </div>
      <div className="flex items-center justify-between gap-4">
        <img src="./amazon.png" alt="amazon" className="h-4 md:h-10" />
        <img
          src="./Flipkart-Logo.png"
          alt="flipkart logo"
          className="h-4 md:h-10"
        />
        <img
          src="./Google_Play_Books.png"
          alt="google play books"
          className="h-4 md:h-10"
        />
        <img
          src="Snapdeal-Logo.wine.png"
          alt="snapdeal"
          className="h-4 md:h-10"
        />
      </div>
    </div>
  );
};

export default SellingPartner;
