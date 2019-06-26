import React from 'react'
import {Link} from 'react-router-dom'
import {Mutation} from 'react-apollo'
import {GET_ALL_RECIPES,DELETE_RECIPE,GET_USER_RECIPES} from '../../queries/index'

class UserRecipe extends React.Component {

    handleDeleteRecipe = async(deleteRecipe) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this recipe?')
        if(confirmDelete) {
            deleteRecipe()
                .then((data) => console.log(data))
                .catch(error => console.error(error))
        }
    }

    render() {

        const {recipe} = this.props
        const {username} = this.props.session.getCurrentUser

        return(
            <li>
                <Link to={`/recipe/${recipe._id}`} >{recipe.name}</Link>
                <div>{recipe.description}</div>

                <Mutation 
                    mutation={DELETE_RECIPE} 
                    variables={{_id:recipe._id}} 
                    update={(cache,{data: {deleteRecipe}}) => {
                        const {getUserRecipes} = cache.readQuery({
                          query: GET_USER_RECIPES,
                          variables: {username}  
                        })
                        cache.writeQuery({
                            query: GET_USER_RECIPES,
                            variables: {username},
                            data: {
                                getUserRecipes: getUserRecipes.filter(recipe => recipe._id !== deleteRecipe._id)
                            }
                        })
                    }} 
                    refetchQueries={() => [
                        {
                            query: GET_ALL_RECIPES
                        }
                    ]}
                >
                    {(deleteRecipe,attrs={}) => (
                        <button onClick={() => this.handleDeleteRecipe(deleteRecipe)}>
                            {attrs.loading ? 'Deleting...' : 'Delete' }
                        </button>
                    )}
    
                </Mutation>
            </li>
        )

    }

}

export default UserRecipe