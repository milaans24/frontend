import React from "react";

const SearchBar = ({ setSearchValue, SearchValue }) => {
  return (
    <div className="px-12 pt-8 w-full flex items-center justify-center">
      <input
        type="search"
        name="searchBook"
        className="rounded-full px-4 py-2 bg-zinc-800 w-3/6 outline-none text-white"
        placeholder="Search Book"
        value={SearchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
