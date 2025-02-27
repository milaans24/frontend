import React, { useEffect } from "react";
import Hero from "../components/Home/Hero";
import RecentlyAdded from "../components/Home/RecentlyAdded";
import BookPublishingProcess from "../components/Home/BookPublishingProcess";
import Contact from "../components/Home/Contact";
import Packages from "../components/Home/Packages";
import FAQ from "../components/Home/FAQ";
import Testimonial from "../components/Home/Testimonial";
import SellingPartner from "../components/Home/SellingPartner";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero />
      {/* <RecentlyAdded /> */}

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
