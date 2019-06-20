import React from 'react'
import './RecipePage.scss'
import Like from '../Like/Like'
import {withRouter, Link} from 'react-router-dom'
import {Query} from 'react-apollo'
import {GET_RECIPE} from '../../queries/index'
import Error from '../Error/Error'
import Loader from '../Loader/Loader'

const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString()
}

const RecipePageLayout = ({recipe,session}) => {
    return(
        <div>
            <h1 className="h1">{recipe.name}</h1>
            <img src={recipe.imageURL} className="recipe-page__img" />
            <div className="recipe-page__description">{recipe.description}</div>
            <div className="recipe-page__blocks" >
                <div className="recipe-page__block">
                    <h2 className="recipe-page__sub-title">Ingredients needed:</h2>
                    <ul className="recipe-page-list" >
                        <li className="recipe-page-list__item" >{recipe.ingredients}</li>
                    </ul>
                </div>
                <div className="recipe-page__block" >
                    <h2 className="recipe-page__sub-title">Reciepe instructions</h2>
                    <div className="recipe-page__instructions">{recipe.instructions}</div>
                </div>
            </div>
            <div className="recipe-page-panel">
                <Like count={recipe.likes} session={session} />
                <div className="recipe-page-panel__right" >
                    <div className="recipe-page__category">Category: <a href="">{recipe.category}</a></div>
                    <div className="recipe-page__user">Created by: <b>{recipe.username}</b> at <b>{formatDate(recipe.createdDate)}</b></div>
                </div>
            </div>
            <div className="recipe-page__back-wrapper">
                <Link to="/" exact="true" className="button button--1 recipe-page__back">Back</Link>
            </div>
        </div>
    )
}

const RecipePage = ({match,session}) => {

    const {_id} = match.params

    return(
        <main className="recipe-page" >
            <div className="container" >
                <Query query={GET_RECIPE} variables={{_id}} >
                    {({data,loading,error}) => {
                        if(loading) return <Loader />
                        if(error) return <Error error={error.message} />
                        return <RecipePageLayout recipe={data.getRecipe} session={session} />
                    }}
                </Query>
            </div>
        </main>
    )

}

export default withRouter(RecipePage)