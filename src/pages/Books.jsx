import React from "react";
import ShopByCategories from "../components/Books/ShopByCategories";
import AllBooks from "./AllBooks";

const Books = () => {
  return (
    <div className="  w-full   px-10 py-4 md:py-12  ">
      <ShopByCategories />
      <AllBooks />
    </div>
  );
};

export default Books;
