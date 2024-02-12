import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import MyRecipes from "./MyRecipes";
import RecipeForm from "./RecipeForm";
import { useMutation } from "@apollo/client";
import { DELETE_RECIPE } from "../utils/mutations";

const MyRecipeFormParent = () => {
  const [mode, setMode] = useState(null); // State to manage the mode (add/edit)
  const [userRecipes, setUserRecipes] = useState([]); // State to store user recipes
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [editRecipeId, setEditRecipeId] = useState(null);

  const [deleteRecipe] = useMutation(DELETE_RECIPE);

  const handleEditRecipeClick = (recipeId) => {
    setShowRecipeForm(true);
    setEditRecipeId(recipeId);
    setMode("edit");
  };

  const handleAddRecipeClick = () => {
    setShowRecipeForm(true);
    setMode("add");
  };

  const handleDeleteRecipeClick = async (recipeId) => {
    try {
      // Call the deleteRecipe mutation with the recipeId
      await deleteRecipe({ variables: { _id: recipeId } });
      // After successful deletion, update the userRecipes state
      setUserRecipes(userRecipes.filter((recipe) => recipe._id !== recipeId));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleCloseForm = () => {
    setShowRecipeForm(false);
    setEditRecipeId(null);
    setMode(null);
  };
  // Fetch user recipes using the QUERY_USER query
  const { loading, error, data } = useQuery(QUERY_USER);

  // Update user recipes state when data changes
  useEffect(() => {
    if (data && data.userRecipes) {
      setUserRecipes(data.userRecipes);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {showRecipeForm && (
        <RecipeForm
          setUserRecipes={setUserRecipes}
          mode={mode}
          recipeId={editRecipeId}
          onClose={handleCloseForm}
        />
      )}
      <MyRecipes
        userRecipes={userRecipes}
        onEditRecipeClick={handleEditRecipeClick}
        onAddRecipeClick={handleAddRecipeClick}
        onDeleteRecipeClick={handleDeleteRecipeClick}
      />
    </div>
  );
};

export default MyRecipeFormParent;
