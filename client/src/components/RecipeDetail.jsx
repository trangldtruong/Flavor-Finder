import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_RECIPES } from "../utils/queries";

const RecipeDetail = () => {
  // Get the recipeId from the URL parameter
  const { id } = useParams();

  // Use the useQuery hook to fetch recipe data
  const { loading, error, data } = useQuery(QUERY_RECIPES);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Find the recipe with the specified ID from the data
  const recipe = data.recipes.find((recipe) => recipe._id === id);

  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>Description: {recipe.description}</p>
      <p>Category: {recipe.category.name}</p>
      <p>Ingredients: {recipe.ingredients.join(", ")}</p>
      <p>Preparation Time: {recipe.preparationTime} minutes</p>
      <p>Servings: {recipe.servings}</p>
      <p>Instructions: {recipe.instructions}</p>
      <p>Notes: {recipe.notes}</p>
      <p>
        Author: {recipe.author.firstName} {recipe.author.lastName}
      </p>
    </div>
  );
};

export default RecipeDetail;
