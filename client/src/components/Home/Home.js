import React from 'react'
import RecipePreview from '../RecipePreview/RecipePreview'
import {GET_ALL_RECIPES} from '../../queries/index'
import {Query} from 'react-apollo'

const Home = () => (
    <main className="home" >
        <div className="container">
            <h1 className="h1">Recipies</h1>
            <Query query={GET_ALL_RECIPES} >
                {({data,loading,error}) => {
                    if(loading) return <p>loading...</p>
                    if(error) return <p>Error</p>
                    console.log('getAllRecipesData', data.getAllRecipes)
                    return <div>fuck</div>
                }}
            </Query>
            <div className="recipes" >
                <RecipePreview />
                <RecipePreview />
                <RecipePreview />
            </div>
        </div>  
    </main>
)

export default Home