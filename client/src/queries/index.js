import {gql} from 'apollo-boost'

export const GET_ALL_RECIPES = gql`
    query{
        getAllRecipes{
            _id
            name
            description
            category
            username
            createdDate
        }
    }
`

export const GET_CURRENT_USER = gql`
    query{
        getCurrentUser{
            username
            joinDate
            email
        }
    }
`

export const GET_RECIPE = gql`
    query($_id: ID!) {
        getRecipe(_id: $_id) {
            name
            description
            instructions
            category
            username
            createdDate
            likes
            createdDate
        }
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