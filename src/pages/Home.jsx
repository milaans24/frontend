import React from "react";
import Hero from "../components/Home/Hero";
import BookPublishingProcess from "../components/Home/BookPublishingProcess";
import Contact from "../components/Home/Contact";
import Packages from "../components/Home/Packages";
import FAQ from "../components/Home/FAQ";
import Testimonial from "../components/Home/Testimonial";
import SellingPartner from "../components/Home/SellingPartner";
import { Helmet } from "react-helmet-async";
import LeaderBoard from "../components/Home/LeaderBoard";
import EventCategories from "../components/Home/EventCategories";
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
      <EventCategories />
      {/* <LeaderBoard /> */}

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
