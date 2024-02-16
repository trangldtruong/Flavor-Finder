import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_RECIPE, UPDATE_RECIPE } from "../utils/mutations";
import { QUERY_USER, QUERY_CATEGORIES } from "../utils/queries";

const RecipeForm = ({ mode, recipeId, setUserRecipes, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: { _id: "", name: "" },
    ingredients: "",
    preparationTime: "",
    servings: "",
    instructions: "",
    notes: "",
  });

  const {
    loading: userLoading,
    error: userError,
    data: userData,
    refetch: refetchUser,
  } = useQuery(QUERY_USER);
  const {
    loading: categoryLoading,
    error: categoryError,
    data: categoryData,
  } = useQuery(QUERY_CATEGORIES);

  const [addRecipe] = useMutation(ADD_RECIPE);
  const [updateRecipe] = useMutation(UPDATE_RECIPE);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      const selectedCategory = categoryData.categories.find(
        (category) => category._id === value
      );

      if (selectedCategory) {
        setFormData({
          ...formData,
          category: {
            _id: selectedCategory._id,
            name: selectedCategory.name,
          },
        });
      } else {
        setFormData({
          ...formData,
          category: {
            id: "",
            name: "",
          },
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
            author: userData.userRecipes[0].author._id,
          },
        });

        updatedRecipe = data.addRecipe;
      }
      await refetchUser();
      setFormData({
        title: "",
        description: "",
        category: { _id: "", name: "" },
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

  if (userLoading || categoryLoading) return <div>Loading...</div>;
  if (userError || categoryError)
    return <div>Error: {userError || categoryError}</div>;

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
        <select
          name="category"
          value={formData.category._id} // Use category ID for select value
          onChange={handleInputChange}
        >
          <option value="">Select category...</option>
          {categoryData.categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
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
