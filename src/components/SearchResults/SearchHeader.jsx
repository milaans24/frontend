import React from "react";

const SearchHeader = ({ value }) => {
  return (
    <div className="my-4 md:my-6 lg:my-12">
      <h1 className="text-3xl font-bold">Results for: "{value}"</h1>
    </div>
  );
};

export default SearchHeader;
