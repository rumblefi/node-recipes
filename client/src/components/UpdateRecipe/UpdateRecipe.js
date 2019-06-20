import React from 'react'
import {withRouter} from 'react-router-dom'
import {Query, Mutation} from 'react-apollo'
import {GET_RECIPE,UPDATE_RECIPE,GET_ALL_RECIPES} from '../../queries/index'
import Loader from '../Loader/Loader'
import Error from '../Error/Error'

const initialState = {
    name: '',
    imageURL: '',
    description: '',
    ingredients: '',
    instructions: '',
    category: ''
}

class UpdateRecipe extends React.Component{

    state = initialState

    handleCompleteData = ({getRecipe}) => {
        this.setState({
            ...getRecipe
        })
    }

    handleChage = ({target: {name,value}}) => {
        this.setState({
            [name]: value
        })
    }

    clearState = () => {
        this.setState({
            ...initialState
        })
    }

    handleSubmit = async(event,updateRecipe) => {
        event.preventDefault()
        await updateRecipe()
        try {
            await this.props.refetch()
            this.clearState()
            this.props.history.push('/')
        } catch (error) {
            console.error(error)
        }
    }

    updateCache = (cache,{data: {updateRecipe}}) => {
        const {getAllRecipes} = cache.readQuery({query: GET_ALL_RECIPES})
        const targetRecipeIndex = getAllRecipes.findIndex(recipe => recipe._id === updateRecipe._id )
        getAllRecipes[targetRecipeIndex] = updateRecipe
        cache.writeQuery({
            query: GET_ALL_RECIPES,
            data: {
                getAllRecipes: [...getAllRecipes]
            }
        })
    }

    render() {

        const {_id} = this.props.match.params
        const formData = {
            _id,
            name: this.state.name,
            imageURL: this.state.imageURL,
            description: this.state.description,
            ingredients: this.state.ingredients, 
            instructions: this.state.instructions, 
            category: this.state.category 
        }

        return(
            <div className="add-recipe" >
                <div className="container add-recipe__container" >
                    <Query query={GET_RECIPE} variables={{_id}} onCompleted={this.handleCompleteData} >
                        {({data,loading,error}) => {
                            if(loading) return <Loader />
                            if(error) return <Error error={error.message} />

                            return(
                                
                                <Mutation mutation={UPDATE_RECIPE} variables={{inputData:formData}} update={this.updateCache} >

                                    {(updateRecipe,{data,loading,error}) => {
                                        if(error) return <Error error={error.message} />

                                        return(
                                            <form className="form add-recipe__form" onSubmit={(event) => this.handleSubmit(event,updateRecipe)} >
                                                <h1 className="h1">Edit Recipe</h1>
                                                <label className="form-label" >
                                                    <span className="form-label__title">Recipe Name</span>
                                                    <input type="text" className="form__field" name="name" value={formData.name} onChange={this.handleChage} />
                                                </label>
                                                <label className="form-label" >
                                                    <span className="form-label__title">Image URL</span>
                                                    <input type="text" className="form__field" name="imageURL" value={formData.imageURL} onChange={this.handleChage} />
                                                </label>
                                                <label className="form-label" >
                                                    <span className="form-label__title">Description</span>
                                                    <textarea name="description" className="form__textarea" value={formData.description} onChange={this.handleChage} ></textarea>
                                                </label>
                                                <label className="form-label" >
                                                    <span className="form-label__title">Ingredients</span>
                                                    <textarea name="ingredients" className="form__textarea" value={formData.ingredients} onChange={this.handleChage} ></textarea>
                                                </label>
                                                <label className="form-label" >
                                                    <span className="form-label__title">Instructions</span>
                                                    <textarea name="instructions onSubmit={this.handleSubmit} " className="form__textarea" value={formData.instructions} onChange={this.handleChage} ></textarea>
                                                </label>
                                                <label className="form-label" >
                                                    <span className="form-label__title">Category</span>
                                                    <select name="category" className="form__select" value={formData.category} onChange={this.handleChage} >
                                                        <option value="Breakfast">Breakfast</option>
                                                        <option value="Lunch">Lunch</option>
                                                        <option value="Dinner">Dinner</option>
                                                        <option value="Snack">Snack</option>
                                                    </select>
                                                </label>
                                                <button className="button button--1 form__submit">Add Recipe</button>
                                            </form> 
                                        )

                                    }}

                                </Mutation>                   
                            )

                        }}
                    </Query>
                </div>
            </div>
        )

    }

}

export default withRouter(UpdateRecipe)