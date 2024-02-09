import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_RECIPE, UPDATE_RECIPE } from "../utils/mutations";
import { QUERY_RECIPES } from "../utils/queries";

const RecipeForm = ({ editMode, recipeId }) => {
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
  const { loading, data, refetch } = useQuery(QUERY_RECIPES);

  useEffect(() => {
    if (editMode && recipeId && data) {
      const existingRecipe = data.recipes.find(
        (recipe) => recipe._id === recipeId
      );
      if (existingRecipe) {
        setFormData({
          title: existingRecipe.title,
          description: existingRecipe.description,
          category: existingRecipe.category.name,
          ingredients: existingRecipe.ingredients.join(", "),
          preparationTime: existingRecipe.preparationTime.toString(),
          servings: existingRecipe.servings.toString(),
          instructions: existingRecipe.instructions,
          notes: existingRecipe.notes,
        });
      }
    }
  }, [editMode, recipeId, data]);

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
      if (editMode && recipeId) {
        await updateRecipe({
          variables: {
            _id: recipeId,
            title: formData.title,
            category: formData.category,
            description: formData.description,
            ingredients: formData.ingredients.split(","),
            preparationTime: parseInt(formData.preparationTime),
            servings: parseInt(formData.servings),
            instructions: formData.instructions,
            notes: formData.notes,
          },
        });
      } else {
        await addRecipe({
          variables: {
            title: formData.title,
            category: formData.category,
            description: formData.description,
            ingredients: formData.ingredients.split(","),
            preparationTime: parseInt(formData.preparationTime),
            servings: parseInt(formData.servings),
            instructions: formData.instructions,
            notes: formData.notes,
          },
        });
      }
      refetch();
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
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <h2>{editMode ? "Edit Recipe" : "Add New Recipe"}</h2>
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

        <button type="submit">
          {editMode ? "Update Recipe" : "Add Recipe"}
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
