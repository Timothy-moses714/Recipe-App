import React from "react";

export default function RecipeCard({ recipe, onClick }) {
  return (
    <article onClick={onClick} className="bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg line-clamp-2">{recipe.strMeal}</h3>
      </div>
    </article>
  );
}
