import React from "react";
import ShopByCategories from "../components/Books/ShopByCategories";
import AllBooks from "./AllBooks";

const Books = () => {
  return (
    <div className="w-full px-4 md:px-6 lg:px-10">
      <ShopByCategories />
      <AllBooks />
    </div>
  );
};

export default Books;
