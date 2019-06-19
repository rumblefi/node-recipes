import React from 'react'

class EditRecipe extends React.Component{

    state = {
        name: '',
        imageURL: '',
        description: '',
        ingredients: '',
        instructions: '',
        category: ''
    }

    render() {

        return(
            <div className="add-recipe" >
                <div className="container add-recipe__container" >
                    <form className="form add-recipe__form">
                        <h1 className="h1">Edit Recipe</h1>
                        <label className="form-label" >
                            <span className="form-label__title">Recipe Name</span>
                            <input type="text" className="form__field" name="name" />
                        </label>
                        <label className="form-label" >
                            <span className="form-label__title">Image URL</span>
                            <input type="text" className="form__field" name="imageURL"/>
                        </label>
                        <label className="form-label" >
                            <span className="form-label__title">Description</span>
                            <textarea name="description" className="form__textarea" ></textarea>
                        </label>
                        <label className="form-label" >
                            <span className="form-label__title">Ingredients</span>
                            <textarea name="ingredients" className="form__textarea"></textarea>
                        </label>
                        <label className="form-label" >
                            <span className="form-label__title">Instructions</span>
                            <textarea name="instructions" className="form__textarea"></textarea>
                        </label>
                        <label className="form-label" >
                            <span className="form-label__title">Category</span>
                            <select name="category" className="form__select" >
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

    }

}

export default EditRecipe