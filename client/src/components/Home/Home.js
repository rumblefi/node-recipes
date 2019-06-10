import React from 'react'
import RecipePreview from '../RecipePreview/RecipePreview'

const Home = () => (
    <main className="home" >
        <div className="container">
            <h1 className="h1">Recipies</h1>
            <div className="recipes" >
                <RecipePreview />
                <RecipePreview />
                <RecipePreview />
            </div>
        </div>  
    </main>
)

export default Home