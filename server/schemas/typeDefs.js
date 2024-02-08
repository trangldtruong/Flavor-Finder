const typeDefs = `

type Ingredient {
    _id: ID
    name: String
}

type Category {
    _id: ID
    name: String
}

type Recipe {
    _id: ID
    title: String
    category: Category
    description: String
    ingredients: [String]
    preparationTime: Int
    servings: Int
    instructions: String
    notes: String
    author: User
}

type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    recipes: [Recipe]
}

type Auth {
    token: ID
    user: User
}

type Query {
    categories: [Category]
    recipes(category: ID, name: String): [Recipe]
    recipe(_id: ID!): Recipe
    userRecipes: [Recipe]
}

type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addRecipe(
        title: String!
        description: String!
        category: String!
        ingredients: [String]!
        preparationTime: Int!
        servings: Int!
        instructions: String
        notes: String
      ): Recipe
    updateRecipe(_id: ID!, description: String, ingredients: [ID]!, preparationTime: Int, servings: Int): Recipe
    login(email: String!, password: String!): Auth
}

`;

module.exports = typeDefs;
