import React, { useEffect } from "react";
import Hero from "../components/Home/Hero";
import RecentlyAdded from "../components/Home/RecentlyAdded";
import BookPublishingProcess from "../components/Home/BookPublishingProcess";
import Contact from "../components/Home/Contact";
import Packages from "../components/Home/Packages";
import FAQ from "../components/Home/FAQ";
import Testimonial from "../components/Home/Testimonial";
import SellingPartner from "../components/Home/SellingPartner";
import { Helmet } from "react-helmet-async";
const Home = () => {
  return (
    <>
      <Helmet>
        <title>Milaan Publication - Publish & Buy Books</title>
        <meta
          name="description"
          content="Milaan Publication helps authors publish and distribute their books worldwide. Buy novels, poetry, children's books, and more."
        />
        <meta
          name="keywords"
          content="Milaan Publication, buy books online, poetry books, Hindi novels, book publishing, self-publishing, book marketing"
        />
      </Helmet>
      <Hero />
      <BookPublishingProcess />
      <Packages />
      <Testimonial />
      <Contact />
      <FAQ />
      <SellingPartner />
    </>
  );
};

export default Home;
