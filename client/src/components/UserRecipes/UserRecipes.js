import React from 'react'
import {Query} from 'react-apollo'
import {GET_USER_RECIPES} from '../../queries/index'
import Error from '../Error/Error'
import {Link} from 'react-router-dom'

const UserRecipes = ({session: {getCurrentUser}}) => {
    const {username} = getCurrentUser
    return(
        <div>
            <h1>Your recipes</h1>
            <Query query={GET_USER_RECIPES} variables={{username}} >
                {({data:{getUserRecipes},loading,error}) => {
                    if(loading) return null
                    if(error) return <Error error={error.message} />
                    return(
                        <ul>
                            {getUserRecipes.map(recipe => {
                                return(
                                    <li key={recipe._id} >
                                        <Link to={`/recipe/${recipe._id}`} >{recipe.name}</Link>
                                        <div>{recipe.description}</div>
                                    </li>
                                )
                            })}
                        </ul>
                    )
                }}
            </Query>
        </div>
    )
}

export default UserRecipes