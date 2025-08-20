import React from "react";

export default function Header({ searchType, setSearchType, query, setQuery, handleManualSearch, loading }) {
  return (
    <header className="relative">
      <div className="bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center">
        <div className="backdrop-blur-[2px] bg-black/40">
          <div className="max-w-6xl mx-auto px-4 py-10 text-center text-white">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">🍲 Recipe Finder</h1>
            <p className="mt-2 text-sm sm:text-base text-white/90">
              Browse a curated mix of African & international dishes — then search by recipe, ingredient, or cuisine.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-4 mb-3">
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="radio" value="recipe" checked={searchType === "recipe"} onChange={(e) => setSearchType(e.target.value)} />
              <span>Recipe</span>
            </label>
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="radio" value="ingredient" checked={searchType === "ingredient"} onChange={(e) => setSearchType(e.target.value)} />
              <span>Ingredient</span>
            </label>
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="radio" value="cuisine" checked={searchType === "cuisine"} onChange={(e) => setSearchType(e.target.value)} />
              <span>Cuisine</span>
            </label>
          </div>

          <div className="flex">
            <input
              type="text"
              placeholder={`Search by ${searchType}...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-l-xl px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              onClick={handleManualSearch}
              className="px-4 sm:px-5 py-2 rounded-r-xl bg-orange-500 text-white font-medium hover:bg-orange-600 active:bg-orange-700"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
