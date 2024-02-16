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

export const ADD_RECIPE = gql`
  mutation addRecipe(
    $title: String!
    $category: CategoryInput
    $description: String!
    $ingredients: [String]!
    $preparationTime: Int!
    $servings: Int!
    $instructions: String!
    $notes: String!
    $author: ID!
  ) {
    addRecipe(
      title: $title
      category: $category
      description: $description
      ingredients: $ingredients
      preparationTime: $preparationTime
      servings: $servings
      instructions: $instructions
      notes: $notes
      author: $author
    ) {
      _id
      title
      category {
        _id
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
    $title: String!
    $category: CategoryInput
    $description: String!
    $ingredients: [String]!
    $preparationTime: Int!
    $servings: Int!
    $instructions: String!
    $notes: String!
  ) {
    updateRecipe(
      _id: $_id
      title: $title
      category: $category
      description: $description
      ingredients: $ingredients
      preparationTime: $preparationTime
      servings: $servings
      instructions: $instructions
      notes: $notes
    ) {
      _id
      title
      category {
        _id
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

export const DELETE_RECIPE = gql`
  mutation deleteRecipe($_id: ID!) {
    deleteRecipe(_id: $_id) {
      _id
    }
  }
`;
