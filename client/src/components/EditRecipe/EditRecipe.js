import React from 'react'
import {withRouter} from 'react-router-dom'
import {Query} from 'react-apollo'
import {GET_RECIPE} from '../../queries/index'
import Loader from '../Loader/Loader'
import Error from '../Error/Error'

class EditRecipe extends React.Component{

    state = {
        name: '',
        imageURL: '',
        description: '',
        ingredients: '',
        instructions: '',
        category: ''
    }

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

    handleSubmit = event => {
        event.preventDefault()
    }

    render() {

        const {_id} = this.props.match.params
        const {name,imageURL,description,ingredients,instructions,category} = this.state

        return(

            <Query query={GET_RECIPE} variables={{_id}} onCompleted={this.handleCompleteData} >

                {({data,loading,error}) => {
                    if(loading) return <Loader />
                    if(error) return <Error error={error.message} />
                    
                    return(
                        <div className="add-recipe" >
                            <div className="container add-recipe__container" >
                                <form className="form add-recipe__form" onSubmit={this.handleSubmit} >
                                    <h1 className="h1">Edit Recipe</h1>
                                    <label className="form-label" >
                                        <span className="form-label__title">Recipe Name</span>
                                        <input type="text" className="form__field" name="name" value={name} onChange={this.handleChage} />
                                    </label>
                                    <label className="form-label" >
                                        <span className="form-label__title">Image URL</span>
                                        <input type="text" className="form__field" name="imageURL" value={imageURL} onChange={this.handleChage} />
                                    </label>
                                    <label className="form-label" >
                                        <span className="form-label__title">Description</span>
                                        <textarea name="description" className="form__textarea" value={description} onChange={this.handleChage} ></textarea>
                                    </label>
                                    <label className="form-label" >
                                        <span className="form-label__title">Ingredients</span>
                                        <textarea name="ingredients" className="form__textarea" value={ingredients} onChange={this.handleChage} ></textarea>
                                    </label>
                                    <label className="form-label" >
                                        <span className="form-label__title">Instructions</span>
                                        <textarea name="instructions onSubmit={this.handleSubmit} " className="form__textarea" value={instructions} onChange={this.handleChage} ></textarea>
                                    </label>
                                    <label className="form-label" >
                                        <span className="form-label__title">Category</span>
                                        <select name="category" className="form__select" value={category} onChange={this.handleChage} >
                                            <option value="Breakfast">Breakfast</option>
                                            <option value="Lunch">Lunch</option>
                                            <option value="Dinner">Dinner</option>
                                            <option value="Snack">Snack</option>
                                        </select>
                                    </label>
                                    <button className="button button--1 form__submit">Add Recipe</button>
                                </form>                    
                            </div>
                        </div>
                    )

                }}

            </Query>

        )

    }

}

export default withRouter(EditRecipe)