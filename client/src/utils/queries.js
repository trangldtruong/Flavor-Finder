import { gql } from '@apollo/client';

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;



export const QUERY_RECIPES = gql`
  query getRecipes {
    _id
    category{
        name
    }
    description
    ingredients
    preparationTime
    servings
    author
  }
`;

export const QUERY_USER = gql`
  query userRecipe{
      userRecipes {
        title
        category {
          name
        }
        description
        ingredients
        preparationTime
        servings
        author
      }
  }
`;