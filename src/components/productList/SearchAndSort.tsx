import React, { useState } from "react";

interface SearchAndSortProps {
  onSearchChange: (query: string) => void;  // Ensure the prop name matches
  onSortChange: (sortOption: string) => void;
}

const SearchAndSort: React.FC<SearchAndSortProps> = ({
  onSearchChange,  // Make sure this is consistent with what you pass in ProductList
  onSortChange,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("title_asc");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearchChange(e.target.value);  // Trigger the parent function correctly
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    onSortChange(e.target.value);  // Trigger the parent function correctly
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between sm:gap-12 gap-20 mb-8 w-full">
    {/* Search Bar */}
    <input
      type="text"
      placeholder="Search products..."
      value={searchQuery}
      onChange={handleSearchChange}
      className="w-full sm:w-1/2 md:w-1/3 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  
    {/* Sort Dropdown */}
    <select
      value={sortOption}
      onChange={handleSortChange}
      className="w-full sm:w-1/2 md:w-1/4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="title_asc">Title A → Z</option>
      <option value="title_desc">Title Z → A</option>
      <option value="price_asc">Price: Low to High</option>
      <option value="price_desc">Price: High to Low</option>
      <option value="rating_asc">Rating: Low to High</option>
      <option value="rating_desc">Rating: High to Low</option>
    </select>
  </div>
  
  );
};

export default SearchAndSort;
