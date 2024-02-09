import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { QUERY_RECIPES } from "../utils/queries";

const RecipeList = () => {
  const { loading, error, data } = useQuery(QUERY_RECIPES);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const recipes = data.recipes;

  return (
    <div>
      <h3>Recipe List</h3>
      <ul>
        {recipes.map((recipe) => (
          <li className="recipe-list" key={recipe._id}>
            <p>{recipe.title}</p>
            <p>Category: {recipe.category.name}</p>
            <Link to={`/recipes/${recipe._id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
