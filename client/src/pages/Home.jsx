import React, { useState } from "react";
import CategoryMenu from "../components/CategoryMenu";
import RecipeList from "../components/RecipeList";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="container">
      <CategoryMenu onSelectCategory={handleSelectCategory} />
      <RecipeList categoryId={selectedCategory} />
    </div>
  );
};

export default Home;
