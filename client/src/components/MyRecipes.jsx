import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useStoreContext } from "../utils/GlobalState";
import { QUERY_RECIPES } from "../utils/queries";
import { DELETE_RECIPE } from "../utils/mutations";
import { Link } from "react-router-dom";

const Myrecipes = () => {
  const [state, dispatch] = useStoreContext();
  const { loading, data, refetch } = useQuery(QUERY_RECIPES);
  const [deleteRecipe] = useMutation(DELETE_RECIPE);

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

  const userRecipes = state.recipes.filter(
    (recipe) => recipe.author.id === state.user.id
  );

  const handleEditClick = (recipe) => {
    dispatch({ type: "SET_CURRENT_RECIPE", payload: recipe });
  };

  const handleAddRecipeClick = () => {
    dispatch({ type: "CLEAR_CURRENT_RECIPE" });
  };

  const handleDelete = async (recipeId) => {
    try {
      await deleteRecipe({
        variables: {
          recipeId: recipeId,
        },
      });

      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>My Recipes</h2>

      <Link to="/recipe-form" onClick={handleAddRecipeClick}>
        <button>Add New Recipe</button>
      </Link>
      <ul>
        {userRecipes.map((recipe) => (
          <li key={recipe._id}>
            <p>{recipe.title}</p>
            <p>Description: {recipe.description}</p>
            <p>Category: {recipe.category.name}</p>{" "}
            <p>Ingredients: {recipe.ingredients.join(", ")}</p>
            <p>Preparation Time: {recipe.preparationTime} minutes</p>
            <p>Servings: {recipe.servings}</p>
            <p>Instructions: {recipe.instructions}</p>
            <p>Notes: {recipe.notes}</p>{" "}
            <Link to="/recipe-form" onClick={() => handleEditClick(recipe)}>
              <button>Edit Recipe</button>
            </Link>
            <button onClick={() => handleDelete(recipe._id)}>
              Delete Recipe
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Myrecipes;
