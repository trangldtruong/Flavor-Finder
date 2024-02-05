const typeDefs = `

    type Ingredient{
        _id: ID
        name: String
    }

    type Category {
        _id: ID
        name: String
    }
    
    type Recipe
        _id: ID
        category: [Category]
        description: String
        ingredients: [Ingredient]
        preperationTime: Int
        servings: Int
        author: String
    }

    type User {
        _id: ID
        firstName: String
        lastName: String
        email:
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
        addUser(firstName: String!, lastName: String!, email: String!, password: String!) Auth
        addRecipe(description: String, ingredients: [ID]!, preparetionTime: Int, servings: Int, author: String): Recpie
        updateUser(firstName: String, lastName: String, email: String, password: String): User
        login(email: String!, password: String!): Auth

    }

`