import React from 'react'
import {GET_ALL_RECIPES} from '../../queries/index'
import {Query} from 'react-apollo'
import Error from '../Error/Error'
import Recipes from '../Recipes/Recipes'
import Loader from '../Loader/Loader'

const Home = () => (
    <main className="home" >
        <div className="container">
            <h1 className="h1">Recipies</h1>
            <Query query={GET_ALL_RECIPES} >
                {({data,loading,error}) => {
                    if(loading) return <Loader /> 	
                    if(error) return <Error error={error.message} />
                    if(data.getAllRecipes.length > 0) return <Recipes recipes={data} /> 
                    return <span>No recipes</span>
                }}
            </Query>
        </div>  
    </main>
)

export default Home