exports.typeDefs = `

    type Recipe{
        _id: ID!
        name: String!
        imageURL: String!
        category: String!
        description: String!
        ingredients: String!
        instructions: String!
        likes: Int
        username: String
        createdAt: String!
        updatedAt: String!
    }

    type User {
        _id: ID
        username: String! @unique
        password: String!
        email: String!
        joinDate: String
        favorites: [Recipe]
    }

    type Token{
        token: String!
    }

    type Query {
        getAllRecipes: [Recipe]
        getCurrentUser: User
        getRecipe(_id: ID!): Recipe
    }

    input UpdateRecipeInput {
        _id: ID!
        name: String!
        imageURL: String!
        description: String!
        category: String!
        ingredients: String!
        instructions: String!
    }

    type Mutation {
        addRecipe(name: String!, imageURL: String!, description: String!, category: String!, ingredients: String!, instructions: String!, username: String): Recipe
        signinUser(username: String!, password: String!): Token
        signupUser(username: String!, email: String!, password: String!): Token
        updateRecipe(inputData: UpdateRecipeInput!): Recipe
    }

`