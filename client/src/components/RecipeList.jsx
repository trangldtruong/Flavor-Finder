import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../utils/GlobalState";
import { QUERY_RECIPES } from "../utils/queries";
import { useParams, Link } from "react-router-dom";

const RecipeList = () => {
  const [state, dispatch] = useStoreContext();
  const { loading, data } = useQuery(QUERY_RECIPES);
  const { categoryId } = useParams();

  useEffect(() => {
    if (data) {
      dispatch({
        type: "SET_RECIPES",
        payload: data.recipes,
      });
    }
  }, [data, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Filter recipes based on the selected category
  const filteredRecipes = categoryId
    ? state.recipes.filter((recipe) => recipe.category._id === categoryId)
    : state.recipes;

  return (
    <div>
      <h2>Recipe List</h2>
      <ul>
        {filteredRecipes.map((recipe) => (
          <li key={recipe._id}>
            <p>{recipe.title}</p>
            <p>Category: {recipe.category.name}</p>
            <Link to={`/recipes/${recipe._id}`}>
              <button
                onClick={() =>
                  dispatch({ type: "SET_CURRENT_RECIPE", payload: recipe })
                }
              >
                View Details
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
