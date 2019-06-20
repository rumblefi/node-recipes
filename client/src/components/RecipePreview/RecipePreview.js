import React from 'react'
import './RecipePreview.scss'
import {Link} from 'react-router-dom'
import {formatDate} from '../../helpers/formatDate'

const RecipePreviewButtons = ({recipe}) => {
    return(
        <div className="recipe-preview-panel__buttons" >
            <Link to={`/update-recipe/${recipe._id}`} className="button button--1 recipe-preview-panel__button">Edit</Link>
            <div className="button button--2 recipe-preview-panel__button">Delete</div>
        </div>
    )
}

const RecipePreview = ({recipe,session: {getCurrentUser}}) => {
    return(
        <div className="recipe-preview" >
            <img src={recipe.imageURL} className="recipe-preview__img" /> 
            <div className="recipe-preview__body" >
                <Link to={`/recipe/${recipe._id}`} className="recipe-preview__title">{recipe.name}</Link>
                <div className="recipe-preview__description" >{recipe.description}</div>
                <div className="recipe-preview-panel" >
                    <ul className="recipe-preview-panel__list">
                        <li>
                            Category: <Link to="/" exact>{recipe.category}</Link>
                        </li>
                        <li>
                            Created by: <b>{recipe.username}</b>
                        </li>
                        <li>
                            Create: <b>{formatDate(recipe.createdAt)}</b>
                        </li>
                        <li>
                            Update: <b>{formatDate(recipe.updatedAt)}</b>
                        </li>
                    </ul>
                    {getCurrentUser && <RecipePreviewButtons recipe={recipe} />}
                </div>
            </div>
        </div>
    )

}

export default RecipePreview