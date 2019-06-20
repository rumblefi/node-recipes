import React from 'react'
import RecipePreview from '../RecipePreview/RecipePreview'

const Recipes = ({recipes, session}) => {
    return(
        <div className="recipes">
            {recipes.getAllRecipes.map(recipe => {
                return <RecipePreview session={session} key={recipe._id} recipe={recipe} />
            })}
        </div>
    )
}

export default Recipes