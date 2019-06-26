import React from 'react'
import './RecipePage.scss'
import Like from '../Like/Like'
import {withRouter, Link} from 'react-router-dom'
import {Query} from 'react-apollo'
import {GET_RECIPE} from '../../queries/index'
import Error from '../Error/Error'
import Loader from '../Loader/Loader'
import {formatDate} from '../../helpers/formatDate'

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
                <Like recipe={recipe} session={session} />
                <div className="recipe-page-panel__right" >
                    <ul className="recipe-page-panel__list" >
                        <li>
                            Category: <Link to="/" exact="true" >{recipe.category}</Link>
                        </li>
                        <li>
                            Created by: <b>{recipe.username}</b>
                        </li>
                        <li>
                            Created: <b>{formatDate(recipe.createdAt)}</b>
                        </li>
                        <li>
                            Update: <b>{formatDate(recipe.updatedAt)}</b>
                        </li>
                    </ul>
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