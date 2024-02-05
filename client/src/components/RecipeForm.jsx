import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useStoreContext } from "../utils/GlobalState";
import { ADD_RECIPE, UPDATE_RECIPE } from "../utils/mutations";
import { QUERY_RECIPES } from "../utils/queries";

const RecipeForm = () => {
  const [state, dispatch] = useStoreContext();
  const { loading, data, refetch } = useQuery(QUERY_RECIPES);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    ingredients: "",
    preparationTime: "",
    servings: "",
    instructions: "",
    notes: "",
  });

  const [addRecipe] = useMutation(ADD_RECIPE);
  const [updateRecipe] = useMutation(UPDATE_RECIPE);

  useEffect(() => {
    // If there's a currentRecipe in the global state, update the form data
    if (state.currentRecipe) {
      setFormData(state.currentRecipe);
    } else {
      // If no currentRecipe, form data remains unchanged
      setFormData({
        title: "",
        description: "",
        category: "",
        ingredients: "",
        preparationTime: "",
        servings: "",
        instructions: "",
        notes: "",
      });
    }
  }, [state.currentRecipe]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (state.currentRecipe) {
        // If there's a currentRecipe, update it
        await updateRecipe({
          variables: {
            recipeId: state.currentRecipe._id,
            input: formData,
          },
        });
        dispatch({ type: "CLEAR_CURRENT_RECIPE" });
      } else {
        // If no currentRecipe, add a new recipe
        await addRecipe({
          variables: {
            input: formData,
          },
        });
      }
      // After adding/updating, refetch the recipes
      refetch();
      // If no currentRecipe, reset the form data
      setFormData({
        title: "",
        description: "",
        category: "",
        ingredients: "",
        preparationTime: "",
        servings: "",
        instructions: "",
        notes: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>{state.currentRecipe ? "Edit Recipe" : "Add New Recipe"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />

        <label>Category:</label>
        <input
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        />
        <label>Ingredients:</label>
        <textarea
          name="ingredients"
          value={formData.ingredients}
          onChange={handleInputChange}
        />
        <label>Preparation Time:</label>
        <textarea
          name="preparationTime"
          value={formData.preparationTime}
          onChange={handleInputChange}
        />
        <label>Servings:</label>
        <textarea
          name="servings"
          value={formData.servings}
          onChange={handleInputChange}
        />
        <label>Instructions:</label>
        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleInputChange}
        />
        <label>Notes:</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
        />

        <button type="submit">
          {state.currentRecipe ? "Update Recipe" : "Add Recipe"}
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
