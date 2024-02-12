import React from "react";

const MyRecipes = ({
  userRecipes,
  onEditRecipeClick,
  onAddRecipeClick,
  onDeleteRecipeClick,
}) => {
  const handleEditClick = (recipeId) => {
    onEditRecipeClick(recipeId);
  };
  const handleAddClick = () => {
    onAddRecipeClick();
  };

  const handleDeleteClick = (recipeId) => {
    onDeleteRecipeClick(recipeId);
  };

  return (
    <div>
      <h2>My Recipes</h2>
      <button onClick={handleAddClick}>Add New Recipe</button>
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
            <button onClick={() => handleEditClick(recipe._id)}>
              Edit Recipe
            </button>
            <button onClick={() => handleDeleteClick(recipe._id)}>
              Delete Recipe
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyRecipes;
