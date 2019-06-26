import React from 'react'
import {Link} from 'react-router-dom'
import {Mutation} from 'react-apollo'
import {DELETE_RECIPE,GET_USER_RECIPES} from '../../queries/index'
import Error from '../Error/Error'

class UserRecipe extends React.Component {

    handleDeleteRecipe = async(event,deleteRecipe) => {
        await deleteRecipe()
        try {
            await this.props.refetch()
        } catch (error) {
            console.error(error)
        }
    }

    updateCache = (cache,{data: {deleteRecipe}}) => {
        const {username} = this.props.session.getCurrentUser
        const {getUserRecipes} = cache.readQuery({query: GET_USER_RECIPES, variables: {username}})
        const deletedRecipeIndex = getUserRecipes.findIndex(recipe => recipe._id === deleteRecipe._id)
        const updatedUserRecipes = [...getUserRecipes.slice(0,deletedRecipeIndex), ...getUserRecipes.slice(deletedRecipeIndex+1)]
        cache.writeQuery({
            query: GET_USER_RECIPES,
            data: {
                getUserRecipes: updatedUserRecipes
            }
        })
    }

    render() {

        const {recipe} = this.props
        
        return(
            <li>
                <Link to={`/recipe/${recipe._id}`} >{recipe.name}</Link>
                <div>{recipe.description}</div>

                <Mutation mutation={DELETE_RECIPE} variables={{_id:recipe._id}} update={this.updateCache} >
    
                    {(deleteRecipe, {data,loading,error}) => {
    
                        if(loading) return null
    
                        if(error) return <Error error={error.message} />
    
                        return(
                            <button onClick={(event) => this.handleDeleteRecipe(event,deleteRecipe)} >Delete</button>
                        )
    
    
                    }}
    
                </Mutation>
            </li>
        )

    }

}

export default UserRecipe