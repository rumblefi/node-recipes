import React from 'react'
import './Like.scss'
import {Mutation} from 'react-apollo'
import {LIKE_RECIPE} from '../../queries/index'

const LikeUnAuth = ({count}) => {
    return(
        <div className="like" style={{display:'block'}} >
            <span className="like__title">Likes</span>
            <span className="like__counter"> {count}</span>
        </div>
    )
}

const LikeAuth = ({count}) => {
    return(
        <div className="like" >
            <div className="like__heart"></div>    
            <div className="like__counter">{count}</div>
        </div>
    )
}

class Like extends React.Component{

    // render() {
    //     const {count,session:{getCurrentUser}} = this.props
    //     if(getCurrentUser) return <LikeAuth count={count} />
    //     return <LikeUnAuth count={count} />
    // }

    state = {
        doIncrement: false
    }

    handleLikeRecipe = async(likeRecipe) => {
        await likeRecipe()
        try {
            console.log('Yeah')
        } catch (error) {
            console.error(error)
        }
    }

    render() {

        const {recipe} = this.props
        const {doIncrement} = this.state

        console.log('doIncrement', doIncrement)

        return(
            <Mutation mutation={LIKE_RECIPE} variables={{_id:recipe._id,doIncrement}} >

                {(likeRecipe,{data,loading,error}) => {

                    if(error) console.error(error) 

                    return(
                        <div className="like" onClick={() => this.handleLikeRecipe(likeRecipe)} >
                            <div className="like__heart"></div>    
                            <div className="like__counter">{recipe.likes}</div>
                        </div>
                    )

                }}

            </Mutation>
        )

    }

}

export default Like