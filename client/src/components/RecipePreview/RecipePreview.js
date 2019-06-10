import React from 'react'
import './RecipePreview.scss'

const RecipePreview = () => (
    <div className="recipe-preview" >
        <img src="https://www.cscassets.com/recipes/wide_cknew/wide_32.jpg" className="recipe-preview__img" /> 
        <div className="recipe-preview__body" >
            <a href="" className="recipe-preview__title">Classic Tuna Mayo</a>
            <div className="recipe-preview__description" >Nothing mouth watering like the Toasted Tuna Mayo</div>
            <div className="recipe-preview-panel" >
                {/* <div className="recipe-preview-panel__buttons" >
                    <a href="" className="button button--1 recipe-preview-panel__button">Edit</a>
                    <div className="button button--2 recipe-preview-panel__button">Delete</div>
                </div> */}
                <aside className="recipe-preview-panel__aside" >
                    <div className="recipe-preview-panel__category">Category: <a href="">Snack</a></div>
                    <div className="recipe-preview-panel__user">Created by: <b>Yuriy Bahur</b> at <b>10.06.2019</b></div>
                </aside>
            </div>
        </div>
    </div>
)

export default RecipePreview