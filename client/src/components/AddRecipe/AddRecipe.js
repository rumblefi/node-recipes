import React from 'react'
import './AddRecipe.scss'
import {Mutation} from 'react-apollo'
import {ADD_RECIPE, GET_ALL_RECIPES} from '../../queries/index'
import Error from '../Error/Error'
import {withRouter} from 'react-router-dom'
import withAuth from '../../HOC/withAuth/withAuth'

const initialState = {
    name: '',
    imageURL: '',
    description: '',
    ingredients: '',
    instructions: '',
    category: 'Breakfast',
    username: ''
}

class AddRecipe extends React.Component{

    state = initialState

    componentDidMount() {
        this.setState({
            username: this.props.session.getCurrentUser.username
        })
    }

    clearState = () => {
        this.setState({...initialState})
    }

    handleChange = (event) => {
        const {name,value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async(event,addRecipe) => {
        event.preventDefault()
        const addRecipeData = await addRecipe()
        try {
            this.clearState()
            this.props.history.push('/')
        } catch (error) {
            console.error(error)
        }
    }

    updateCache = (cache,{data: {addRecipe}}) => {
        const {getAllRecipes} = cache.readQuery({query: GET_ALL_RECIPES})
        cache.writeQuery({
            query: GET_ALL_RECIPES,
            data: {
                getAllRecipes: [addRecipe,...getAllRecipes]
            }
        })
    }

    render() {

        const {name,imageURL,description,ingredients,instructions,category,username} = this.state

        return(
            <div className="add-recipe" >
                <div className="container add-recipe__container" >

                    <Mutation mutation={ADD_RECIPE} variables={{name,imageURL,description,ingredients,instructions,category,username}} update={this.updateCache} >

                        {(addRecipe,{data,loading,error}) => {
                            if(error) return <Error error={error.message} />
                            return(
                                <form className="form add-recipe__form" onSubmit={(event) => this.handleSubmit(event,addRecipe)} >
                                    <h1 className="h1">Add Recipe</h1>
                                    <label className="form-label" >
                                        <span className="form-label__title">Recipe Name</span>
                                        <input type="text" className="form__field" name="name" onChange={this.handleChange} value={name} />
                                    </label>
                                    <label className="form-label" >
                                        <span className="form-label__title">Image URL</span>
                                        <input type="text" className="form__field" name="imageURL" onChange={this.handleChange} value={imageURL} />
                                    </label>
                                    <label className="form-label" >
                                        <span className="form-label__title">Description</span>
                                        <textarea name="description" className="form__textarea" onChange={this.handleChange} value={description} ></textarea>
                                    </label>
                                    <label className="form-label" >
                                        <span className="form-label__title">Ingredients</span>
                                        <textarea name="ingredients" className="form__textarea" onChange={this.handleChange} value={ingredients} ></textarea>
                                    </label>
                                    <label className="form-label" >
                                        <span className="form-label__title">Instructions</span>
                                        <textarea name="instructions" className="form__textarea" onChange={this.handleChange} value={instructions} ></textarea>
                                    </label>
                                    <label className="form-label" >
                                        <span className="form-label__title">Category</span>
                                        <select name="category" className="form__select" onChange={this.handleChange} value={category} >
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
                </div>  
            </div>
        )

    }

}

export default withAuth(withRouter(AddRecipe))