import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../utils/queries";

const CategoryMenu = ({ onSelectCategory }) => {
  const { loading, error, data } = useQuery(QUERY_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState("");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const categories = data.categories;

  const handleClick = (categoryId) => {
    setSelectedCategory(categoryId);
    onSelectCategory(categoryId);
  };

  return (
    <div>
      <h2>Categories</h2>
      <button
        onClick={() => handleClick("")}
        style={{ fontWeight: selectedCategory === "" ? "bold" : "normal" }}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category._id}
          onClick={() => handleClick(category._id)}
          style={{
            fontWeight: selectedCategory === category._id ? "bold" : "normal",
          }}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryMenu;
