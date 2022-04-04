import React from "react";
import { MdOutlineShortText } from "react-icons/md";

const Search = ({ search, setSearch }) => {
  return (
    <div className="max-w-[1150px] bg-[#1A1A1A] border-2 border-[#333333] p-1.5 px-5 rounded-full flex items-center justify-between">
      <div className="flex items-center lg:w-full">
        <div className="rounded-full border-2 animate-pulse h-4 w-4 p-1" />
        <input
          type="text"
          className="bg-[#1A1A1A] lg:w-full outline-none focus:ring-0  text-white ml-2
         placeholder:text-[#fafafa] text-xs border-0"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex  items-center divide-x-2 divide-[#333] divide-dotted">
        <div className="flex items-center space-x-3">
          <button className="buttonSearch">Minimal</button>
          <button className="buttonSearch"> Home</button>
          <button className="buttonSearch">Minimal</button>
        </div>
        <div className="flex items-center  ml-6 pl-6">
          <MdOutlineShortText
            color="#cecece"
            className="text-2xl animate-pulse"
          />
          <p className=" pl-2 text-[#cecece] text-sm font-medium"> Filters</p>
        </div>
      </div>
    </div>
  );
};

export default Search;
