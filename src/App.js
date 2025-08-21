import React, { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";
import Footer from "./components/Footer";

export default function App() {
  // state hooks
  const [searchType, setSearchType] = useState("recipe");
  const [query, setQuery] = useState("");
  const [homeMeals, setHomeMeals] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [homeLoading, setHomeLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [selectedFull, setSelectedFull] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [reviews, setReviews] = useState(() => {
    try {
      const raw = localStorage.getItem("recipe_reviews");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    localStorage.setItem("recipe_reviews", JSON.stringify(reviews));
  }, [reviews]);

  // first view: curated meals
  useEffect(() => {
    const AREAS = [
      "African", "Italian", "American", "Chinese", "Indian",
      "Mexican", "French", "Japanese", "Thai", "Spanish",
    ];
    async function loadCurated() {
      setHomeLoading(true);
      try {
        const promises = AREAS.map((a) =>
          fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(a)}`
          ).then((r) => r.json())
        );
        const results = await Promise.all(promises);
        let combined = [];
        results.forEach((res) => {
          const list = res?.meals || [];
          combined.push(...list.slice(0, 4));
        });
        const dedupMap = new Map();
        combined.forEach((m) => dedupMap.set(m.idMeal, m));
        combined = Array.from(dedupMap.values());
        for (let i = combined.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [combined[i], combined[j]] = [combined[j], combined[i]];
        }
        setHomeMeals(combined);
        setMeals(combined);
      } catch (e) {
        console.error("Error loading curated meals:", e);
        setHomeMeals([]);
        setMeals([]);
      } finally {
        setHomeLoading(false);
      }
    }
    loadCurated();
  }, []);

  // build API URL
  const apiURL = useMemo(() => {
    if (!query.trim()) return null;
    if (searchType === "recipe")
      return `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;
    if (searchType === "ingredient")
      return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(query)}`;
    return `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(query)}`;
  }, [query, searchType]);

  async function fetchMeals(url) {
    if (!url) {
      setMeals(homeMeals);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setMeals(data?.meals || []);
    } catch (e) {
      console.error(e);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  }

  // manual search trigger
  const handleManualSearch = () => fetchMeals(apiURL);

  // run search whenever query/type changes
  useEffect(() => {
    const t = setTimeout(() => {
      fetchMeals(apiURL);
    }, 500);
    return () => clearTimeout(t);
  }, [apiURL]);

  // modal helpers
  async function openMeal(meal) {
    setSelected(meal);
    setSelectedFull(null);
    setModalLoading(true);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
      );
      const data = await res.json();
      setSelectedFull(data?.meals?.[0] || meal);
    } catch (e) {
      console.error(e);
      setSelectedFull(meal);
    } finally {
      setModalLoading(false);
    }
  }
  function closeModal() {
    setSelected(null);
    setSelectedFull(null);
    setReviewText("");
  }
  function addReview(mealId) {
    const txt = reviewText.trim();
    if (!txt) return;
    setReviews((prev) => ({
      ...prev,
      [mealId]: [...(prev[mealId] || []), { text: txt, ts: Date.now() }],
    }));
    setReviewText("");
  }
  function getIngredients(full) {
    const items = [];
    for (let i = 1; i <= 20; i++) {
      const ing = full[`strIngredient${i}`];
      const meas = full[`strMeasure${i}`];
      if (ing && ing.trim()) {
        items.push(`${ing}${meas && meas.trim() ? ` — ${meas}` : ""}`);
      }
    }
    return items;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        searchType={searchType}
        setSearchType={setSearchType}
        query={query}
        setQuery={setQuery}
        handleManualSearch={handleManualSearch}
        loading={loading}
      />

      <main className="max-w-6xl mx-auto w-full px-4 py-8 flex-1">
        {(homeLoading && meals.length === 0) || loading ? (
          <p className="text-center text-gray-600">Loading recipes…</p>
        ) : null}
        {!loading && meals.length === 0 && !homeLoading && (
          <p className="text-center text-gray-600">
            No results found. Try a different {searchType}.
          </p>
        )}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {meals.map((m) => (
            <RecipeCard key={m.idMeal} recipe={m} onClick={() => openMeal(m)} />
          ))}
        </div>
      </main>

      {selected && (
        <RecipeModal
          recipe={selectedFull || selected}
          onClose={closeModal}
          onAddReview={addReview}
          reviews={reviews[selected.idMeal]}
        />
      )}

      <Footer />
    </div>
  );
}
