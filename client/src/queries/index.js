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

export const SIGNUP_USER = gql`
    mutation($username: String!, $email: String!, $password: String!) {
        signupUser(username:$username,email: $email, password: $password){
            token
        }
    }
`