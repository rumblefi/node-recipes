import React from 'react'
import RecipePreview from '../RecipePreview/RecipePreview'

const Recipes = ({recipes}) => {
    return(
        <div className="recipes">
            {recipes.getAllRecipes.map(recipe => {
                return <RecipePreview key={recipe._id} recipe={recipe} />
            })}
        </div>
    )
}

export default Recipes