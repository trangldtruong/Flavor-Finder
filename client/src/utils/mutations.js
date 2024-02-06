import { gql } from '@apollo/client';

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
  mutation addRecipe($recipes: [ID]!) {
    addRecipe(recipes: $recipes) {
      recipe {
        _id
        title
        description
        ingredients
        preparationTime
        servings
        instructions
        category {
          name
        }
        notes
        author
      }
    }
  }
`;

export const UPDATE_RECIPE = gql`
mutation updateRecipe($recipes: [ID]!) {
    updateRecipe(recipes: $recipes) {
        recipe {
            _id
            title
            description
            ingredients
            preparationTime
            servings
            instructions
            category {
              name
            }
            notes
            author
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
mutation deleteRecipe($recipes: [ID]!) {
    deleteRecipe(recipes: $recipes) {
        recipes {
            _id
            title
            description
            ingredients
            preparationTime
            servings
            instructions
            category {
              name
            }
            notes
            author
        }
    }
}
`;