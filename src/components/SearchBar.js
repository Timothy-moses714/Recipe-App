import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");
  const [searchType, setSearchType] = useState("recipe");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term, searchType);
    }
  };

  return (
    <div className="flex justify-center my-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 p-4 rounded-lg shadow-lg flex flex-col sm:flex-row gap-3 items-center w-full max-w-2xl"
      >
        {/* Search input */}
        <input
          type="text"
          placeholder={`Search by ${searchType}...`}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg focus:outline-none flex-1"
        />

        {/* Radio buttons */}
        <div className="flex space-x-4 text-sm text-gray-700">
          <label>
            <input
              type="radio"
              value="recipe"
              checked={searchType === "recipe"}
              onChange={(e) => setSearchType(e.target.value)}
              className="mr-1"
            />
            Recipe
          </label>
          <label>
            <input
              type="radio"
              value="ingredient"
              checked={searchType === "ingredient"}
              onChange={(e) => setSearchType(e.target.value)}
              className="mr-1"
            />
            Ingredient
          </label>
          <label>
            <input
              type="radio"
              value="cuisine"
              checked={searchType === "cuisine"}
              onChange={(e) => setSearchType(e.target.value)}
              className="mr-1"
            />
            Cuisine
          </label>
        </div>

        {/* Search button */}
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
        >
          Search
        </button>
      </form>
    </div>
  );
}
