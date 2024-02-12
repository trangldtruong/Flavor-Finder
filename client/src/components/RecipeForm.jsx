import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_RECIPE, UPDATE_RECIPE } from "../utils/mutations";
import { ADD_RECIPE, UPDATE_RECIPE } from "../utils/mutations";

const RecipeForm = ({ mode, recipeId, setUserRecipes, onClose }) => {
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
      const {
        title,
        description,
        category,
        ingredients,
        preparationTime,
        servings,
        instructions,
        notes,
      } = formData;

      let updatedRecipe;

      // Call the appropriate mutation based on whether editMode is true or false
      if (mode === "edit") {
        const { data } = await updateRecipe({
          variables: {
            _id: recipeId,
            title,
            description,
            category,
            ingredients: ingredients
              .split(",")
              .map((ingredient) => ingredient.trim()),
            preparationTime: parseInt(preparationTime),
            servings: parseInt(servings),
            instructions,
            notes,
          },
        });
        updatedRecipe = data.updateRecipe;
      } else {
        const { data } = await addRecipe({
          variables: {
            title,
            description,
            category,
            ingredients: ingredients
              .split(",")
              .map((ingredient) => ingredient.trim()),
            preparationTime: parseInt(preparationTime),
            servings: parseInt(servings),
            instructions,
            notes,
          },
        });
        updatedRecipe = data.addRecipe;
      }

      // // Update userRecipes state with the new recipe
      // setUserRecipes((prevRecipes) => {
      //   if (mode === "edit") {
      //     // If in edit mode, replace the old recipe with the updated one
      //     return prevRecipes.map((recipe) =>
      //       recipe._id === updatedRecipe._id ? updatedRecipe : recipe
      //     );
      //   } else {
      //     // If in add mode, keep the existing recipes and add the new recipe
      //     return [...prevRecipes, updatedRecipe];
      //   }
      // });

      // Reset the form data
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
      onClose();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  const handleCancel = () => {
    onClose();
  };
  return (
    <div>
      <h2>{mode === "edit" ? "Edit Recipe" : "Add New Recipe"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>{" "}
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
          type="text"
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
        <input
          type="number"
          name="preparationTime"
          value={formData.preparationTime}
          onChange={handleInputChange}
        />
        <label>Servings:</label>
        <input
          type="number"
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
        <button type="submit">{mode === "edit" ? "Update" : "Submit"}</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
