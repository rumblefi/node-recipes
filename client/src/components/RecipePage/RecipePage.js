import React from 'react'
import './RecipePage.scss'
import Like from '../Like/Like'
import {withRouter} from 'react-router-dom'
import {GET_RECIPE} from '../../queries/index'
import {Query} from 'react-apollo'

const RecipePage = ({match}) => {
    
    return(

        <Query query={} >


        </Query>

    )
    // return(
    //     <main className="recipe-page" >
    //         <div className="container">
    //             <h1 className="h1">Classic Tuna Mayo</h1>
    //             <img src="https://www.cscassets.com/recipes/wide_cknew/wide_32.jpg" className="recipe-page__img" />
    //             <div className="recipe-page__description">Nothing mouth watering like the Toasted Tuna Mayo</div>
    //             <div className="recipe-page__blocks" >
    //                 <div className="recipe-page__block" >
    //                     <h2 className="recipe-page__sub-title">Ingredients needed:</h2>
    //                     <ul className="recipe-page-list" >
    //                         <li className="recipe-page-list__item" >2 x 170 g cans light meat tuna chunks</li>
    //                         <li className="recipe-page-list__item" >2 x 170 g cans light meat tuna chunks</li>
    //                         <li className="recipe-page-list__item" >2 x 170 g cans light meat tuna chunks</li>
    //                         <li className="recipe-page-list__item" >2 x 170 g cans light meat tuna chunks</li>
    //                         <li className="recipe-page-list__item" >2 x 170 g cans light meat tuna chunks</li>
    //                         <li className="recipe-page-list__item" >2 x 170 g cans light meat tuna chunks</li>
    //                     </ul>
    //                 </div>
    //                 <div className="recipe-page__block" >
    //                     <h2 className="recipe-page__sub-title">Reciepe instructions</h2>
    //                     <div className="recipe-page__instructions">Drain the tuna well, then transfer to a bowl. Separate into large flakes using a fork and mix well with the remaining ingredients except the bread, cress and crisps. Chill until ready to use.Sandwich 3–4 T of the mixture between 2 slices of bread. Spread the outside of the sandwich with a thin layer of mayonnaise and slowly brown in a nonstick pan, covering the bread with a square of baking paper, and weighing it down in the pan.Serve with cress and crisps.</div>
    //                 </div>
    //             </div>
    //             <div className="recipe-page-panel">
    //                 <Like />
    //                 <div className="recipe-page-panel__right" >
    //                     <div className="recipe-page__category">Category: <a href="">Snack</a></div>
    //                     <div className="recipe-page__user">Created by: Yuriy Bahur</div>
    //                 </div>
    //             </div>
    //             <div className="recipe-page__back-wrapper">
    //                 <a href="" className="button button--1 recipe-page__back">Back</a>
    //             </div>
    //         </div>  
    //     </main>
    // )
}

export default withRouter(RecipePage)