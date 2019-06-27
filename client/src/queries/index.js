import {gql} from 'apollo-boost'

export const GET_ALL_RECIPES = gql`
    query{
        getAllRecipes{
            _id
            name
            description
            category
            username
            imageURL
            createdAt
            updatedAt
        }
    }
`

export const GET_CURRENT_USER = gql`
    query{
        getCurrentUser{
            username
            joinDate
            email
            favorites{
                _id
                name
            }
        }
    }
`

export const GET_RECIPE = gql`
    query($_id: ID!) {
        getRecipe(_id: $_id) {
            _id
            name
            description
            instructions
            category
            username
            likes
            createdAt
            updatedAt
            imageURL
            ingredients
        }
    }
`

export const GET_USER_RECIPES = gql`
    query($username: String!){
        getUserRecipes(username:$username) {
            _id
            name
            description
        }
    }
`

export const IS_RECIPE_LIKED = gql`
    query($recipeId: ID!, $username: String!) {
        isRecipeLiked(recipeId:$recipeId, username: $username)
    }
`

export const SIGNUP_USER = gql`
    mutation($username: String!, $email: String!, $password: String!) {
        signupUser(username:$username,email: $email, password: $password){
            token
        }
    }
`

export const SIGNIN_USER = gql`
    mutation($username: String!,$password: String!) {
        signinUser(username:$username,password: $password){
            token
        }
    }
`

export const ADD_RECIPE = gql`
    mutation($name: String!, $imageURL: String!, $description: String!, $category: String!, $ingredients: String!, $instructions: String!, $username: String) {
        addRecipe(name: $name, imageURL: $imageURL, description: $description, category: $category, ingredients: $ingredients, instructions: $instructions, username: $username){
            _id
            name
        }
    }
`

export const UPDATE_RECIPE = gql`
    mutation($inputData: UpdateRecipeInput!) {
        updateRecipe(inputData: $inputData) {
            _id
            name
            description
            instructions
            category
            username
            createdAt
            likes
            imageURL
            ingredients
            updatedAt
        }
    }
`

export const DELETE_RECIPE = gql`
    mutation($_id: ID!) {
        deleteRecipe(_id: $_id) {
            _id
            name
        }
    }
`

export const LIKE_RECIPE = gql`
    mutation($recipeId: ID!,$username: String!, $doIncrement: Boolean!) {
        likeRecipe(recipeId: $recipeId, username: $username, doIncrement: $doIncrement) {
            likes
        }
    }
`