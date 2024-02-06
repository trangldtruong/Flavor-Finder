const typeDefs = `

    type Ingredient{
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
        category: [Category]
        description: String
        ingredients: [Ingredient]
        preparationTime: Int
        servings: Int
        author: String
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
        user: User
    }

    type Mutation {
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        addRecipe(description: String, ingredients: [ID]!, preparationTime: Int, servings: Int, author: String): Recipe
        updateRecipe(description: String, ingredients: [ID]!, preparationTime: Int, servings: Int, author: String): Recipe
        login(email: String!, password: String!): Auth

    }

`;

module.exports = typeDefs;