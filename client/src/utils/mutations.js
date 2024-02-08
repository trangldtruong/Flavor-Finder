import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_RECIPE = gql`
  mutation addRecipe(
    $description: String
    $ingredients: [String]!
    $preparationTime: Int
    $servings: Int
    $author: ID
  ) {
    addRecipe(
      description: $description
      ingredients: $ingredients
      preparationTime: $preparationTime
      servings: $servings
      author: $author
    ) {
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
      }
    }
  }
`;

export const UPDATE_RECIPE = gql`
  mutation updateRecipe(
    $_id: ID!
    $description: String
    $ingredients: [String]!
    $preparationTime: Int
    $servings: Int
    $author: ID
  ) {
    updateRecipe(
      _id: $_id
      description: $description
      ingredients: $ingredients
      preparationTime: $preparationTime
      servings: $servings
      author: $author
    ) {
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
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const DELETE_RECIPE = gql`
  mutation deleteRecipe($_id: ID!) {
    deleteRecipe(_id: $_id) {
      _id
      title
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
