import React from "react";
import { useStoreContext } from "../utils/GlobalState";

const RecipeDetail = () => {
  const [state] = useStoreContext();

  if (!state.currentRecipe) {
    return <div>No recipe selected</div>;
  }

  const { currentRecipe } = state;

  return (
    <div>
      <h2>{currentRecipe.title}</h2>
      <p>Description: {currentRecipe.description}</p>
      <p>Category: {currentRecipe.category.name}</p>
      <p>Ingredients: {currentRecipe.ingredients.join(", ")}</p>
      <p>Preparation Time: {currentRecipe.preparationTime} minutes</p>
      <p>Servings: {currentRecipe.servings}</p>
      <p>Instructions: {currentRecipe.instructions}</p>
      <p>Notes: {currentRecipe.notes}</p>
      <p>
        Author: {currentRecipe.author.firstName} {currentRecipe.author.lastName}
      </p>
    </div>
  );
};

export default RecipeDetail;
