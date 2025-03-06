import React from "react";
import ShopByCategories from "../components/Books/ShopByCategories";
import AllBooks from "./AllBooks";
import { Helmet } from "react-helmet-async";
const Books = () => {
  return (
    <>
      <Helmet>
        <title>All Books - Milaan Publication</title>
        <meta
          name="description"
          content="Browse and buy books from Milaan Publication. Explore categories including poetry, novels, short stories, children's books, business books, and more."
        />
        <meta
          name="keywords"
          content="Milaan books, buy books online, poetry books, self-publishing, hindi poetry, novel, short stories, children books, bussiness, academic, short stories"
        />
      </Helmet>
      <div className="w-full px-4 md:px-6 lg:px-10">
        <ShopByCategories />
        <AllBooks />
      </div>
    </>
  );
};

export default Books;
