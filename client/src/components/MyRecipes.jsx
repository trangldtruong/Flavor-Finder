import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { Link } from "react-router-dom";

const MyRecipes = () => {
  // Fetch the current user's recipes using the QUERY_USER query
  const { loading, error, data } = useQuery(QUERY_USER);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Extract user's recipes from the query data
  const userRecipes = data.userRecipes;

  return (
    <div>
      <h2>My Recipes</h2>
      <Link to="/recipeForm">
        <button>Add New Recipe</button>
      </Link>
      <ul>
        {userRecipes.map((recipe) => (
          <li key={recipe._id}>
            <p>{recipe.title}</p>
            <p>Description: {recipe.description}</p>
            <p>Category: {recipe.category.name}</p>
            <p>Ingredients: {recipe.ingredients.join(", ")}</p>
            <p>Preparation Time: {recipe.preparationTime} minutes</p>
            <p>Servings: {recipe.servings}</p>
            <p>Instructions: {recipe.instructions}</p>
            <p>Notes: {recipe.notes}</p>
            <Link to="/recipeForm">
              <button>Edit Recipe</button>
            </Link>
            <button>Delete Recipe</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyRecipes;
