import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../utils/queries";
import { Link } from "react-router-dom";

const CategoryMenu = () => {
  // Fetch categories using the QUERY_CATEGORIES query
  const { loading, error, data } = useQuery(QUERY_CATEGORIES);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Extract categories from the query data
  const categories = data.categories;

  return (
    <div>
      <h2>Categories</h2>

      {categories.map((category) => (
        <button key={category._id}>
          {/* Pass category ID as URL parameter */}
          <Link to={`/categories/${category._id}`}>{category.name}</Link>
        </button>
      ))}

      <button
        onClick={() => {
          handleClick("");
        }}
      >
        All
      </button>
    </div>
  );
};

export default CategoryMenu;
