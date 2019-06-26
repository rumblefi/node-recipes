import React from 'react'
import {Query} from 'react-apollo'
import {GET_USER_RECIPES} from '../../queries/index'
import Error from '../Error/Error'
import UserRecipe from '../UserRecipe/UserRecipe'

const UserRecipes = ({session,refetch}) => {
    const {username} = session.getCurrentUser
    return(
        <div>
            <h1>Your recipes</h1>
            <Query query={GET_USER_RECIPES} variables={{username}} >
                {({data:{getUserRecipes},loading,error}) => {
                    if(loading) return null
                    if(error) return <Error error={error.message} />
                    return(
                        <div>
                            {!getUserRecipes.length && <div>No recipes</div> }
                            <ul>
                                {getUserRecipes.map(recipe => {
                                    return(
                                        <UserRecipe key={recipe._id} recipe={recipe} session={session} refetch={refetch} />
                                    )
                                })}
                            </ul>
                        </div>
                    )
                }}
            </Query>
        </div>
    )
}

export default UserRecipes