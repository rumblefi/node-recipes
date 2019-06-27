import React from 'react'
import './Like.scss'
import {Query,Mutation} from 'react-apollo'
import {LIKE_RECIPE,IS_RECIPE_LIKED,GET_RECIPE, GET_ALL_RECIPES} from '../../queries/index'

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
        isRecipeLiked: false
    }

    handleIsRecipeLikedData = ({isRecipeLiked}) => {
        this.setState({isRecipeLiked})
    }

    handleLikeRecipe = async(likeRecipe) => {
        await this.setState(prevState => ({
            isRecipeLiked: !prevState.isRecipeLiked
        }));
        await likeRecipe()
        try {
            console.log('Recipe liked successfully')
        } catch (error) {
            console.error(error)
        }
    }

    refetchQueries = () => {
        return [
            {
                query: GET_RECIPE,
                variables: {_id:this.props.recipe._id}
            },
            {
                query: IS_RECIPE_LIKED,
                variables: {recipeId:this.props.recipe._id,username:this.props.session.getCurrentUser.username}
            }
        ]
    }
    

    render() {

        const {recipe,session} = this.props
        const {getCurrentUser: {username}} = session
        const {isRecipeLiked} = this.state

        return(

            <Mutation 
                mutation={LIKE_RECIPE} 
                variables={{recipeId:recipe._id,username,doIncrement:isRecipeLiked}} 
                refetchQueries={this.refetchQueries}
            >

                {(likeRecipe,{data,loading,error}) => {

                    if(error) console.error(error) 

                    return(

                        <Query query={IS_RECIPE_LIKED} variables={{recipeId:recipe._id,username}} onCompleted={this.handleIsRecipeLikedData} >

                            {({data,loading,error}) => {

                                return(
                                    <div 
                                        className={isRecipeLiked ? 'like is-liked': 'like'} onClick={() => this.handleLikeRecipe(likeRecipe)} >
                                        <div className="like__heart"></div>    
                                        <div className="like__counter">{recipe.likes}</div>
                                    </div>
                                )

                            }}

                        </Query>
                    )

                }}

            </Mutation>
        )

    }

}

export default Like