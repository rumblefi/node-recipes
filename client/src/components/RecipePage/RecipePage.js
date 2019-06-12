import React from 'react'
import './RecipePage.scss'
import Like from '../Like/Like'
import {withRouter} from 'react-router-dom'
import {Query} from 'react-apollo'
import {GET_RECIPE} from '../../queries/index'
import Error from '../Error/Error'

const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString()
}

const RecipePageLayout = ({recipe}) => (
    <div>
        <h1 className="h1">{recipe.name}</h1>
        <img src="https://www.cscassets.com/recipes/wide_cknew/wide_32.jpg" className="recipe-page__img" />
        <div className="recipe-page__description">{recipe.description}</div>
        <div className="recipe-page__blocks" >
            <div className="recipe-page__block" style={{backgroundColor: 'yellow'}} >
                <h2 className="recipe-page__sub-title">Ingredients needed:</h2>
                <ul className="recipe-page-list" >
                    <li className="recipe-page-list__item" >2 x 170 g cans light meat tuna chunks</li>
                    <li className="recipe-page-list__item" >2 x 170 g cans light meat tuna chunks</li>
                    <li className="recipe-page-list__item" >2 x 170 g cans light meat tuna chunks</li>
                    <li className="recipe-page-list__item" >2 x 170 g cans light meat tuna chunks</li>
                    <li className="recipe-page-list__item" >2 x 170 g cans light meat tuna chunks</li>
                    <li className="recipe-page-list__item" >2 x 170 g cans light meat tuna chunks</li>
                </ul>
            </div>
            <div className="recipe-page__block" >
                <h2 className="recipe-page__sub-title">Reciepe instructions</h2>
                <div className="recipe-page__instructions">{recipe.instructions}</div>
            </div>
        </div>
        <div className="recipe-page-panel">
            <Like count={recipe.likes} />
            <div className="recipe-page-panel__right" >
                <div className="recipe-page__category">Category: <a href="">{recipe.category}</a></div>
                <div className="recipe-page__user">Created by: <b>{recipe.username}</b> at <b>{formatDate(recipe.createdDate)}</b></div>
            </div>
        </div>
        <div className="recipe-page__back-wrapper">
            <a href="" className="button button--1 recipe-page__back">Back</a>
        </div>
    </div>
)

const RecipePage = ({match}) => {

    const {_id} = match.params

    return(
        <main className="recipe-page" >
            <div className="container" >
                <Query query={GET_RECIPE} variables={{_id}} >
                    {({data,loading,error}) => {
                        if(loading) return <div>Loading...</div>
                        if(error) return <Error error={error.message} />
                        return <RecipePageLayout recipe={data.getRecipe} />
                    }}
                </Query>
            </div>
        </main>
    )

}

export default withRouter(RecipePage)