import { gql } from "@apollo/client";

export const QUERY_CATEGORIES = gql`
  query getCategories {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_RECIPES = gql`
  query getRecipes {
    recipes {
      _id
      title
      category {
        name
      }
      description
      ingredients
      preparationTime
      servings
      instructions
      notes
      author {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const QUERY_USER = gql`
  query getUserRecipes {
    userRecipes {
      title
      category {
        name
      }
      description
      ingredients
      preparationTime
      servings
      instructions
      notes
      author {
        _id
      }
    }
  }
`;
