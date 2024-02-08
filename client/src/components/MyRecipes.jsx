import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { Link } from "react-router-dom";
import RecipeForm from "./RecipeForm";

const MyRecipes = () => {
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [editRecipeId, setEditRecipeId] = useState(null);

  // Fetch the current user's recipes using the QUERY_USER query
  const { loading, error, data } = useQuery(QUERY_USER);

  const handleAddRecipeClick = () => {
    setShowRecipeForm(true);
    setEditRecipeId(null); // Reset editRecipeId to null to indicate adding new recipe
  };

  const handleEditRecipeClick = (recipeId) => {
    setShowRecipeForm(true);
    setEditRecipeId(recipeId);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Extract user's recipes from the query data
  const userRecipes = data.userRecipes;

  return (
    <div>
      <h2>My Recipes</h2>
      {/* <Link to="/recipeForm">
        <button>Add New Recipe</button>
      </Link> */}
      <button onClick={handleAddRecipeClick}>Add New Recipe</button>
      {showRecipeForm && (
        <RecipeForm
          editMode={editRecipeId ? true : false}
          recipeId={editRecipeId}
        />
      )}
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
            <button onClick={() => handleEditRecipeClick(recipe._id)}>
              Edit Recipe
            </button>
            <button>Delete Recipe</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyRecipes;
