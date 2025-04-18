import React from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SearchHeader from "../components/SearchResults/SearchHeader";
import MainResults from "../components/SearchResults/MainResults";
import SellingPartner from "../components/Home/SellingPartner";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("book");

  return (
    <div className="w-full px-4 md:px-6 lg:px-10">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{query ? `${query} - Book Search` : "Search Books"}</title>
        <meta
          name="description"
          content={`Find the best books for your search query: ${query}. Explore our wide range of books and get recommendations.`}
        />
        <meta
          name="keywords"
          content={`Books, ${query}, Buy Books, Best Books`}
        />
      </Helmet>
      <SearchHeader value={query} />
      <hr className="mb-4 md:mb-6 lg:mb-12" />
      <MainResults value={query} />
      <SellingPartner />
    </div>
  );
};

export default SearchResult;
