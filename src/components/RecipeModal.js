import React, { useState } from "react";

export default function RecipeModal({ recipe, onClose, onAddReview, reviews }) {
  const [reviewText, setReviewText] = useState("");

  const addReview = () => {
    const txt = reviewText.trim();
    if (!txt) return;
    onAddReview(recipe.idMeal, { text: txt });
    setReviewText("");
  };

  const getIngredients = (full) => {
    const items = [];
    for (let i = 1; i <= 20; i++) {
      const ing = full[`strIngredient${i}`];
      const meas = full[`strMeasure${i}`];
      if (ing && ing.trim()) {
        items.push(`${ing}${meas && meas.trim() ? ` — ${meas}` : ""}`);
      }
    }
    return items;
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 overflow-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-500">
          ✕
        </button>

        {!recipe ? (
          <div className="p-10 text-center">Loading recipe…</div>
        ) : (
          <div className="p-5">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-56 object-cover rounded-t-2xl" />
            <h2 className="text-2xl font-bold mt-4">{recipe.strMeal}</h2>
            <p className="text-sm text-gray-500 mt-1">{recipe.strArea || "Unknown cuisine"} • {recipe.strCategory || "Misc"}</p>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Ingredients</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {getIngredients(recipe).map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            </div>

            {recipe.strInstructions && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Instructions</h3>
                <p className="text-sm leading-6 whitespace-pre-line">{recipe.strInstructions}</p>
              </div>
            )}

            {recipe.strYoutube && (
              <a href={recipe.strYoutube} target="_blank" rel="noreferrer" className="inline-block mt-4 text-orange-600 hover:underline text-sm font-medium">
                Watch on YouTube
              </a>
            )}

            <div className="mt-6 border-t pt-4">
              <h3 className="font-semibold mb-2">Reviews</h3>
              <ul className="space-y-2 mb-3">
                {(reviews || []).length === 0 && <li className="text-sm text-gray-500">No reviews yet — be the first.</li>}
                {(reviews || []).map((r, i) => (
                  <li key={i} className="text-sm bg-gray-50 rounded-lg px-3 py-2">{r.text}</li>
                ))}
              </ul>

              <div className="flex gap-2">
                <input
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write a quick review…"
                  className="flex-1 border rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400"
                />
                <button onClick={addReview} className="px-4 py-2 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700">
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
