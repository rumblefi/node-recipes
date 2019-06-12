import React from 'react'
import './RecipePreview.scss'
import {Link} from 'react-router-dom'

const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString()
}

const RecipePreview = ({recipe}) => {

    console.log('recipe', recipe)
    
    return(
        <div className="recipe-preview" >
            <img src="https://www.cscassets.com/recipes/wide_cknew/wide_32.jpg" className="recipe-preview__img" /> 
            <div className="recipe-preview__body" >
                <Link to={`/recipe/${recipe._id}`} className="recipe-preview__title">{recipe.name}</Link>
                <div className="recipe-preview__description" >{recipe.description}</div>
                <div className="recipe-preview-panel" >
                    {/* <div className="recipe-preview-panel__buttons" >
                        <a href="" className="button button--1 recipe-preview-panel__button">Edit</a>
                        <div className="button button--2 recipe-preview-panel__button">Delete</div>
                    </div> */}
                    <aside className="recipe-preview-panel__aside" >
                        <div className="recipe-preview-panel__category">Category: <a href="">{recipe.category}</a></div>
                        <div className="recipe-preview-panel__user">Created by: <b>{recipe.username}</b> at <b>{formatDate(recipe.createdDate)}</b></div>
                    </aside>
                </div>
            </div>
        </div>
    )

}

export default RecipePreview