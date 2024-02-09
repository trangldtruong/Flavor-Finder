import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_RECIPES } from "../utils/queries";
import { Link } from "react-router-dom";

const RecipeList = ({ categoryId }) => {
  const { loading, error, data } = useQuery(QUERY_RECIPES);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Filter recipes based on the categoryId if provided
  const recipes = categoryId
    ? data.recipes.filter((recipe) => recipe.category._id === categoryId)
    : data.recipes;

  return (
    <div>
      <h2>Recipe List</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <p>{recipe.title}</p>
            <p>Description: {recipe.description}</p>
            <p>Category: {recipe.category.name}</p>
            <Link to={`/recipes/${recipe._id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
